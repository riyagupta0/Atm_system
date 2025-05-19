package com.atmapplication.AtmApplication.Repository;

import com.atmapplication.AtmApplication.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByCardNumber(String cardNumber);
    Boolean existsByEmail(String email);
    Boolean existsByCardNumber(String cardNumber);
}
