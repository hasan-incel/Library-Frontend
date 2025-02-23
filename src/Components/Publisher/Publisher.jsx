import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Publisher.css"; // Importing CSS file for styling

const initialPublisher = {
  name: "",
  establishmentYear: "",
  address: "",
};

const Publisher = () => {
  const [newPublisher, setNewPublisher] = useState(initialPublisher);
  const [updatePublisher, setUpdatePublisher] = useState(initialPublisher);
  const [publishers, setPublishers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [update, setUpdate] = useState(false);

  // Fetch Publishers
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/publishers"
        );
        setPublishers(response.data);
        setUpdate(true);
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    };
    fetchPublishers();
  }, [update]);

  const handleAddPublisher = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/publishers",
        newPublisher
      );
      setAlertMessage("Publisher added successfully");
      setAlert(true);
      setUpdate(false);
      setNewPublisher(initialPublisher);
    } catch (error) {
      setAlertMessage("Failed to add publisher");
      setAlert(true);
    }
  };

  const handleDeletePublisher = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL + `/api/v1/publishers/${id}`
      );
      setAlertMessage("Publisher deleted successfully");
      setAlert(true);
      setUpdate(false);
    } catch (error) {
      setAlertMessage("Failed to delete publisher");
      setAlert(true);
    }
  };

  const handleUpdatePublisher = async () => {
    try {
      await axios.put(
        import.meta.env.VITE_BASE_URL +
          `/api/v1/publishers/${updatePublisher.id}`,
        updatePublisher
      );
      setAlertMessage("Publisher updated successfully");
      setAlert(true);
      setUpdate(false);
      setUpdatePublisher(initialPublisher);
    } catch (error) {
      setAlertMessage("Failed to update publisher");
      setAlert(true);
    }
  };

  return (
    <div className="publisher-container">
      <h2>Add Publisher</h2>
      <div className="form-container">
        <input
          type="text"
          value={newPublisher.name}
          onChange={(e) =>
            setNewPublisher({ ...newPublisher, name: e.target.value })
          }
          placeholder="Publisher Name"
        />
        <input
          type="number"
          value={newPublisher.establishmentYear}
          onChange={(e) =>
            setNewPublisher({
              ...newPublisher,
              establishmentYear: e.target.value,
            })
          }
          placeholder="Establishment Year"
        />
        <input
          type="text"
          value={newPublisher.address}
          onChange={(e) =>
            setNewPublisher({ ...newPublisher, address: e.target.value })
          }
          placeholder="Address"
        />
        <button className="add-button" onClick={handleAddPublisher}>
          Add Publisher
        </button>
      </div>

      <h2>Update Publisher</h2>
      <div className="form-container">
        <input
          type="text"
          value={updatePublisher.name}
          onChange={(e) =>
            setUpdatePublisher({ ...updatePublisher, name: e.target.value })
          }
          placeholder="Publisher Name"
        />
        <input
          type="number"
          value={updatePublisher.establishmentYear}
          onChange={(e) =>
            setUpdatePublisher({
              ...updatePublisher,
              establishmentYear: e.target.value,
            })
          }
          placeholder="Establishment Year"
        />
        <input
          type="text"
          value={updatePublisher.address}
          onChange={(e) =>
            setUpdatePublisher({ ...updatePublisher, address: e.target.value })
          }
          placeholder="Address"
        />
        <button className="update-button" onClick={handleUpdatePublisher}>
          Update Publisher
        </button>
      </div>

      <h2>Publishers List</h2>
      <table className="publishers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Establishment Year</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((publisher) => (
            <tr key={publisher.id}>
              <td>{publisher.name}</td>
              <td>{publisher.establishmentYear}</td>
              <td>{publisher.address}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeletePublisher(publisher.id)}
                >
                  Delete
                </button>
                <button
                  className="update-button"
                  onClick={() => setUpdatePublisher(publisher)}
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

export default Publisher;
