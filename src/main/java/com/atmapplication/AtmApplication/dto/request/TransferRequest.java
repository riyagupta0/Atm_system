package com.atmapplication.AtmApplication.dto.request;

import com.atmapplication.AtmApplication.validator.ValidTransferRequest;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ValidTransferRequest
public class TransferRequest {
    // Either sourceAccountNumber or sourceCardNumber must be provided
    private String sourceAccountNumber;

    @Pattern(regexp = "^[0-9]{16}$", message = "Source card number must be 16 digits")
    private String sourceCardNumber;

    @NotBlank(message = "PIN is required")
    @Pattern(regexp = "^[0-9]{4}$", message = "PIN must be 4 digits")
    private String pin;

    @NotBlank(message = "Destination account number is required")
    private String destinationAccountNumber;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1.0", message = "Amount must be at least 1")
    private BigDecimal amount;
}
