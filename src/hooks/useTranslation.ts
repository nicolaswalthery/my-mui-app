// src/hooks/useTranslation.ts - Enhanced translation hook
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';

interface TranslationOptions {
  fallback?: string;
  variables?: Record<string, string | number>;
}

export const useTranslation = () => {
  const { t: baseT, currentLanguage, setLanguage, translations, isRTL } = useI18n();

  // Enhanced translation function with interpolation and fallback
  const t = (key: TranslationKeyEnum, options?: TranslationOptions): string => {
    let translation = baseT(key);
    
    // Use fallback if translation is not found
    if (translation === key && options?.fallback) {
      translation = options.fallback;
    }
    
    // Variable interpolation
    if (options?.variables) {
      Object.entries(options.variables).forEach(([variable, value]) => {
        translation = translation.replace(`{{${variable}}}`, String(value));
      });
    }
    
    return translation;
  };

  // Pluralization helper
  const tp = (
    singularKey: TranslationKeyEnum, 
    pluralKey: TranslationKeyEnum, 
    count: number,
    options?: TranslationOptions
  ): string => {
    const key = count === 1 ? singularKey : pluralKey;
    return t(key, { ...options, variables: { ...options?.variables, count } });
  };

  // Date formatting with locale
  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(currentLanguage, options).format(dateObj);
  };

  // Number formatting with locale
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat(currentLanguage, options).format(number);
  };

  // Currency formatting
  const formatCurrency = (amount: number, currency = 'EUR'): string => {
    return new Intl.NumberFormat(currentLanguage, {
      style: 'currency',
      currency,
    }).format(amount);
  };

  return {
    t,
    tp,
    currentLanguage,
    setLanguage,
    translations,
    isRTL,
    formatDate,
    formatNumber,
    formatCurrency,
  };
};