import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('authToken')
    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users.");
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchUsers();
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {users.map((user) => (
                    <div key={user._id} className="bg-olive rounded-lg shadow-lg p-4">
                        <h3 className="text-xl font-semibold text-brown">{user.username}</h3>
                        <p className="text-white">{user.email}</p>
                        <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-500 p-1 rounded-sm border-2 border-white hover:text-white hover:bg-red-500 hover:scale-110 transition mt-4"
                        >
                            Delete User
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;
