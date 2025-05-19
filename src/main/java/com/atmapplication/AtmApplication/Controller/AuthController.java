package com.atmapplication.AtmApplication.Controller;

import com.atmapplication.AtmApplication.dto.request.LoginRequest;
import com.atmapplication.AtmApplication.dto.request.RegisterRequest;
import com.atmapplication.AtmApplication.dto.response.JwtResponse;
import com.atmapplication.AtmApplication.dto.response.MessageResponse;
import com.atmapplication.AtmApplication.Service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.registerUser(registerRequest));
    }
}
