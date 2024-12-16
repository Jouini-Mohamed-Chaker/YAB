import React, { useState, useEffect } from "react";
import { getBooks, deleteBook, createBook, updateBook } from "../api/api"; // import API functions

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    copiesInStock: "",
  });

  // Fetch books on initial render
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle add/edit form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, author, price, copiesInStock } = formData;

    if (!title || !author || !price || !copiesInStock) {
      alert("All fields are required");
      return;
    }

    try {
      if (currentBook) {
        // Update existing book
        await updateBook(currentBook.bookId, formData);
      } else {
        // Add new book
        await createBook(formData);
      }
      fetchBooks();
      setShowForm(false); // Hide form after submission
      setCurrentBook(null); // Reset current book
      setFormData({ title: "", author: "", price: "", copiesInStock: "" }); // Reset form data
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle book deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      copiesInStock: book.copiesInStock,
    });
    setCurrentBook(book);
    setShowForm(true);
  };

  return (
    <div className="relative">
      {/* Dark overlay when form is shown */}
      {showForm && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      {/* Add/Edit Book Form */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl mb-4">
              {currentBook ? "Edit Book" : "Add New Book"}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Copies in Stock</label>
                <input
                  type="number"
                  name="copiesInStock"
                  value={formData.copiesInStock}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {currentBook ? "Save Changes" : "Add Book"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table of Books */}
      <div className="mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add New Book
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Title</th>
            <th className="px-4 py-2 border-b">Author</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Copies in Stock</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td className="px-4 py-2 border-b">{book.title}</td>
              <td className="px-4 py-2 border-b">{book.author}</td>
              <td className="px-4 py-2 border-b">${book.price}</td>
              <td className="px-4 py-2 border-b">{book.copiesInStock}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleEdit(book)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.bookId)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
