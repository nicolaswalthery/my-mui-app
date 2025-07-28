export const TranslationKeyEnum = {
  // Common UI
  Welcome: 'welcome',
  Logout: 'logout',
  Theme: 'theme',
  Save: 'save',
  Cancel: 'cancel',
  Delete: 'delete',
  Edit: 'edit',
  Add: 'add',
  Close: 'close',
  Confirm: 'confirm',
  Loading: 'loading',
  Error: 'error',
  Success: 'success',
  Menu: 'menu',
  
  // Navigation
  Home: 'home',
  Dashboard: 'dashboard',
  Settings: 'settings',
  Profile: 'profile',
  
  // Authentication
  Login: 'login',
  Email: 'email',
  Password: 'password',
  SignIn: 'signIn',
  VerificationCode: 'verificationCode',
  EnterCode: 'enterCode',
  VerifyCode: 'verifyCode',
  InvalidCredentials: 'invalidCredentials',
  InvalidCode: 'invalidCode',
  
  // Profile
  FirstName: 'firstName',
  LastName: 'lastName',
  EditProfile: 'editProfile',
  
  // Settings
  Appearance: 'appearance',
  Language: 'language',
  Notifications: 'notifications',
  AutoSave: 'autoSave',
  UserPreferences: 'userPreferences',
  LightTheme: 'lightTheme',
  DarkTheme: 'darkTheme',
  
  // Kanban
  KanbanBoard: 'kanbanBoard',
  ToDo: 'toDo',
  InProgress: 'inProgress',
  Done: 'done',
  AddTask: 'addTask',
  TaskTitle: 'taskTitle',
  TaskDescription: 'taskDescription',
  Priority: 'priority',
  High: 'high',
  Medium: 'medium',
  Low: 'low',
  Assignee: 'assignee',
  
  // Table
  Clients: 'clients',
  Name: 'name',
  Age: 'age',
  Phone: 'phone',
  City: 'city',
  Status: 'status',
  CreatedAt: 'createdAt',
  
  // Messages
  NoDataToDisplay: 'noDataToDisplay',
  SettingsSaved: 'settingsSaved',
  SomethingWentWrong: 'somethingWentWrong',
  PageNotFound: 'pageNotFound',
  GoHome: 'goHome',
  ReloadApp: 'reloadApp',
  
  // Additional Auth
  BackToLogin: 'backToLogin',
  DemoVersion: 'demoVersion',
  AnyCredentialsWork: 'anyCredentialsWork',
  
  // Dashboard Stats
  TotalUsers: 'totalUsers',
  Sales: 'sales',
  Orders: 'orders',
  Growth: 'growth',
  RecentActivity: 'recentActivity',
  WelcomeToDashboard: 'welcomeToDashboard',
  NoRecentActivity: 'noRecentActivity',
  
  // Form Validation
  Required: 'required',
  ValidEmailRequired: 'validEmailRequired',
  FieldRequired: 'fieldRequired',
  ChangesSavedLocally: 'changesSavedLocally',
  
  // Error Page
  CriticalError: 'criticalError',
  ErrorDescription: 'errorDescription',
  
  // NotFound Page
  NotFoundTitle: 'notFoundTitle',
  NotFoundSubtitle: 'notFoundSubtitle',
  NotFoundDescription: 'notFoundDescription',
  
  // Home Page
  WelcomeToApp: 'welcomeToApp',
  DiscoverFeatures: 'discoverFeatures',
  GetStarted: 'getStarted',
  LearnMore: 'learnMore',
  MainFeatures: 'mainFeatures',
  ModernInterface: 'modernInterface',
  ModernInterfaceDesc: 'modernInterfaceDesc',
  ResponsiveDesign: 'responsiveDesign',
  ResponsiveDesignDesc: 'responsiveDesignDesc',
  OptimizedPerformance: 'optimizedPerformance',
  OptimizedPerformanceDesc: 'optimizedPerformanceDesc',
  Image: 'image',
  
  // Kanban Page
  ManageTasksWithDragDrop: 'manageTasksWithDragDrop',
  Reset: 'reset',
  UsageInstructions: 'usageInstructions',
  DragAndDrop: 'dragAndDrop',
  DragAndDropDesc: 'dragAndDropDesc',
  EditTitles: 'editTitles',
  EditTitlesDesc: 'editTitlesDesc',
  AddTasks: 'addTasks',
  AddTasksDesc: 'addTasksDesc',
  DeleteTasks: 'deleteTasks',
  DeleteTasksDesc: 'deleteTasksDesc',
  Priorities: 'priorities',
  PrioritiesDesc: 'prioritiesDesc',
  
  // Sample Kanban Tasks
  AnalyzeClientNeeds: 'analyzeClientNeeds',
  AnalyzeClientNeedsDesc: 'analyzeClientNeedsDesc',
  CreateWireframes: 'createWireframes',
  CreateWireframesDesc: 'createWireframesDesc',
  WriteDocumentation: 'writeDocumentation',
  WriteDocumentationDesc: 'writeDocumentationDesc',
  ApiDevelopment: 'apiDevelopment',
  ApiDevelopmentDesc: 'apiDevelopmentDesc',
  UnitTesting: 'unitTesting',
  UnitTestingDesc: 'unitTestingDesc',
  ProjectSetup: 'projectSetup',
  ProjectSetupDesc: 'projectSetupDesc',
  TechStackSelection: 'techStackSelection',
  TechStackSelectionDesc: 'techStackSelectionDesc',
  
  // Mail Automation Service
  MailAutoForm: 'mailAutoForm',

  // Footer
  FooterText: 'footerText',
} as const;

export type TranslationKeyEnum = typeof TranslationKeyEnum[keyof typeof TranslationKeyEnum];

// Supported languages Enum - Enhanced
export const SupportedLangEnum = {
  English: 'en',
  French: 'fr',
  Spanish: 'es',
  German: 'de',
} as const;

export type SupportedLangEnum = typeof SupportedLangEnum[keyof typeof SupportedLangEnum];

// Language display names
export const LanguageDisplayNames: Record<SupportedLangEnum, string> = {
  [SupportedLangEnum.English]: 'English',
  [SupportedLangEnum.French]: 'Français',
  [SupportedLangEnum.Spanish]: 'Español',
  [SupportedLangEnum.German]: 'Deutsch',
};