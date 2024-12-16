package io.chaker.restapi.controller;

import io.chaker.restapi.model.Loan;
import io.chaker.restapi.repo.LoanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanRepo loanRepo;

    //Get all loans
    @RequestMapping
    public List<Loan> getLoans() {
        return loanRepo.findAll();
    }

    //Get loan by id
    @RequestMapping("/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long id){
        Optional<Loan> loan = loanRepo.findById(id);
        return loan.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    //Create a new loan
    @PostMapping
    public ResponseEntity<Loan> createLoan(@RequestBody Loan loan){
        Loan savedLoan =loanRepo.save(loan);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLoan);
    }

    // Update a loan by ID
    @PutMapping("/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable Long id, @RequestBody Loan loanDetails) {
        Optional<Loan> loanOptional = loanRepo.findById(id);
        if (loanOptional.isPresent()) {
            Loan loan = loanOptional.get();
            loan.setMember(loanDetails.getMember());
            loan.setBook(loanDetails.getBook());
            loan.setLoanDate(loanDetails.getLoanDate());
            loan.setReturnDate(loanDetails.getReturnDate());
            loan.setStatus(loanDetails.getStatus());
            Loan updatedLoan = loanRepo.save(loan);
            return ResponseEntity.ok(updatedLoan);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a loan by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        loanRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
