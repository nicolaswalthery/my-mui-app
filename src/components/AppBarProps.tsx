import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface AppBarProps {drawerWidth: number; pageTitle: string, profileTitle: string, onDrawerToggle: () => void;}
  
const AppBarProps: React.FC<AppBarProps> = ({ drawerWidth, pageTitle, profileTitle, onDrawerToggle }) => {
        return(
            <AppBar
                position="fixed"
                sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                }}
            >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography 
                variant="h6" 
                noWrap 
                component="div" 
                sx={{ 
                flexGrow: 1,
                textAlign: 'center'
                }}
            >
                {pageTitle}
            </Typography>
            <Avatar 
            sx={{ 
                bgcolor: 'secondary.main',
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px'
            }}
            >
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {profileTitle}
          </Typography>
        </Avatar>
        </Toolbar>
        </AppBar>
        );
    };

export default AppBarProps;
