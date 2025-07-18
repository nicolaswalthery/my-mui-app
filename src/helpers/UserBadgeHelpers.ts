import { UserRoleEnum } from '../enums/UserRoleEnum';

export function getBadgeColor(role: UserRoleEnum): string {
    switch (role) {
      case UserRoleEnum.SuperAdmin: return '#dc2626';
      case UserRoleEnum.Admin: return '#ea580c';
      case UserRoleEnum.Manager: return '#d97706';
      case UserRoleEnum.User: return '#059669';
      case UserRoleEnum.Guest: return '#6b7280';
      default: return '#6b7280';
    }
  }