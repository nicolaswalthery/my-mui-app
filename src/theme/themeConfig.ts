import { createTheme } from '@mui/material/styles';

// Configuration du thème clair
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // blue-600
    },
    secondary: {
      main: '#000000ff', // red-600
    },
    background: {
      default: '#f9fafb', // gray-50
      paper: '#ddddddff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

// Configuration du thème sombre
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#161616',
    },
    secondary: {
      main: '#049ac0ff',
    },
    background: {
      default: '#161616',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#c4c4c4ff',
      secondary: '#f5f5f5ff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'var(--mui-palette-background-paper)',
          color: 'var(--mui-palette-text-primary)',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-primary)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mui-palette-background-paper)',
          color: 'var(--mui-palette-text-primary)',
        },
      },
    },
  },
});

// Thème par défaut
export const defaultTheme = darkTheme;