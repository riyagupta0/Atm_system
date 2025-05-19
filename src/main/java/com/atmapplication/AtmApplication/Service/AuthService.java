package com.atmapplication.AtmApplication.Service;

import com.atmapplication.AtmApplication.dto.request.LoginRequest;
import com.atmapplication.AtmApplication.dto.request.RegisterRequest;
import com.atmapplication.AtmApplication.dto.response.JwtResponse;
import com.atmapplication.AtmApplication.dto.response.MessageResponse;

public interface AuthService {
    JwtResponse authenticateUser(LoginRequest loginRequest);
    MessageResponse registerUser(RegisterRequest registerRequest);
}
