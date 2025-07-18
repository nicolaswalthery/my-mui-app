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
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'login' | 'verify'>('login');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData : UserSessionModel = {
        email: email,
        id : Date.now(),
        firstName: 'Fake', 
        lastName: 'User',
        role: UserRoleEnum.Admin,
    };

    //TODO : Check if auth OK 
    const isAuth = true; // Simulate authentication check
    if (isAuth) {
      setStep('verify');
    }
    else {
      setMessage('❌ Invalid email or password');
    }
  };

  const handleCodeVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    //Call to backend to verify code

    if (true) { // Simulate code verification
      const userData: UserSessionModel = {
        email,
        id: Date.now(),
        firstName: 'Fake',
        lastName: 'User',
        role: UserRoleEnum.Admin,
      };

      UserStorageManager.saveUser(userData);
      navigate(AppRouteEnum.Home);
    } else {
      setMessage('❌ Invalid or expired code');
    } 
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
          {step === 'login' ? 'Login' : 'Enter Verification Code'}
        </Typography>

        <form onSubmit={step === 'login' ? handleLogin : handleCodeVerify}>
          <Stack spacing={2}>
            {step === 'login' ? (
              <>
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
              </>
            ) : (
              <>
                <TextField
                  label="Secret Code"
                  type="text"
                  variant="outlined"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  fullWidth
                />
              </>
            )}
            <Button type="submit" variant="contained" fullWidth>
              {step === 'login' ? 'Sign In' : 'Verify Code'}
            </Button>
          </Stack>
        </form>

        {message && (
          <Typography mt={2} textAlign="center" color="text.secondary">
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
