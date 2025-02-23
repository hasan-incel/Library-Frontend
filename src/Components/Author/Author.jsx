import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Author.css"; // Importing the Author CSS file

const initialAuthor = {
  name: "",
  birthDate: "",
  country: "",
};

const Author = () => {
  const [newAuthor, setNewAuthor] = useState(initialAuthor);
  const [updateAuthor, setUpdateAuthor] = useState(initialAuthor);
  const [authors, setAuthors] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [update, setUpdate] = useState(false);

  // Fetch Authors
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/authors"
        );
        setAuthors(response.data);
        setUpdate(true);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors();
  }, [update]);

  const handleAddAuthor = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/authors",
        newAuthor
      );
      setAlertMessage("Author added successfully");
      setAlert(true);
      setUpdate(false);
      setNewAuthor(initialAuthor);
    } catch (error) {
      setAlertMessage("Failed to add author");
      setAlert(true);
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL + `/api/v1/authors/${id}`
      );
      setAlertMessage("Author deleted successfully");
      setAlert(true);
      setUpdate(false);
    } catch (error) {
      setAlertMessage("Failed to delete author");
      setAlert(true);
    }
  };

  const handleUpdateAuthor = async () => {
    try {
      await axios.put(
        import.meta.env.VITE_BASE_URL + `/api/v1/authors/${updateAuthor.id}`,
        updateAuthor
      );
      setAlertMessage("Author updated successfully");
      setAlert(true);
      setUpdate(false);
      setUpdateAuthor(initialAuthor);
    } catch (error) {
      setAlertMessage("Failed to update author");
      setAlert(true);
    }
  };

  return (
    <div className="author-container">
      <h2>Add Author</h2>
      <div className="form-container">
        <input
          type="text"
          value={newAuthor.name}
          onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
          placeholder="Author Name"
        />
        <input
          type="date"
          value={newAuthor.birthDate}
          onChange={(e) =>
            setNewAuthor({
              ...newAuthor,
              birthDate: e.target.value,
            })
          }
          placeholder="Birth Date"
        />
        <input
          type="text"
          value={newAuthor.country}
          onChange={(e) =>
            setNewAuthor({ ...newAuthor, country: e.target.value })
          }
          placeholder="Country"
        />
        <button className="add-button" onClick={handleAddAuthor}>
          Add Author
        </button>
      </div>

      <h2>Update Author</h2>
      <div className="form-container">
        <input
          type="text"
          value={updateAuthor.name}
          onChange={(e) =>
            setUpdateAuthor({ ...updateAuthor, name: e.target.value })
          }
          placeholder="Author Name"
        />
        <input
          type="date"
          value={updateAuthor.birthDate}
          onChange={(e) =>
            setUpdateAuthor({
              ...updateAuthor,
              birthDate: e.target.value,
            })
          }
          placeholder="Birth Date"
        />
        <input
          type="text"
          value={updateAuthor.country}
          onChange={(e) =>
            setUpdateAuthor({ ...updateAuthor, country: e.target.value })
          }
          placeholder="Country"
        />
        <button className="update-button" onClick={handleUpdateAuthor}>
          Update Author
        </button>
      </div>

      <h2>Authors List</h2>
      <table className="authors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.birthDate}</td>
              <td>{author.country}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteAuthor(author.id)}
                >
                  Delete
                </button>
                <button
                  className="update-button"
                  onClick={() => setUpdateAuthor(author)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {alert && (
        <div className="alert-message">
          <span>{alertMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Author;
