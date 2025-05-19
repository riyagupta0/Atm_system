package com.atmapplication.AtmApplication.Repository;

import com.atmapplication.AtmApplication.Model.Account;
import com.atmapplication.AtmApplication.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccount(Account account);
    List<Transaction> findByAccountOrderByTransactionDateDesc(Account account);
    List<Transaction> findBySourceCardNumber(String cardNumber);
    List<Transaction> findByDestinationCardNumber(String cardNumber);
}
