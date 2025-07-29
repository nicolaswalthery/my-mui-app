// src/components/CustomAppBar.tsx - Updated with i18n translation dropdown
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AvatarWithCircleProps from './AvatarWithCircle';
import { useHandleNavClick } from '../helpers/handleNavClick';
import { AppRouteEnum } from '../enums/AppRouteEnum';
import { UserStorageManager } from '../helpers/userStorageManager';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import LanguageSwitcher from './LanguageSwitcher';

interface CustomAppBarProps {
  drawerWidth: number;
  pageTitle: string;
  onDrawerToggle: () => void;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ 
  drawerWidth, 
  pageTitle, 
  onDrawerToggle 
}) => {
  const { t } = useI18n();
  const handleProfileClick = useHandleNavClick();
  
  // Get user initials for avatar
  const user = UserStorageManager.getUser();
  const userInitials = user?.firstName?.charAt(0) && user?.lastName?.charAt(0)
  ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
  : user?.firstName?.charAt(0) || user?.lastName?.charAt(0) || 'U';

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          aria-label={t(TranslationKeyEnum.Menu) || "open drawer"}
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Page title */}
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 1,
            textAlign: { xs: 'left', md: 'center' },
            fontWeight: 600,
          }}
        >
          {pageTitle}
        </Typography>

        {/* Right side items container */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2 
        }}>
          {/* Language switcher dropdown */}
          <Box sx={{ 
            display: { xs: 'none', sm: 'block' },
            minWidth: 120 
          }}>
            <LanguageSwitcher 
              variant="compact" 
              showLabel={false} 
            />
          </Box>

          {/* Profile avatar button */}
          <IconButton
            onClick={() => handleProfileClick?.(AppRouteEnum.Profile)}
            sx={{ 
              p: 0,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                opacity: 0.8,
                transform: 'scale(1.05)',
              }
            }}
            aria-label={`${t(TranslationKeyEnum.Profile)} - ${user?.firstName} ${user?.lastName}`}
          >
            <AvatarWithCircleProps 
              profileTitle={userInitials} 
              variant="border"
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;