package org.digitalbanking.service;

import org.digitalbanking.dto.*;
import org.digitalbanking.entity.*;
import org.digitalbanking.enums.AccountStatus;
import org.digitalbanking.enums.OperationType;
import org.digitalbanking.exception.*;
import org.digitalbanking.mapper.BankMapper;
import org.digitalbanking.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BankServiceImpl implements BankService {
    private final CustomerRepository customerRepository;
    private final BankAccountRepository bankAccountRepository;
    private final AccountOperationRepository operationRepository;
    private final BankMapper mapper;

    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        Customer customer = mapper.toCustomer(customerDTO);
        Customer savedCustomer = customerRepository.save(customer);
        return mapper.toCustomerDTO(savedCustomer);
    }

    @Override
    public List<CustomerDTO> listCustomers() {
        return customerRepository.findAll().stream()
                .map(mapper::toCustomerDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO getCustomer(Long customerId) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
        return mapper.toCustomerDTO(customer);
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO customerDTO) throws CustomerNotFoundException {
        Customer existing = customerRepository.findById(customerDTO.getId())
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));

        existing.setName(customerDTO.getName());
        existing.setEmail(customerDTO.getEmail());
        existing.setPhone(customerDTO.getPhone());
        existing.setAddress(customerDTO.getAddress());

        return mapper.toCustomerDTO(customerRepository.save(existing));
    }

    @Override
    public void deleteCustomer(Long customerId) throws CustomerNotFoundException {
        if (!customerRepository.existsById(customerId)) {
            throw new CustomerNotFoundException("Customer not found");
        }
        customerRepository.deleteById(customerId);
    }

    @Override
    public List<CustomerDTO> searchCustomers(String keyword) {
        return customerRepository.searchCustomers(keyword).stream()
                .map(mapper::toCustomerDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CurrentAccountDTO createCurrentAccount(double initialBalance, double overDraft, Long customerId) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));

        CurrentAccount account = CurrentAccount.builder()
                .id(UUID.randomUUID().toString())
                .balance(initialBalance)
                .status(AccountStatus.ACTIVATED)
                .customer(customer)
                .overDraft(overDraft)
                .build();

        return (CurrentAccountDTO) mapper.toBankAccountDTO(bankAccountRepository.save(account));
    }

    @Override
    public SavingAccountDTO createSavingAccount(double initialBalance, double interestRate, Long customerId) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));

        SavingAccount account = SavingAccount.builder()
                .id(UUID.randomUUID().toString())
                .balance(initialBalance)
                .status(AccountStatus.ACTIVATED)
                .customer(customer)
                .interestRate(interestRate)
                .build();

        return (SavingAccountDTO) mapper.toBankAccountDTO(bankAccountRepository.save(account));
    }

    @Override
    public BankAccountDTO getBankAccount(String accountId) throws BankAccountNotFoundException {
        BankAccount account = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new BankAccountNotFoundException("Account not found"));
        return mapper.toBankAccountDTO(account);
    }

    @Override
    public void debit(String accountId, double amount, String description) throws BankAccountNotFoundException, BalanceNotSufficientException {
        BankAccount account = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new BankAccountNotFoundException("Account not found"));

        if (account.getBalance() < amount) {
            throw new BalanceNotSufficientException("Insufficient balance");
        }

        AccountOperation operation = AccountOperation.builder()
                .amount(amount)
                .type(OperationType.DEBIT)
                .description(description)
                .bankAccount(account)
                .build();

        operationRepository.save(operation);
        account.setBalance(account.getBalance() - amount);
        bankAccountRepository.save(account);
    }

    @Override
    public void credit(String accountId, double amount, String description) throws BankAccountNotFoundException {
        BankAccount account = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new BankAccountNotFoundException("Account not found"));

        AccountOperation operation = AccountOperation.builder()
                .amount(amount)
                .type(OperationType.CREDIT)
                .description(description)
                .bankAccount(account)
                .build();

        operationRepository.save(operation);
        account.setBalance(account.getBalance() + amount);
        bankAccountRepository.save(account);
    }

    @Override
    public void transfer(String accountIdSource, String accountIdDestination, double amount)
            throws BankAccountNotFoundException, BalanceNotSufficientException {
        debit(accountIdSource, amount, "Transfer to " + accountIdDestination);
        credit(accountIdDestination, amount, "Transfer from " + accountIdSource);
    }

    @Override
    public List<BankAccountDTO> listBankAccounts() {
        return bankAccountRepository.findAll().stream()
                .map(mapper::toBankAccountDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AccountHistoryDTO getAccountHistory(String accountId, int page, int size) throws BankAccountNotFoundException {
        BankAccount account = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new BankAccountNotFoundException("Account not found"));

        Page<AccountOperation> operations = operationRepository.findByBankAccountIdOrderByOperationDateDesc(
                accountId, PageRequest.of(page, size));

        List<AccountOperationDTO> operationDTOs = operations.getContent().stream()
                .map(mapper::toOperationDTO)
                .collect(Collectors.toList());

        return AccountHistoryDTO.builder()
                .accountId(accountId)
                .balance(account.getBalance())
                .currentPage(page)
                .pageSize(size)
                .totalPages(operations.getTotalPages())
                .operations(operationDTOs)
                .build();
    }
}