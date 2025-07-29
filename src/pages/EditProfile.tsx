// src/pages/EditProfile.tsx - Secure version without storing Airtable record IDs
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { UserStorageManager } from '../helpers/userStorageManager';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { ArrowBack } from '@mui/icons-material';
import { ClientAirtableService } from '../services/ClientAirtableService';
import type { ClientData } from '../models/ClientData';

const EditProfile: React.FC = () => {
  const { t } = useI18n();
  const currentUser = UserStorageManager.getUser();
  
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get the ClientAirtableService instance
  const clientService = ClientAirtableService.getInstance();

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Prepare client data
      const clientData: ClientData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        sourceEnregistrement: "Service : Catégorisation Automatique Mail"
      };

      // Use the original email as the lookup key (in case user is changing their email)
      const originalEmail = currentUser?.email || email.trim();
      
      // Validate that the user can update this profile
      const canUpdate = await clientService.canUpdateClient(originalEmail, originalEmail);
      if (!canUpdate) {
        throw new Error("Unauthorized to update this profile");
      }

      // If email is changing, check if the new email already exists
      if (email.trim() !== originalEmail) {
        const emailExists = await clientService.clientExistsByEmail(email.trim());
        if (emailExists) {
          throw new Error("A client with this email already exists");
        }
      }

      console.log('Saving client data using email lookup...');
      
      // Use upsert with email-based lookup instead of record ID
      const result = await clientService.upsertClientByEmail(clientData, originalEmail);

      // Update local storage with only the client data (no Airtable record ID)
      const updatedUserData = {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email
        // Note: No airtableRecordId stored here for security
      };
      
      UserStorageManager.updateUser(updatedUserData);
      
      console.log('Client data saved successfully');
      
      // Navigate back to profile page
      navigate(AppRouteEnum.Profile);
      
    } catch (error: any) {
      console.error('Error saving client data:', error);
      
      // Handle specific error cases directly
      if (error.response?.status === 422) {
        setError('Please check your input data');
      } else if (error.response?.status === 401) {
        setError('You are not authorized to perform this action');
      } else if (error.response?.status === 409 || error.message?.toLowerCase().includes('already exists')) {
        setError('A client with this email already exists');
      } else if (error.message?.toLowerCase().includes('not found')) {
        setError('Client profile not found');
      } else if (error.message?.toLowerCase().includes('unauthorized')) {
        setError('You are not authorized to update this profile');
      } else if (error.response?.status === 429) {
        setError('Too many requests. Please try again later');
      } else if (error.response?.status >= 500) {
        setError('Server error occurred. Please try again later');
      } else {
        setError('An error occurred while saving your profile');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(AppRouteEnum.Profile);
  };

  const isFormValid = firstName.trim() && lastName.trim() && email.trim() && email.includes('@');

  return (
    <Box sx={{ minWidth: 550, margin: 'auto', p: 2 }}>
      {/* Header with back button */}
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

        {/* Error message display */}
        {error && (
          <Box 
            sx={{ 
              mb: 3, 
              p: 2, 
              bgcolor: 'error.light', 
              color: 'error.contrastText', 
              borderRadius: 1 
            }}
          >
            <Typography variant="body2">
              {error}
            </Typography>
          </Box>
        )}

        <Stack spacing={3} sx={{ mt: 3 }}>
          <TextField
            label={t(TranslationKeyEnum.FirstName)}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
            error={!firstName.trim()}
            helperText={!firstName.trim() ? `${t(TranslationKeyEnum.FirstName)} ${t(TranslationKeyEnum.FieldRequired)}` : ''}
            disabled={isSaving}
          />
          
          <TextField
            label={t(TranslationKeyEnum.LastName)}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
            error={!lastName.trim()}
            helperText={!lastName.trim() ? `${t(TranslationKeyEnum.LastName)} ${t(TranslationKeyEnum.FieldRequired)}` : ''}
            disabled={isSaving}
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
            disabled={isSaving}
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