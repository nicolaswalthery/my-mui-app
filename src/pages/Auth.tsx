import React, { useState } from 'react';
import { UserStorageManager } from '../utils/UserStorageManager';
import type { UserSessionModel } from '../models/UserSessionModel';
import { UserRoleEnum } from '../enums/UserRoleEnum';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { AppRouteEnum } from '../enums/AppRouteEnum';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData : UserSessionModel = {
        email: email,
        id : Date.now(),
        firstName: 'Fake', 
        lastName: 'User',
        role: UserRoleEnum.Admin,
    };

    //TODO : Check if auth OK 

    UserStorageManager.saveUser(userData);

    navigate(AppRouteEnum.Home);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      px={2}
    >
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth>
              Sign In
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
