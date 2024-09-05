// src/components/UserDelete.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDelete = () => {
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/delete:id`, {
        data: { id: userId } // Include the ID in the request body
      });
      toast.success("User deleted successfully");
      setUserId(""); // Clear input after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        value={userId}
        onChange={handleChange}
        placeholder="Enter User ID"
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        Delete User
      </button>
      <ToastContainer />
    </div>
  );
};

export default UserDelete;
