import { createTheme } from '@mui/material/styles';

// Configuration du thème clair
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // bleu doux
    },
    secondary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5', // fond clair standard
      paper: '#ffffff',
    },
    text: {
      primary: '#1e1e1e',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          color: '#1e1e1e',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#1e1e1e',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1e1e1e',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Configuration du thème sombre
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#1976d2',
    },
    background: {
      default: '#121212', // plus standard dans MUI
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0', 
      secondary: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
          color: '#e0e0e0',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#e0e0e0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          color: '#e0e0e0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // supprime le gradient par défaut
        },
      },
    },
  },
});

// Thème par défaut
export const defaultTheme = darkTheme;