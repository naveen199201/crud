import React, { useState} from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { User } from './App'; // Import the User interface from App.tsx

interface EditUserProps {
  editUser: User;
  onEdit: (updatedUser: User) => void;
}

const EditUser: React.FC<EditUserProps> = ({ editUser, onEdit }) => {
  const [user, setUser] = useState<User>({
    id: editUser.id,
    name: editUser.name,
    username: editUser.username, // Preserve the username
    email: editUser.email,
    phone: editUser.phone,
    address: {
      street: editUser.address.street,
      city: editUser.address.city,
      zipcode: editUser.address.zipcode,
    },
    company: {
      name: editUser.company.name,
    },
    website: editUser.website,
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
      onEdit(user); // Call the onEdit function with the updated user
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
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
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            value={user.username}
            InputProps={{ readOnly: true }} // Username is non-editable
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
            Update User
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditUser;
