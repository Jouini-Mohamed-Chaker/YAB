package io.chaker.restapi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="staff")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class Staff extends Person {
    private String phoneNumber;
}
