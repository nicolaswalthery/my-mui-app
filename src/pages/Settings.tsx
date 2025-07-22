// src/pages/Settings.tsx - Updated with i18n
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Divider,
  Button,
  TextField,
  Grid,
  Alert,
} from '@mui/material';
import { Save, Restore } from '@mui/icons-material';
import { useThemeMode } from '../theme/ThemeProvider';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Settings: React.FC = () => {
  const { themeMode, setThemeMode } = useThemeMode();
  const { t } = useI18n();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t(TranslationKeyEnum.Settings)}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Configurez votre application selon vos préférences
      </Typography>

      {showAlert && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {t(TranslationKeyEnum.SettingsSaved)}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t(TranslationKeyEnum.Appearance)}
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">
                  {t(TranslationKeyEnum.Theme)}
                </FormLabel>
                <RadioGroup
                  value={themeMode}
                  onChange={(e) => setThemeMode(e.target.value as 'light' | 'dark')}
                >
                  <FormControlLabel 
                    value="light" 
                    control={<Radio />} 
                    label={t(TranslationKeyEnum.LightTheme)} 
                  />
                  <FormControlLabel 
                    value="dark" 
                    control={<Radio />} 
                    label={t(TranslationKeyEnum.DarkTheme)} 
                  />
                </RadioGroup>
              </FormControl>

              {/* Language Switcher */}
              <Box sx={{ mt: 3 }}>
                <LanguageSwitcher />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t(TranslationKeyEnum.UserPreferences)}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                  }
                  label={t(TranslationKeyEnum.Notifications)}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                    />
                  }
                  label={t(TranslationKeyEnum.AutoSave)}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Profil utilisateur
              </Typography>
              
              <TextField
                fullWidth
                label={t(TranslationKeyEnum.FirstName)}
                defaultValue="John"
                margin="normal"
                size="small"
              />
              
              <TextField
                fullWidth
                label={t(TranslationKeyEnum.Email)}
                defaultValue="john.doe@example.com"
                margin="normal"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
        >
          {t(TranslationKeyEnum.Save)}
        </Button>
        <Button
          variant="outlined"
          startIcon={<Restore />}
        >
          Réinitialiser
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;