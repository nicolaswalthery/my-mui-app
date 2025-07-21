import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { UserStorageManager } from '../helpers/userStorageManager';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';

const EditProfile: React.FC = () => {
  const [firstName, setFirstName] = useState(UserStorageManager.getUser()?.firstName || '');
  const [lastName, setLastName] = useState(UserStorageManager.getUser()?.lastName || '');
  const [email, setEmail] = useState(UserStorageManager.getUser()?.email || '');
  const navigate = useNavigate();

  const handleSave = () => {
    UserStorageManager.updateUser({ firstName, lastName, email });
    navigate(AppRouteEnum.Profile);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <Box textAlign="right">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default EditProfile;
