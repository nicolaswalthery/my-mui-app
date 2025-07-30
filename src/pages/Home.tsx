import { useNavigate } from 'react-router-dom';
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

  const handleStartAutomation = () => {
    navigate('/mail-auto-onboarding');
  };

  const bestPractices = [
    {
      icon: <CategoryIcon color="primary" />,
      title: "Mutual Exclusivity",
      description: "Each email should fit only one category (unless multi-label is intended)"
    },
    {
      icon: <CheckCircleIcon color="success" />,
      title: "Positive Guidance", 
      description: "Say what TO include, not what to avoid"
    },
    {
      icon: <WarningIcon color="warning" />,
      title: "Include \"Other/Uncategorized\"",
      description: "Catch-all for emails that don't fit defined categories"
    },
    {
      icon: <TrendingUpIcon color="info" />,
      title: "Test and Iterate",
      description: "Use pilot annotations to identify ambiguities and refine descriptions"
    }
  ];

  const keyComponents = [
    "1-3 sentence definition + inclusion criteria + keywords + exclusions",
    "Clear, neutral, jargon-free terms",
    "Explicit inclusion/exclusion criteria to prevent overlap", 
    "Representative phrases and keywords for few-shot learning"
  ];

  const commonPitfalls = [
    "Overlapping categories causing confusion",
    "Using internal jargon or clever naming",
    "Ignoring multi-intent emails",
    "Not updating categories as needs evolve"
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
              AI Email Classification Guide
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              mb: 4,
              maxWidth: '800px',
              mx: 'auto'
            }}>
              Master the art of category descriptions for accurate AI email classification. 
              Learn how to structure guidelines that enable both machines and humans to consistently categorize emails.
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
            Start Email Automation Setup
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
              Core Purpose
            </Typography>
          </Stack>
          
          <Typography variant="body1" sx={{ 
            fontSize: { xs: '1rem', sm: '1.125rem' },
            lineHeight: 1.7,
            color: 'text.primary'
          }}>
            Category descriptions act as <strong>labeling guidelines</strong> for AI models and human annotators 
            in email triage systems. Clear descriptions directly impact classification accuracy and explainability.
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
              Key Components of Effective Descriptions
            </Typography>
          </Stack>
          
          <Grid container spacing={3}>
            {[
              { title: "Structure", content: keyComponents[0], color: "primary" },
              { title: "Language", content: keyComponents[1], color: "success" },
              { title: "Boundaries", content: keyComponents[2], color: "warning" },
              { title: "Examples", content: keyComponents[3], color: "info" }
            ].map((item, index) => (
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
              Critical Best Practices
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
                          {practice.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                          lineHeight: 1.6
                        }}>
                          {practice.description}
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
              Implementation Approach
            </Typography>
          </Stack>
          
          <List>
            {[
              "Start with zero-shot (category names only), improve with few-shot (add examples)",
              "Use hierarchical grouping for complex taxonomies",
              "Co-create annotation plans with domain experts",
              "Measure inter-annotator agreement to ensure consistency"
            ].map((item, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <ListItemIcon>
                  <ArrowForwardIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={item}
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
      <Grid sx={{ mb: 4 }}>
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
                  Common Pitfalls
                </Typography>
              </Stack>
              
              <List dense>
                {commonPitfalls.map((pitfall, index) => (
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
                      primary={pitfall}
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
        
        <Grid>
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
                  Success Metrics
                </Typography>
              </Stack>
              
              <Typography variant="body1" sx={{ 
                lineHeight: 1.7,
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}>
                <strong>F1-score</strong> (not just accuracy), <strong>human alignment</strong>, and 
                <strong> regular evaluation</strong> against golden datasets ensure the system performs 
                well in production.
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Chip 
                  label="F1-Score" 
                  color="success" 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }} 
                />
                <Chip 
                  label="Human Alignment" 
                  color="success" 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }} 
                />
                <Chip 
                  label="Golden Datasets" 
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
            Ready to Implement AI Email Classification?
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ 
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.125rem' },
            maxWidth: '600px',
            mx: 'auto'
          }}>
            Well-designed category descriptions are foundational to accurate AI email classification. 
            Start building your email automation system with our guided setup process.
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
              Configure Email Automation
            </Button>
            
            
          </Stack>
        </CardContent>
      </Card>
      {/* Bottom spacing */}
      <Box sx={{ height: 40 }} />
    </Container>
  );
}