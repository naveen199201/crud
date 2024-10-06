// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Homepage from './Homepage';
import './App.css';
import NewUser from './NewUser';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import ViewDetails from './ViewDetails'; // Import ViewDetails component

// Define the type for a User
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [editingUser, setEditingUser] = useState<User | null>(null); // State for editing user
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State for selected user in ViewDetails modal

  // Fetch users data from API when the app loads
  useEffect(() => {
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Add user function
  const addUser = (newUser: User) => {
    setUsers([...users, newUser]);
    setIsModalOpen(false); // Close modal after adding the user
  };

  // Edit user function
  const editUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setIsModalOpen(false); // Close modal after updating the user
  };

  // Delete user function
  const deleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  // Open and close modal handlers
  const handleOpenModal = () => {
    setEditingUser(null); // Reset editing user for new user
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user); // Set the user to be edited
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Open and close ViewDetails modal
  const handleViewDetails = (user: User) => {
    setSelectedUser(user); // Set the selected user
  };

  const handleCloseDetails = () => {
    setSelectedUser(null); // Clear selected user
  };

  return (
    <div className='app'>
    <Router >
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              users={users}
              deleteUser={deleteUser} // Pass deleteUser prop
              openAddUserModal={handleOpenModal} // Pass modal handler
              openEditUserModal={handleEditUser} // Pass edit modal handler
              openViewDetailsModal={handleViewDetails} // Pass view details handler
            />
          }
        />
      </Routes>

      {/* Modal for adding or editing a user */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <NewUser addUser={addUser} editUser={editingUser} onEdit={editUser} />
        </DialogContent>
      </Dialog>

      {/* Modal for viewing user details */}
      {selectedUser && (
        <ViewDetails user={selectedUser} onClose={handleCloseDetails} />
      )}
    </Router>
    </div>
  );
};

export default App;
