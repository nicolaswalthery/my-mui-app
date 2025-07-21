import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { MenuItem } from './models/MenuItem';
import { getMenuItems, useCurrentPageTitle } from './config/routeConfig';
import { useHandleNavClick } from './helpers/handleNavClick';

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

const menuItems: MenuItem[] = getMenuItems(['admin', 'user']);

const defaultAppTitle = 'MUI APP';

export default function MUILayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const sideBarProps = <Sidebar 
            menuItems={menuItems} 
            appTitle={defaultAppTitle}
            onItemClick={useHandleNavClick(handleDrawerClose)}
          />

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

       <FooterProps footerText="FOOTER TEXT" />
      </Box>
    </Box>
  );
}