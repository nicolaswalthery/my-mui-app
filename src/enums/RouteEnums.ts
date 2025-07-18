


//   export function getAllRoutes(): AppRoute[] {
//     return Object.values(AppRoute).filter(v => typeof v === 'string') as AppRoute[];
//   }
// }

// // 2. User Management Enums
// export enum UserStatus {
//   Active = 'active',
//   Inactive = 'inactive',
//   Pending = 'pending',
//   Suspended = 'suspended',
//   Deleted = 'deleted'
// }

// export enum UserRole {
//   SuperAdmin = 'super_admin',
//   Admin = 'admin',
//   Manager = 'manager',
//   User = 'user',
//   Guest = 'guest'
// }

// export namespace UserRole {
//   export function getPermissionLevel(role: UserRole): number {
//     switch (role) {
//       case UserRole.SuperAdmin: return 100;
//       case UserRole.Admin: return 80;
//       case UserRole.Manager: return 60;
//       case UserRole.User: return 40;
//       case UserRole.Guest: return 20;
//       default: return 0;
//     }
//   }

//   export function canAccess(userRole: UserRole, requiredRole: UserRole): boolean {
//     return this.getPermissionLevel(userRole) >= this.getPermissionLevel(requiredRole);
//   }

//   export function getDisplayName(role: UserRole): string {
//     switch (role) {
//       case UserRole.SuperAdmin: return 'Super Administrator';
//       case UserRole.Admin: return 'Administrator';
//       case UserRole.Manager: return 'Manager';
//       case UserRole.User: return 'User';
//       case UserRole.Guest: return 'Guest';
//       default: return 'Unknown Role';
//     }
//   }

//   export function getBadgeColor(role: UserRole): string {
//     switch (role) {
//       case UserRole.SuperAdmin: return '#dc2626';
//       case UserRole.Admin: return '#ea580c';
//       case UserRole.Manager: return '#d97706';
//       case UserRole.User: return '#059669';
//       case UserRole.Guest: return '#6b7280';
//       default: return '#6b7280';
//     }
//   }
// }

// // 3. UI State Enums
// export enum LoadingState {
//   Idle = 'idle',
//   Loading = 'loading',
//   Success = 'success',
//   Error = 'error'
// }

// export enum AlertSeverity {
//   Error = 'error',
//   Warning = 'warning',
//   Info = 'info',
//   Success = 'success'
// }

// export enum ButtonVariant {
//   Text = 'text',
//   Outlined = 'outlined',
//   Contained = 'contained'
// }

// export enum ButtonSize {
//   Small = 'small',
//   Medium = 'medium',
//   Large = 'large'
// }

// // 4. Data Management Enums
// export enum SortDirection {
//   Ascending = 'asc',
//   Descending = 'desc'
// }

// export enum FilterOperator {
//   Equals = 'eq',
//   NotEquals = 'ne',
//   GreaterThan = 'gt',
//   GreaterThanOrEqual = 'gte',
//   LessThan = 'lt',
//   LessThanOrEqual = 'lte',
//   Contains = 'contains',
//   StartsWith = 'startsWith',
//   EndsWith = 'endsWith'
// }

// // 5. API Response Enums
// export enum ApiErrorCode {
//   ValidationError = 1001,
//   AuthenticationError = 1002,
//   AuthorizationError = 1003,
//   NotFoundError = 1004,
//   ServerError = 1005,
//   NetworkError = 1006,
//   TimeoutError = 1007
// }

// export namespace ApiErrorCode {
//   export function getErrorMessage(code: ApiErrorCode): string {
//     switch (code) {
//       case ApiErrorCode.ValidationError: return 'Validation failed';
//       case ApiErrorCode.AuthenticationError: return 'Authentication required';
//       case ApiErrorCode.AuthorizationError: return 'Access denied';
//       case ApiErrorCode.NotFoundError: return 'Resource not found';
//       case ApiErrorCode.ServerError: return 'Internal server error';
//       case ApiErrorCode.NetworkError: return 'Network connection error';
//       case ApiErrorCode.TimeoutError: return 'Request timeout';
//       default: return 'Unknown error';
//     }
//   }

//   export function getSeverity(code: ApiErrorCode): AlertSeverity {
//     switch (code) {
//       case ApiErrorCode.ValidationError:
//       case ApiErrorCode.NotFoundError:
//         return AlertSeverity.Warning;
//       case ApiErrorCode.AuthenticationError:
//       case ApiErrorCode.AuthorizationError:
//         return AlertSeverity.Error;
//       case ApiErrorCode.ServerError:
//       case ApiErrorCode.NetworkError:
//       case ApiErrorCode.TimeoutError:
//         return AlertSeverity.Error;
//       default:
//         return AlertSeverity.Info;
//     }
//   }
// }

// // 6. Feature Flags (useful for A/B testing)
// export enum FeatureFlag {
//   NewDashboard = 'new_dashboard',
//   AdvancedSearch = 'advanced_search',
//   BetaFeatures = 'beta_features',
//   DarkModeDefault = 'dark_mode_default'
// }

// export namespace FeatureFlag {
//   export function getDescription(flag: FeatureFlag): string {
//     switch (flag) {
//       case FeatureFlag.NewDashboard: return 'Enable new dashboard layout';
//       case FeatureFlag.AdvancedSearch: return 'Enable advanced search functionality';
//       case FeatureFlag.BetaFeatures: return 'Enable beta features';
//       case FeatureFlag.DarkModeDefault: return 'Use dark mode as default theme';
//       default: return 'Unknown feature flag';
//     }
//   }
// }

