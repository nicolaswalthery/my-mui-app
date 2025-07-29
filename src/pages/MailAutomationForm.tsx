import React, { useState, useEffect } from 'react';
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
import { UserStorageManager } from '../helpers/userStorageManager';

export default function MailAutomationForm() {
  const [sections, setSections] = useState<CategorySection[]>([]);
  const [selected, setSelected] = useState<{ parent: number; child?: number } | null>(null);
  const [showHelpCard, setShowHelpCard] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize component with data from session storage
  useEffect(() => {
    const initializeData = () => {
      // Initialize user session if it doesn't exist
      UserStorageManager.initializeUserSession();
      
      // Load saved categories
      const savedCategories = UserStorageManager.getMailCategories();
      setSections(savedCategories);
      
      // Load selected category state
      const savedSelected = UserStorageManager.getSelectedCategory();
      // Validate that the saved selection is still valid
      if (savedSelected && savedCategories.length > 0) {
        const isValidSelection = 
          savedSelected.parent < savedCategories.length &&
          (savedSelected.child === undefined || 
           (savedCategories[savedSelected.parent].subcategories && 
            savedSelected.child < savedCategories[savedSelected.parent].subcategories!.length));
        
        if (isValidSelection) {
          setSelected(savedSelected);
        } else {
          // Clear invalid selection
          UserStorageManager.saveSelectedCategory(null);
          setSelected(null);
        }
      }
      
      // Load help card preference
      const showHelp = UserStorageManager.getPreference('showHelpCard', true);
      setShowHelpCard(showHelp);
      
      setIsLoading(false);
    };

    initializeData();
  }, []);

  // Save categories to session storage whenever sections change
  useEffect(() => {
    if (!isLoading) {
      UserStorageManager.saveMailCategories(sections);
    }
  }, [sections, isLoading]);

  // Save selected state whenever it changes
  useEffect(() => {
    if (!isLoading) {
      UserStorageManager.saveSelectedCategory(selected);
    }
  }, [selected, isLoading]);

  const addSection = () => {
    const newSections = [
      ...sections,
      {
        name: '',
        description: '',
        examples: [],
        subcategories: [],
      },
    ];
    setSections(newSections);
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

  const handleCloseHelpCard = () => {
    setShowHelpCard(false);
    UserStorageManager.savePreference('showHelpCard', false);
  };

  const handleSaveConfiguration = () => {
    // Force save current state
    UserStorageManager.batchUpdate({
      categories: sections,
      selected: selected,
      preferences: { showHelpCard }
    });
    
    // You can add additional save logic here (e.g., API call)
    console.log('Configuration saved to session storage');
  };

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les catégories ? Cette action ne peut pas être annulée.')) {
      setSections([]);
      setSelected(null);
      UserStorageManager.clearMailCategories();
      UserStorageManager.saveSelectedCategory(null);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Stack alignItems="center" spacing={2}>
            <LinearProgress sx={{ width: 300 }} />
            <Typography variant="body2" color="text.secondary">
              Chargement de votre configuration...
            </Typography>
          </Stack>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Header Section - RESPONSIVE */}
      <Box sx={{ 
        mb: { xs: 3, sm: 4 }, 
        p: { xs: 3, sm: 4 }, 
        borderRadius: 3, 
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
        border: 1,
        borderColor: 'primary.light'
      }}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          alignItems={{ xs: 'flex-start', sm: 'center' }} 
          spacing={2} 
          sx={{ mb: 2 }}
        >
          <EmailIcon sx={{ 
            fontSize: { xs: 32, sm: 40 }, 
            color: 'primary.main' 
          }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 600, 
              color: 'primary.main',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
            }}>
              Configuration de l'Automatisation de vos e-mails
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}>
              Créez et gérez vos catégories de classification automatique de vos emails
            </Typography>
          </Box>
          
          {/* Action buttons in header */}
          <Stack direction="row" spacing={1}>
            <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={handleSaveConfiguration}
                  sx={{ 
                    flex: { xs: 1, sm: 'none' },
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}
                >
                  Sauvegarder
                </Button>
            {sections.length > 0 && (
              <Button 
                variant="text" 
                size="small"
                color="error"
                onClick={handleClearAll}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: { xs: '0.7rem', sm: '0.8rem' }
                }}
              >
                Tout effacer
              </Button>
            )}
          </Stack>
        </Stack>

        {/* Progress Section - RESPONSIVE */}
        {sections.length > 0 && (
          <Box sx={{ mt: { xs: 2, sm: 3 } }}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              alignItems={{ xs: 'flex-start', sm: 'center' }} 
              spacing={2} 
              sx={{ mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary" sx={{
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                Progression de la configuration
              </Typography>
              <Chip 
                label={`${getCompletionPercentage()}% complété`}
                size="small"
                color={getCompletionPercentage() === 100 ? 'success' : 'primary'}
                icon={getCompletionPercentage() === 100 ? <CheckCircleIcon /> : undefined}
              />
              <Typography variant="caption" color="text.disabled" sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem' }
              }}>
                💾 Sauvegardé automatiquement
              </Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={getCompletionPercentage()} 
              sx={{ 
                height: { xs: 6, sm: 8 }, 
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

      {/* Main Content - RESPONSIVE GRID */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* Left Sidebar - Categories List - RESPONSIVE */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            height: 'fit-content',
            position: { xs: 'static', lg: 'sticky' },
            top: 24,
            maxHeight: { lg: 'calc(100vh - 48px)' },
            overflowY: { lg: 'auto' },
            mb: { xs: 2, lg: 0 },
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
            <CardContent sx={{ p: 0, minWidth: { xs: 'auto', lg: 460 } }}>
              {/* Sidebar Header - RESPONSIVE */}
              <Box sx={{ p: { xs: 2, sm: 3 }, pb: 2 }}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems={{ xs: 'stretch', sm: 'center' }} 
                  justifyContent="space-between"
                  spacing={{ xs: 2, sm: 0 }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CategoryIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Catégories
                    </Typography>
                    <Chip 
                      label={sections.length}
                      size="small"
                      color="primary"
                    />
                  </Stack>
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
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  Nouvelle catégorie
                </Button>
              </Box>

              <Divider />

              {/* Categories List - RESPONSIVE */}
              {sections.length === 0 ? (
                <Box sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
                  <AutoAwesomeIcon sx={{ 
                    fontSize: { xs: 40, sm: 48 }, 
                    color: 'text.disabled', 
                    mb: 2 
                  }} />
                  <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}>
                    Aucune catégorie créée
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{
                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                  }}>
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
                          py: { xs: 1.5, sm: 2 },
                          px: { xs: 2, sm: 3 },
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
                              <Typography variant="body1" sx={{ 
                                fontWeight: 500,
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                              }}>
                                {section.name || `Catégorie ${index + 1}`}
                              </Typography>
                              {!isSectionComplete(section) && (
                                <WarningIcon 
                                  sx={{ 
                                    fontSize: { xs: 14, sm: 16 }, 
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

                      {/* Subcategories - RESPONSIVE */}
                      {section.subcategories?.map((sub, subIndex) => (
                        <ListItemButton
                          key={`sub-${index}-${subIndex}`}
                          selected={selected?.parent === index && selected?.child === subIndex}
                          onClick={() => setSelected({ parent: index, child: subIndex })}
                          sx={{ 
                            pl: { xs: 4, sm: 5 },
                            py: { xs: 1, sm: 1.5 },
                            borderLeft: 2,
                            borderColor: 'divider',
                            ml: { xs: 1, sm: 2 },
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
                                    transition: 'all 0.2s ease-in-out',
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                  }}
                                >
                                  ↳ {sub.name || `Sous-catégorie ${subIndex + 1}`}
                                </Typography>
                                {!isSectionComplete(sub) && (
                                  <WarningIcon 
                                    sx={{ 
                                      fontSize: { xs: 12, sm: 14 }, 
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
                                  '&:hover': { color: 'text.primary' },
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
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

          {/* Help Card - RESPONSIVE */}
          <Card sx={{ 
            mt: { xs: 2, lg: 3 },
            borderRadius: 3,
            border: showHelpCard ? 1 : 0,
            borderColor: 'info.light',
            bgcolor: 'info.50',
            position: { xs: 'static', lg: 'sticky' },
            top: { lg: 'calc(100vh - 200px - 70px)' },
            zIndex: 1,
            display: { xs: showHelpCard ? 'block' : 'none', lg: 'block' }
          }}>
            {showHelpCard && (
              <CardContent sx={{ position: 'relative', p: { xs: 2, sm: 3 } }}>
                <IconButton
                  size="small"
                  onClick={handleCloseHelpCard}
                  sx={{ 
                    position: 'absolute',
                    top: { xs: 6, sm: 8 },
                    right: { xs: 6, sm: 8 },
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
                  <Box sx={{ pr: { xs: 2, sm: 3 } }}>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}>
                      💡 Conseils
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                      lineHeight: 1.4,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}>
                      • Utilisez des mots-clés spécifiques pour une meilleure classification
                      <br />
                      • Les sous-catégories permettent une organisation plus fine
                      <br />
                      • Vos données sont sauvegardées automatiquement dans votre navigateur
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            )}
          </Card>
        </Grid>

        {/* Right Content - Editor - RESPONSIVE */}
        <Grid item xs={12} lg={8}>
          {!selected || !getCurrentSection() ? (
            <Card sx={{ 
              borderRadius: 3,
              border: 1,
              borderColor: 'divider',
              minHeight: { xs: 300, sm: 400, md: 520 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box sx={{ textAlign: 'center', p: { xs: 3, sm: 4 } }}>
                <SettingsIcon sx={{ 
                  fontSize: { xs: 48, sm: 56, md: 64 }, 
                  color: 'text.disabled', 
                  mb: 2 
                }} />
                <Typography variant="h6" color="text.secondary" sx={{ 
                  mb: 1,
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                }}>
                  Sélectionnez une catégorie
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  px: { xs: 1, sm: 0 }
                }}>
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
                {/* Editor Header - RESPONSIVE */}
                <Box sx={{ 
                  p: { xs: 2, sm: 3 }, 
                  pb: 2,
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)'
                }}>
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    alignItems={{ xs: 'flex-start', sm: 'center' }} 
                    justifyContent="space-between"
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CategoryIcon color="primary" />
                      <Box>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}>
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

                {/* Editor Content - RESPONSIVE */}
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
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

      {/* Action Bar - Configuration incomplète - RESPONSIVE */}
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
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              alignItems={{ xs: 'flex-start', sm: 'center' }} 
              justifyContent="space-between" 
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <InfoIcon color="error" />
                <Box>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.125rem' }
                  }}>
                    Configuration incomplète
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}>
                    {getCompletionPercentage()}% complété • 💾 Sauvegardé automatiquement
                  </Typography>
                </Box>
              </Stack>
              <Stack 
                direction={{ xs: 'row', sm: 'row' }} 
                spacing={2}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={handleSaveConfiguration}
                  sx={{ 
                    flex: { xs: 1, sm: 'none' },
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}
                >
                  Sauvegarder
                </Button>
                <Button 
                  variant="contained" 
                  color="error"
                  disabled
                  sx={{ 
                    px: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    textTransform: 'none',
                    flex: { xs: 1, sm: 'none' },
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}
                >
                  Compléter la configuration
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Action Bar - Configuration prête - RESPONSIVE */}
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
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              alignItems={{ xs: 'flex-start', sm: 'center' }} 
              justifyContent="space-between" 
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <CheckCircleIcon color="success" />
                <Box>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.125rem' }
                  }}>
                    Configuration prête
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}>
                    {sections.length} catégorie(s) configurée(s) • {getCompletionPercentage()}% complété • 💾 Sauvegardé
                  </Typography>
                </Box>
              </Stack>
              <Stack 
                direction={{ xs: 'row', sm: 'row' }} 
                spacing={2}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={handleSaveConfiguration}
                  sx={{ 
                    flex: { xs: 1, sm: 'none' },
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}
                >
                  Sauvegarder
                </Button>
                <Button 
                  variant="contained" 
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  sx={{ 
                    px: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    textTransform: 'none',
                    flex: { xs: 1, sm: 'none' },
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
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