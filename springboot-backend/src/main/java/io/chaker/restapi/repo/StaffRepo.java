package io.chaker.restapi.repo;

import io.chaker.restapi.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepo extends JpaRepository<Staff, Long> {
}
