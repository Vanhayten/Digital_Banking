package org.digitalbanking.dto;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.digitalbanking.enums.AccountStatus;
import org.digitalbanking.enums.AccountType;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class SavingAccountDTO extends BankAccountDTO {
    private double interestRate;

    @Builder(builderMethodName = "savingAccountBuilder")
    public SavingAccountDTO(String id, double balance, LocalDateTime createdAt,
                            AccountStatus status, AccountType accountType,
                            CustomerDTO customer, String createdBy, double interestRate) {
        super(id, balance, createdAt, status, accountType, customer, createdBy);
        this.interestRate = interestRate;
    }
}