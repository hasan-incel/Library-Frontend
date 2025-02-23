import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Category.css"; // Importing CSS file for styling

const initialCategory = {
  name: "",
  description: "",
};

const Category = () => {
  const [newCategory, setNewCategory] = useState(initialCategory);
  const [updateCategory, setUpdateCategory] = useState(initialCategory);
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch Categories once on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "/api/v1/categories"
        );
        console.log("Fetched categories:", response.data); // Debugging log
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []); // Empty array means this runs once after component mounts

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.description) {
      setAlertMessage("Please fill out both fields.");
      setAlert(true);
      return;
    }
    try {
      await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/categories",
        newCategory
      );
      setAlertMessage("Category added successfully");
      setAlert(true);
      setNewCategory(initialCategory);
      // Fetch updated categories
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "/api/v1/categories"
      );
      console.log("Updated categories after add:", response.data); // Debugging log
      setCategories(response.data);
    } catch (error) {
      setAlertMessage("Failed to add category");
      setAlert(true);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL + `/api/v1/categories/${id}`
      );
      setAlertMessage("Category deleted successfully");
      setAlert(true);
      // Fetch updated categories
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "/api/v1/categories"
      );
      console.log("Updated categories after delete:", response.data); // Debugging log
      setCategories(response.data);
    } catch (error) {
      setAlertMessage("Failed to delete category");
      setAlert(true);
    }
  };

  const handleUpdateCategory = async () => {
    if (!updateCategory.name || !updateCategory.description) {
      setAlertMessage("Please fill out both fields.");
      setAlert(true);
      return;
    }
    try {
      await axios.put(
        import.meta.env.VITE_BASE_URL +
          `/api/v1/categories/${updateCategory.id}`,
        updateCategory
      );
      setAlertMessage("Category updated successfully");
      setAlert(true);
      setUpdateCategory(initialCategory);
      // Fetch updated categories
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "/api/v1/categories"
      );
      console.log("Updated categories after update:", response.data); // Debugging log
      setCategories(response.data);
    } catch (error) {
      setAlertMessage("Failed to update category");
      setAlert(true);
    }
  };

  return (
    <div className="category-container">
      <h2>Add Category</h2>
      <div className="form-container">
        <input
          type="text"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          placeholder="Category Name"
        />
        <input
          type="text"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({
              ...newCategory,
              description: e.target.value,
            })
          }
          placeholder="Description"
        />
        <button className="add-button" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      <h2>Update Category</h2>
      <div className="form-container">
        <input
          type="text"
          value={updateCategory.name}
          onChange={(e) =>
            setUpdateCategory({ ...updateCategory, name: e.target.value })
          }
          placeholder="Category Name"
        />
        <input
          type="text"
          value={updateCategory.description}
          onChange={(e) =>
            setUpdateCategory({
              ...updateCategory,
              description: e.target.value,
            })
          }
          placeholder="Description"
        />
        <button className="update-button" onClick={handleUpdateCategory}>
          Update Category
        </button>
      </div>

      <h2>Categories List</h2>
      <table className="categories-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="3">No categories available</td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update-button"
                    onClick={() => setUpdateCategory(category)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
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

export default Category;
