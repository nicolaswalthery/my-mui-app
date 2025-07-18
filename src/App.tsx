import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { MenuItem } from './models/MenuItem';
import { getMenuItems } from './config/routeConfig';
import { createHandleNavClick } from './utils/handleNavClick';

import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import Sidebar from './components/SidebarProps';
import AppBarProps from './components/AppBarProps';
import FooterProps from './components/FooterProps';

const drawerWidth = 240;

const menuItems: MenuItem[] = getMenuItems(['admin', 'user']);

const defaultAppTitle = 'MUI APP';

export default function MUILayout() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Get page title based on current route
  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.text : 'Page';
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = createHandleNavClick();

  const sideBarProps = <Sidebar 
            menuItems={menuItems} 
            appTitle={defaultAppTitle}
            onItemClick={handleMenuItemClick}
          />

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBarProps
        drawerWidth={drawerWidth}
        pageTitle={getPageTitle()}
        profileTitle="JD"
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

       <FooterProps footerText="FOOTER TEXT" />
      </Box>
    </Box>
  );
}