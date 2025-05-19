package com.atmapplication.AtmApplication.Service.impl;

import com.atmapplication.AtmApplication.dto.request.ChangePinRequest;
import com.atmapplication.AtmApplication.dto.request.DepositRequest;
import com.atmapplication.AtmApplication.dto.request.TransferRequest;
import com.atmapplication.AtmApplication.dto.request.WithdrawRequest;
import com.atmapplication.AtmApplication.dto.response.MessageResponse;
import com.atmapplication.AtmApplication.dto.response.TransactionResponse;
import com.atmapplication.AtmApplication.dto.response.UserResponse;
import com.atmapplication.AtmApplication.Exception.InsufficientBalanceException;
import com.atmapplication.AtmApplication.Exception.InvalidCredentialsException;
import com.atmapplication.AtmApplication.Exception.ResourceNotFoundException;
import com.atmapplication.AtmApplication.Model.Account;
import com.atmapplication.AtmApplication.Model.ETransactionType;
import com.atmapplication.AtmApplication.Model.Transaction;
import com.atmapplication.AtmApplication.Model.User;
import com.atmapplication.AtmApplication.Repository.AccountRepository;
import com.atmapplication.AtmApplication.Repository.TransactionRepository;
import com.atmapplication.AtmApplication.Repository.UserRepository;
import com.atmapplication.AtmApplication.Service.AtmService;
import com.atmapplication.AtmApplication.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AtmServiceImpl implements AtmService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponse getBalance(String cardNumber) {
        User user = userRepository.findByCardNumber(cardNumber)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with card number: " + cardNumber));

        Account account = accountRepository.findByUserCardNumber(cardNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found for card number: " + cardNumber));

        return new UserResponse(
                user.getId(),
                user.getCardNumber(),
                user.getName(),
                user.getEmail(),
                user.getContact(),
                user.getDateOfBirth(),
                account.getAccountType(),
                account.getBalance()
        );
    }

    @Override
    @Transactional
    public MessageResponse deposit(DepositRequest depositRequest) {
        User user = userRepository.findByCardNumber(depositRequest.getCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with card number: " + depositRequest.getCardNumber()));

        Account account = accountRepository.findByUserCardNumber(depositRequest.getCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found for card number: " + depositRequest.getCardNumber()));

        transactionService.createTransaction(
                account,
                depositRequest.getAmount(),
                ETransactionType.DEPOSIT,
                "Deposit to account"
        );

        return new MessageResponse("Deposit successful. New balance: " + account.getBalance());
    }

    @Override
    @Transactional
    public MessageResponse withdraw(WithdrawRequest withdrawRequest) {
        User user = userRepository.findByCardNumber(withdrawRequest.getCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with card number: " + withdrawRequest.getCardNumber()));

        if (!passwordEncoder.matches(withdrawRequest.getPin(), user.getPin())) {
            throw new InvalidCredentialsException("Invalid PIN");
        }

        Account account = accountRepository.findByUserCardNumber(withdrawRequest.getCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found for card number: " + withdrawRequest.getCardNumber()));

        if (account.getBalance().compareTo(withdrawRequest.getAmount()) < 0) {
            throw new InsufficientBalanceException("Insufficient balance");
        }

        transactionService.createTransaction(
                account,
                withdrawRequest.getAmount(),
                ETransactionType.WITHDRAW,
                "Withdrawal from account"
        );

        return new MessageResponse("Withdrawal successful. New balance: " + account.getBalance());
    }

    @Override
    @Transactional
    public MessageResponse transfer(TransferRequest transferRequest) {
        // Validate source user and account
        User sourceUser = userRepository.findByCardNumber(transferRequest.getSourceCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with card number: " + transferRequest.getSourceCardNumber()));

        if (!passwordEncoder.matches(transferRequest.getPin(), sourceUser.getPin())) {
            throw new InvalidCredentialsException("Invalid PIN");
        }

        Account sourceAccount = accountRepository.findByUserCardNumber(transferRequest.getSourceCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found for card number: " + transferRequest.getSourceCardNumber()));

        // Validate destination user and account
        User destinationUser = userRepository.findByCardNumber(transferRequest.getDestinationCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Destination user not found with card number: " + transferRequest.getDestinationCardNumber()));

        Account destinationAccount = accountRepository.findByUserCardNumber(transferRequest.getDestinationCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Destination account not found for card number: " + transferRequest.getDestinationCardNumber()));

        // Check if source and destination are the same
        if (sourceUser.getId().equals(destinationUser.getId())) {
            throw new RuntimeException("Cannot transfer to the same account");
        }

        // Check if source has sufficient balance
        if (sourceAccount.getBalance().compareTo(transferRequest.getAmount()) < 0) {
            throw new InsufficientBalanceException("Insufficient balance for transfer");
        }

        // Create transfer transaction
        transactionService.createTransferTransaction(
                sourceAccount,
                destinationAccount,
                transferRequest.getAmount(),
                "Transfer from " + sourceUser.getName() + " to " + destinationUser.getName()
        );

        return new MessageResponse("Transfer successful. New balance: " + sourceAccount.getBalance());
    }

    @Override
    public List<TransactionResponse> getTransactionHistory(String cardNumber) {
        User user = userRepository.findByCardNumber(cardNumber)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with card number: " + cardNumber));

        Account account = accountRepository.findByUserCardNumber(cardNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found for card number: " + cardNumber));

        List<Transaction> transactions = transactionRepository.findByAccountOrderByTransactionDateDesc(account);

        return transactions.stream().map(transaction -> new TransactionResponse(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getType(),
                transaction.getTransactionDate(),
                transaction.getDescription(),
                transaction.getSourceCardNumber(),
                transaction.getDestinationCardNumber()
        )).collect(Collectors.toList());
    }
    @Override
    @Transactional
    public MessageResponse changePin(ChangePinRequest changePinRequest) {
        // Find the user by card number
        User user = userRepository.findByCardNumber(changePinRequest.getCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with card number: " + changePinRequest.getCardNumber()));

        // Verify current PIN
        if (!passwordEncoder.matches(changePinRequest.getCurrentPin(), user.getPin())) {
            throw new InvalidCredentialsException("Current PIN is incorrect");
        }

        // Verify new PIN and confirm PIN match
        if (!changePinRequest.getNewPin().equals(changePinRequest.getConfirmPin())) {
            throw new InvalidCredentialsException("New PIN and confirm PIN do not match");
        }

        // Check if new PIN is the same as current PIN
        if (passwordEncoder.matches(changePinRequest.getNewPin(), user.getPin())) {
            throw new InvalidCredentialsException("New PIN must be different from current PIN");
        }

        // Update the PIN
        user.setPin(passwordEncoder.encode(changePinRequest.getNewPin()));
        userRepository.save(user);

        return new MessageResponse("PIN changed successfully");
    }


    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    private UserResponse mapToUserResponse(User user) {
        Account account = accountRepository.findByUserCardNumber(user.getCardNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found for card number: " + user.getCardNumber()));

        return new UserResponse(
                user.getId(),
                user.getCardNumber(),
                user.getName(),
                user.getEmail(),
                user.getContact(),
                user.getDateOfBirth(),
                account.getAccountType(),
                account.getBalance()
        );
    }


}
