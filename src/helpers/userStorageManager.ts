import type { UserSessionModel, CategorySection } from '../models/UserSessionModel';

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
  },

  // Mail Categories Management
  saveMailCategories(categories: CategorySection[]): void {
    this.updateUser({ mailCategories: categories });
  },

  getMailCategories(): CategorySection[] {
    const user = this.getUser();
    return user?.mailCategories || [];
  },

  clearMailCategories(): void {
    this.updateUser({ mailCategories: [] });
  },

  // Selected Category State
  saveSelectedCategory(selected: { parent: number; child?: number } | null): void {
    this.updateUser({ selectedCategory: selected });
  },

  getSelectedCategory(): { parent: number; child?: number } | null {
    const user = this.getUser();
    return user?.selectedCategory || null;
  },

  // User Preferences
  savePreference(key: string, value: any): void {
    const user = this.getUser();
    const preferences = user?.preferences || {};
    this.updateUser({ 
      preferences: { 
        ...preferences, 
        [key]: value 
      } 
    });
  },

  getPreference(key: string, defaultValue: any = null): any {
    const user = this.getUser();
    return user?.preferences?.[key] ?? defaultValue;
  },

  // Initialize user session if it doesn't exist
  initializeUserSession(): UserSessionModel {
    let user = this.getUser();
    if (!user) {
      user = {
        mailCategories: [],
        selectedCategory: null,
        preferences: {
          showHelpCard: true
        }
      };
      this.saveUser(user);
    }
    return user;
  },

  // Batch update for better performance
  batchUpdate(updates: {
    categories?: CategorySection[];
    selected?: { parent: number; child?: number } | null;
    preferences?: { [key: string]: any };
  }): void {
    const updateData: Partial<UserSessionModel> = {};
    
    if (updates.categories !== undefined) {
      updateData.mailCategories = updates.categories;
    }
    if (updates.selected !== undefined) {
      updateData.selectedCategory = updates.selected;
    }
    if (updates.preferences !== undefined) {
      const currentUser = this.getUser();
      updateData.preferences = {
        ...currentUser?.preferences,
        ...updates.preferences
      };
    }
    
    this.updateUser(updateData);
  }
};