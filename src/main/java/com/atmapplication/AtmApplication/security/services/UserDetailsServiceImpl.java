package com.atmapplication.AtmApplication.security.services;

import com.atmapplication.AtmApplication.Model.Account;
import com.atmapplication.AtmApplication.Model.User;
import com.atmapplication.AtmApplication.Repository.AccountRepository;
import com.atmapplication.AtmApplication.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String accountNumber) throws UsernameNotFoundException {
        // Find the account by account number
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found with account number: " + accountNumber));

        // Get the user associated with the account
        User user = account.getUser();

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        // Add USER role for all users
        authorities.add(new SimpleGrantedAuthority("USER"));

        // Add ADMIN role for specific card numbers (for demonstration)
        if (user.getCardNumber().equals("9999999999999999")) {
            authorities.add(new SimpleGrantedAuthority("ADMIN"));
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(account.getAccountNumber())
                .password(user.getPin())
                .authorities(authorities)
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
