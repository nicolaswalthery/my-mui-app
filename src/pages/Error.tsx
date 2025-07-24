// src/pages/Error.tsx - Updated with i18n support (language switcher removed)
import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Refresh, Home } from '@mui/icons-material';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';

interface ErrorPageProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, resetError }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleReload = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    navigate(AppRouteEnum.Home);
  };

  return (
    <Box
      minHeight="100vh"
      bgcolor="background.default"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 600,
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon 
          color="error" 
          sx={{ 
            fontSize: 80, 
            mb: 3,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 1 },
              '50%': { opacity: 0.7 },
              '100%': { opacity: 1 },
            }
          }} 
        />
        
        <Typography variant="h4" gutterBottom color="error">
          {t(TranslationKeyEnum.SomethingWentWrong)}
        </Typography>
        
        <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mb: 2 }}>
          {t(TranslationKeyEnum.CriticalError)}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
          {t(TranslationKeyEnum.ErrorDescription)}
        </Typography>

        {/* Error details (if provided) */}
        {error && (
          <Box sx={{ 
            mb: 4, 
            p: 2, 
            bgcolor: 'error.light', 
            borderRadius: 1, 
            border: 1, 
            borderColor: 'error.main',
            textAlign: 'left'
          }}>
            <Typography variant="subtitle2" color="error.contrastText" sx={{ mb: 1 }}>
              Technical Details:
            </Typography>
            <Typography variant="body2" color="error.contrastText" sx={{ fontFamily: 'monospace' }}>
              {error.message || 'Unknown error'}
            </Typography>
            {error.stack && (
              <Typography 
                variant="caption" 
                color="error.contrastText" 
                sx={{ 
                  display: 'block', 
                  mt: 1, 
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  maxHeight: 150,
                  overflow: 'auto',
                  fontSize: '0.7rem'
                }}
              >
                {error.stack}
              </Typography>
            )}
          </Box>
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button 
            variant="contained" 
            startIcon={<Refresh />}
            onClick={handleReload}
            size="large"
          >
            {t(TranslationKeyEnum.ReloadApp)}
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<Home />}
            onClick={handleGoHome}
            size="large"
          >
            {t(TranslationKeyEnum.GoHome)}
          </Button>
        </Stack>

        {/* Debug information */}
        <Box sx={{ 
          mt: 4, 
          pt: 3, 
          borderTop: 1, 
          borderColor: 'divider'
        }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            💡 {t(TranslationKeyEnum.DemoVersion)} - Error Boundary
          </Typography>
          <Typography variant="caption" color="text.secondary">
            This error page supports multiple languages and provides debugging information.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ErrorPage;