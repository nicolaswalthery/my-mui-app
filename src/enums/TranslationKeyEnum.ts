// Translation Key Enum
export const TranslationKeyEnum = {
    Welcome: 'welcome',
    Logout: 'logout',
    Theme: 'theme'
}

export type TranslationKeyEnum = typeof TranslationKeyEnum[keyof typeof TranslationKeyEnum];

// Supported languages Enum
export const SupportedLangEnum = {
    English: 'en',
    French: 'fr'
}

export type SupportedLangEnum = typeof SupportedLangEnum[keyof typeof SupportedLangEnum];

