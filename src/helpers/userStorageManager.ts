import type { UserSessionModel } from '../models/UserSessionModel';

const USER_KEY = 'user';

export const UserStorageManager = {
  saveUser(user: UserSessionModel): void {
    console.log(JSON.stringify(user));
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
  }
};
