import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../config/themeConfig';
import { ThemeModeEnum } from '../enums/ThemeModeEnum';


interface ThemeContextType {
  themeMode: ThemeModeEnum;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeModeEnum) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeModeEnum;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultMode = ThemeModeEnum.Dark 
}) => {
  const [themeMode, setThemeMode] = useState<ThemeModeEnum>(defaultMode);

  const toggleTheme = () => {
    setThemeMode(prev => prev === ThemeModeEnum.Light ? ThemeModeEnum.Dark : ThemeModeEnum.Light);
  };

  const currentTheme = themeMode === ThemeModeEnum.Light ? lightTheme : darkTheme;

  const value: ThemeContextType = {
    themeMode,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le thème
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};