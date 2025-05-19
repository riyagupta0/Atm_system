package com.atmapplication.AtmApplication.Controller;

import com.atmapplication.AtmApplication.dto.request.ChangePinRequest;
import com.atmapplication.AtmApplication.dto.request.DepositRequest;
import com.atmapplication.AtmApplication.dto.request.TransferRequest;
import com.atmapplication.AtmApplication.dto.request.WithdrawRequest;
import com.atmapplication.AtmApplication.dto.response.MessageResponse;
import com.atmapplication.AtmApplication.dto.response.TransactionResponse;
//import com.atmapplication.AtmApplication.dto.response.UserListResponse;
//import com.atmapplication.AtmApplication.dto.response.UserResponse;
import com.atmapplication.AtmApplication.Service.AtmService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/atm")
public class AtmController {
    @Autowired
    private AtmService atmService;

    @GetMapping("/balance/{accountNumber}")
    @PreAuthorize("authentication.principal.username == #accountNumber")
    public ResponseEntity<UserResponse> getBalance(@PathVariable String accountNumber) {
        return ResponseEntity.ok(atmService.getBalance(accountNumber));
    }

    @PostMapping("/deposit")
    public ResponseEntity<MessageResponse> deposit(@Valid @RequestBody DepositRequest depositRequest) {
        return ResponseEntity.ok(atmService.deposit(depositRequest));
    }

    @PostMapping("/withdraw")
    public ResponseEntity<MessageResponse> withdraw(@Valid @RequestBody WithdrawRequest withdrawRequest) {
        return ResponseEntity.ok(atmService.withdraw(withdrawRequest));
    }

    @PostMapping("/transfer")
    public ResponseEntity<MessageResponse> transfer(@Valid @RequestBody TransferRequest transferRequest) {
        return ResponseEntity.ok(atmService.transfer(transferRequest));
    }

    @GetMapping("/transactions/{accountNumber}")
    @PreAuthorize("authentication.principal.username == #accountNumber")
    public ResponseEntity<List<TransactionResponse>> getTransactionHistory(@PathVariable String accountNumber) {
        return ResponseEntity.ok(atmService.getTransactionHistory(accountNumber));
    }

    @PostMapping("/change-pin")
    public ResponseEntity<MessageResponse> changePin(@Valid @RequestBody ChangePinRequest changePinRequest) {
        return ResponseEntity.ok(atmService.changePin(changePinRequest));
    }

//    @GetMapping("/users")
//    @PreAuthorize("hasAuthority('ADMIN')")
//    public ResponseEntity<List<UserListResponse>> getAllUsers() {
//        return ResponseEntity.ok(atmService.getAllUsers());
//    }
}
