package io.chaker.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "members")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class Member extends Person {
    private String address;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL) @JsonIgnore private List<Loan> loans;
}