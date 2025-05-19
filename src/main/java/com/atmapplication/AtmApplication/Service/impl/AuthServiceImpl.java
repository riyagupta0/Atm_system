package com.atmapplication.AtmApplication.Service.impl;

import com.atmapplication.AtmApplication.dto.request.LoginRequest;
import com.atmapplication.AtmApplication.dto.request.RegisterRequest;
import com.atmapplication.AtmApplication.dto.response.JwtResponse;
import com.atmapplication.AtmApplication.dto.response.MessageResponse;
import com.atmapplication.AtmApplication.Exception.InvalidCredentialsException;
import com.atmapplication.AtmApplication.Model.Account;
import com.atmapplication.AtmApplication.Model.User;
import com.atmapplication.AtmApplication.Repository.AccountRepository;
import com.atmapplication.AtmApplication.Repository.UserRepository;
import com.atmapplication.AtmApplication.security.jwt.JwtUtils;
import com.atmapplication.AtmApplication.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Override
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getCardNumber(), loginRequest.getPin()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = userRepository.findByCardNumber(loginRequest.getCardNumber())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid card number or PIN"));

        return new JwtResponse(jwt, user.getId(), user.getCardNumber(), user.getName(), user.getEmail());
    }

    @Override
    @Transactional
    public MessageResponse registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByCardNumber(registerRequest.getCardNumber())) {
            throw new RuntimeException("Error: Card number is already in use!");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Create new user
        try {
            User user = new User();
            user.setCardNumber(registerRequest.getCardNumber());
            user.setName(registerRequest.getName());
            user.setEmail(registerRequest.getEmail());
            user.setPin(encoder.encode(registerRequest.getPin()));
            user.setContact(registerRequest.getContact());
            user.setDateOfBirth(registerRequest.getDateOfBirth());

            User savedUser = userRepository.save(user);

            // Create account for the user
            Account account = new Account();
            account.setAccountNumber(generateAccountNumber());
            account.setAccountType(registerRequest.getAccountType());
            account.setBalance(registerRequest.getInitialDeposit());
            account.setCreatedAt(LocalDateTime.now());
            account.setUser(savedUser);


            accountRepository.save(account);

            return new MessageResponse("User registered successfully!");
        }catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException("Error registering user: " + e.getMessage());
        }
    }

    private String generateAccountNumber() {
        return UUID.randomUUID().toString().replaceAll("-", "").substring(0, 10);
    }
}
