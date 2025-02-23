import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Borrowing.css";

const Borrowing = () => {
  const [newBorrowing, setNewBorrowing] = useState({
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    book: {
      id: 0,
      name: "",
      publicationYear: 0,
      stock: 0,
    },
  });

  const [updateBorrowing, setUpdateBorrowing] = useState({
    id: 0,
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    returnDate: "",
    book: { id: 0, name: "" },
  });

  const [borrowings, setBorrowings] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [update, setUpdate] = useState(false); // Used to trigger refresh on fetch data
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const borrowingsResponse = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/borrows"
        );
        const booksResponse = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/books"
        );

        setBorrowings(borrowingsResponse.data);
        setBooks(booksResponse.data);
        setUpdate(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [update]);

  // For adding borrowing
  const handleAddBorrowing = async () => {
    const borrowingPayload = {
      borrowerName: newBorrowing.borrowerName,
      borrowerMail: newBorrowing.borrowerMail,
      borrowingDate: newBorrowing.borrowingDate,
      bookForBorrowingRequest: {
        id: newBorrowing.book.id,
        name: newBorrowing.book.name,
        publicationYear: newBorrowing.book.publicationYear,
        stock: newBorrowing.book.stock,
      },
    };

    try {
      await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/borrows",
        borrowingPayload
      );
      setAlertMessage("Borrowing added successfully");
      setAlert(true);
      setUpdate(false);
      setNewBorrowing({
        borrowerName: "",
        borrowerMail: "",
        borrowingDate: "",
        book: { id: 0, name: "", publicationYear: 0, stock: 0 },
      });
    } catch (error) {
      setAlertMessage("Failed to add borrowing");
      setAlert(true);
    }
  };

  // For updating borrowing
  const handleUpdateBorrowing = async () => {
    const updatedBorrowingPayload = {
      borrowerName: updateBorrowing.borrowerName,
      borrowerMail: updateBorrowing.borrowerMail,
      borrowingDate: updateBorrowing.borrowingDate,
      returnDate: updateBorrowing.returnDate,
      bookForBorrowingRequest: {
        id: updateBorrowing.book.id,
        name: updateBorrowing.book.name,
        publicationYear: updateBorrowing.book.publicationYear,
        stock: updateBorrowing.book.stock,
      },
    };

    try {
      // Update borrowing data on the server
      await axios.put(
        import.meta.env.VITE_BASE_URL + `/api/v1/borrows/${updateBorrowing.id}`,
        updatedBorrowingPayload
      );

      // Optimistically update the state
      setBorrowings((prevBorrowings) =>
        prevBorrowings.map((borrowing) =>
          borrowing.id === updateBorrowing.id
            ? {
                ...borrowing,
                borrowerName: updateBorrowing.borrowerName,
                borrowerMail: updateBorrowing.borrowerMail,
                borrowingDate: updateBorrowing.borrowingDate,
                returnDate: updateBorrowing.returnDate,
                book: { ...updateBorrowing.book }, // Update the book info as well
              }
            : borrowing
        )
      );

      setAlertMessage("Borrowing updated successfully");
      setAlert(true);
      setUpdate(false);
      setUpdateBorrowing({
        id: 0,
        borrowerName: "",
        borrowerMail: "",
        borrowingDate: "",
        returnDate: "",
        book: { id: 0, name: "" },
      });
    } catch (error) {
      setAlertMessage("Failed to update borrowing");
      setAlert(true);
    }
  };

  // For deleting borrowing
  const handleDeleteBorrowing = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL + `/api/v1/borrows/${id}`
      );
      setAlertMessage("Borrowing deleted successfully");
      setAlert(true);
      setUpdate(false);
    } catch (error) {
      setAlertMessage("Failed to delete borrowing");
      setAlert(true);
    }
  };

  // This part renders the Borrowing List
  return (
    <div className="borrowing-container">
      {/* Add Borrowing Form */}
      <h2>Add Borrowing</h2>
      <div className="form-container">
        <input
          type="text"
          value={newBorrowing.borrowerName}
          onChange={(e) =>
            setNewBorrowing({ ...newBorrowing, borrowerName: e.target.value })
          }
          placeholder="Borrower's Name"
        />
        <input
          type="email"
          value={newBorrowing.borrowerMail}
          onChange={(e) =>
            setNewBorrowing({ ...newBorrowing, borrowerMail: e.target.value })
          }
          placeholder="Borrower's Email"
        />
        <input
          type="date"
          value={newBorrowing.borrowingDate}
          onChange={(e) =>
            setNewBorrowing({ ...newBorrowing, borrowingDate: e.target.value })
          }
          placeholder="Borrowing Date"
        />
        {/* Removed the return date input from Add Borrowing */}
        <select
          value={newBorrowing.book.id}
          onChange={(e) =>
            setNewBorrowing({
              ...newBorrowing,
              book: books.find((book) => book.id === parseInt(e.target.value)),
            })
          }
        >
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
        <button className="add-button" onClick={handleAddBorrowing}>
          Add Borrowing
        </button>
      </div>

      {/* Update Borrowing Form */}
      <h2>Update Borrowing</h2>
      <div className="form-container">
        <input
          type="text"
          value={updateBorrowing.borrowerName}
          onChange={(e) =>
            setUpdateBorrowing({
              ...updateBorrowing,
              borrowerName: e.target.value,
            })
          }
          placeholder="Borrower's Name"
        />
        <input
          type="email"
          value={updateBorrowing.borrowerMail || ""}
          onChange={(e) =>
            setUpdateBorrowing({
              ...updateBorrowing,
              borrowerMail: e.target.value,
            })
          }
          placeholder="Borrower's Email"
        />
        <input
          type="date"
          value={updateBorrowing.borrowingDate}
          onChange={(e) =>
            setUpdateBorrowing({
              ...updateBorrowing,
              borrowingDate: e.target.value,
            })
          }
          placeholder="Borrowing Date"
        />
        <input
          type="date"
          value={updateBorrowing.returnDate}
          onChange={(e) =>
            setUpdateBorrowing({
              ...updateBorrowing,
              returnDate: e.target.value,
            })
          }
          placeholder="Return Date"
        />
        <select
          value={updateBorrowing.book.id}
          onChange={(e) =>
            setUpdateBorrowing({
              ...updateBorrowing,
              book: books.find((book) => book.id === parseInt(e.target.value)),
            })
          }
        >
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
        <button className="update-button" onClick={handleUpdateBorrowing}>
          Update Borrowing
        </button>
      </div>

      {/* Borrowings List */}
      <h2>Borrowings List</h2>
      <table className="borrowings-table">
        <thead>
          <tr>
            <th>Borrower Name</th>
            <th>Email</th>
            <th>Borrowing Date</th>
            <th>Return Date</th>
            <th>Book</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowings.map((borrowing) => (
            <tr key={borrowing.id}>
              <td>{borrowing.borrowerName}</td>
              <td>{borrowing.borrowerMail}</td>
              <td>{borrowing.borrowingDate}</td>
              <td>{borrowing.returnDate}</td>
              <td>{borrowing.book ? borrowing.book.name : "N/A"}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteBorrowing(borrowing.id)}
                >
                  Delete
                </button>
                <button
                  className="update-button"
                  onClick={() => setUpdateBorrowing(borrowing)}
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

export default Borrowing;
