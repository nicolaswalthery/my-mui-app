import React from 'react';
import FakeClientsDataTableModel from '../Mocks/FakeClientData.ts';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
} from '@mui/material';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from '@mui/icons-material';
import DataTableGeneric from '../components/generics/DataTableGeneric.tsx';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: People, color: '#2563eb' },
    { title: 'Sales', value: '$12,345', icon: AttachMoney, color: '#dc2626' },
    { title: 'Orders', value: '567', icon: ShoppingCart, color: '#059669' },
    { title: 'Growth', value: '+23%', icon: TrendingUp, color: '#7c3aed' },
  ];


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Bienvenue sur votre tableau de bord
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: stat.color }}>
                    <stat.icon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Activité récente
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aucune activité récente à afficher pour le moment.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    <Box sx={{ mt: 4 }}>
      <DataTableGeneric data={FakeClientsDataTableModel.data} title="Clients" columnsConfig={FakeClientsDataTableModel.columns} />
    </Box>
    </Box>
  );
};

export default Dashboard;