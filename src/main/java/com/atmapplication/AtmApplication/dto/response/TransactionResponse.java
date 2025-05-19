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

}
