package io.chaker.restapi.controller;

import io.chaker.restapi.model.Book;
import io.chaker.restapi.repo.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepo bookRepo;

    //Get all books
    @RequestMapping
    public List<Book> getBooks() {
        return bookRepo.findAll();
    }

    //Get book by id
    @RequestMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id){
        Optional<Book> book = bookRepo.findById(id);
        return book.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    //Create a new book
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book){
        Book savedBook =bookRepo.save(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }

    // Update a book by ID
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Optional<Book> bookOptional = bookRepo.findById(id);
        if(bookOptional.isPresent()){
            Book book = bookOptional.get();
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setPrice(bookDetails.getPrice());
            book.setCopiesInStock(bookDetails.getCopiesInStock());
            Book updatedBook = bookRepo.save(book);
            return ResponseEntity.ok(updatedBook);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a book by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        if (bookRepo.existsById(id)) {
            bookRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
