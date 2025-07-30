import { useNavigate } from 'react-router-dom';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
  Grid
} from '@mui/material';
import {
  Email as EmailIcon,
  AutoAwesome as AutoAwesomeIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  ArrowForward as ArrowForwardIcon,
  PlayArrow as PlayArrowIcon,
  Psychology as PsychologyIcon,
  Category as CategoryIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleStartAutomation = () => {
    navigate('/mail-auto-onboarding');
  };

  const bestPractices = [
    {
      icon: <CategoryIcon color="primary" />,
      titleKey: TranslationKeyEnum.MutualExclusivity,
      descriptionKey: TranslationKeyEnum.MutualExclusivityDesc
    },
    {
      icon: <CheckCircleIcon color="success" />,
      titleKey: TranslationKeyEnum.PositiveGuidance,
      descriptionKey: TranslationKeyEnum.PositiveGuidanceDesc
    },
    {
      icon: <WarningIcon color="warning" />,
      titleKey: TranslationKeyEnum.IncludeOtherUncategorized,
      descriptionKey: TranslationKeyEnum.IncludeOtherUncategorizedDesc
    },
    {
      icon: <TrendingUpIcon color="info" />,
      titleKey: TranslationKeyEnum.TestAndIterate,
      descriptionKey: TranslationKeyEnum.TestAndIterateDesc
    }
  ];

  const keyComponents = [
    { title: t(TranslationKeyEnum.Structure), content: t(TranslationKeyEnum.StructureDesc), color: "primary" },
    { title: t(TranslationKeyEnum.LanguageComponent), content: t(TranslationKeyEnum.LanguageComponentDesc), color: "success" },
    { title: t(TranslationKeyEnum.Boundaries), content: t(TranslationKeyEnum.BoundariesDesc), color: "warning" },
    { title: t(TranslationKeyEnum.Examples), content: t(TranslationKeyEnum.ExamplesDesc), color: "info" }
  ];

  const commonPitfallsKeys = [
    TranslationKeyEnum.OverlappingCategories,
    TranslationKeyEnum.UsingInternalJargon,
    TranslationKeyEnum.IgnoringMultiIntent,
    TranslationKeyEnum.NotUpdatingCategories
  ];

  const implementationApproachKeys = [
    TranslationKeyEnum.StartWithZeroShot,
    TranslationKeyEnum.UseHierarchicalGrouping,
    TranslationKeyEnum.CoCreateAnnotation,
    TranslationKeyEnum.MeasureInterAnnotator
  ];

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box sx={{ 
        mb: { xs: 4, sm: 6 }, 
        p: { xs: 4, sm: 6 }, 
        borderRadius: 3, 
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
        border: 1,
        borderColor: 'primary.light',
        textAlign: 'center'
      }}>
        <Stack alignItems="center" spacing={3}>
          <PsychologyIcon sx={{ 
            fontSize: { xs: 48, sm: 64 }, 
            color: 'primary.main' 
          }} />
          
          <Box>
            <Typography variant="h2" sx={{ 
              fontWeight: 700, 
              color: 'primary.main',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              mb: 2
            }}>
              {t(TranslationKeyEnum.AIEmailClassificationGuide)}
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              mb: 4,
              maxWidth: '800px',
              mx: 'auto'
            }}>
              {t(TranslationKeyEnum.MasterTheArt)}
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            size="large"
            onClick={handleStartAutomation}
            startIcon={<PlayArrowIcon />}
            sx={{ 
              py: { xs: 1.5, sm: 2 },
              px: { xs: 3, sm: 4 },
              borderRadius: 3,
              textTransform: 'none',
              fontSize: { xs: '1rem', sm: '1.125rem' },
              boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)'
            }}
          >
            {t(TranslationKeyEnum.StartEmailAutomationSetup)}
          </Button>
        </Stack>
      </Box>

      {/* Core Purpose Section */}
      <Card sx={{ 
        mb: 4,
        borderRadius: 3,
        border: 1,
        borderColor: 'divider'
      }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <EmailIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.4rem', sm: '1.75rem' }
            }}>
              {t(TranslationKeyEnum.CorePurpose)}
            </Typography>
          </Stack>
          
          <Typography variant="body1" sx={{ 
            fontSize: { xs: '1rem', sm: '1.125rem' },
            lineHeight: 1.7,
            color: 'text.primary'
          }}>
            {t(TranslationKeyEnum.CategoryDescriptionsAct)}
          </Typography>
        </CardContent>
      </Card>

      {/* Key Components Section */}
      <Card sx={{ 
        mb: 4,
        borderRadius: 3,
        border: 1,
        borderColor: 'divider'
      }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <SettingsIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.4rem', sm: '1.75rem' }
            }}>
              {t(TranslationKeyEnum.KeyComponentsOfEffective)}
            </Typography>
          </Stack>
          
          <Grid container spacing={3}>
            {keyComponents.map((item, index) => (
              <Grid key={index}>
                <Paper sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: 1,
                  borderColor: `${item.color}.light`,
                  bgcolor: `${item.color}.50`
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    color: `${item.color}.main`
                  }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.content}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Best Practices Section */}
      <Card sx={{ 
        mb: 4,
        borderRadius: 3,
        border: 1,
        borderColor: 'divider'
      }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <SchoolIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.4rem', sm: '1.75rem' }
            }}>
              {t(TranslationKeyEnum.CriticalBestPractices)}
            </Typography>
          </Stack>
          
          <Grid container spacing={3}>
            {bestPractices.map((practice, index) => (
              <Grid key={index}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 16px rgba(25, 118, 210, 0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      {practice.icon}
                      <Box>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          mb: 1,
                          fontSize: { xs: '1rem', sm: '1.125rem' }
                        }}>
                          {t(practice.titleKey)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                          lineHeight: 1.6
                        }}>
                          {t(practice.descriptionKey)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Implementation Approach */}
      <Card sx={{ 
        mb: 4,
        borderRadius: 3,
        border: 1,
        borderColor: 'divider'
      }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <AutoAwesomeIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.4rem', sm: '1.75rem' }
            }}>
              {t(TranslationKeyEnum.ImplementationApproach)}
            </Typography>
          </Stack>
          
          <List>
            {implementationApproachKeys.map((key, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <ListItemIcon>
                  <ArrowForwardIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={t(key)}
                  primaryTypographyProps={{
                    fontSize: { xs: '0.95rem', sm: '1rem' }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Common Pitfalls & Success Metrics */}
      <Grid spacing={4} >
        <Grid sx={{ mb: 4 }}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 3,
            border: 1,
            borderColor: 'error.light',
            bgcolor: 'error.50'
          }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <WarningIcon color="error" sx={{ fontSize: 28 }} />
                <Typography variant="h5" sx={{ 
                  fontWeight: 600,
                  color: 'error.main',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}>
                  {t(TranslationKeyEnum.CommonPitfalls)}
                </Typography>
              </Stack>
              
              <List dense>
                {commonPitfallsKeys.map((key, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: '50%', 
                        bgcolor: 'error.main' 
                      }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t(key)}
                      primaryTypographyProps={{
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid sx={{ mb: 4 }}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 3,
            border: 1,
            borderColor: 'success.light',
            bgcolor: 'success.50'
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <AnalyticsIcon color="success" sx={{ fontSize: 28 }} />
                <Typography variant="h5" sx={{ 
                  fontWeight: 600,
                  color: 'success.main',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}>
                  {t(TranslationKeyEnum.SuccessMetrics)}
                </Typography>
              </Stack>
              
              <Typography variant="body1" sx={{ 
                lineHeight: 1.7,
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}>
                {t(TranslationKeyEnum.F1ScoreNotJust)}
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Chip 
                  label={t(TranslationKeyEnum.F1Score)} 
                  color="success" 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }} 
                />
                <Chip 
                  label={t(TranslationKeyEnum.HumanAlignment)} 
                  color="success" 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }} 
                />
                <Chip 
                  label={t(TranslationKeyEnum.GoldenDatasets)} 
                  color="success" 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action Footer */}
      <Card sx={{ 
        borderRadius: 3,
        border: 1,
        borderColor: 'primary.light',
        bgcolor: 'primary.50',
        mb: 4
      }}>
        <CardContent sx={{ p: { xs: 4, sm: 6 }, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            mb: 2,
            fontSize: { xs: '1.4rem', sm: '1.75rem' }
          }}>
            {t(TranslationKeyEnum.ReadyToImplement)}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ 
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.125rem' },
            maxWidth: '600px',
            mx: 'auto'
          }}>
            {t(TranslationKeyEnum.WellDesignedCategory)}
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            alignItems="center"
          >
            <Button 
              variant="contained" 
              size="large"
              onClick={handleStartAutomation}
              startIcon={<SettingsIcon />}
              sx={{ 
                py: { xs: 1.5, sm: 2 },
                px: { xs: 3, sm: 4 },
                borderRadius: 3,
                textTransform: 'none',
                fontSize: { xs: '1rem', sm: '1.125rem' },
                minWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              {t(TranslationKeyEnum.ConfigureEmailAutomation)}
            </Button>
          </Stack>
        </CardContent>
      </Card>
      {/* Bottom spacing */}
      <Box sx={{ height: 40 }} />
    </Container>
  );
}