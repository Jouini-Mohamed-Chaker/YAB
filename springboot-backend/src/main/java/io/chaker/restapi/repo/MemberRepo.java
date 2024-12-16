package io.chaker.restapi.repo;

import io.chaker.restapi.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepo extends JpaRepository<Member, Long> {
}
