package io.chaker.restapi.controller;

import io.chaker.restapi.model.Member;
import io.chaker.restapi.repo.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    @Autowired
    private MemberRepo memberRepo;

    //Get all members
    @RequestMapping
    public List<Member> getMembers() {
        return memberRepo.findAll();
    }

    //Get member by id
    @RequestMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable Long id){
        Optional<Member> member = memberRepo.findById(id);
        return member.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    //Create a new member
    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody Member member){
        Member savedMember =memberRepo.save(member);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
    }

    // Update a member by ID
    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable Long id, @RequestBody Member memberDetails) {
        Optional<Member> memberOptional = memberRepo.findById(id);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setName(memberDetails.getName());
            member.setEmail(memberDetails.getEmail());
            member.setAddress(memberDetails.getAddress());
            Member updatedMember = memberRepo.save(member);
            return ResponseEntity.ok(updatedMember);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a member by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
