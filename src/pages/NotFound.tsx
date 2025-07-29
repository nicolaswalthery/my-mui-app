// src/pages/NotFound.tsx - Updated with i18n support
import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';

const NotFound: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(AppRouteEnum.Home);
  };

  const handleGoBack = () => {
    window.history.back();
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
          position: 'relative',
          borderRadius: 3,
        }}
      >


        {/* 404 Animation */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 8px rgba(0,0,0,0.1)',
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': {
                  transform: 'translateY(0)',
                },
                '40%': {
                  transform: 'translateY(-10px)',
                },
                '60%': {
                  transform: 'translateY(-5px)',
                },
              }
            }}
          >
            {t(TranslationKeyEnum.NotFoundTitle)}
          </Typography>
        </Box>
        
        <Typography 
          variant="h4" 
          gutterBottom 
          color="primary.main"
          sx={{ fontWeight: 600, mb: 2 }}
        >
          {t(TranslationKeyEnum.NotFoundSubtitle)}
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: 4, 
            lineHeight: 1.6,
            fontSize: '1.1rem',
            maxWidth: '80%',
            margin: '0 auto 2rem auto'
          }}
        >
          {t(TranslationKeyEnum.NotFoundDescription)}
        </Typography>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
          sx={{ mb: 3 }}
        >
          <Button 
            variant="contained" 
            startIcon={<Home />}
            onClick={handleGoHome}
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {t(TranslationKeyEnum.GoHome)}
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<ArrowBack />}
            onClick={handleGoBack}
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {t(TranslationKeyEnum.Cancel)} {/* Using Cancel as "Go Back" */}
          </Button>
        </Stack>

        
      </Paper>
    </Box>
  );
};

export default NotFound;