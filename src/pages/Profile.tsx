// src/pages/Profile.tsx - Updated with i18n support
import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Button,
  Chip,
} from '@mui/material';
import { Edit, Person, Email, Badge } from '@mui/icons-material';
import { UserStorageManager } from '../helpers/userStorageManager';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';

const Profile: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  
  const user = UserStorageManager.getUser();
  const userName = user ? `${user.firstName} ${user.lastName}` : '';
  const userEmail = user?.email || '';
  const userRole = user?.role || '';

  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
      {/* Header with language switcher */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t(TranslationKeyEnum.Profile)}
        </Typography>
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
        <Stack spacing={4} alignItems="center">
          {/* Profile Avatar Section */}
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{ 
                width: 120, 
                height: 120, 
                bgcolor: 'primary.main',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                border: 4,
                borderColor: 'background.paper',
                boxShadow: 3
              }}
            >
              {getInitials()}
            </Avatar>
            <Chip
              size="small"
              icon={<Person />}
              label={t(TranslationKeyEnum.Profile)}
              sx={{
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 'bold'
              }}
            />
          </Box>

          {/* User Information Section */}
          <Box textAlign="center" sx={{ width: '100%' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              {userName}
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center" 
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" color="action" />
                <Typography variant="body1" color="text.secondary">
                  {userEmail}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge fontSize="small" color="action" />
                <Chip 
                  label={userRole} 
                  variant="outlined" 
                  size="small"
                  color="primary"
                />
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ width: '100%' }} />

          {/* Profile Details Section */}
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
              {t(TranslationKeyEnum.UserPreferences)}
            </Typography>
            
            <Stack spacing={2}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default'
              }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {t(TranslationKeyEnum.FirstName)}:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {user?.firstName}
                </Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default'
              }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {t(TranslationKeyEnum.LastName)}:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {user?.lastName}
                </Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default'
              }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {t(TranslationKeyEnum.Email)}:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userEmail}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Action Button */}
          <Button 
            variant="contained" 
            size="large"
            startIcon={<Edit />}
            onClick={() => navigate(AppRouteEnum.EditProfile)}
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600
            }}
          >
            {t(TranslationKeyEnum.EditProfile)}
          </Button>
        </Stack>

        {/* Information box */}
        <Box sx={{ 
          mt: 4, 
          p: 2, 
          bgcolor: 'background.default', 
          borderRadius: 2, 
          border: 1, 
          borderColor: 'divider' 
        }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            👤 {t(TranslationKeyEnum.Profile)} - {t(TranslationKeyEnum.DemoVersion)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t(TranslationKeyEnum.ChangesSavedLocally)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;