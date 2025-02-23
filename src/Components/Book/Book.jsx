import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Book.css";

const Book = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    publicationYear: "",
    stock: "",
    author: { id: 0, name: "" },
    publisher: { id: 0, name: "", establishmentYear: 0, address: "" },
    category: { id: null, name: "", description: "" }, // Ensure category starts with null id
  });
  const [updateBook, setUpdateBook] = useState({
    id: 0,
    name: "",
    publicationYear: "",
    stock: "",
    author: { id: 0, name: "" },
    publisher: { id: 0, name: "", establishmentYear: 0, address: "" },
    category: { id: null, name: "", description: "" }, // Ensure category starts with null id
  });
  const [books, setBooks] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [update, setUpdate] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/books"
        );
        const authorsResponse = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/authors"
        );
        const publishersResponse = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/publishers"
        );
        const categoriesResponse = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/categories"
        );

        setBooks(booksResponse.data);
        setAuthors(authorsResponse.data);
        setPublishers(publishersResponse.data);
        setCategories(categoriesResponse.data);
        setUpdate(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [update]);

  // Handle adding a new book
  const handleAddBook = async () => {
    // Check that the category has been selected correctly and contains valid data
    if (newBook.category.id === null || newBook.category.id === 0) {
      setAlertMessage("Please select a valid category.");
      setAlert(true);
      return;
    }

    // Convert the category object to an array
    const bookData = {
      ...newBook,
      categories: [newBook.category], // Send category as an array
    };

    console.log("Book data being sent:", bookData); // Check the newBook state in the console before sending

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/books",
        bookData
      );
      setAlertMessage("Book added successfully");
      setAlert(true);
      setUpdate(false);
      setNewBook({
        name: "",
        publicationYear: "",
        stock: "",
        author: { id: 0, name: "" },
        publisher: { id: 0, name: "", establishmentYear: 0, address: "" },
        category: { id: null, name: "", description: "" }, // Reset category to empty/null id
      });
    } catch (error) {
      console.error("Error adding book:", error);
      setAlertMessage("Failed to add book");
      setAlert(true);
    }
  };

  // Handle updating a book
  const handleUpdateBook = async () => {
    if (updateBook.category.id === null || updateBook.category.id === 0) {
      setAlertMessage("Please select a valid category.");
      setAlert(true);
      return;
    }

    // Convert the category object to an array
    const bookData = {
      ...updateBook,
      categories: [updateBook.category], // Send category as an array
    };

    try {
      await axios.put(
        import.meta.env.VITE_BASE_URL + `/api/v1/books/${updateBook.id}`,
        bookData
      );
      setAlertMessage("Book updated successfully");
      setAlert(true);
      setUpdate(false);
      setUpdateBook({
        id: 0,
        name: "",
        publicationYear: "",
        stock: "",
        author: { id: 0, name: "" },
        publisher: { id: 0, name: "", establishmentYear: 0, address: "" },
        category: { id: null, name: "", description: "" }, // Reset category to empty/null id
      });
    } catch (error) {
      console.error("Error updating book:", error);
      setAlertMessage("Failed to update book");
      setAlert(true);
    }
  };

  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + `/api/v1/books/${id}`);
      setAlertMessage("Book deleted successfully");
      setAlert(true);
      setUpdate(false);
    } catch (error) {
      console.error("Error deleting book:", error);
      setAlertMessage("Failed to delete book");
      setAlert(true);
    }
  };

  return (
    <div className="book-container">
      <h2>Add Book</h2>
      <div className="form-container">
        <input
          type="text"
          value={newBook.name}
          onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
          placeholder="Book Name"
        />
        <input
          type="number"
          value={newBook.publicationYear}
          onChange={(e) =>
            setNewBook({ ...newBook, publicationYear: e.target.value })
          }
          placeholder="Publication Year"
        />
        <input
          type="number"
          value={newBook.stock}
          onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
          placeholder="Stock"
        />
        <select
          value={newBook.author.id}
          onChange={(e) =>
            setNewBook({
              ...newBook,
              author: authors.find((author) => author.id == e.target.value),
            })
          }
        >
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <select
          value={newBook.publisher.id}
          onChange={(e) =>
            setNewBook({
              ...newBook,
              publisher: publishers.find(
                (publisher) => publisher.id == e.target.value
              ),
            })
          }
        >
          <option value="">Select Publisher</option>
          {publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.id}>
              {publisher.name}
            </option>
          ))}
        </select>
        <select
          value={newBook.category?.id || ""}
          onChange={(e) =>
            setNewBook({
              ...newBook,
              category: categories.find(
                (category) => category.id == e.target.value
              ) || { id: null, name: "", description: "" }, // Ensure the category is selected correctly
            })
          }
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="add-button" onClick={handleAddBook}>
          Add Book
        </button>
      </div>

      <h2>Update Book</h2>
      <div className="form-container">
        <input
          type="text"
          value={updateBook.name}
          onChange={(e) =>
            setUpdateBook({ ...updateBook, name: e.target.value })
          }
          placeholder="Book Name"
        />
        <input
          type="number"
          value={updateBook.publicationYear}
          onChange={(e) =>
            setUpdateBook({ ...updateBook, publicationYear: e.target.value })
          }
          placeholder="Publication Year"
        />
        <input
          type="number"
          value={updateBook.stock}
          onChange={(e) =>
            setUpdateBook({ ...updateBook, stock: e.target.value })
          }
          placeholder="Stock"
        />
        <select
          value={updateBook.author.id}
          onChange={(e) =>
            setUpdateBook({
              ...updateBook,
              author: authors.find((author) => author.id == e.target.value),
            })
          }
        >
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <select
          value={updateBook.publisher.id}
          onChange={(e) =>
            setUpdateBook({
              ...updateBook,
              publisher: publishers.find(
                (publisher) => publisher.id == e.target.value
              ),
            })
          }
        >
          <option value="">Select Publisher</option>
          {publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.id}>
              {publisher.name}
            </option>
          ))}
        </select>
        <select
          value={updateBook.category?.id || ""}
          onChange={(e) =>
            setUpdateBook({
              ...updateBook,
              category: categories.find(
                (category) => category.id == e.target.value
              ) || { id: null, name: "", description: "" },
            })
          }
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="update-button" onClick={handleUpdateBook}>
          Update Book
        </button>
      </div>

      <h2>Books List</h2>
      <table className="books-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Publication Year</th>
            <th>Stock</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.publicationYear}</td>
              <td>{book.stock}</td>
              <td>{book.author ? book.author.name : ""}</td>
              <td>{book.publisher ? book.publisher.name : ""}</td>
              <td>
                {book.categories && book.categories.length > 0
                  ? book.categories[0].name
                  : "No Category"}
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>
                <button
                  className="update-button"
                  onClick={() => setUpdateBook(book)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {alert && (
        <div className="alert-box">
          <div className="alert-message">{alertMessage}</div>
        </div>
      )}
    </div>
  );
};

export default Book;
