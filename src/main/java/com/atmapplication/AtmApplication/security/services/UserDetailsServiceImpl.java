package com.atmapplication.AtmApplication.security.services;

import com.atmapplication.AtmApplication.Model.User;
import com.atmapplication.AtmApplication.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String cardNumber) throws UsernameNotFoundException {
        User user = userRepository.findByCardNumber(cardNumber)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with card number: " + cardNumber));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getCardNumber())
                .password(user.getPin())
                .authorities("USER")
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
