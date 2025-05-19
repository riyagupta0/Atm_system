package com.atmapplication.AtmApplication.Service.impl;

import com.atmapplication.AtmApplication.Model.Account;
import com.atmapplication.AtmApplication.Model.ETransactionType;
import com.atmapplication.AtmApplication.Model.Transaction;
import com.atmapplication.AtmApplication.Repository.TransactionRepository;
import com.atmapplication.AtmApplication.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class TransactionServiceImpl implements TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    @Transactional
    public Transaction createTransaction(Account account, BigDecimal amount, ETransactionType type, String description) {
        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setAmount(amount);
        transaction.setType(type);
        transaction.setDescription(description);
        transaction.setTransactionDate(LocalDateTime.now());

        if (type == ETransactionType.DEPOSIT || type == ETransactionType.TRANSFER_RECEIVED) {
            account.setBalance(account.getBalance().add(amount));
        } else if (type == ETransactionType.WITHDRAW || type == ETransactionType.TRANSFER_SENT) {
            account.setBalance(account.getBalance().subtract(amount));
        }

        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public Transaction createTransferTransaction(Account sourceAccount, Account destinationAccount, BigDecimal amount, String description) {
        // Create source transaction (TRANSFER_SENT)
        Transaction sourceTransaction = new Transaction();
        sourceTransaction.setAccount(sourceAccount);
        sourceTransaction.setAmount(amount);
        sourceTransaction.setType(ETransactionType.TRANSFER_SENT);
        sourceTransaction.setDescription(description);
        sourceTransaction.setTransactionDate(LocalDateTime.now());
        sourceTransaction.setSourceCardNumber(sourceAccount.getUser().getCardNumber());
        sourceTransaction.setDestinationCardNumber(destinationAccount.getUser().getCardNumber());

        // Update source account balance
        sourceAccount.setBalance(sourceAccount.getBalance().subtract(amount));

        // Create destination transaction (TRANSFER_RECEIVED)
        Transaction destinationTransaction = new Transaction();
        destinationTransaction.setAccount(destinationAccount);
        destinationTransaction.setAmount(amount);
        destinationTransaction.setType(ETransactionType.TRANSFER_RECEIVED);
        destinationTransaction.setDescription(description);
        destinationTransaction.setTransactionDate(LocalDateTime.now());
        destinationTransaction.setSourceCardNumber(sourceAccount.getUser().getCardNumber());
        destinationTransaction.setDestinationCardNumber(destinationAccount.getUser().getCardNumber());

        // Update destination account balance
        destinationAccount.setBalance(destinationAccount.getBalance().add(amount));

        // Save both transactions
        transactionRepository.save(destinationTransaction);
        return transactionRepository.save(sourceTransaction);
    }
}
