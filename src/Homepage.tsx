import React,{useState} from 'react';
import { User } from './App';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper,Typography} from '@mui/material';
import SearchBar from './SearchBar'; // Import the SearchBar component

interface HomepageProps {
  users: User[];
  deleteUser: (userId: number) => void; // Pass user ID to delete
  openAddUserModal: () => void;
  openEditUserModal: (user: User) => void; // Ensure this is defined
  openViewDetailsModal: (user: User) => void; 
}

const Homepage: React.FC<HomepageProps> = ({ users, deleteUser, openAddUserModal, openEditUserModal,  openViewDetailsModal }) => {

  const [filteredUsers, setFilteredUsers] = useState(users); // Track filtered users

  // Handle search functionality
  const handleSearch = (query: string) => {
    if (!query  ) {
      setFilteredUsers(users); // If search query is empty, show all users
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const matchedUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.username.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredUsers(matchedUsers); // Update filtered users based on search
    }
  };

  return (
    <div className='homepage' >
      <Typography variant='h3' textAlign={'center'}>Users List</Typography>
      <div className='homepage-header'>
      <SearchBar onSearch={handleSearch} />
      <Button variant="contained" onClick={openAddUserModal} className='adduser'>
        Add User
      </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className='table-header'>
              <TableCell className='table-heading'>Name</TableCell>
              <TableCell className='table-heading'>Username</TableCell>
              <TableCell className='table-heading'>Email</TableCell>
              <TableCell className='table-heading' id='table-action'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <TableRow key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                <Button variant="outlined" onClick={() => openViewDetailsModal(user)}>
              View
            </Button>
                  <Button
                    variant="outlined"
                    onClick={() => openEditUserModal(user)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => deleteUser(user.id)}>
                    Delete
                  </Button>
                  
                </TableCell>
              </TableRow>
            ))):(
              users.map((user, index) => (
                <TableRow key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                  <Button variant="outlined" onClick={() => openViewDetailsModal(user)}>
                View 
              </Button>
                    <Button
                      variant="outlined"
                      onClick={() => openEditUserModal(user)}
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => deleteUser(user.id)}>
                      Delete
                    </Button>
                   
                  </TableCell>
                </TableRow>
            
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Homepage;
