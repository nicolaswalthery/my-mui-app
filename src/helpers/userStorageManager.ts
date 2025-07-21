import type { UserSessionModel } from '../models/UserSessionModel';

const USER_KEY = 'user-session';

export const UserStorageManager = {
  saveUser(user: UserSessionModel): void {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): UserSessionModel | null {
    const data = sessionStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  clearUser(): void {
    sessionStorage.removeItem(USER_KEY);
  },

  isLoggedIn(): boolean {
    return sessionStorage.getItem(USER_KEY) !== null;
  },

  updateUser(userUpdates: Partial<UserSessionModel>): void {
    const current = this.getUser();
    if (!current) return;
    const updated = { ...current, ...userUpdates };
    this.saveUser(updated);
  },

  updateUserFirstname(firstName: string): void {
    this.updateUser({ firstName });
  },

  updateUserLastname(lastName: string): void {
    this.updateUser({ lastName });
  },

  updateUserEmail(email: string): void {
    this.updateUser({ email });
  }
};
