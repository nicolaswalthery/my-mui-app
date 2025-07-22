// src/components/common/TranslatedText.tsx - Component for simple translations
import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { TranslationKeyEnum } from '../../enums/TranslationKeyEnum';
import { useTranslation } from '../../hooks/useTranslation';

interface TranslatedTextProps extends Omit<TypographyProps, 'children'> {
  translationKey: TranslationKeyEnum;
  fallback?: string;
  variables?: Record<string, string | number>;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({
  translationKey,
  fallback,
  variables,
  ...typographyProps
}) => {
  const { t } = useTranslation();
  
  return (
    <Typography {...typographyProps}>
      {t(translationKey, { fallback, variables })}
    </Typography>
  );
};

// src/utils/i18nHelpers.ts - Additional utility functions
export const i18nHelpers = {
  // Get text direction for CSS
  getTextDirection: (isRTL: boolean): 'ltr' | 'rtl' => isRTL ? 'rtl' : 'ltr',
  
  // Get appropriate alignment for RTL/LTR
  getAlignment: (isRTL: boolean, defaultAlign: 'left' | 'right' = 'left'): 'left' | 'right' => {
    if (defaultAlign === 'left') return isRTL ? 'right' : 'left';
    return isRTL ? 'left' : 'right';
  },
  
  // Get margin/padding direction helpers
  getMarginStart: (isRTL: boolean, value: number | string) => ({
    [isRTL ? 'marginRight' : 'marginLeft']: value
  }),
  
  getMarginEnd: (isRTL: boolean, value: number | string) => ({
    [isRTL ? 'marginLeft' : 'marginRight']: value
  }),
  
  getPaddingStart: (isRTL: boolean, value: number | string) => ({
    [isRTL ? 'paddingRight' : 'paddingLeft']: value
  }),
  
  getPaddingEnd: (isRTL: boolean, value: number | string) => ({
    [isRTL ? 'paddingLeft' : 'paddingRight']: value
  }),
};

// Example usage component showing various features
const I18nExampleUsage: React.FC = () => {
  const { t, tp, formatDate, formatNumber, formatCurrency, isRTL } = useTranslation();

  const exampleDate = new Date();
  const exampleNumber = 1234.56;
  const examplePrice = 29.99;

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Basic translation */}
      <h1>{t(TranslationKeyEnum.Welcome)}</h1>
      
      {/* Translation with fallback */}
      <p>{t(TranslationKeyEnum.Welcome, { fallback: 'Welcome!' })}</p>
      
      {/* Translation with variables */}
      <p>{t(TranslationKeyEnum.Welcome, { 
        variables: { name: 'John', count: 5 } 
      })}</p>
      
      {/* Using TranslatedText component */}
      <TranslatedText 
        translationKey={TranslationKeyEnum.Settings} 
        variant="h6" 
      />
      
      {/* Formatted date */}
      <p>Date: {formatDate(exampleDate, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
      
      {/* Formatted number */}
      <p>Number: {formatNumber(exampleNumber)}</p>
      
      {/* Formatted currency */}
      <p>Price: {formatCurrency(examplePrice)}</p>
      
      {/* RTL-aware styling */}
      <div style={{
        ...i18nHelpers.getMarginStart(isRTL, '20px'),
        textAlign: i18nHelpers.getAlignment(isRTL, 'left')
      }}>
        RTL-aware content
      </div>
    </div>
  );
};

export { TranslatedText, I18nExampleUsage };