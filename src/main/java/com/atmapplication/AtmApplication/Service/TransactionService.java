package com.atmapplication.AtmApplication.Service;

import com.atmapplication.AtmApplication.Model.Account;
import com.atmapplication.AtmApplication.Model.ETransactionType;
import com.atmapplication.AtmApplication.Model.Transaction;

import java.math.BigDecimal;

public interface TransactionService {
    Transaction createTransaction(Account account, BigDecimal amount, ETransactionType type, String description);
    Transaction createTransferTransaction(Account sourceAccount, Account destinationAccount, BigDecimal amount, String description);
}
