package io.chaker.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

@Entity
@Table(name = "loans")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
public class Loan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long loanId;

    @ManyToOne @JoinColumn(name = "member_id", nullable = false) private Member member;

    @ManyToOne @JoinColumn(name = "book_id", nullable = false) @JsonIgnore private Book book;

    private LocalDate loanDate;
    private LocalDate returnDate;
    private String status;
}