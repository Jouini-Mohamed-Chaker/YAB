package io.chaker.restapi.controller;

import io.chaker.restapi.model.Staff;
import io.chaker.restapi.repo.StaffRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/staff")
public class StaffController {
    @Autowired
    private StaffRepo staffRepo;

    //Get all staff
    @RequestMapping
    public List<Staff> getStaff() {
        return staffRepo.findAll();
    }

    //Get staff by id
    @RequestMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Long id){
        Optional<Staff> staff = staffRepo.findById(id);
        return staff.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    //Create a new staff
    @PostMapping
    public ResponseEntity<Staff> createStaff(@RequestBody Staff staff){
        Staff savedStaff =staffRepo.save(staff);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStaff);
    }

    // Update a staff by ID
    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody Staff staffDetails) {
        Optional<Staff> staffOptional = staffRepo.findById(id);
        if(staffOptional.isPresent()){
            Staff staff = staffOptional.get();
            staff.setName(staffDetails.getName());
            staff.setEmail(staffDetails.getEmail());
            staff.setPhoneNumber(staffDetails.getPhoneNumber());
            Staff updatedStaff = staffRepo.save(staff);
            return ResponseEntity.ok(updatedStaff);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a staff by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        staffRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
