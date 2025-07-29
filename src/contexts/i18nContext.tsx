// src/contexts/i18nContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { SupportedLangEnum, TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { getTranslations, getTranslation } from '../config/i18n';

interface I18nContextType {
  currentLanguage: SupportedLangEnum;
  setLanguage: (language: SupportedLangEnum) => void;
  t: (key: TranslationKeyEnum) => string;
  translations: Record<string, string>;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: SupportedLangEnum;
}

const LANGUAGE_STORAGE_KEY = 'app-language';

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  defaultLanguage = SupportedLangEnum.English 
}) => {
  // Get saved language from localStorage or use default
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLangEnum>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && Object.values(SupportedLangEnum).includes(saved as SupportedLangEnum)) {
      return saved as SupportedLangEnum;
    }
    return defaultLanguage;
  });

  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Update translations when language changes
  useEffect(() => {
    const newTranslations = getTranslations(currentLanguage);
    setTranslations(newTranslations);
    
    // Save to localStorage
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    
    // Update document language attribute
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Translation function
  const t = (key: TranslationKeyEnum): string => {
    return getTranslation(currentLanguage, key);
  };

  // Set language function
  const setLanguage = (language: SupportedLangEnum) => {
    setCurrentLanguage(language);
  };

  // Check if current language is RTL (Right-to-Left)
  const isRTL = false; // currentLanguage === 'ar' || currentLanguage === 'he'; // Add RTL languages as needed

  const value: I18nContextType = {
    currentLanguage,
    setLanguage,
    t,
    translations,
    isRTL,
  };

  return (
    <I18nContext.Provider value={value}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </I18nContext.Provider>
  );
};

// Custom hook to use i18n
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Higher-order component for class components (if needed)
export const withI18n = <P extends object>(
  Component: React.ComponentType<P & { i18n: I18nContextType }>
) => {
  return (props: P) => {
    const i18n = useI18n();
    return <Component {...props} i18n={i18n} />;
  };
};