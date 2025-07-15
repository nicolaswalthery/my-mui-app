import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

// Create a custom theme
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // blue-600
    },
    secondary: {
      main: '#dc2626', // red-600
    },
    background: {
      default: '#f9fafb', // gray-50
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // This is crucial!
    primary: {
      main: '#161616', // Lighter blue for dark mode
    },
    secondary: {
      main: '#049ac0ff', // Lighter red for dark mode
    },
    background: {
      default: '#161616', // Your dark background
      paper: '#1e1e1e', // Slightly lighter for cards/drawers
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
    // Override drawer to use theme colors
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'var(--mui-palette-background-paper)',
          color: 'var(--mui-palette-text-primary)',
        },
      },
    },
    // Override ListItemIcon to use theme colors
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-primary)',
        },
      },
    },
    // Override AppBar for consistency
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);