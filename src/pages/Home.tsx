// src/pages/Home.tsx - Updated with i18n support
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Stack,
  Chip,
  Container,
} from '@mui/material';
import { Launch, Star, Language } from '@mui/icons-material';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';

const Home: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  // Define features with translation keys
  const features = [
    {
      titleKey: TranslationKeyEnum.ModernInterface,
      descriptionKey: TranslationKeyEnum.ModernInterfaceDesc,
      icon: '🎨',
      color: '#2563eb',
    },
    {
      titleKey: TranslationKeyEnum.ResponsiveDesign,
      descriptionKey: TranslationKeyEnum.ResponsiveDesignDesc,
      icon: '📱',
      color: '#059669',
    },
    {
      titleKey: TranslationKeyEnum.OptimizedPerformance,
      descriptionKey: TranslationKeyEnum.OptimizedPerformanceDesc,
      icon: '⚡',
      color: '#7c3aed',
    },
  ];

  const handleGetStarted = () => {
    navigate(AppRouteEnum.Dashboard);
  };

  const handleLearnMore = () => {
    navigate(AppRouteEnum.Settings);
  };

  return (
    <Container maxWidth="lg">
      {/* Header with language switcher */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {t(TranslationKeyEnum.Home)}
          </Typography>
          <Chip 
            icon={<Language />} 
            label="i18n Ready" 
            color="primary" 
            variant="outlined" 
            size="small"
            sx={{ mb: 2 }}
          />
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <LanguageSwitcher variant="compact" showLabel={false} />
        </Box>
      </Box>
      
      {/* Welcome Section */}
      <Box sx={{ 
        mb: 6, 
        p: 4, 
        borderRadius: 3, 
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
        border: 1,
        borderColor: 'primary.light'
      }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          {t(TranslationKeyEnum.WelcomeToApp)}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph 
          sx={{ fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '80%' }}
        >
          {t(TranslationKeyEnum.DiscoverFeatures)}
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            startIcon={<Launch />}
            onClick={handleGetStarted}
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            {t(TranslationKeyEnum.GetStarted)}
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Star />}
            onClick={handleLearnMore}
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            {t(TranslationKeyEnum.LearnMore)}
          </Button>
        </Stack>
      </Box>

      {/* Features Section */}
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ mt: 6, mb: 4, fontWeight: 600, textAlign: 'center' }}
      >
        {t(TranslationKeyEnum.MainFeatures)}
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4,
                },
                border: 1,
                borderColor: 'divider'
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}40 100%)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: '4rem', 
                    mb: 1,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                >
                  {feature.icon}
                </Typography>
                <Chip 
                  label={`${t(TranslationKeyEnum.Image)} ${index + 1}`}
                  size="small"
                  sx={{ 
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    bgcolor: 'rgba(255,255,255,0.9)'
                  }}
                />
              </CardMedia>
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: feature.color,
                    mb: 2
                  }}
                >
                  {t(feature.titleKey)}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {t(feature.descriptionKey)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action Section */}
      <Box sx={{ 
        mt: 8, 
        mb: 4, 
        p: 4, 
        textAlign: 'center',
        borderRadius: 3,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          🌍 {t(TranslationKeyEnum.Language)} Support
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This application supports multiple languages. Try switching languages using the selector above!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="🇺🇸 English" size="small" />
          <Chip label="🇫🇷 Français" size="small" />
          <Chip label="🇪🇸 Español" size="small" />
          <Chip label="🇩🇪 Deutsch" size="small" />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;