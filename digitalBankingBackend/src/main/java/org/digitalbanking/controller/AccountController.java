package org.digitalbanking.controller;

import org.digitalbanking.dto.*;
import org.digitalbanking.exception.*;
import org.digitalbanking.service.BankService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final BankService bankService;

    @GetMapping
    public List<BankAccountDTO> listAccounts() {
        return bankService.listBankAccounts();
    }

    @GetMapping("/{id}")
    public BankAccountDTO getAccount(@PathVariable String id) throws BankAccountNotFoundException {
        return bankService.getBankAccount(id);
    }

    @GetMapping("/{accountId}/history")
    public AccountHistoryDTO getAccountHistory(
            @PathVariable String accountId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) throws BankAccountNotFoundException {
        return bankService.getAccountHistory(accountId, page, size);
    }

    @PostMapping("/current")
    public CurrentAccountDTO createCurrentAccount(
            @RequestParam double initialBalance,
            @RequestParam double overDraft,
            @RequestParam Long customerId) throws CustomerNotFoundException {
        return bankService.createCurrentAccount(initialBalance, overDraft, customerId);
    }

    @PostMapping("/saving")
    public SavingAccountDTO createSavingAccount(
            @RequestParam double initialBalance,
            @RequestParam double interestRate,
            @RequestParam Long customerId) throws CustomerNotFoundException {
        return bankService.createSavingAccount(initialBalance, interestRate, customerId);
    }

    @PostMapping("/debit")
    public void debit(@RequestBody DebitRequest request)
            throws BankAccountNotFoundException, BalanceNotSufficientException {
        bankService.debit(request.getAccountId(), request.getAmount(), request.getDescription());
    }

    @PostMapping("/credit")
    public void credit(@RequestBody CreditRequest request) throws BankAccountNotFoundException {
        bankService.credit(request.getAccountId(), request.getAmount(), request.getDescription());
    }

    @PostMapping("/transfer")
    public void transfer(@RequestBody TransferRequest request)
            throws BankAccountNotFoundException, BalanceNotSufficientException {
        bankService.transfer(request.getSourceAccount(), request.getDestAccount(), request.getAmount());
    }
}

record DebitRequest(String accountId, double amount, String description) {}
record CreditRequest(String accountId, double amount, String description) {}
record TransferRequest(String sourceAccount, String destAccount, double amount) {}