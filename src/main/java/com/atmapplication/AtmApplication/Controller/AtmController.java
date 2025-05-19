package com.atmapplication.AtmApplication.Controller;

import com.atmapplication.AtmApplication.dto.request.ChangePinRequest;
import com.atmapplication.AtmApplication.dto.request.DepositRequest;
import com.atmapplication.AtmApplication.dto.request.TransferRequest;
import com.atmapplication.AtmApplication.dto.request.WithdrawRequest;
import com.atmapplication.AtmApplication.dto.response.MessageResponse;
import com.atmapplication.AtmApplication.dto.response.TransactionResponse;
import com.atmapplication.AtmApplication.dto.response.UserResponse;
import com.atmapplication.AtmApplication.Service.AtmService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200",  allowCredentials = "true")
@RestController
@RequestMapping("/api/atm")
public class AtmController {
    @Autowired
    private AtmService atmService;


    @GetMapping("/balance/{cardNumber}")
    @PreAuthorize("authentication.principal.username == #cardNumber")
    public ResponseEntity<UserResponse> getBalance(@PathVariable String cardNumber) {
        return ResponseEntity.ok(atmService.getBalance(cardNumber));
    }

    @PostMapping("/deposit")
    public ResponseEntity<MessageResponse> deposit(@Valid @RequestBody DepositRequest depositRequest) {
        return ResponseEntity.ok(atmService.deposit(depositRequest));
    }

    @PostMapping ("/withdraw")
    public ResponseEntity<MessageResponse> withdraw(@Valid @RequestBody WithdrawRequest withdrawRequest) {
        return ResponseEntity.ok(atmService.withdraw(withdrawRequest));
    }

    @PostMapping("/transfer")
    public ResponseEntity<MessageResponse> transfer(@Valid @RequestBody TransferRequest transferRequest) {
        return ResponseEntity.ok(atmService.transfer(transferRequest));
    }

    @GetMapping("/transactions/{cardNumber}")
    @PreAuthorize("authentication.principal.username == #cardNumber")
    public ResponseEntity<List<TransactionResponse>> getTransactionHistory(@PathVariable String cardNumber) {
        return ResponseEntity.ok(atmService.getTransactionHistory(cardNumber));
    }
    @PostMapping("/change-pin")
    public ResponseEntity<MessageResponse> changePin(@Valid @RequestBody ChangePinRequest changePinRequest) {
        return ResponseEntity.ok(atmService.changePin(changePinRequest));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(atmService.getAllUsers());
    }

}
