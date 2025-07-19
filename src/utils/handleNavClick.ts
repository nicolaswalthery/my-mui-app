import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';        
import { useMediaQuery } from '@mui/material';

export function useHandleNavClick(onMobileClose?: () => void) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

  return function handleClick(path: string) {
    navigate(path);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };
}