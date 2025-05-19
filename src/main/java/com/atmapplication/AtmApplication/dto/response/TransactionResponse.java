package com.atmapplication.AtmApplication.dto.response;

import com.atmapplication.AtmApplication.Model.ETransactionType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {
    private Long id;
    private BigDecimal amount;
    private ETransactionType type;
    private LocalDateTime transactionDate;
    private String description;
    private String sourceCardNumber;
    private String destinationCardNumber;
    private String sourceAccountNumber;
    private String destinationAccountNumber;

    // Constructor for backward compatibility
    public TransactionResponse(Long id, BigDecimal amount, ETransactionType type, LocalDateTime transactionDate,
                               String description, String sourceCardNumber, String destinationAccountNumber) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.transactionDate = transactionDate;
        this.description = description;
        this.sourceCardNumber = sourceCardNumber;
        this.destinationAccountNumber = destinationAccountNumber;
    }
}
