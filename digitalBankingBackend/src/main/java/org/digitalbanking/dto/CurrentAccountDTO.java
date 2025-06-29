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
public class CurrentAccountDTO extends BankAccountDTO {
    private double overDraft;

    @Builder(builderMethodName = "currentAccountBuilder")
    public CurrentAccountDTO(String id, double balance, LocalDateTime createdAt,
                             AccountStatus status, AccountType accountType,
                             CustomerDTO customer, String createdBy, double overDraft) {
        super(id, balance, createdAt, status, accountType, customer, createdBy);
        this.overDraft = overDraft;
    }
}