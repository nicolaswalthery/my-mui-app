import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import { Launch, Star } from '@mui/icons-material';

const Home: React.FC = () => {
  const features = [
    {
      title: 'Interface moderne',
      description: 'Une interface utilisateur moderne et intuitive construite avec Material-UI',
      image: '/api/placeholder/300/200',
    },
    {
      title: 'Responsive Design',
      description: 'S\'adapte parfaitement à tous les types d\'écrans et appareils',
      image: '/api/placeholder/300/200',
    },
    {
      title: 'Performance optimisée',
      description: 'Application optimisée pour des performances rapides et fluides',
      image: '/api/placeholder/300/200',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Accueil
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Bienvenue dans votre application
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Découvrez toutes les fonctionnalités de votre application Material-UI.
          Cette page d'accueil vous présente les principales caractéristiques de l'app.
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" startIcon={<Launch />}>
            Commencer
          </Button>
          <Button variant="outlined" startIcon={<Star />}>
            En savoir plus
          </Button>
        </Stack>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Fonctionnalités principales
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  bgcolor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Image {index + 1}
                </Typography>
              </CardMedia>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;