// src/config/i18n.ts - Enhanced version
import { SupportedLangEnum, TranslationKeyEnum } from '../enums/TranslationKeyEnum';

const translations: Record<SupportedLangEnum, Record<TranslationKeyEnum, string>> = {
  [SupportedLangEnum.English]: {
    // Common UI
    [TranslationKeyEnum.Welcome]: 'Welcome',
    [TranslationKeyEnum.Logout]: 'Log out',
    [TranslationKeyEnum.Theme]: 'Theme',
    [TranslationKeyEnum.Save]: 'Save',
    [TranslationKeyEnum.Cancel]: 'Cancel',
    [TranslationKeyEnum.Delete]: 'Delete',
    [TranslationKeyEnum.Edit]: 'Edit',
    [TranslationKeyEnum.Add]: 'Add',
    [TranslationKeyEnum.Close]: 'Close',
    [TranslationKeyEnum.Confirm]: 'Confirm',
    [TranslationKeyEnum.Loading]: 'Loading...',
    [TranslationKeyEnum.Error]: 'Error',
    [TranslationKeyEnum.Success]: 'Success',
    
    // Navigation
    [TranslationKeyEnum.Home]: 'Home',
    [TranslationKeyEnum.Dashboard]: 'Dashboard',
    [TranslationKeyEnum.Settings]: 'Settings',
    [TranslationKeyEnum.Profile]: 'Profile',
    
    // Authentication
    [TranslationKeyEnum.Login]: 'Login',
    [TranslationKeyEnum.Email]: 'Email',
    [TranslationKeyEnum.Password]: 'Password',
    [TranslationKeyEnum.SignIn]: 'Sign In',
    [TranslationKeyEnum.VerificationCode]: 'Verification Code',
    [TranslationKeyEnum.EnterCode]: 'Enter Verification Code',
    [TranslationKeyEnum.VerifyCode]: 'Verify Code',
    [TranslationKeyEnum.InvalidCredentials]: '❌ Invalid email or password',
    [TranslationKeyEnum.InvalidCode]: '❌ Invalid or expired code',
    
    // Profile
    [TranslationKeyEnum.FirstName]: 'First Name',
    [TranslationKeyEnum.LastName]: 'Last Name',
    [TranslationKeyEnum.EditProfile]: 'Edit Profile',
    
    // Settings
    [TranslationKeyEnum.Appearance]: 'Appearance',
    [TranslationKeyEnum.Language]: 'Language',
    [TranslationKeyEnum.Notifications]: 'Notifications',
    [TranslationKeyEnum.AutoSave]: 'Auto Save',
    [TranslationKeyEnum.UserPreferences]: 'User Preferences',
    [TranslationKeyEnum.LightTheme]: 'Light',
    [TranslationKeyEnum.DarkTheme]: 'Dark',
    
    // Kanban
    [TranslationKeyEnum.KanbanBoard]: 'Kanban Board',
    [TranslationKeyEnum.ToDo]: 'To Do',
    [TranslationKeyEnum.InProgress]: 'In Progress',
    [TranslationKeyEnum.Done]: 'Done',
    [TranslationKeyEnum.AddTask]: 'Add Task',
    [TranslationKeyEnum.TaskTitle]: 'Task Title',
    [TranslationKeyEnum.TaskDescription]: 'Description (optional)',
    [TranslationKeyEnum.Priority]: 'Priority',
    [TranslationKeyEnum.High]: 'High',
    [TranslationKeyEnum.Medium]: 'Medium',
    [TranslationKeyEnum.Low]: 'Low',
    [TranslationKeyEnum.Assignee]: 'Assignee',
    
    // Table
    [TranslationKeyEnum.Clients]: 'Clients',
    [TranslationKeyEnum.Name]: 'Name',
    [TranslationKeyEnum.Age]: 'Age',
    [TranslationKeyEnum.Phone]: 'Phone',
    [TranslationKeyEnum.City]: 'City',
    [TranslationKeyEnum.Status]: 'Status',
    [TranslationKeyEnum.CreatedAt]: 'Created At',
    
    // Messages
    [TranslationKeyEnum.NoDataToDisplay]: 'No data to display',
    [TranslationKeyEnum.SettingsSaved]: 'Settings saved successfully!',
    [TranslationKeyEnum.SomethingWentWrong]: 'Something went wrong',
    [TranslationKeyEnum.PageNotFound]: 'Page Not Found',
    [TranslationKeyEnum.GoHome]: 'Go Home',
    [TranslationKeyEnum.ReloadApp]: 'Reload the App',
    
    // Additional Auth
    [TranslationKeyEnum.BackToLogin]: 'Back to Login',
    [TranslationKeyEnum.DemoVersion]: 'Demo Version',
    [TranslationKeyEnum.AnyCredentialsWork]: 'Any email/password combination will work',
    
    // Dashboard Stats
    [TranslationKeyEnum.TotalUsers]: 'Total Users',
    [TranslationKeyEnum.Sales]: 'Sales',
    [TranslationKeyEnum.Orders]: 'Orders',
    [TranslationKeyEnum.Growth]: 'Growth',
    [TranslationKeyEnum.RecentActivity]: 'Recent Activity',
    [TranslationKeyEnum.WelcomeToDashboard]: 'Welcome to your dashboard',
    [TranslationKeyEnum.NoRecentActivity]: 'No recent activity to display at the moment.',
    
    // Footer
    [TranslationKeyEnum.FooterText]: 'My MUI App',
  },
  
  [SupportedLangEnum.French]: {
    // Common UI
    [TranslationKeyEnum.Welcome]: 'Bienvenue',
    [TranslationKeyEnum.Logout]: 'Déconnexion',
    [TranslationKeyEnum.Theme]: 'Thème',
    [TranslationKeyEnum.Save]: 'Enregistrer',
    [TranslationKeyEnum.Cancel]: 'Annuler',
    [TranslationKeyEnum.Delete]: 'Supprimer',
    [TranslationKeyEnum.Edit]: 'Modifier',
    [TranslationKeyEnum.Add]: 'Ajouter',
    [TranslationKeyEnum.Close]: 'Fermer',
    [TranslationKeyEnum.Confirm]: 'Confirmer',
    [TranslationKeyEnum.Loading]: 'Chargement...',
    [TranslationKeyEnum.Error]: 'Erreur',
    [TranslationKeyEnum.Success]: 'Succès',
    
    // Navigation
    [TranslationKeyEnum.Home]: 'Accueil',
    [TranslationKeyEnum.Dashboard]: 'Tableau de bord',
    [TranslationKeyEnum.Settings]: 'Paramètres',
    [TranslationKeyEnum.Profile]: 'Profil',
    
    // Authentication
    [TranslationKeyEnum.Login]: 'Connexion',
    [TranslationKeyEnum.Email]: 'E-mail',
    [TranslationKeyEnum.Password]: 'Mot de passe',
    [TranslationKeyEnum.SignIn]: 'Se connecter',
    [TranslationKeyEnum.VerificationCode]: 'Code de vérification',
    [TranslationKeyEnum.EnterCode]: 'Entrer le code de vérification',
    [TranslationKeyEnum.VerifyCode]: 'Vérifier le code',
    [TranslationKeyEnum.InvalidCredentials]: '❌ Email ou mot de passe invalide',
    [TranslationKeyEnum.InvalidCode]: '❌ Code invalide ou expiré',
    
    // Profile
    [TranslationKeyEnum.FirstName]: 'Prénom',
    [TranslationKeyEnum.LastName]: 'Nom',
    [TranslationKeyEnum.EditProfile]: 'Modifier le profil',
    
    // Settings
    [TranslationKeyEnum.Appearance]: 'Apparence',
    [TranslationKeyEnum.Language]: 'Langue',
    [TranslationKeyEnum.Notifications]: 'Notifications',
    [TranslationKeyEnum.AutoSave]: 'Sauvegarde automatique',
    [TranslationKeyEnum.UserPreferences]: 'Préférences utilisateur',
    [TranslationKeyEnum.LightTheme]: 'Clair',
    [TranslationKeyEnum.DarkTheme]: 'Sombre',
    
    // Kanban
    [TranslationKeyEnum.KanbanBoard]: 'Tableau Kanban',
    [TranslationKeyEnum.ToDo]: 'À faire',
    [TranslationKeyEnum.InProgress]: 'En cours',
    [TranslationKeyEnum.Done]: 'Terminé',
    [TranslationKeyEnum.AddTask]: 'Ajouter une tâche',
    [TranslationKeyEnum.TaskTitle]: 'Titre de la tâche',
    [TranslationKeyEnum.TaskDescription]: 'Description (optionnel)',
    [TranslationKeyEnum.Priority]: 'Priorité',
    [TranslationKeyEnum.High]: 'Haute',
    [TranslationKeyEnum.Medium]: 'Moyenne',
    [TranslationKeyEnum.Low]: 'Basse',
    [TranslationKeyEnum.Assignee]: 'Assigné',
    
    // Table
    [TranslationKeyEnum.Clients]: 'Clients',
    [TranslationKeyEnum.Name]: 'Nom',
    [TranslationKeyEnum.Age]: 'Âge',
    [TranslationKeyEnum.Phone]: 'Téléphone',
    [TranslationKeyEnum.City]: 'Ville',
    [TranslationKeyEnum.Status]: 'Statut',
    [TranslationKeyEnum.CreatedAt]: 'Date de création',
    
    // Messages
    [TranslationKeyEnum.NoDataToDisplay]: 'Aucune donnée à afficher',
    [TranslationKeyEnum.SettingsSaved]: 'Paramètres sauvegardés avec succès !',
    [TranslationKeyEnum.SomethingWentWrong]: 'Une erreur s\'est produite',
    [TranslationKeyEnum.PageNotFound]: 'Page non trouvée',
    [TranslationKeyEnum.GoHome]: 'Retour à l\'accueil',
    [TranslationKeyEnum.ReloadApp]: 'Recharger l\'application',
    
    // Additional Auth
    [TranslationKeyEnum.BackToLogin]: 'Retour à la connexion',
    [TranslationKeyEnum.DemoVersion]: 'Version de démonstration',
    [TranslationKeyEnum.AnyCredentialsWork]: 'N\'importe quelle combinaison email/mot de passe fonctionnera',
    
    // Dashboard Stats
    [TranslationKeyEnum.TotalUsers]: 'Total Utilisateurs',
    [TranslationKeyEnum.Sales]: 'Ventes',
    [TranslationKeyEnum.Orders]: 'Commandes',
    [TranslationKeyEnum.Growth]: 'Croissance',
    [TranslationKeyEnum.RecentActivity]: 'Activité récente',
    [TranslationKeyEnum.WelcomeToDashboard]: 'Bienvenue sur votre tableau de bord',
    [TranslationKeyEnum.NoRecentActivity]: 'Aucune activité récente à afficher pour le moment.',
    
    // Footer
    [TranslationKeyEnum.FooterText]: 'Mon App MUI',
  },
  
  [SupportedLangEnum.Spanish]: {
    // Common UI
    [TranslationKeyEnum.Welcome]: 'Bienvenido',
    [TranslationKeyEnum.Logout]: 'Cerrar sesión',
    [TranslationKeyEnum.Theme]: 'Tema',
    [TranslationKeyEnum.Save]: 'Guardar',
    [TranslationKeyEnum.Cancel]: 'Cancelar',
    [TranslationKeyEnum.Delete]: 'Eliminar',
    [TranslationKeyEnum.Edit]: 'Editar',
    [TranslationKeyEnum.Add]: 'Agregar',
    [TranslationKeyEnum.Close]: 'Cerrar',
    [TranslationKeyEnum.Confirm]: 'Confirmar',
    [TranslationKeyEnum.Loading]: 'Cargando...',
    [TranslationKeyEnum.Error]: 'Error',
    [TranslationKeyEnum.Success]: 'Éxito',
    
    // Navigation
    [TranslationKeyEnum.Home]: 'Inicio',
    [TranslationKeyEnum.Dashboard]: 'Panel de control',
    [TranslationKeyEnum.Settings]: 'Configuración',
    [TranslationKeyEnum.Profile]: 'Perfil',
    
    // Authentication
    [TranslationKeyEnum.Login]: 'Iniciar sesión',
    [TranslationKeyEnum.Email]: 'Correo electrónico',
    [TranslationKeyEnum.Password]: 'Contraseña',
    [TranslationKeyEnum.SignIn]: 'Iniciar sesión',
    [TranslationKeyEnum.VerificationCode]: 'Código de verificación',
    [TranslationKeyEnum.EnterCode]: 'Ingresa el código de verificación',
    [TranslationKeyEnum.VerifyCode]: 'Verificar código',
    [TranslationKeyEnum.InvalidCredentials]: '❌ Email o contraseña inválidos',
    [TranslationKeyEnum.InvalidCode]: '❌ Código inválido o expirado',
    
    // Profile
    [TranslationKeyEnum.FirstName]: 'Nombre',
    [TranslationKeyEnum.LastName]: 'Apellido',
    [TranslationKeyEnum.EditProfile]: 'Editar perfil',
    
    // Settings
    [TranslationKeyEnum.Appearance]: 'Apariencia',
    [TranslationKeyEnum.Language]: 'Idioma',
    [TranslationKeyEnum.Notifications]: 'Notificaciones',
    [TranslationKeyEnum.AutoSave]: 'Guardado automático',
    [TranslationKeyEnum.UserPreferences]: 'Preferencias de usuario',
    [TranslationKeyEnum.LightTheme]: 'Claro',
    [TranslationKeyEnum.DarkTheme]: 'Oscuro',
    
    // Kanban
    [TranslationKeyEnum.KanbanBoard]: 'Tablero Kanban',
    [TranslationKeyEnum.ToDo]: 'Por hacer',
    [TranslationKeyEnum.InProgress]: 'En progreso',
    [TranslationKeyEnum.Done]: 'Completado',
    [TranslationKeyEnum.AddTask]: 'Agregar tarea',
    [TranslationKeyEnum.TaskTitle]: 'Título de la tarea',
    [TranslationKeyEnum.TaskDescription]: 'Descripción (opcional)',
    [TranslationKeyEnum.Priority]: 'Prioridad',
    [TranslationKeyEnum.High]: 'Alta',
    [TranslationKeyEnum.Medium]: 'Media',
    [TranslationKeyEnum.Low]: 'Baja',
    [TranslationKeyEnum.Assignee]: 'Asignado',
    
    // Table
    [TranslationKeyEnum.Clients]: 'Clientes',
    [TranslationKeyEnum.Name]: 'Nombre',
    [TranslationKeyEnum.Age]: 'Edad',
    [TranslationKeyEnum.Phone]: 'Teléfono',
    [TranslationKeyEnum.City]: 'Ciudad',
    [TranslationKeyEnum.Status]: 'Estado',
    [TranslationKeyEnum.CreatedAt]: 'Fecha de creación',
    
    // Messages
    [TranslationKeyEnum.NoDataToDisplay]: 'No hay datos para mostrar',
    [TranslationKeyEnum.SettingsSaved]: '¡Configuración guardada exitosamente!',
    [TranslationKeyEnum.SomethingWentWrong]: 'Algo salió mal',
    [TranslationKeyEnum.PageNotFound]: 'Página no encontrada',
    [TranslationKeyEnum.GoHome]: 'Ir al inicio',
    [TranslationKeyEnum.ReloadApp]: 'Recargar la aplicación',
    
    // Additional Auth
    [TranslationKeyEnum.BackToLogin]: 'Volver al inicio de sesión',
    [TranslationKeyEnum.DemoVersion]: 'Versión de demostración',
    [TranslationKeyEnum.AnyCredentialsWork]: 'Cualquier combinación de email/contraseña funcionará',
    
    // Dashboard Stats
    [TranslationKeyEnum.TotalUsers]: 'Total Usuarios',
    [TranslationKeyEnum.Sales]: 'Ventas',
    [TranslationKeyEnum.Orders]: 'Pedidos',
    [TranslationKeyEnum.Growth]: 'Crecimiento',
    [TranslationKeyEnum.RecentActivity]: 'Actividad reciente',
    [TranslationKeyEnum.WelcomeToDashboard]: 'Bienvenido a tu panel de control',
    [TranslationKeyEnum.NoRecentActivity]: 'No hay actividad reciente para mostrar en este momento.',
    
    // Footer
    [TranslationKeyEnum.FooterText]: 'Mi App MUI',
  },
  
  [SupportedLangEnum.German]: {
    // Common UI
    [TranslationKeyEnum.Welcome]: 'Willkommen',
    [TranslationKeyEnum.Logout]: 'Abmelden',
    [TranslationKeyEnum.Theme]: 'Design',
    [TranslationKeyEnum.Save]: 'Speichern',
    [TranslationKeyEnum.Cancel]: 'Abbrechen',
    [TranslationKeyEnum.Delete]: 'Löschen',
    [TranslationKeyEnum.Edit]: 'Bearbeiten',
    [TranslationKeyEnum.Add]: 'Hinzufügen',
    [TranslationKeyEnum.Close]: 'Schließen',
    [TranslationKeyEnum.Confirm]: 'Bestätigen',
    [TranslationKeyEnum.Loading]: 'Lädt...',
    [TranslationKeyEnum.Error]: 'Fehler',
    [TranslationKeyEnum.Success]: 'Erfolg',
    
    // Navigation
    [TranslationKeyEnum.Home]: 'Startseite',
    [TranslationKeyEnum.Dashboard]: 'Dashboard',
    [TranslationKeyEnum.Settings]: 'Einstellungen',
    [TranslationKeyEnum.Profile]: 'Profil',
    
    // Authentication
    [TranslationKeyEnum.Login]: 'Anmelden',
    [TranslationKeyEnum.Email]: 'E-Mail',
    [TranslationKeyEnum.Password]: 'Passwort',
    [TranslationKeyEnum.SignIn]: 'Anmelden',
    [TranslationKeyEnum.VerificationCode]: 'Verifikationscode',
    [TranslationKeyEnum.EnterCode]: 'Verifikationscode eingeben',
    [TranslationKeyEnum.VerifyCode]: 'Code verifizieren',
    [TranslationKeyEnum.InvalidCredentials]: '❌ Ungültige E-Mail oder Passwort',
    [TranslationKeyEnum.InvalidCode]: '❌ Ungültiger oder abgelaufener Code',
    
    // Profile
    [TranslationKeyEnum.FirstName]: 'Vorname',
    [TranslationKeyEnum.LastName]: 'Nachname',
    [TranslationKeyEnum.EditProfile]: 'Profil bearbeiten',
    
    // Settings
    [TranslationKeyEnum.Appearance]: 'Erscheinungsbild',
    [TranslationKeyEnum.Language]: 'Sprache',
    [TranslationKeyEnum.Notifications]: 'Benachrichtigungen',
    [TranslationKeyEnum.AutoSave]: 'Automatisches Speichern',
    [TranslationKeyEnum.UserPreferences]: 'Benutzereinstellungen',
    [TranslationKeyEnum.LightTheme]: 'Hell',
    [TranslationKeyEnum.DarkTheme]: 'Dunkel',
    
    // Kanban
    [TranslationKeyEnum.KanbanBoard]: 'Kanban Board',
    [TranslationKeyEnum.ToDo]: 'Zu erledigen',
    [TranslationKeyEnum.InProgress]: 'In Bearbeitung',
    [TranslationKeyEnum.Done]: 'Erledigt',
    [TranslationKeyEnum.AddTask]: 'Aufgabe hinzufügen',
    [TranslationKeyEnum.TaskTitle]: 'Aufgabentitel',
    [TranslationKeyEnum.TaskDescription]: 'Beschreibung (optional)',
    [TranslationKeyEnum.Priority]: 'Priorität',
    [TranslationKeyEnum.High]: 'Hoch',
    [TranslationKeyEnum.Medium]: 'Mittel',
    [TranslationKeyEnum.Low]: 'Niedrig',
    [TranslationKeyEnum.Assignee]: 'Zugewiesen',
    
    // Table
    [TranslationKeyEnum.Clients]: 'Kunden',
    [TranslationKeyEnum.Name]: 'Name',
    [TranslationKeyEnum.Age]: 'Alter',
    [TranslationKeyEnum.Phone]: 'Telefon',
    [TranslationKeyEnum.City]: 'Stadt',
    [TranslationKeyEnum.Status]: 'Status',
    [TranslationKeyEnum.CreatedAt]: 'Erstellt am',
    
    // Messages
    [TranslationKeyEnum.NoDataToDisplay]: 'Keine Daten zum Anzeigen',
    [TranslationKeyEnum.SettingsSaved]: 'Einstellungen erfolgreich gespeichert!',
    [TranslationKeyEnum.SomethingWentWrong]: 'Etwas ist schief gelaufen',
    [TranslationKeyEnum.PageNotFound]: 'Seite nicht gefunden',
    [TranslationKeyEnum.GoHome]: 'Zur Startseite',
    [TranslationKeyEnum.ReloadApp]: 'App neu laden',
    
    // Additional Auth
    [TranslationKeyEnum.BackToLogin]: 'Zurück zur Anmeldung',
    [TranslationKeyEnum.DemoVersion]: 'Demo-Version',
    [TranslationKeyEnum.AnyCredentialsWork]: 'Jede E-Mail/Passwort-Kombination funktioniert',
    
    // Dashboard Stats
    [TranslationKeyEnum.TotalUsers]: 'Benutzer Gesamt',
    [TranslationKeyEnum.Sales]: 'Verkäufe',
    [TranslationKeyEnum.Orders]: 'Bestellungen',
    [TranslationKeyEnum.Growth]: 'Wachstum',
    [TranslationKeyEnum.RecentActivity]: 'Kürzliche Aktivität',
    [TranslationKeyEnum.WelcomeToDashboard]: 'Willkommen zu Ihrem Dashboard',
    [TranslationKeyEnum.NoRecentActivity]: 'Momentan keine kürzlichen Aktivitäten anzuzeigen.',
    
    // Footer
    [TranslationKeyEnum.FooterText]: 'Meine MUI App',
  },
};

export const getTranslations = (lang: SupportedLangEnum): Record<string, string> => {
  return translations[lang] || translations[SupportedLangEnum.English];
};

export const getTranslation = (
  lang: SupportedLangEnum,
  key: TranslationKeyEnum
): string => {
  const langTranslations = translations[lang] || translations[SupportedLangEnum.English];
  return langTranslations[key] || key;
};

// Helper function to get all available languages
export const getAvailableLanguages = (): Array<{ code: SupportedLangEnum; name: string }> => {
  return Object.values(SupportedLangEnum).map(code => ({
    code,
    name: getLanguageDisplayName(code)
  }));
};

// Helper function to get language display name
export const getLanguageDisplayName = (lang: SupportedLangEnum): string => {
  const displayNames: Record<SupportedLangEnum, string> = {
    [SupportedLangEnum.English]: 'English',
    [SupportedLangEnum.French]: 'Français',
    [SupportedLangEnum.Spanish]: 'Español',
    [SupportedLangEnum.German]: 'Deutsch',
  };
  return displayNames[lang] || lang;
};