package com.atmapplication.AtmApplication.dto.request;

import com.atmapplication.AtmApplication.Model.EAccountType;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Card number is required")
    @Pattern(regexp = "^[0-9]{16}$", message = "Card number must be 16 digits")
    private String cardNumber;

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 50, message = "Email must be less than 50 characters")
    private String email;

    @NotNull(message = "Account type is required")
    private EAccountType accountType;

    @NotBlank(message = "PIN is required")
//    @Size(min = 4, max = 4, message = "PIN must be 4 digits")
    private String pin;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Contact number must be 10 digits")
    private String contact;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    @JsonProperty("dob")
    private LocalDate dateOfBirth;

    @NotNull(message = "Initial deposit is required")
    @DecimalMin(value = "500.0", message = "Initial deposit must be at least 500")
    private BigDecimal initialDeposit;
}
