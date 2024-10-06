import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { User } from './App';  // Import User interface from App.tsx

interface NewUserProps {
  addUser: (user: User) => void;
  editUser: User | null;
  onEdit: (user: User) => void;
}

const NewUser: React.FC<NewUserProps> = ({ addUser, editUser, onEdit }) => {
  const [user, setUser] = useState<User>({
    id: editUser ? editUser.id : Date.now(),
    name: editUser ? editUser.name : '',
    username: editUser ? editUser.username : '',
    email: editUser ? editUser.email : '',
    phone: editUser ? editUser.phone : '',
    address: {
      street: editUser ? editUser.address.street : '',
      city: editUser ? editUser.address.city : '',
      zipcode: editUser ? editUser.address.zipcode : '',
    },
    company: {
      name: editUser ? editUser.company.name : '',
    },
    website: editUser ? editUser.website : '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    companyName: '',
    website: '',
  });

  // Auto-fill username in the format "USER-name" when creating a new user
  useEffect(() => {
    if (!editUser) {
      const generatedUsername = `USER-${user.name.replace(/\s/g, '').toLowerCase()}`;
      setUser((prevUser) => ({ ...prevUser, username: generatedUsername }));
    }
  }, [user.name, editUser]);

  // Validation logic
  const validate = () => {
    let isValid = true;
    let tempErrors = {
      name: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      companyName: '',
      website: '',
    };

    if (user.name.length < 3) {
      tempErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      tempErrors.email = 'Email is not valid';
      isValid = false;
    }
    if (!/^\d{10}$/.test(user.phone)) {
      tempErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }
    if (user.address.street.length < 1) {
      tempErrors.street = 'Street is required';
      isValid = false;
    }
    if (user.address.city.length < 1) {
      tempErrors.city = 'City is required';
      isValid = false;
    }
    if (user.company.name && user.company.name.length < 3) {
      tempErrors.companyName = 'Company name must be at least 3 characters';
      isValid = false;
    }
    if (user.website && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(user.website)) {
      tempErrors.website = 'Website URL is not valid';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (editUser) {
        onEdit(user);
      } else {
        addUser(user);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // If name is changed, update the username
    if (name === 'name') {
      const generatedUsername = `USER-${value.replace(/\s/g, '').toLowerCase()}`;
      setUser((prevUser) => ({ ...prevUser, username: generatedUsername }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
            autoComplete="name" // Suggests the browser to use autofill
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
            autoComplete="email" // Suggests the browser to use autofill
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            required
            autoComplete="tel" // Suggests the browser to use autofill
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            value={user.username}
            InputProps={{ readOnly: true }} // Non-editable
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Street"
            name="street"
            value={user.address.street}
            onChange={(e) =>
              setUser({ ...user, address: { ...user.address, street: e.target.value } })
            }
            error={!!errors.street}
            helperText={errors.street}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="City"
            name="city"
            value={user.address.city}
            onChange={(e) =>
              setUser({ ...user, address: { ...user.address, city: e.target.value } })
            }
            error={!!errors.city}
            helperText={errors.city}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Company Name"
            name="companyName"
            value={user.company.name}
            onChange={(e) =>
              setUser({ ...user, company: { ...user.company, name: e.target.value } })
            }
            error={!!errors.companyName}
            helperText={errors.companyName}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Website"
            name="website"
            value={user.website}
            onChange={handleChange}
            error={!!errors.website}
            helperText={errors.website}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {editUser ? 'Update User' : 'Add User'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewUser;
