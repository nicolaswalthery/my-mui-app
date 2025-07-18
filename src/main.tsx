import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './theme/ThemeProvider';
import AppRouter from './AppRouter';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <ThemeProvider defaultMode="dark">
        <AppRouter />
      </ThemeProvider>
    </GlobalErrorBoundary>
  </React.StrictMode>
);