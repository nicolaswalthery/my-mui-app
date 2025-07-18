export const UserRoleEnum = {
  SuperAdmin: 'super_admin',
  Admin: 'admin',
  Manager: 'manager',
  User: 'user',
  Guest: 'guest'
} as const;

export type UserRoleEnum = typeof UserRoleEnum[keyof typeof UserRoleEnum];