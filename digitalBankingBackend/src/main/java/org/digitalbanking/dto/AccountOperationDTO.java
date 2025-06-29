package org.digitalbanking.dto;

import org.digitalbanking.enums.OperationType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AccountOperationDTO {
    private Long id;
    private LocalDateTime operationDate;
    private double amount;
    private OperationType type;
    private String description;
    private String performedBy;
    private String accountId;
}