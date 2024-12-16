package io.chaker.restapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "books")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long bookId;
    private String title;
    private String author;
    private double price;
    private Long copiesInStock;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL) @JsonIgnore private List<Loan> loans;
}