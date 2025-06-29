package org.digitalbanking.dto;

import org.digitalbanking.enums.AccountStatus;
import org.digitalbanking.enums.AccountType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BankAccountDTO {
    private String id;
    private double balance;
    private LocalDateTime createdAt;
    private AccountStatus status;
    private AccountType accountType;
    private CustomerDTO customer;
    private String createdBy;
}