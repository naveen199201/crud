import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, DialogActions, Button, Box, Grid } from '@mui/material';
import { User } from './App'; // Adjust the import path as necessary

interface ViewDetailsProps {
  user: User | null; // Accept user or null
  onClose: () => void; // Function to close the modal
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ user, onClose }) => {
  if (!user) return null; // Return null if no user is provided

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle textAlign={'center'}>User Details</DialogTitle>
      <DialogContent dividers>
        <Box padding={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" color="textPrimary" gutterBottom textAlign={'center'}>
              <strong>Name:</strong>{user.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Username:</strong> {user.username}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Phone:</strong> {user.phone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Website:</strong> {user.website}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>Company:</strong> {user.company.name}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDetails;
