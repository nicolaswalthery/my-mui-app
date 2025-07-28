import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Container,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  LinearProgress,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  Add as AddIcon,
  Email as EmailIcon,
  Category as CategoryIcon,
  AutoAwesome as AutoAwesomeIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import CategoryEditor from '../components/CategoryEditor';
import type { CategorySection } from '../components/CategoryEditor';

export default function MailAutomationForm() {
  const [sections, setSections] = useState<CategorySection[]>([]);
  const [selected, setSelected] = useState<{ parent: number; child?: number } | null>(null);
  const [showHelpCard, setShowHelpCard] = useState(true); // Add state for help card visibility

  const addSection = () => {
    setSections([
      ...sections,
      {
        name: '',
        description: '',
        examples: [],
        subcategories: [],
      },
    ]);
    setSelected({ parent: sections.length });
  };

  const addSubcategory = (parentIndex: number) => {
    const updated = [...sections];
    const parent = updated[parentIndex];
    if (!parent.subcategories) parent.subcategories = [];
    parent.subcategories.push({
      name: '',
      description: '',
      examples: [],
      subcategories: [],
    });
    setSections(updated);
  };

  const deleteSection = (parentIndex: number, childIndex?: number) => {
    const updated = [...sections];
    if (childIndex !== undefined) {
      const subcats = updated[parentIndex].subcategories ?? [];
      subcats.splice(childIndex, 1);
      updated[parentIndex].subcategories = subcats;
    } else {
      updated.splice(parentIndex, 1);
    }
    setSections(updated);
    setSelected(null);
  };

  const updateSection = (parentIndex: number, field: keyof CategorySection, value: any, childIndex?: number) => {
    const updated = [...sections];
    if (childIndex !== undefined) {
      const subcats = updated[parentIndex].subcategories ?? [];
      subcats[childIndex] = { ...subcats[childIndex], [field]: value };
      updated[parentIndex].subcategories = subcats;
    } else {
      updated[parentIndex] = { ...updated[parentIndex], [field]: value };
    }
    setSections(updated);
  };

  const getCurrentSection = () => {
    if (!selected) return null;
    const parent = sections[selected.parent];
    if (!parent) return null;
    if (selected.child !== undefined) return parent.subcategories?.[selected.child] ?? null;
    return parent;
  };

  const getCompletionPercentage = () => {
    if (sections.length === 0) return 0;
    const totalSections = sections.reduce((acc, section) => {
      return acc + 1 + (section.subcategories?.length || 0);
    }, 0);
    const completedSections = sections.reduce((acc, section) => {
      let completed = section.name && section.description && section.examples && section.examples.length > 0 ? 1 : 0;
      if (section.subcategories) {
        completed += section.subcategories.filter(sub => 
          sub.name && sub.description && sub.examples && sub.examples.length > 0
        ).length;
      }
      return acc + completed;
    }, 0);
    return Math.round((completedSections / totalSections) * 100);
  };

  const isSectionComplete = (section: CategorySection) => {
    return section.name && section.description && section.examples && section.examples.length > 0;
  };

  return (
    <Container maxWidth="xl">
      {/* Header Section */}
      <Box sx={{ 
        mb: 4, 
        p: 4, 
        borderRadius: 3, 
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
        border: 1,
        borderColor: 'primary.light'
      }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Configuration de l'Automatisation de vos e-mails
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Créez et gérez vos catégories de classification automatique de vos emails
            </Typography>
          </Box>
        </Stack>

        {/* Progress Section */}
        {sections.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progression de la configuration
              </Typography>
              <Chip 
                label={`${getCompletionPercentage()}% complété`}
                size="small"
                color={getCompletionPercentage() === 100 ? 'success' : 'primary'}
                icon={getCompletionPercentage() === 100 ? <CheckCircleIcon /> : undefined}
              />
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={getCompletionPercentage()} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4
                }
              }}
            />
          </Box>
        )}
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Left Sidebar - Categories List */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            height: 'fit-content',
            position: 'sticky',
            top: 24,
            maxHeight: 'calc(100vh - 48px)',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(0,0,0,0.5)',
              },
            },
          }}>
            <CardContent sx={{ p: 0, minWidth: 460 }}>
              {/* Sidebar Header */}
              <Box sx={{ p: 3, pb: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CategoryIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Catégories
                    </Typography>
                  </Stack>
                  <Chip 
                    label={sections.length}
                    size="small"
                    color="primary"
                  />
                </Stack>
                
                <Button 
                  onClick={addSection} 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ 
                    mt: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    py: 1.5
                  }}
                >
                  Nouvelle catégorie
                </Button>
              </Box>

              <Divider />

              {/* Categories List */}
              {sections.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <AutoAwesomeIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Aucune catégorie créée
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    Cliquez sur "Nouvelle catégorie" pour commencer
                  </Typography>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {sections.map((section, index) => (
                    <Box key={index}>
                      <ListItemButton
                        selected={selected?.parent === index && selected?.child === undefined}
                        onClick={() => setSelected({ parent: index })}
                        sx={{ 
                          py: 2,
                          px: 3,
                          '&.Mui-selected': {
                            bgcolor: 'primary.50',
                            borderRight: 3,
                            borderColor: 'primary.main'
                          }
                        }}
                      >
                        <ListItemText 
                          primary={
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {section.name || `Catégorie ${index + 1}`}
                              </Typography>
                              {!isSectionComplete(section) && (
                                <WarningIcon 
                                  sx={{ 
                                    fontSize: 16, 
                                    color: 'warning.main',
                                    opacity: 0.8
                                  }} 
                                />
                              )}
                            </Stack>
                          }
                          secondary={section.description ? 
                            section.description.substring(0, 50) + (section.description.length > 50 ? '...' : '') 
                            : 'Aucune description'
                          }
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSection(index);
                          }}
                          sx={{ opacity: 0.7, '&:hover': { opacity: 1, color: 'error.main' } }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </ListItemButton>

                      {/* Subcategories */}
                      {section.subcategories?.map((sub, subIndex) => (
                        <ListItemButton
                          key={`sub-${index}-${subIndex}`}
                          selected={selected?.parent === index && selected?.child === subIndex}
                          onClick={() => setSelected({ parent: index, child: subIndex })}
                          sx={{ 
                            pl: 5,
                            py: 1.5,
                            borderLeft: 2,
                            borderColor: 'divider',
                            ml: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              bgcolor: 'primary.25',
                              borderColor: 'primary.light',
                              '& .subcategory-name': {
                                color: 'primary.main',
                                textDecoration: 'underline'
                              }
                            },
                            '&.Mui-selected': {
                              bgcolor: 'primary.50',
                              borderColor: 'primary.main',
                              '& .subcategory-name': {
                                color: 'primary.dark',
                                fontWeight: 600
                              }
                            }
                          }}
                        >
                          <ListItemText 
                            primary={
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography 
                                  variant="body2" 
                                  className="subcategory-name"
                                  sx={{ 
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out'
                                  }}
                                >
                                  ↳ {sub.name || `Sous-catégorie ${subIndex + 1}`}
                                </Typography>
                                {!isSectionComplete(sub) && (
                                  <WarningIcon 
                                    sx={{ 
                                      fontSize: 14, 
                                      color: 'warning.main',
                                      opacity: 0.8
                                    }} 
                                  />
                                )}
                              </Stack>
                            }
                            secondary={
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  cursor: 'pointer',
                                  '&:hover': { color: 'text.primary' }
                                }}
                              >
                                {sub.description ? 
                                  sub.description.substring(0, 40) + (sub.description.length > 40 ? '...' : '') 
                                  : 'Aucune description'
                                }
                              </Typography>
                            }
                          />
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSection(index, subIndex);
                            }}
                            sx={{ opacity: 0.7, '&:hover': { opacity: 1, color: 'error.main' } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </ListItemButton>
                      ))}
                    </Box>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Help Card */}
          <Box>
            
          </Box>
          <Card sx={{ 
            mt: 3,
            borderRadius: 3,
            border: showHelpCard ? 1 : 0,
            borderColor: 'info.light',
            bgcolor: 'info.50',
            position: 'sticky',
            top: 'calc(100vh - 200px - 70px)',
            zIndex: 1,
          }}>
            {showHelpCard && (
              <CardContent sx={{ position: 'relative' }}>
                {/* Hide button for help card */}
                <IconButton
                  size="small"
                  onClick={() => setShowHelpCard(false)}
                  sx={{ 
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    opacity: 0.7,
                    '&:hover': { 
                      opacity: 1,
                      bgcolor: 'rgba(255,255,255,0.2)'
                    }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>

                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <InfoIcon color="info" />
                  <Box sx={{ pr: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      💡 Conseils
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                      • Utilisez des mots-clés spécifiques pour une meilleure classification
                      <br />
                      • Les sous-catégories permettent une organisation plus fine
                      <br />
                      • Le niveau "Auto" traite les emails automatiquement
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            )}
          </Card>
        </Grid>

        {/* Right Content - Editor */}
        <Grid item xs={12} lg={8}>
          {!selected || !getCurrentSection() ? (
            <Card sx={{ 
              borderRadius: 3,
              border: 1,
              borderColor: 'divider',
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <SettingsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  Sélectionnez une catégorie
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  Choisissez une catégorie dans la liste de gauche pour commencer la configuration
                </Typography>
              </Box>
            </Card>
          ) : (
            <Card sx={{ 
              borderRadius: 3,
              border: 1,
              borderColor: 'divider'
            }}>
              <CardContent sx={{ p: 0 }}>
                {/* Editor Header */}
                <Box sx={{ 
                  p: 3, 
                  pb: 2,
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)'
                }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CategoryIcon color="primary" />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {getCurrentSection()?.name || 'Nouvelle catégorie'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {selected?.child !== undefined ? 'Sous-catégorie' : 'Catégorie principale'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>

                <Divider />

                {/* Editor Content */}
                <Box sx={{ p: 3 }}>
                  <CategoryEditor
                    section={getCurrentSection()!}
                    onChange={(field, value) =>
                      updateSection(selected.parent, field, value, selected.child)
                    }
                    onAddSubcategory={
                      selected.child === undefined
                        ? () => addSubcategory(selected.parent)
                        : undefined
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Action Bar - Display Configuration incomplète */}
      {sections.length > 0 && getCompletionPercentage() < 100 && (
        <Card sx={{ 
          mt: 4,
          borderRadius: 3,
          border: 1,
          borderColor: 'error.light',
          bgcolor: 'error.50',
          position: 'sticky',
          bottom: 0,
          zIndex: 1000,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.1)',
        }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <InfoIcon color="error" />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Configuration incomplète
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {sections.length} catégorie(s) configurée(s) • {getCompletionPercentage()}% complété
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="inherit">
                  Sauvegarder
                </Button>
                <Button 
                  variant="contained" 
                  color="error"
                  disabled
                  sx={{ 
                    px: 3,
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Compléter la configuration
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Action Bar - Configuration prête */}
      {sections.length > 0 && getCompletionPercentage() === 100 && (
        <Card sx={{ 
          mt: 4,
          borderRadius: 3,
          border: 1,
          borderColor: 'success.light',
          bgcolor: 'success.50',
          position: 'sticky',
          bottom: 0,
          zIndex: 1000,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.1)',
        }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CheckCircleIcon color="success" />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Configuration prête
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {sections.length} catégorie(s) configurée(s) • {getCompletionPercentage()}% complété
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="inherit">
                  Sauvegarder
                </Button>
                <Button 
                  variant="contained" 
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  sx={{ 
                    px: 3,
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Activer
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Add spacing below the sticky card */}
      <Box sx={{ height: 20 }} />
    </Container>
  );
}