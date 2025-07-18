
export const ThemeEnum = {
  light: 'light',
  dark: 'dark',
} as const;

export type ThemeMode = (typeof ThemeEnum)[keyof typeof ThemeEnum];