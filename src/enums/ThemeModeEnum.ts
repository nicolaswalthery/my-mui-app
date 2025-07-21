export const ThemeModeEnum = {
    Light: 'light',
    Dark: 'dark'
}

export type ThemeModeEnum = typeof ThemeModeEnum[keyof typeof ThemeModeEnum];