// // 7. Notification System Enums
// export enum NotificationType {
//   Info = 'info',
//   Success = 'success',
//   Warning = 'warning',
//   Error = 'error'
// }

// export enum NotificationPosition {
//   TopLeft = 'top-left',
//   TopCenter = 'top-center',
//   TopRight = 'top-right',
//   BottomLeft = 'bottom-left',
//   BottomCenter = 'bottom-center',
//   BottomRight = 'bottom-right'
// }

// // 8. Form Validation Enums
// export enum ValidationRule {
//   Required = 'required',
//   Email = 'email',
//   MinLength = 'minLength',
//   MaxLength = 'maxLength',
//   Pattern = 'pattern',
//   Custom = 'custom'
// }

// export namespace ValidationRule {
//   export function getErrorMessage(rule: ValidationRule, params?: any): string {
//     switch (rule) {
//       case ValidationRule.Required: return 'This field is required';
//       case ValidationRule.Email: return 'Please enter a valid email address';
//       case ValidationRule.MinLength: return `Minimum length is ${params?.min || 0} characters`;
//       case ValidationRule.MaxLength: return `Maximum length is ${params?.max || 0} characters`;
//       case ValidationRule.Pattern: return 'Invalid format';
//       case ValidationRule.Custom: return params?.message || 'Validation failed';
//       default: return 'Invalid input';
//     }
//   }
// }

// // 9. File Management Enums
// export enum FileType {
//   Image = 'image',
//   Document = 'document',
//   Video = 'video',
//   Audio = 'audio',
//   Archive = 'archive',
//   Other = 'other'
// }

// export enum FileExtension {
//   // Images
//   JPG = '.jpg',
//   JPEG = '.jpeg',
//   PNG = '.png',
//   GIF = '.gif',
//   SVG = '.svg',
  
//   // Documents
//   PDF = '.pdf',
//   DOC = '.doc',
//   DOCX = '.docx',
//   XLS = '.xls',
//   XLSX = '.xlsx',
  
//   // Archives
//   ZIP = '.zip',
//   RAR = '.rar',
//   TAR = '.tar'
// }

// export namespace FileExtension {
//   export function getFileType(extension: FileExtension): FileType {
//     switch (extension) {
//       case FileExtension.JPG:
//       case FileExtension.JPEG:
//       case FileExtension.PNG:
//       case FileExtension.GIF:
//       case FileExtension.SVG:
//         return FileType.Image;
      
//       case FileExtension.PDF:
//       case FileExtension.DOC:
//       case FileExtension.DOCX:
//       case FileExtension.XLS:
//       case FileExtension.XLSX:
//         return FileType.Document;
      
//       case FileExtension.ZIP:
//       case FileExtension.RAR:
//       case FileExtension.TAR:
//         return FileType.Archive;
      
//       default:
//         return FileType.Other;
//     }
//   }

//   export function getMimeType(extension: FileExtension): string {
//     switch (extension) {
//       case FileExtension.JPG:
//       case FileExtension.JPEG:
//         return 'image/jpeg';
//       case FileExtension.PNG:
//         return 'image/png';
//       case FileExtension.GIF:
//         return 'image/gif';
//       case FileExtension.PDF:
//         return 'application/pdf';
//       default:
//         return 'application/octet-stream';
//     }
//   }
// }

// // 10. Language/Localization Enums
// export enum Language {
//   English = 'en',
//   French = 'fr',
//   Spanish = 'es',
//   German = 'de',
//   Italian = 'it'
// }

// export namespace Language {
//   export function getDisplayName(lang: Language): string {
//     switch (lang) {
//       case Language.English: return 'English';
//       case Language.French: return 'Français';
//       case Language.Spanish: return 'Español';
//       case Language.German: return 'Deutsch';
//       case Language.Italian: return 'Italiano';
//       default: return 'Unknown';
//     }
//   }

//   export function getFlag(lang: Language): string {
//     switch (lang) {
//       case Language.English: return '🇺🇸';
//       case Language.French: return '🇫🇷';
//       case Language.Spanish: return '🇪🇸';
//       case Language.German: return '🇩🇪';
//       case Language.Italian: return '🇮🇹';
//       default: return '🌐';
//     }
//   }
// }

// // ========================================
// // EXAMPLE USAGE IN REACT COMPONENTS
// // ========================================

// // Example: Updated MenuItem interface using enums
// export interface MenuItemWithEnum {
//   text: string;
//   route: AppRoute;
//   icon: string;
//   requiredRole?: UserRole;
// }

// // Example: API Response type using enums
// export interface ApiResponse<T = any> {
//   data?: T;
//   success: boolean;
//   message?: string;
//   errorCode?: ApiErrorCode;
//   loading: LoadingState;
// }

// // Example: User entity using enums
// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   status: UserStatus;
//   language: Language;
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Example: Notification interface using enums
// export interface Notification {
//   id: string;
//   type: NotificationType;
//   title: string;
//   message: string;
//   position: NotificationPosition;
//   autoClose?: boolean;
//   duration?: number;
// }

// // Example: Form validation result using enums
// export interface ValidationResult {
//   isValid: boolean;
//   errors: Array<{
//     field: string;
//     rule: ValidationRule;
//     message: string;
//   }>;
// }

// // Example: File upload interface using enums
// export interface FileUpload {
//   id: string;
//   name: string;
//   extension: FileExtension;
//   type: FileType;
//   size: number;
//   uploadStatus: LoadingState;
//   url?: string;
// }