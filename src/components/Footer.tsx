import React from 'react';
import { Box, Typography, Container } from '@mui/material';

interface Footer {
  footerText: string;
}

const Footer: React.FC<Footer> = ({ footerText }) => {
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