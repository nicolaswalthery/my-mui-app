// src/components/Sidebar.tsx - Updated with i18n support
import React from 'react';
import { useHandleNavClick } from '../helpers/handleNavClick';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppRouteEnum } from '../enums/AppRouteEnum';
import { useThemeMode } from '../theme/ThemeProvider';
import { useI18n } from '../contexts/i18nContext';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { getTranslatedMenuItems } from '../config/routeConfig';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeModeEnum } from '../enums/ThemeModeEnum';

interface MenuItem {
  text: string;
  icon: React.ComponentType;
  path: string;
  badge?: string | number;
  order?: number;
}

interface SidebarProps {
  menuItems: MenuItem[];
  appTitle: string;
  onItemClick?: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const { t } = useI18n();
  const { setThemeMode } = useThemeMode();
  const theme = useTheme();
  
  // Use the passed onItemClick function which already handles mobile closing
  const handleNavClick = onItemClick || useHandleNavClick();
  
  // Get translated menu items instead of using the passed menuItems
  const translatedMenuItems = getTranslatedMenuItems(['admin', 'user'], t);

  // Helper function to get theme switch tooltip text
  const getThemeSwitchTooltip = () => {
    const targetMode = theme.palette.mode === ThemeModeEnum.Light ? ThemeModeEnum.Dark : ThemeModeEnum.Light;
    const targetModeText = targetMode === ThemeModeEnum.Light 
      ? t(TranslationKeyEnum.LightTheme) 
      : t(TranslationKeyEnum.DarkTheme);
    
    return `${t(TranslationKeyEnum.Theme)}: ${targetModeText}`;
  };

  return (
    <Box sx={{
      bgcolor: 'background.paper',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        bgcolor: 'secondary.main',
        color: 'primary.contrastText',
        minHeight: 64,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          bgcolor: 'secondary.dark',
          transform: 'scale(1.00)',
        }
      }}>
        <img
          onClick={() => handleNavClick?.(AppRouteEnum.Home)}
          src="/starcmd-logo.svg" // Path to your SVG file
          alt="App Logo"
          style={{
            width: 'auto', // Adjust size as needed
            height: 30,    // Set a fixed height or width if necessary
            cursor: 'pointer'
          }}
        />
      </Box>

      {/* Menu Item List */}
      <List sx={{ 
        flexGrow: 1, /* Take all the remaining space between the header and footer */
        py: 1
      }}>
        {translatedMenuItems.map((item, index) => (
          <ListItem key={`${item.path}-${index}`} disablePadding>
            <ListItemButton 
              onClick={() => handleNavClick?.(item.path)}
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.5,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateX(4px)',
                  boxShadow: 1,
                },
                '&:active': {
                  transform: 'translateX(2px)',
                }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40,
                color: 'inherit',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
              />
              {item.badge && (
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: '12px',
                    px: 1,
                    py: 0.25,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    minWidth: '20px',
                    textAlign: 'center',
                  }}
                >
                  {item.badge}
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer at bottom */}
      <Box sx={{ 
        p: 2, 
        textAlign: 'center',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.default'
      }}>
        <Tooltip 
          title={getThemeSwitchTooltip()}
          placement="top"
          arrow
        >
          <IconButton
            onClick={() => setThemeMode(
              theme.palette.mode === ThemeModeEnum.Light 
                ? ThemeModeEnum.Dark 
                : ThemeModeEnum.Light
            )}
            color="inherit"
            sx={{
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'rotate(180deg)',
                boxShadow: 2,
              }
            }}
            aria-label={getThemeSwitchTooltip()}
          >
            {theme.palette.mode === ThemeModeEnum.Dark ? (
              <LightModeIcon sx={{ color: 'warning.main' }} />
            ) : (
              <DarkModeIcon sx={{ color: 'primary.main' }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;