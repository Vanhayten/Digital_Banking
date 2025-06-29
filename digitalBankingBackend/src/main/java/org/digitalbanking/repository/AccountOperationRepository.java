package org.digitalbanking.repository;

import org.digitalbanking.entity.AccountOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountOperationRepository extends JpaRepository<AccountOperation, Long> {
    Page<AccountOperation> findByBankAccountIdOrderByOperationDateDesc(String accountId, Pageable pageable);
}