package com.atmapplication.AtmApplication.validator;

import com.atmapplication.AtmApplication.dto.request.TransferRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.util.StringUtils;

public class TransferRequestValidator implements ConstraintValidator<ValidTransferRequest, TransferRequest> {

    @Override
    public void initialize(ValidTransferRequest constraintAnnotation) {
    }

    @Override
    public boolean isValid(TransferRequest transferRequest, ConstraintValidatorContext context) {
        if (transferRequest == null) {
            return true;
        }

        // Either sourceAccountNumber or sourceCardNumber must be provided
        return StringUtils.hasText(transferRequest.getSourceAccountNumber()) ||
                StringUtils.hasText(transferRequest.getSourceCardNumber());
    }
}
