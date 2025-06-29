package org.digitalbanking.repository;

import org.digitalbanking.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByNameContainingIgnoreCase(String name);
    boolean existsByEmail(String email);

    @Query("SELECT c FROM Customer c WHERE LOWER(c.name) LIKE LOWER(concat('%', :keyword, '%')) " +
            "OR LOWER(c.email) LIKE LOWER(concat('%', :keyword, '%'))")
    List<Customer> searchCustomers(@Param("keyword") String keyword);
}