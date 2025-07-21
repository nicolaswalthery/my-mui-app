import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

interface AvatarWithCircle {
  profileTitle: string;
  variant?: 'border' | 'shadow' | 'outline' | 'wrapped' | 'animated';
}

const AvatarWithCircle: React.FC<AvatarWithCircle> = ({ 
  profileTitle, 
  variant = 'border' 
}) => {
  // Option 1: Simple Border
  if (variant === 'border') {
    return (
      <Avatar 
        sx={{ 
                bgcolor: 'secondary.main',
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px'
            }}
      >
        <Typography variant="h6" sx={{ color: 'primary.contrastText' }}>
          {profileTitle}
        </Typography>
      </Avatar>
    );
  }

  // Option 2: Box Shadow
  if (variant === 'shadow') {
    return (
      <Avatar 
        sx={{ 
          bgcolor: 'secondary.main',
          boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.3)'
        }}
      >
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {profileTitle}
        </Typography>
      </Avatar>
    );
  }

  // Option 3: Outline
  if (variant === 'outline') {
    return (
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
    );
  }

  // Option 4: Wrapped with Box (Most Flexible)
  if (variant === 'wrapped') {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -4,
            left: -4,
            right: -4,
            bottom: -4,
            borderRadius: '50%',
            border: '2px solid',
            borderColor: 'primary.main',
            zIndex: 0,
          }
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: 'secondary.main',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {profileTitle}
          </Typography>
        </Avatar>
      </Box>
    );
  }

  // Option 5: Animated Circle
  if (variant === 'animated') {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -6,
            left: -6,
            right: -6,
            bottom: -6,
            borderRadius: '50%',
            border: '3px solid',
            borderColor: 'primary.main',
            opacity: 0.6,
            animation: 'pulse 2s infinite',
          },
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              opacity: 0.6,
            },
            '50%': {
              transform: 'scale(1.1)',
              opacity: 0.3,
            },
            '100%': {
              transform: 'scale(1)',
              opacity: 0.6,
            },
          }
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: 'secondary.main',
            border: '2px solid',
            borderColor: 'background.paper',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {profileTitle}
          </Typography>
        </Avatar>
      </Box>
    );
  }

  // Default fallback
  return (
    <Avatar sx={{ bgcolor: 'secondary.main' }}>
      <Typography variant="h6" sx={{ color: 'text.secondary' }}>
        {profileTitle}
      </Typography>
    </Avatar>
  );
};

export default AvatarWithCircle;