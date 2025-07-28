// src/components/CategoryEditor.tsx
import React from 'react';
import {
  Box,
  TextField,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Chip,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  SmartToy as SmartToyIcon,
  Speed as SpeedIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Label as LabelIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

export interface MailExample {
  subject: string;
  body: string;
  sender?: string;
}

export interface CategorySection {
  name: string;
  description: string;
  senderType?: string;
  keywords?: string;
  subjectPattern?: string;
  format?: string;
  attachments?: string;
  urgency?: string;
  examples: MailExample[];
  confidenceLevel: 'auto' | 'high' | 'manual';
  subcategories?: CategorySection[];
}

interface CategoryEditorProps {
  section: CategorySection;
  onChange: (field: keyof CategorySection, value: any) => void;
  onAddSubcategory?: () => void;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({
  section,
  onChange,
  onAddSubcategory
}) => {
  const getConfidenceLevelInfo = (level: string) => {
    switch (level) {
      case 'auto':
        return {
          icon: <SmartToyIcon />,
          color: 'success' as const,
          label: 'Classification automatique',
          description: 'Les emails seront automatiquement classés dans cette catégorie'
        };
      case 'high':
        return {
          icon: <SpeedIcon />,
          color: 'warning' as const,
          label: 'Haute confiance',
          description: 'Classification automatique avec validation optionnelle'
        };
      case 'manual':
        return {
          icon: <PersonIcon />,
          color: 'default' as const,
          label: 'Validation manuelle',
          description: 'Chaque email nécessitera une validation manuelle'
        };
      default:
        return {
          icon: <PersonIcon />,
          color: 'default' as const,
          label: 'Non défini',
          description: ''
        };
    }
  };

  const confidenceInfo = getConfidenceLevelInfo(section.confidenceLevel);

  return (
    <Box sx={{ maxWidth: '100%' }}>
      {/* Basic Information Section */}
      <Card sx={{ mb: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <LabelIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Informations de base
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <TextField
              label="Nom de la catégorie"
              fullWidth
              value={section.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Ex: Factures, Newsletters, Support client..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={section.description}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Décrivez le type d'emails qui appartiennent à cette catégorie..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Classification Rules Section */}
      <Card sx={{ mb: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <EmailIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Règles de classification
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <TextField
              label="Mots-clés"
              fullWidth
              value={section.keywords || ''}
              onChange={(e) => onChange('keywords', e.target.value)}
              placeholder="facture, invoice, commande, order..."
              helperText="Séparez les mots-clés par des virgules"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Type d'expéditeur"
                value={section.senderType || ''}
                onChange={(e) => onChange('senderType', e.target.value)}
                placeholder="noreply@company.com, support@..."
                sx={{ flex: 1 }}
              />
              <TextField
                label="Modèle de sujet"
                value={section.subjectPattern || ''}
                onChange={(e) => onChange('subjectPattern', e.target.value)}
                placeholder="[FACTURE], RE:, FWD:..."
                sx={{ flex: 1 }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Confidence Level Section */}
      <Card sx={{ mb: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            {confidenceInfo.icon}
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Niveau de confiance
            </Typography>
            <Chip 
              label={confidenceInfo.label}
              color={confidenceInfo.color}
              size="small"
            />
          </Stack>

          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            {confidenceInfo.description}
          </Alert>

          <FormControl component="fieldset">
            <RadioGroup
              value={section.confidenceLevel}
              onChange={(e) => onChange('confidenceLevel', e.target.value)}
            >
              <Paper sx={{ p: 2, mb: 2, borderRadius: 2, border: 1, borderColor: section.confidenceLevel === 'auto' ? 'success.main' : 'divider' }}>
                <FormControlLabel
                  value="auto"
                  control={<Radio />}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SmartToyIcon color="success" />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          🤖 Classification automatique
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Traitement entièrement automatisé
                        </Typography>
                      </Box>
                    </Stack>
                  }
                />
              </Paper>

              <Paper sx={{ p: 2, mb: 2, borderRadius: 2, border: 1, borderColor: section.confidenceLevel === 'high' ? 'warning.main' : 'divider' }}>
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SpeedIcon color="warning" />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          ⚡ Haute confiance
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Classification automatique avec alerte optionnelle
                        </Typography>
                      </Box>
                    </Stack>
                  }
                />
              </Paper>

              <Paper sx={{ p: 2, borderRadius: 2, border: 1, borderColor: section.confidenceLevel === 'manual' ? 'primary.main' : 'divider' }}>
                <FormControlLabel
                  value="manual"
                  control={<Radio />}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PersonIcon color="primary" />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          👤 Validation manuelle
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Chaque email nécessite une confirmation
                        </Typography>
                      </Box>
                    </Stack>
                  }
                />
              </Paper>
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      {/* Advanced Options */}
      <Accordion sx={{ mb: 3, borderRadius: 2, border: 1, borderColor: 'divider', '&:before': { display: 'none' } }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderRadius: 2 }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            ⚙️ Options avancées
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <TextField
              label="Format de message"
              value={section.format || ''}
              onChange={(e) => onChange('format', e.target.value)}
              placeholder="HTML, Plain text, Both..."
              size="small"
            />
            <TextField
              label="Types de pièces jointes"
              value={section.attachments || ''}
              onChange={(e) => onChange('attachments', e.target.value)}
              placeholder="PDF, DOC, XLS..."
              size="small"
            />
            <TextField
              label="Niveau d'urgence"
              value={section.urgency || ''}
              onChange={(e) => onChange('urgency', e.target.value)}
              placeholder="Urgent, Normal, Faible..."
              size="small"
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Subcategories Section */}
      {onAddSubcategory && (
        <Card sx={{ mb: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <DescriptionIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Sous-catégories
                </Typography>
                {section.subcategories && (
                  <Chip 
                    label={section.subcategories.length}
                    size="small"
                    color="primary"
                  />
                )}
              </Stack>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={onAddSubcategory}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                Ajouter une sous-catégorie
              </Button>
            </Stack>

            {section.subcategories && section.subcategories.length > 0 ? (
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                <Typography variant="body2">
                  {section.subcategories.length} sous-catégorie(s) configurée(s). 
                  Utilisez la liste de gauche pour les modifier.
                </Typography>
              </Alert>
            ) : (
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                <Typography variant="body2">
                  Aucune sous-catégorie créée. Les sous-catégories permettent une 
                  classification plus précise de vos emails.
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recursive Subcategories Display */}
      {section.subcategories?.map((subcat, idx) => (
        <Box key={idx} sx={{ 
          ml: 3, 
          pl: 3, 
          borderLeft: 2, 
          borderColor: 'primary.light',
          mb: 2
        }}>
          <Paper sx={{ 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'primary.50',
            border: 1,
            borderColor: 'primary.light'
          }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                ↳ {subcat.name || `Sous-catégorie ${idx + 1}`}
              </Typography>
              <Chip
                label={getConfidenceLevelInfo(subcat.confidenceLevel).label}
                color={getConfidenceLevelInfo(subcat.confidenceLevel).color}
                size="small"
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {subcat.description || 'Aucune description'}
            </Typography>
            {subcat.keywords && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Mots-clés: {subcat.keywords}
              </Typography>
            )}
          </Paper>
        </Box>
      ))}

      {/* Examples Section */}
      <Card sx={{ borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EmailIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Exemples d'emails
              </Typography>
              <Chip 
                label={section.examples.length}
                size="small"
                color={section.examples.length > 0 ? 'success' : 'default'}
              />
            </Stack>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              size="small"
              sx={{ 
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              Ajouter un exemple
            </Button>
          </Stack>

          {section.examples.length === 0 ? (
            <Alert severity="warning" sx={{ borderRadius: 2 }}>
              <Typography variant="body2">
                Aucun exemple défini. Les exemples aident à améliorer la précision 
                de la classification automatique.
              </Typography>
            </Alert>
          ) : (
            <Stack spacing={2}>
              {section.examples.map((example, idx) => (
                <Paper key={idx} sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  bgcolor: 'success.50',
                  border: 1,
                  borderColor: 'success.light'
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    📧 Exemple {idx + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Sujet:</strong> {example.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    <strong>Expéditeur:</strong> {example.sender || 'Non spécifié'}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CategoryEditor;