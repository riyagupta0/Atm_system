package com.atmapplication.AtmApplication.Service;

import com.atmapplication.AtmApplication.dto.request.DepositRequest;
import com.atmapplication.AtmApplication.dto.request.TransferRequest;
import com.atmapplication.AtmApplication.dto.request.WithdrawRequest;
import com.atmapplication.AtmApplication.dto.response.MessageResponse;
import com.atmapplication.AtmApplication.dto.response.TransactionResponse;
import com.atmapplication.AtmApplication.dto.response.UserResponse;
import com.atmapplication.AtmApplication.dto.request.ChangePinRequest;

import java.util.List;

public interface AtmService {
    UserResponse getBalance(String cardNumber);
    MessageResponse deposit(DepositRequest depositRequest);
    MessageResponse withdraw(WithdrawRequest withdrawRequest);
    MessageResponse transfer(TransferRequest transferRequest);
    List<TransactionResponse> getTransactionHistory(String cardNumber);
    MessageResponse changePin(ChangePinRequest changePinRequest);
    List<UserResponse> getAllUsers();

}
