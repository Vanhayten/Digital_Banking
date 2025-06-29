package org.digitalbanking;

import org.digitalbanking.dto.*;
import org.digitalbanking.entity.*;
import org.springframework.stereotype.Component;

@Component
public class BankMapper {
    public CustomerDTO toCustomerDTO(Customer customer) {
        return CustomerDTO.builder()
                .id(customer.getId())
                .name(customer.getName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .createdAt(customer.getCreatedAt())
                .createdBy(customer.getCreatedBy())
                .build();
    }

    public Customer toCustomer(CustomerDTO dto) {
        return Customer.builder()
                .id(dto.getId())
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .build();
    }

    public BankAccountDTO toBankAccountDTO(BankAccount account) {
        BankAccountDTO dto = BankAccountDTO.builder()
                .id(account.getId())
                .balance(account.getBalance())
                .createdAt(account.getCreatedAt())
                .status(account.getStatus())
                .accountType(account.getAccountType())
                .customer(toCustomerDTO(account.getCustomer()))
                .createdBy(account.getCreatedBy())
                .build();

        if (account instanceof CurrentAccount) {
            CurrentAccount current = (CurrentAccount) account;
            return CurrentAccountDTO.builder()
                    .id(dto.getId())
                    .balance(dto.getBalance())
                    .createdAt(dto.getCreatedAt())
                    .status(dto.getStatus())
                    .accountType(dto.getAccountType())
                    .customer(dto.getCustomer())
                    .createdBy(dto.getCreatedBy())
                    .overDraft(current.getOverDraft())
                    .build();
        } else if (account instanceof SavingAccount) {
            SavingAccount saving = (SavingAccount) account;
            return SavingAccountDTO.builder()
                    .id(dto.getId())
                    .balance(dto.getBalance())
                    .createdAt(dto.getCreatedAt())
                    .status(dto.getStatus())
                    .accountType(dto.getAccountType())
                    .customer(dto.getCustomer())
                    .createdBy(dto.getCreatedBy())
                    .interestRate(saving.getInterestRate())
                    .build();
        }
        return dto;
    }

    public AccountOperationDTO toOperationDTO(AccountOperation operation) {
        return AccountOperationDTO.builder()
                .id(operation.getId())
                .operationDate(operation.getOperationDate())
                .amount(operation.getAmount())
                .type(operation.getType())
                .description(operation.getDescription())
                .performedBy(operation.getPerformedBy())
                .accountId(operation.getBankAccount().getId())
                .build();
    }
}