import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = async (userId) => {
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

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again.");
        toast.error("Error fetching users. Please try again.");
      }
    };

    fetchUsers();
  }, [handleChange]);

  const [userId, setUserId] = useState("");


 

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">ID</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Username</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Email</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Created At</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Updated At</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">{user.id}</td>
                  <td className="py-2 px-4 text-gray-700">{user.username}</td>
                  <td className="py-2 px-4 text-gray-700">{user.email}</td>
                  <td className="py-2 px-4 text-gray-700">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {new Date(user.updatedAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    <div className="flex space-x-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                        onClick={() => handleChange(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-700">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
