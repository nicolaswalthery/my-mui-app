// src/enums/TranslationKeyEnum.ts - Enhanced version
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