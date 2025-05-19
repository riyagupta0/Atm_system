package com.atmapplication.AtmApplication.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String accountNumber;
    private String cardNumber;
    private String name;
    private String email;

    public JwtResponse(String token, Long id, String accountNumber, String cardNumber, String name, String email) {
        this.token = token;
        this.id = id;
        this.accountNumber = accountNumber;
        this.cardNumber = cardNumber;
        this.name = name;
        this.email = email;
    }
}
