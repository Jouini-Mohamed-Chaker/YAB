package io.chaker.restapi.repo;

import io.chaker.restapi.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepo extends JpaRepository<Loan, Long> {
}
