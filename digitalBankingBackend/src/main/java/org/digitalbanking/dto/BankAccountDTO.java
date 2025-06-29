package org.digitalbanking.dto;

import org.digitalbanking.enums.AccountStatus;
import org.digitalbanking.enums.AccountType;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BankAccountDTO {
    private String id;
    private double balance;
    private LocalDateTime createdAt;
    private AccountStatus status;
    private AccountType accountType;
    private CustomerDTO customer;
    private String createdBy;

    @Builder
    public BankAccountDTO(String id, double balance, LocalDateTime createdAt,
                          AccountStatus status, AccountType accountType,
                          CustomerDTO customer, String createdBy) {
        this.id = id;
        this.balance = balance;
        this.createdAt = createdAt;
        this.status = status;
        this.accountType = accountType;
        this.customer = customer;
        this.createdBy = createdBy;
    }
}