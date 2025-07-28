// src/pages/EditProfile.tsx - Updated with i18n support
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { UserStorageManager } from '../helpers/userStorageManager';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { ArrowBack } from '@mui/icons-material';

const EditProfile: React.FC = () => {
  const { t } = useI18n();
  const [firstName, setFirstName] = useState(UserStorageManager.getUser()?.firstName || '');
  const [lastName, setLastName] = useState(UserStorageManager.getUser()?.lastName || '');
  const [email, setEmail] = useState(UserStorageManager.getUser()?.email || '');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    UserStorageManager.updateUser({ firstName, lastName, email });
    setIsSaving(false);
    navigate(AppRouteEnum.Profile);
  };

  const handleCancel = () => {
    navigate(AppRouteEnum.Profile);
  };

  const isFormValid = firstName.trim() && lastName.trim() && email.trim();

  return (
    <Box sx={{ minWidth: 550, margin: 'auto', p: 2 }}>
      {/* Header with language switcher */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleCancel}
          variant="text"
          sx={{ alignSelf: 'flex-start' }}
        >
          {t(TranslationKeyEnum.Profile)}
        </Button>
      </Box>

      <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
                border: 1,
                borderColor: 'divider'
              }}
            >
        <Typography variant="h5" gutterBottom>
          {t(TranslationKeyEnum.EditProfile)}
        </Typography>

        <Stack spacing={3} sx={{ mt: 3 }}>
          <TextField
            label={t(TranslationKeyEnum.FirstName)}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
            error={!firstName.trim()}
            helperText={!firstName.trim() ? `${t(TranslationKeyEnum.FirstName)} ${t(TranslationKeyEnum.FieldRequired)}` : ''}
          />
          
          <TextField
            label={t(TranslationKeyEnum.LastName)}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
            error={!lastName.trim()}
            helperText={!lastName.trim() ? `${t(TranslationKeyEnum.LastName)} ${t(TranslationKeyEnum.FieldRequired)}` : ''}
          />
          
          <TextField
            label={t(TranslationKeyEnum.Email)}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            error={!email.trim() || !email.includes('@')}
            helperText={
              !email.trim() 
                ? `${t(TranslationKeyEnum.Email)} ${t(TranslationKeyEnum.FieldRequired)}`
                : !email.includes('@')
                ? t(TranslationKeyEnum.ValidEmailRequired)
                : ''
            }
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              variant="outlined" 
              onClick={handleCancel}
              disabled={isSaving}
            >
              {t(TranslationKeyEnum.Cancel)}
            </Button>
            
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSave}
              disabled={!isFormValid || isSaving}
            >
              {isSaving ? t(TranslationKeyEnum.Loading) : t(TranslationKeyEnum.Save)}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditProfile;