// src/main.tsx - Updated version
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './theme/ThemeProvider';
import { I18nProvider } from './contexts/i18nContext';
import AppRouter from './AppRouter';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import { SupportedLangEnum } from './enums/TranslationKeyEnum';

// Get browser language or default to English
const getBrowserLanguage = (): SupportedLangEnum => {
  const browserLang = navigator.language.substring(0, 2);
  const supportedLangs = Object.values(SupportedLangEnum);
  
  if (supportedLangs.includes(browserLang as SupportedLangEnum)) {
    return browserLang as SupportedLangEnum;
  }
  
  return SupportedLangEnum.English;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <I18nProvider defaultLanguage={getBrowserLanguage()}>
        <ThemeProvider defaultMode="dark">
          <AppRouter />
        </ThemeProvider>
      </I18nProvider>
    </GlobalErrorBoundary>
  </React.StrictMode>
);