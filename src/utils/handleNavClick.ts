import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';        
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';

export function createHandleNavClick() {
  const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

  return function handleClick(path: string) {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };
}
