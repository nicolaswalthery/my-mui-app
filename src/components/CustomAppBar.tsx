import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AvatarWithCircleProps from './AvatarWithCircle';
import { useHandleNavClick } from '../helpers/handleNavClick';
import { AppRouteEnum } from '../enums/AppRouteEnum';
import { UserStorageManager } from '../helpers/userStorageManager';

interface CustomAppBar {drawerWidth: number; pageTitle: string, onDrawerToggle: () => void;}

const CustomAppBar: React.FC<CustomAppBar> = ({ drawerWidth, pageTitle, onDrawerToggle }) => {
    const handleProfileClick = useHandleNavClick();
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
                <IconButton
                    onClick={() => handleProfileClick?.(AppRouteEnum.Profile)}
                    sx={{ 
                        p: 0,
                        '&:hover': {
                            opacity: 0.8
                        }
                    }}
                >
                    <AvatarWithCircleProps profileTitle={`${UserStorageManager.getUser()?.firstName.charAt(0)} ${UserStorageManager.getUser()?.lastName.charAt(0)}`} variant="border"/>
                </IconButton>
            </Toolbar>
        </AppBar>
        );
    };

export default CustomAppBar;
