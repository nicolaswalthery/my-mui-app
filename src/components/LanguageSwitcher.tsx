// src/components/LanguageSwitcher.tsx
import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { useI18n } from '../contexts/i18nContext';
import { SupportedLangEnum, TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { getAvailableLanguages } from '../config/i18n';

interface LanguageSwitcherProps {
  variant?: 'select' | 'compact';
  showLabel?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'select', 
  showLabel = true 
}) => {
  const { currentLanguage, setLanguage, t } = useI18n();
  const availableLanguages = getAvailableLanguages();

  const handleLanguageChange = (event: any) => {
    setLanguage(event.target.value as SupportedLangEnum);
  };

  if (variant === 'compact') {
    return (
      <Select
        value={currentLanguage}
        onChange={handleLanguageChange}
        size="small"
        sx={{ minWidth: 120 }}
      >
        {availableLanguages.map(({ code, name }) => (
          <MenuItem key={code} value={code}>
            {name}
          </MenuItem>
        ))}
      </Select>
    );
  }

  return (
    <Box>
      {showLabel && (
        <Typography variant="subtitle1" gutterBottom>
          {t(TranslationKeyEnum.Language)}
        </Typography>
      )}
      <FormControl fullWidth>
        <InputLabel id="language-select-label">
          {t(TranslationKeyEnum.Language)}
        </InputLabel>
        <Select
          labelId="language-select-label"
          value={currentLanguage}
          label={t(TranslationKeyEnum.Language)}
          onChange={handleLanguageChange}
        >
          {availableLanguages.map(({ code, name }) => (
            <MenuItem key={code} value={code}>
              <Box display="flex" alignItems="center" gap={1}>
                <span>{name}</span>
                <Typography variant="caption" color="text.secondary">
                  ({code.toUpperCase()})
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;