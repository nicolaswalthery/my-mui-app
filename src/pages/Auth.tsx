// src/pages/Auth.tsx - Updated with i18n support (language switcher removed)
import React, { useState } from 'react';
import { UserStorageManager } from '../helpers/userStorageManager';
import type { UserSessionModel } from '../models/UserSessionModel';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';
import { LoginStepEnum } from '../enums/LoginStepEnum';
import { useI18n } from '../contexts/i18nContext';
import { ClientAirtableService } from '../services/ClientAirtableService';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { configManager } from '../config/configManager';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

const Auth: React.FC = () => {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<LoginStepEnum>(LoginStepEnum.Login);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  //Airtable Services
  const clientServices = ClientAirtableService.getInstance();

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
      setStep(LoginStepEnum.Verify);
      setMessage('');
  };

  const handleCodeVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call to backend to verify code
    const isCodeValid = code == "1234"; // Simulate code verification

    if (isCodeValid) {
      var clientData = await clientServices.findClientByEmail(email);
      if(clientData == null){ 
          const newClientData = {
          email: email,
          firstName: '',
          lastName: '',  
          sourceEnregistrement: configManager.getAppConfig().source
        };
        clientData = await clientServices.createClient(newClientData);
      }

      const userData: UserSessionModel = {
        email: clientData!.email,
        firstName: clientData?.firstName || "",
        lastName: clientData?.lastName || ""
      };

      UserStorageManager.saveUser(userData);
      navigate(AppRouteEnum.Home);
    } else {
      setMessage(t(TranslationKeyEnum.InvalidCode));
    } 
  };

  const getPageTitle = () => {
    return step === LoginStepEnum.Login 
      ? t(TranslationKeyEnum.Login) 
      : t(TranslationKeyEnum.EnterCode);
  };

  const getSubmitButtonText = () => {
    return step === LoginStepEnum.Login 
      ? t(TranslationKeyEnum.SignIn) 
      : t(TranslationKeyEnum.VerifyCode);
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
          {getPageTitle()}
        </Typography>

        <form onSubmit={step === LoginStepEnum.Login ? handleEmailLogin : handleCodeVerify}>
          <Stack spacing={2}>
            {step === LoginStepEnum.Login ? (
              <>
                <TextField
                  label={t(TranslationKeyEnum.Email)}
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
              </>
            ) : (
              <>
                <TextField
                  label={t(TranslationKeyEnum.VerificationCode)}
                  type="text"
                  variant="outlined"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  fullWidth
                  helperText={step === LoginStepEnum.Verify ? `${t(TranslationKeyEnum.EnterCode)}` : undefined}
                />
              </>
            )}
            <Button type="submit" variant="contained" fullWidth>
              {getSubmitButtonText()}
            </Button>
          </Stack>
        </form>

        {/* Back button for verification step */}
        {step === LoginStepEnum.Verify && (
          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => {
              setStep(LoginStepEnum.Login);
              setMessage('');
              setCode('');
            }}
          >
            {t(TranslationKeyEnum.Cancel)}
          </Button>
        )}

        {message && (
          <Typography 
            mt={2} 
            textAlign="center" 
            color={message.includes('❌') ? 'error.main' : 'text.secondary'}
            sx={{ 
              p: 1, 
              borderRadius: 1, 
              bgcolor: message.includes('❌') ? 'error.light' : 'transparent',
              color: message.includes('❌') ? 'error.contrastText' : 'text.secondary'
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Auth;