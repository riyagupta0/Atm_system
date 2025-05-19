package com.atmapplication.AtmApplication.Repository;

import com.atmapplication.AtmApplication.Model.Account;
import com.atmapplication.AtmApplication.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUser(User user);
    Optional<Account> findByAccountNumber(String accountNumber);
    Optional<Account> findByUserCardNumber(String cardNumber);
}
