package com.atmapplication.AtmApplication.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Amount cannot be null")
    @DecimalMin(value = "0.0", message = "Amount must be positive")
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Transaction type cannot be null")
    private ETransactionType type;

    @NotNull(message = "Transaction date cannot be null")
    private LocalDateTime transactionDate;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    // For transfers, we need to know the source/destination
    private String sourceCardNumber;
    private String destinationCardNumber;

    // Adding account number fields for transfers
    private String sourceAccountNumber;
    private String destinationAccountNumber;

    @PrePersist
    protected void onCreate() {
        transactionDate = LocalDateTime.now();
    }
}
