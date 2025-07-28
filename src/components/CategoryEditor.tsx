// src/components/CategoryEditor.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Stack,
  Typography,
  Button,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Email as EmailIcon,
  Label as LabelIcon,
  Description as DescriptionIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Delete as DeleteIcon
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
  const [showAddExample, setShowAddExample] = useState(false);
  const [newExample, setNewExample] = useState<MailExample>({
    subject: '',
    body: '',
    sender: ''
  });

  const handleAddExample = () => {
    if (newExample.subject.trim() && newExample.body.trim()) {
      const updatedExamples = [...section.examples, newExample];
      onChange('examples', updatedExamples);
      setNewExample({ subject: '', body: '', sender: '' });
      setShowAddExample(false);
    }
  };

  const handleDeleteExample = (index: number) => {
    const updatedExamples = section.examples.filter((_, i) => i !== index);
    onChange('examples', updatedExamples);
  };

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
              required
              value={section.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Ex: Factures, Newsletters, Support client..."
              error={!section.name}
              helperText={!section.name ? "Ce champ est obligatoire" : ""}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              label="Description"
              fullWidth
              required
              multiline
              minRows={3}
              value={section.description}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Décrivez le type d'emails qui appartiennent à cette catégorie..."
              error={!section.description}
              helperText={!section.description ? "Ce champ est obligatoire" : ""}
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
              label="Types de pièces jointes probables"
              value={section.attachments || ''}
              onChange={(e) => onChange('attachments', e.target.value)}
              placeholder="PDF, DOC, XLS..."
              size="small"
            />
            <TextField
              label="Niveau d'urgence par défaut de la catégorie"
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
                Exemples d'emails *
              </Typography>
              <Chip 
                label={section.examples.length}
                size="small"
                color={section.examples.length > 0 ? 'success' : 'error'}
              />
            </Stack>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              size="small"
              onClick={() => setShowAddExample(true)}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              Ajouter un exemple
            </Button>
          </Stack>

          {section.examples.length === 0 ? (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              <Typography variant="body2">
                <strong>Au moins un exemple est requis.</strong> Les exemples aident à améliorer la précision 
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
                  borderColor: 'success.light',
                  position: 'relative'
                }}>
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        📧 Exemple {idx + 1}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        <strong>Sujet:</strong> {example.subject}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        <strong>Expéditeur:</strong> {example.sender || 'Non spécifié'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Corps:</strong> {example.body.length > 100 ? 
                          example.body.substring(0, 100) + '...' : 
                          example.body
                        }
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteExample(idx)}
                      sx={{ 
                        color: 'error.main',
                        '&:hover': { bgcolor: 'error.50' }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* Add Example Dialog */}
      <Dialog 
        open={showAddExample} 
        onClose={() => setShowAddExample(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          pb: 1
        }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Ajouter un exemple d'email
            </Typography>
          </Stack>
          <IconButton 
            onClick={() => setShowAddExample(false)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            <Typography variant="body2">
              Les exemples d'emails permettent d'améliorer la précision de la classification automatique. 
              Plus vous ajoutez d'exemples pertinents, plus le système sera efficace.
            </Typography>
          </Alert>

          <Stack spacing={3}>
            <TextField
              label="Sujet de l'email *"
              fullWidth
              required
              value={newExample.subject}
              onChange={(e) => setNewExample({ ...newExample, subject: e.target.value })}
              placeholder="Ex: [FACTURE] Votre commande #12345"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              label="Expéditeur (optionnel)"
              fullWidth
              value={newExample.sender}
              onChange={(e) => setNewExample({ ...newExample, sender: e.target.value })}
              placeholder="Ex: noreply@company.com"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              label="Corps de l'email *"
              fullWidth
              required
              multiline
              minRows={4}
              maxRows={8}
              value={newExample.body}
              onChange={(e) => setNewExample({ ...newExample, body: e.target.value })}
              placeholder="Contenu de l'email exemple..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setShowAddExample(false)}
            color="inherit"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleAddExample}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!newExample.subject.trim() || !newExample.body.trim()}
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none',
              px: 3
            }}
          >
            Ajouter l'exemple
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryEditor;