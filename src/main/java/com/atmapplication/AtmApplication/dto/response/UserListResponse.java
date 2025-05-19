package com.atmapplication.AtmApplication.dto.response;

import com.atmapplication.AtmApplication.Model.EAccountType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserListResponse {
    private Long id;
    private String accountNumber;
    private String cardNumber;
    private String name;
    private String email;
    private String contact;
    private LocalDate dateOfBirth;
    private EAccountType accountType;
    private BigDecimal balance;
}
