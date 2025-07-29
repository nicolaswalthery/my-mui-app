// src/App.tsx - Updated with i18n support for Sidebar integration
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { MenuItem } from './models/MenuItem';
import { getMenuItems, useCurrentPageTitle } from './config/routeConfig';
import { useHandleNavClick } from './helpers/handleNavClick';
import { useI18n } from './contexts/i18nContext';
import { TranslationKeyEnum } from './enums/TranslationKeyEnum';

import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar
} from '@mui/material';

import Sidebar from './components/Sidebar';
import CustomAppBar from './components/CustomAppBar';
import FooterProps from './components/Footer';

const drawerWidth = 240;

export default function MUILayout() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get menu items (these will be overridden by translated items in Sidebar)
  const menuItems: MenuItem[] = getMenuItems(['admin', 'user']);
  
  // Get translated app title
  const appTitle = t(TranslationKeyEnum.FooterText); // Using FooterText as app title, or you can add a specific AppTitle key

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const sideBarProps = (
    <Sidebar 
      menuItems={menuItems} 
      appTitle={appTitle}
      onItemClick={useHandleNavClick(handleDrawerClose)}
    />
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <CustomAppBar
        drawerWidth={drawerWidth}
        pageTitle={useCurrentPageTitle()}
        onDrawerToggle={handleDrawerToggle}
      />
        
      {/* Mobile Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {sideBarProps}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {sideBarProps}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar /> {/* This creates space for the fixed AppBar */}
        
        {/* Pages content rendered here */}
        <Outlet />
      </Box>
    </Box>
  );
}