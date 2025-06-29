package org.digitalbanking.service;

import org.digitalbanking.dto.*;
import org.digitalbanking.exception.*;

import java.util.List;

public interface BankService {
    CustomerDTO saveCustomer(CustomerDTO customerDTO);
    List<CustomerDTO> listCustomers();
    CustomerDTO getCustomer(Long customerId) throws CustomerNotFoundException;
    CustomerDTO updateCustomer(CustomerDTO customerDTO) throws CustomerNotFoundException;
    void deleteCustomer(Long customerId) throws CustomerNotFoundException;
    List<CustomerDTO> searchCustomers(String keyword);

    CurrentAccountDTO createCurrentAccount(double initialBalance, double overDraft, Long customerId) throws CustomerNotFoundException;
    SavingAccountDTO createSavingAccount(double initialBalance, double interestRate, Long customerId) throws CustomerNotFoundException;
    BankAccountDTO getBankAccount(String accountId) throws BankAccountNotFoundException;
    void debit(String accountId, double amount, String description) throws BankAccountNotFoundException, BalanceNotSufficientException;
    void credit(String accountId, double amount, String description) throws BankAccountNotFoundException;
    void transfer(String accountIdSource, String accountIdDestination, double amount) throws BankAccountNotFoundException, BalanceNotSufficientException;

    List<BankAccountDTO> listBankAccounts();
    AccountHistoryDTO getAccountHistory(String accountId, int page, int size) throws BankAccountNotFoundException;
}