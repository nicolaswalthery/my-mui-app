// src/pages/Home.tsx - Email Categorization AI Guide
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
  Chip,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Launch,
  Star,
  CheckCircle,
  ExpandMore,
  Category,
  Description,
  Psychology,
  Code,
  TipsAndUpdates,
  Warning,
  Email,
  AutoAwesome,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum, SupportedLangEnum, LanguageDisplayNames } from '../enums/TranslationKeyEnum';
import { useNavigate } from 'react-router-dom';
import { AppRouteEnum } from '../enums/AppRouteEnum';

const Home: React.FC = () => {
  const { t, language, setLanguage } = useI18n();
  const navigate = useNavigate();

  // Best practices for email categorization
  const bestPractices = [
    {
      titleKey: TranslationKeyEnum.ClearInstructions,
      descriptionKey: TranslationKeyEnum.ClearInstructionsDesc,
      icon: <TipsAndUpdates sx={{ color: '#2563eb' }} />,
      example: "Tu es un assistant virtuel chargé de trier les e-mails d'une entreprise...",
    },
    {
      titleKey: TranslationKeyEnum.StrictOutputFormat,
      descriptionKey: TranslationKeyEnum.StrictOutputFormatDesc,
      icon: <Code sx={{ color: '#059669' }} />,
      example: '{ "categorie": "SAV", "sous_categorie": "Retour", "resume": "...", "justification": "..." }',
    },
    {
      titleKey: TranslationKeyEnum.DefineWithPrecision,
      descriptionKey: TranslationKeyEnum.DefineWithPrecisionDesc,
      icon: <Description sx={{ color: '#7c3aed' }} />,
      example: "SAV – service après-vente (assistance technique, réclamation, demande de retour/échange)",
    },
    {
      titleKey: TranslationKeyEnum.LimitOutput,
      descriptionKey: TranslationKeyEnum.LimitOutputDesc,
      icon: <CheckCircle sx={{ color: '#dc2626' }} />,
      example: "Réponds exclusivement avec un objet JSON contenant les champs...",
    },
    {
      titleKey: TranslationKeyEnum.UseExamples,
      descriptionKey: TranslationKeyEnum.UseExamplesDesc,
      icon: <Psychology sx={{ color: '#f59e0b' }} />,
      example: "Objet: Demande de retour produit\nCorps: Mon ordinateur est défectueux...\nCatégorie: SAV",
    },
    {
      titleKey: TranslationKeyEnum.MeasureAndTest,
      descriptionKey: TranslationKeyEnum.MeasureAndTestDesc,
      icon: <Star sx={{ color: '#8b5cf6' }} />,
      example: "Constituez ~100 e-mails de test avec leurs catégories réelles",
    },
  ];

  // Example categories
  const exampleCategories = [
    { name: "SAV", color: "#ef4444", description: "Service après-vente, assistance technique, réclamations" },
    { name: "Facture", color: "#3b82f6", description: "Factures à payer, confirmations, rappels de paiement" },
    { name: "Urgence", color: "#f59e0b", description: "Incidents critiques nécessitant intervention immédiate" },
    { name: "RH", color: "#10b981", description: "Candidatures, congés, questions ressources humaines" },
    { name: "Commercial", color: "#8b5cf6", description: "Demandes de devis, offres commerciales" },
    { name: "Marketing", color: "#ec4899", description: "Newsletters, offres promotionnelles" },
    { name: "Divers", color: "#6b7280", description: "Aucune des catégories précédentes" },
  ];

  // Three recommended prompts
  const promptExamples = [
    {
      title: "Prompt 1: Classification zéro-shot avec JSON",
      typeKey: TranslationKeyEnum.SimpleAndRobust,
      color: "#2563eb",
      advantages: ["Sortie structurée JSON", "Instructions claires", "Consommation tokens limitée"],
      when: "Idéal pour une intégration simple avec des catégories bien définies",
    },
    {
      title: "Prompt 2: Classification few-shot avec exemples",
      typeKey: TranslationKeyEnum.ImprovedAccuracy,
      color: "#059669",
      advantages: ["Exemples pour guider", "Meilleure précision", "Format simple"],
      when: "Recommandé quand certaines catégories sont ambiguës ou rares",
    },
    {
      title: "Prompt 3: Avec justification et score de confiance",
      typeKey: TranslationKeyEnum.DeepAnalysis,
      color: "#7c3aed",
      advantages: ["Raisonnement explicite", "Score de confiance", "Analyse détaillée"],
      when: "Pour les cas nécessitant une compréhension du raisonnement de l'IA",
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Email sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {t(TranslationKeyEnum.EmailCategorizationGuide)}
            </Typography>
          </Stack>
          
          {/* Language Switcher */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLangEnum)}
              startAdornment={<LanguageIcon sx={{ mr: 1, color: 'action.active' }} />}
              sx={{
                backgroundColor: 'background.paper',
                '& .MuiSelect-select': {
                  py: 1,
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
            >
              {Object.entries(SupportedLangEnum).map(([_, value]) => (
                <MenuItem key={value} value={value}>
                  {LanguageDisplayNames[value]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Typography variant="h6" color="text.secondary">
          {t(TranslationKeyEnum.HowToStructureCategories)}
        </Typography>
      </Box>

      {/* Introduction Alert */}
      <Alert 
        severity="info" 
        icon={<AutoAwesome />}
        sx={{ mb: 4, borderRadius: 2 }}
      >
        <Typography variant="body1">
          {t(TranslationKeyEnum.GPTModelsCanRead)}
        </Typography>
      </Alert>

      {/* Best Practices Section */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, bgcolor: 'background.default', borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          📋 {t(TranslationKeyEnum.SixBestPractices)}
        </Typography>
        
        <Grid container spacing={3}>
          {bestPractices.map((practice, index) => (
            <Grid key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  }
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                    {practice.icon}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {index + 1}. {t(practice.titleKey)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {t(practice.descriptionKey)}
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 1.5, 
                          bgcolor: 'grey.50', 
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'grey.200'
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            color: 'text.secondary'
                          }}
                        >
                          {practice.example}
                        </Typography>
                      </Paper>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Categories Example */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          <Category sx={{ mr: 1, verticalAlign: 'middle' }} />
          {t(TranslationKeyEnum.WellDefinedCategoriesExample)}
        </Typography>
        
        <Grid container spacing={2}>
          {exampleCategories.map((category, index) => (
            <Grid key={index}>
              <Paper 
                sx={{ 
                  p: 2, 
                  bgcolor: 'white',
                  color: 'text.primary',
                  borderLeft: `4px solid ${category.color}`,
                  height: '100%'
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 700,
                    color: category.color,
                    mb: 0.5
                  }}
                >
                  {category.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {category.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Prompt Examples */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        🚀 {t(TranslationKeyEnum.ThreePromptApproaches)}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {promptExamples.map((prompt, index) => (
          <Grid key={index}>
            <Card 
              sx={{ 
                height: '100%',
                borderTop: `4px solid ${prompt.color}`,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {prompt.title}
                </Typography>
                <Chip 
                  label={t(prompt.typeKey)} 
                  size="small" 
                  sx={{ 
                    mb: 2,
                    bgcolor: `${prompt.color}20`,
                    color: prompt.color,
                    fontWeight: 600
                  }} 
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Avantages:</strong>
                </Typography>
                <List dense sx={{ mb: 2 }}>
                  {prompt.advantages.map((adv, i) => (
                    <ListItem key={i} sx={{ pl: 0 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CheckCircle sx={{ fontSize: 16, color: prompt.color }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={adv} 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="caption" color="text.secondary">
                  <strong>Quand l'utiliser:</strong> {prompt.when}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Implementation Tips */}
      <Accordion sx={{ mb: 4 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            💡 {t(TranslationKeyEnum.ImplementationTips)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemIcon>
                <Warning sx={{ color: 'warning.main' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Gestion des cas ambigus"
                secondary="Définissez une priorité claire (ex: 'Urgence' prime sur les autres catégories)"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Psychology sx={{ color: 'info.main' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Utilisation de l'API OpenAI"
                secondary="Utilisez response_format avec json_schema pour garantir un JSON valide"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle sx={{ color: 'success.main' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Validation continue"
                secondary="Ajustez régulièrement les descriptions selon les cas réels rencontrés"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Call to Action */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          p: 4, 
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: 1,
          borderColor: 'divider'
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          {t(TranslationKeyEnum.ReadyToAutomate)}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {t(TranslationKeyEnum.StartWithPrompt1)}
        </Typography>
        
        {/* Language Support Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            🌍 {t(TranslationKeyEnum.Language)}: 
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Chip label="🇺🇸 English" size="small" variant={language === SupportedLangEnum.English ? "filled" : "outlined"} />
            <Chip label="🇫🇷 Français" size="small" variant={language === SupportedLangEnum.French ? "filled" : "outlined"} />
            <Chip label="🇪🇸 Español" size="small" variant={language === SupportedLangEnum.Spanish ? "filled" : "outlined"} />
            <Chip label="🇩🇪 Deutsch" size="small" variant={language === SupportedLangEnum.German ? "filled" : "outlined"} />
          </Stack>
        </Box>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button 
            variant="contained" 
            size="large"
            startIcon={<Launch />}
            onClick={() => navigate(AppRouteEnum.Dashboard)} // Navigate to Dashboard (change to MailAutoForm when available)
          >
            {t(TranslationKeyEnum.ConfigureAutomation)}
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate(AppRouteEnum.Dashboard)}
          >
            {t(TranslationKeyEnum.ViewDashboard)}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;