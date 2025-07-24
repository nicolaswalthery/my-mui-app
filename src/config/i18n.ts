// src/config/i18n.ts - Enhanced version with NotFound page support
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
    
    // Form Validation
    [TranslationKeyEnum.Required]: 'Required',
    [TranslationKeyEnum.ValidEmailRequired]: 'Please enter a valid email address',
    [TranslationKeyEnum.FieldRequired]: 'This field is required',
    [TranslationKeyEnum.ChangesSavedLocally]: 'Your changes will be saved locally in this demo.',
    
    // Error Page
    [TranslationKeyEnum.CriticalError]: 'Critical Error',
    [TranslationKeyEnum.ErrorDescription]: 'The application has encountered a critical error. This might be due to a server issue or an unexpected failure.',
    
    // NotFound Page
    [TranslationKeyEnum.NotFoundTitle]: '404',
    [TranslationKeyEnum.NotFoundSubtitle]: 'Page Not Found',
    [TranslationKeyEnum.NotFoundDescription]: 'The page you\'re looking for doesn\'t exist or has been moved.',
    
    // Home Page
    [TranslationKeyEnum.WelcomeToApp]: 'Welcome to your application',
    [TranslationKeyEnum.DiscoverFeatures]: 'Discover all the features of your Material-UI application. This home page presents the main characteristics of the app.',
    [TranslationKeyEnum.GetStarted]: 'Get Started',
    [TranslationKeyEnum.LearnMore]: 'Learn More',
    [TranslationKeyEnum.MainFeatures]: 'Main Features',
    [TranslationKeyEnum.ModernInterface]: 'Modern Interface',
    [TranslationKeyEnum.ModernInterfaceDesc]: 'A modern and intuitive user interface built with Material-UI',
    [TranslationKeyEnum.ResponsiveDesign]: 'Responsive Design',
    [TranslationKeyEnum.ResponsiveDesignDesc]: 'Perfectly adapts to all types of screens and devices',
    [TranslationKeyEnum.OptimizedPerformance]: 'Optimized Performance',
    [TranslationKeyEnum.OptimizedPerformanceDesc]: 'Application optimized for fast and smooth performance',
    [TranslationKeyEnum.Image]: 'Image',
    
    // Kanban Page
    [TranslationKeyEnum.ManageTasksWithDragDrop]: 'Manage your tasks with an intuitive drag-and-drop system',
    [TranslationKeyEnum.Reset]: 'Reset',
    [TranslationKeyEnum.UsageInstructions]: 'Usage Instructions:',
    [TranslationKeyEnum.DragAndDrop]: 'Drag and Drop',
    [TranslationKeyEnum.DragAndDropDesc]: 'Click and drag cards between columns',
    [TranslationKeyEnum.EditTitles]: 'Edit Titles',
    [TranslationKeyEnum.EditTitlesDesc]: 'Click the edit icon in column headers',
    [TranslationKeyEnum.AddTasks]: 'Add Tasks',
    [TranslationKeyEnum.AddTasksDesc]: 'Use the "Add Task" button in each column',
    [TranslationKeyEnum.DeleteTasks]: 'Delete Tasks',
    [TranslationKeyEnum.DeleteTasksDesc]: 'Click the delete icon on each card',
    [TranslationKeyEnum.Priorities]: 'Priorities',
    [TranslationKeyEnum.PrioritiesDesc]: 'Tasks are marked with colors (red: high, orange: medium, green: low)',
    
    // Sample Kanban Tasks
    [TranslationKeyEnum.AnalyzeClientNeeds]: 'Analyze client needs',
    [TranslationKeyEnum.AnalyzeClientNeedsDesc]: 'Meet with client to understand specific requirements',
    [TranslationKeyEnum.CreateWireframes]: 'Create wireframes',
    [TranslationKeyEnum.CreateWireframesDesc]: 'Design main application mockups',
    [TranslationKeyEnum.WriteDocumentation]: 'Write documentation',
    [TranslationKeyEnum.WriteDocumentationDesc]: 'Technical project documentation',
    [TranslationKeyEnum.ApiDevelopment]: 'API Development',
    [TranslationKeyEnum.ApiDevelopmentDesc]: 'Implement REST endpoints',
    [TranslationKeyEnum.UnitTesting]: 'Unit Testing',
    [TranslationKeyEnum.UnitTestingDesc]: 'Write tests for components',
    [TranslationKeyEnum.ProjectSetup]: 'Project Setup',
    [TranslationKeyEnum.ProjectSetupDesc]: 'Set up development environment',
    [TranslationKeyEnum.TechStackSelection]: 'Tech Stack Selection',
    [TranslationKeyEnum.TechStackSelectionDesc]: 'Technical stack selection',
    
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
    [TranslationKeyEnum.Profile]: 'Profile',
    
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
    
    // Form Validation
    [TranslationKeyEnum.Required]: 'Requis',
    [TranslationKeyEnum.ValidEmailRequired]: 'Veuillez entrer une adresse e-mail valide',
    [TranslationKeyEnum.FieldRequired]: 'Ce champ est requis',
    [TranslationKeyEnum.ChangesSavedLocally]: 'Vos modifications seront sauvegardées localement dans cette démo.',
    
    // Error Page
    [TranslationKeyEnum.CriticalError]: 'Erreur Critique',
    [TranslationKeyEnum.ErrorDescription]: 'L\'application a rencontré une erreur critique. Cela peut être dû à un problème de serveur ou à une défaillance inattendue.',
    
    // NotFound Page
    [TranslationKeyEnum.NotFoundTitle]: '404',
    [TranslationKeyEnum.NotFoundSubtitle]: 'Page non trouvée',
    [TranslationKeyEnum.NotFoundDescription]: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    
    // Home Page
    [TranslationKeyEnum.WelcomeToApp]: 'Bienvenue dans votre application',
    [TranslationKeyEnum.DiscoverFeatures]: 'Découvrez toutes les fonctionnalités de votre application Material-UI. Cette page d\'accueil vous présente les principales caractéristiques de l\'app.',
    [TranslationKeyEnum.GetStarted]: 'Commencer',
    [TranslationKeyEnum.LearnMore]: 'En savoir plus',
    [TranslationKeyEnum.MainFeatures]: 'Fonctionnalités principales',
    [TranslationKeyEnum.ModernInterface]: 'Interface moderne',
    [TranslationKeyEnum.ModernInterfaceDesc]: 'Une interface utilisateur moderne et intuitive construite avec Material-UI',
    [TranslationKeyEnum.ResponsiveDesign]: 'Design Réactif',
    [TranslationKeyEnum.ResponsiveDesignDesc]: 'S\'adapte parfaitement à tous les types d\'écrans et appareils',
    [TranslationKeyEnum.OptimizedPerformance]: 'Performance optimisée',
    [TranslationKeyEnum.OptimizedPerformanceDesc]: 'Application optimisée pour des performances rapides et fluides',
    [TranslationKeyEnum.Image]: 'Image',
    
    // Kanban Page
    [TranslationKeyEnum.ManageTasksWithDragDrop]: 'Gérez vos tâches avec un système de glisser-déposer intuitif',
    [TranslationKeyEnum.Reset]: 'Réinitialiser',
    [TranslationKeyEnum.UsageInstructions]: 'Instructions d\'utilisation :',
    [TranslationKeyEnum.DragAndDrop]: 'Glisser-déposer',
    [TranslationKeyEnum.DragAndDropDesc]: 'Cliquez et faites glisser les cartes entre les colonnes',
    [TranslationKeyEnum.EditTitles]: 'Modifier les titres',
    [TranslationKeyEnum.EditTitlesDesc]: 'Cliquez sur l\'icône d\'édition dans l\'en-tête des colonnes',
    [TranslationKeyEnum.AddTasks]: 'Ajouter des tâches',
    [TranslationKeyEnum.AddTasksDesc]: 'Utilisez le bouton "Ajouter une tâche" dans chaque colonne',
    [TranslationKeyEnum.DeleteTasks]: 'Supprimer des tâches',
    [TranslationKeyEnum.DeleteTasksDesc]: 'Cliquez sur l\'icône de suppression sur chaque carte',
    [TranslationKeyEnum.Priorities]: 'Priorités',
    [TranslationKeyEnum.PrioritiesDesc]: 'Les tâches sont marquées avec des couleurs (rouge: haute, orange: moyenne, vert: basse)',
    
    // Sample Kanban Tasks
    [TranslationKeyEnum.AnalyzeClientNeeds]: 'Analyser les besoins client',
    [TranslationKeyEnum.AnalyzeClientNeedsDesc]: 'Rencontrer le client pour comprendre ses besoins spécifiques',
    [TranslationKeyEnum.CreateWireframes]: 'Créer les wireframes',
    [TranslationKeyEnum.CreateWireframesDesc]: 'Dessiner les maquettes principales de l\'application',
    [TranslationKeyEnum.WriteDocumentation]: 'Rédiger la documentation',
    [TranslationKeyEnum.WriteDocumentationDesc]: 'Documentation technique du projet',
    [TranslationKeyEnum.ApiDevelopment]: 'Développement de l\'API',
    [TranslationKeyEnum.ApiDevelopmentDesc]: 'Implémenter les endpoints REST',
    [TranslationKeyEnum.UnitTesting]: 'Tests unitaires',
    [TranslationKeyEnum.UnitTestingDesc]: 'Écrire les tests pour les composants',
    [TranslationKeyEnum.ProjectSetup]: 'Configuration du projet',
    [TranslationKeyEnum.ProjectSetupDesc]: 'Mise en place de l\'environnement de développement',
    [TranslationKeyEnum.TechStackSelection]: 'Choix des technologies',
    [TranslationKeyEnum.TechStackSelectionDesc]: 'Sélection du stack technique',
    
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
    
    // Form Validation
    [TranslationKeyEnum.Required]: 'Requerido',
    [TranslationKeyEnum.ValidEmailRequired]: 'Por favor ingresa una dirección de correo válida',
    [TranslationKeyEnum.FieldRequired]: 'Este campo es requerido',
    [TranslationKeyEnum.ChangesSavedLocally]: 'Tus cambios se guardarán localmente en esta demo.',
    
    // Error Page
    [TranslationKeyEnum.CriticalError]: 'Error Crítico',
    [TranslationKeyEnum.ErrorDescription]: 'La aplicación ha encontrado un error crítico. Esto podría deberse a un problema del servidor o a una falla inesperada.',
    
    // NotFound Page
    [TranslationKeyEnum.NotFoundTitle]: '404',
    [TranslationKeyEnum.NotFoundSubtitle]: 'Página no encontrada',
    [TranslationKeyEnum.NotFoundDescription]: 'La página que buscas no existe o ha sido movida.',
    
    // Home Page
    [TranslationKeyEnum.WelcomeToApp]: 'Bienvenido a tu aplicación',
    [TranslationKeyEnum.DiscoverFeatures]: 'Descubre todas las características de tu aplicación Material-UI. Esta página de inicio presenta las principales funcionalidades de la app.',
    [TranslationKeyEnum.GetStarted]: 'Comenzar',
    [TranslationKeyEnum.LearnMore]: 'Saber más',
    [TranslationKeyEnum.MainFeatures]: 'Características principales',
    [TranslationKeyEnum.ModernInterface]: 'Interfaz Moderna',
    [TranslationKeyEnum.ModernInterfaceDesc]: 'Una interfaz de usuario moderna e intuitiva construida con Material-UI',
    [TranslationKeyEnum.ResponsiveDesign]: 'Diseño Responsivo',
    [TranslationKeyEnum.ResponsiveDesignDesc]: 'Se adapta perfectamente a todo tipo de pantallas y dispositivos',
    [TranslationKeyEnum.OptimizedPerformance]: 'Rendimiento Optimizado',
    [TranslationKeyEnum.OptimizedPerformanceDesc]: 'Aplicación optimizada para un rendimiento rápido y fluido',
    [TranslationKeyEnum.Image]: 'Imagen',
    
    // Kanban Page
    [TranslationKeyEnum.ManageTasksWithDragDrop]: 'Gestiona tus tareas con un sistema intuitivo de arrastrar y soltar',
    [TranslationKeyEnum.Reset]: 'Reiniciar',
    [TranslationKeyEnum.UsageInstructions]: 'Instrucciones de uso:',
    [TranslationKeyEnum.DragAndDrop]: 'Arrastrar y soltar',
    [TranslationKeyEnum.DragAndDropDesc]: 'Haz clic y arrastra las tarjetas entre columnas',
    [TranslationKeyEnum.EditTitles]: 'Editar títulos',
    [TranslationKeyEnum.EditTitlesDesc]: 'Haz clic en el icono de edición en los encabezados de columna',
    [TranslationKeyEnum.AddTasks]: 'Agregar tareas',
    [TranslationKeyEnum.AddTasksDesc]: 'Usa el botón "Agregar tarea" en cada columna',
    [TranslationKeyEnum.DeleteTasks]: 'Eliminar tareas',
    [TranslationKeyEnum.DeleteTasksDesc]: 'Haz clic en el icono de eliminar en cada tarjeta',
    [TranslationKeyEnum.Priorities]: 'Prioridades',
    [TranslationKeyEnum.PrioritiesDesc]: 'Las tareas están marcadas con colores (rojo: alta, naranja: media, verde: baja)',
    
    // Sample Kanban Tasks
    [TranslationKeyEnum.AnalyzeClientNeeds]: 'Analizar necesidades del cliente',
    [TranslationKeyEnum.AnalyzeClientNeedsDesc]: 'Reunirse con el cliente para entender los requisitos específicos',
    [TranslationKeyEnum.CreateWireframes]: 'Crear wireframes',
    [TranslationKeyEnum.CreateWireframesDesc]: 'Diseñar las maquetas principales de la aplicación',
    [TranslationKeyEnum.WriteDocumentation]: 'Escribir documentación',
    [TranslationKeyEnum.WriteDocumentationDesc]: 'Documentación técnica del proyecto',
    [TranslationKeyEnum.ApiDevelopment]: 'Desarrollo de API',
    [TranslationKeyEnum.ApiDevelopmentDesc]: 'Implementar endpoints REST',
    [TranslationKeyEnum.UnitTesting]: 'Pruebas unitarias',
    [TranslationKeyEnum.UnitTestingDesc]: 'Escribir pruebas para los componentes',
    [TranslationKeyEnum.ProjectSetup]: 'Configuración del proyecto',
    [TranslationKeyEnum.ProjectSetupDesc]: 'Configurar el entorno de desarrollo',
    [TranslationKeyEnum.TechStackSelection]: 'Selección de tecnologías',
    [TranslationKeyEnum.TechStackSelectionDesc]: 'Selección del stack técnico',
    
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
    
    // Form Validation
    [TranslationKeyEnum.Required]: 'Erforderlich',
    [TranslationKeyEnum.ValidEmailRequired]: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    [TranslationKeyEnum.FieldRequired]: 'Dieses Feld ist erforderlich',
    [TranslationKeyEnum.ChangesSavedLocally]: 'Ihre Änderungen werden lokal in dieser Demo gespeichert.',
    
    // Error Page
    [TranslationKeyEnum.CriticalError]: 'Kritischer Fehler',
    [TranslationKeyEnum.ErrorDescription]: 'Die Anwendung ist auf einen kritischen Fehler gestoßen. Dies könnte auf ein Serverproblem oder einen unerwarteten Ausfall zurückzuführen sein.',
    
    // NotFound Page
    [TranslationKeyEnum.NotFoundTitle]: '404',
    [TranslationKeyEnum.NotFoundSubtitle]: 'Seite nicht gefunden',
    [TranslationKeyEnum.NotFoundDescription]: 'Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.',
    
    // Home Page
    [TranslationKeyEnum.WelcomeToApp]: 'Willkommen zu Ihrer Anwendung',
    [TranslationKeyEnum.DiscoverFeatures]: 'Entdecken Sie alle Funktionen Ihrer Material-UI-Anwendung. Diese Startseite präsentiert die Hauptmerkmale der App.',
    [TranslationKeyEnum.GetStarted]: 'Loslegen',
    [TranslationKeyEnum.LearnMore]: 'Mehr erfahren',
    [TranslationKeyEnum.MainFeatures]: 'Hauptfunktionen',
    [TranslationKeyEnum.ModernInterface]: 'Moderne Benutzeroberfläche',
    [TranslationKeyEnum.ModernInterfaceDesc]: 'Eine moderne und intuitive Benutzeroberfläche, erstellt mit Material-UI',
    [TranslationKeyEnum.ResponsiveDesign]: 'Responsives Design',
    [TranslationKeyEnum.ResponsiveDesignDesc]: 'Passt sich perfekt an alle Bildschirmtypen und Geräte an',
    [TranslationKeyEnum.OptimizedPerformance]: 'Optimierte Leistung',
    [TranslationKeyEnum.OptimizedPerformanceDesc]: 'Anwendung optimiert für schnelle und flüssige Leistung',
    [TranslationKeyEnum.Image]: 'Bild',
    
    // Kanban Page
    [TranslationKeyEnum.ManageTasksWithDragDrop]: 'Verwalten Sie Ihre Aufgaben mit einem intuitiven Drag-and-Drop-System',
    [TranslationKeyEnum.Reset]: 'Zurücksetzen',
    [TranslationKeyEnum.DragAndDrop]: 'Drag and Drop',
    [TranslationKeyEnum.DragAndDropDesc]: 'Klicken und ziehen Sie Karten zwischen Spalten',
    [TranslationKeyEnum.EditTitles]: 'Titel bearbeiten',
    [TranslationKeyEnum.EditTitlesDesc]: 'Klicken Sie auf das Bearbeitungssymbol in den Spaltenköpfen',
    [TranslationKeyEnum.AddTasks]: 'Aufgaben hinzufügen',
    [TranslationKeyEnum.AddTasksDesc]: 'Verwenden Sie die Schaltfläche "Aufgabe hinzufügen" in jeder Spalte',
    [TranslationKeyEnum.DeleteTasks]: 'Aufgaben löschen',
    [TranslationKeyEnum.DeleteTasksDesc]: 'Klicken Sie auf das Löschsymbol auf jeder Karte',
    [TranslationKeyEnum.Priorities]: 'Prioritäten',
    [TranslationKeyEnum.PrioritiesDesc]: 'Aufgaben sind mit Farben markiert (rot: hoch, orange: mittel, grün: niedrig)',
    
    // Sample Kanban Tasks
    [TranslationKeyEnum.AnalyzeClientNeeds]: 'Kundenanforderungen analysieren',
    [TranslationKeyEnum.AnalyzeClientNeedsDesc]: 'Treffen mit dem Kunden zur Erfassung spezifischer Anforderungen',
    [TranslationKeyEnum.CreateWireframes]: 'Wireframes erstellen',
    [TranslationKeyEnum.CreateWireframesDesc]: 'Hauptanwendungsmockups entwerfen',
    [TranslationKeyEnum.WriteDocumentation]: 'Dokumentation schreiben',
    [TranslationKeyEnum.WriteDocumentationDesc]: 'Technische Projektdokumentation',
    [TranslationKeyEnum.ApiDevelopment]: 'API-Entwicklung',
    [TranslationKeyEnum.ApiDevelopmentDesc]: 'REST-Endpunkte implementieren',
    [TranslationKeyEnum.UnitTesting]: 'Unit-Tests',
    [TranslationKeyEnum.UnitTestingDesc]: 'Tests für Komponenten schreiben',
    [TranslationKeyEnum.ProjectSetup]: 'Projekteinrichtung',
    [TranslationKeyEnum.ProjectSetupDesc]: 'Entwicklungsumgebung einrichten',
    [TranslationKeyEnum.TechStackSelection]: 'Tech-Stack-Auswahl',
    [TranslationKeyEnum.TechStackSelectionDesc]: 'Auswahl des technischen Stacks',
    
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