package org.digitalbanking.controller;

import org.digitalbanking.dto.CustomerDTO;
import org.digitalbanking.exception.CustomerNotFoundException;
import org.digitalbanking.service.BankService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final BankService bankService;

    @GetMapping
    public List<CustomerDTO> listCustomers() {
        return bankService.listCustomers();
    }

    @GetMapping("/{id}")
    public CustomerDTO getCustomer(@PathVariable Long id) throws CustomerNotFoundException {
        return bankService.getCustomer(id);
    }

    @PostMapping
    public CustomerDTO createCustomer(@RequestBody CustomerDTO customerDTO) {
        return bankService.saveCustomer(customerDTO);
    }

    @PutMapping("/{id}")
    public CustomerDTO updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO customerDTO)
            throws CustomerNotFoundException {
        customerDTO.setId(id);
        return bankService.updateCustomer(customerDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) throws CustomerNotFoundException {
        bankService.deleteCustomer(id);
    }

    @GetMapping("/search")
    public List<CustomerDTO> searchCustomers(@RequestParam String keyword) {
        return bankService.searchCustomers(keyword);
    }
}