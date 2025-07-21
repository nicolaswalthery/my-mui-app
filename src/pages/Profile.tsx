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
import { UserStorageManager } from '../helpers/userStorageManager';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';

const Profile: React.FC = () => {
  const user = {
    name: `${UserStorageManager.getUser()?.firstName} ${UserStorageManager.getUser()?.lastName}`,
    email: UserStorageManager.getUser()?.email,
    role: UserStorageManager.getUser()?.role,
    avatarUrl: '', // fallback to initials if empty
  };
  const navigate = useNavigate();

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

        <Button variant="contained" color="primary" onClick={() => navigate(AppRouteEnum.EditProfile)}>
          Edit Profile
        </Button>
      </Stack>
    </Paper>
  );
};

export default Profile;
