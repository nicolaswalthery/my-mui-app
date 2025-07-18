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

const Settings: React.FC = () => {
  const { themeMode, setThemeMode, toggleTheme } = useThemeMode();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Paramètres
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Configurez votre application selon vos préférences
      </Typography>

      {showAlert && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Paramètres sauvegardés avec succès !
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Apparence
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Thème</FormLabel>
                <RadioGroup
                  value={themeMode}
                  onChange={(e) => setThemeMode(e.target.value as 'light' | 'dark')}
                >
                  <FormControlLabel value="light" control={<Radio />} label="Clair" />
                  <FormControlLabel value="dark" control={<Radio />} label="Sombre" />
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend">Langue</FormLabel>
                <RadioGroup
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <FormControlLabel value="fr" control={<Radio />} label="Français" />
                  <FormControlLabel value="en" control={<Radio />} label="English" />
                  <FormControlLabel value="es" control={<Radio />} label="Español" />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Préférences
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                  }
                  label="Notifications"
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
                  label="Sauvegarde automatique"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Profil utilisateur
              </Typography>
              
              <TextField
                fullWidth
                label="Nom d'utilisateur"
                defaultValue="John Doe"
                margin="normal"
                size="small"
              />
              
              <TextField
                fullWidth
                label="Email"
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
          Sauvegarder
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