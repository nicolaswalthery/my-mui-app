import React from 'react';
import { Box, Typography, Container } from '@mui/material';

interface FooterProps {
  footerText: string;
}

const Footer: React.FC<FooterProps> = ({ footerText }) => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {footerText}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;