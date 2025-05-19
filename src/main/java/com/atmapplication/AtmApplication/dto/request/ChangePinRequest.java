package com.atmapplication.AtmApplication.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePinRequest {
    @NotBlank(message = "Account number is required")
    private String accountNumber;

    @NotBlank(message = "Current PIN is required")
    @Pattern(regexp = "^[0-9]{4}$", message = "Current PIN must be 4 digits")
    private String currentPin;

    @NotBlank(message = "New PIN is required")
    @Pattern(regexp = "^[0-9]{4}$", message = "New PIN must be 4 digits")
    private String newPin;

    @NotBlank(message = "Confirm PIN is required")
    @Pattern(regexp = "^[0-9]{4}$", message = "Confirm PIN must be 4 digits")
    private String confirmPin;
}
