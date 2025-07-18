import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Button,
} from '@mui/material';

const Profile: React.FC = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    avatarUrl: '', // fallback to initials if empty
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Stack spacing={3} alignItems="center">
        <Avatar
          sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
          src={user.avatarUrl}
        >
          {user.name.charAt(0)}
        </Avatar>

        <Box textAlign="center">
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {user.role}
          </Typography>
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Button variant="contained" color="primary">
          Edit Profile
        </Button>
      </Stack>
    </Paper>
  );
};

export default Profile;
