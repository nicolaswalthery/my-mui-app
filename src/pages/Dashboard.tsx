import React from 'react';
import FakeClientsDataTableModel from '../Mocks/FakeClientData.ts';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { useTranslation } from '../hooks/useTranslation';
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
  const { t, formatCurrency } = useTranslation();

  // Translated stats with proper currency formatting
  const stats = [
    { 
      titleKey: TranslationKeyEnum.TotalUsers, 
      value: '1,234', 
      icon: People, 
      color: '#2563eb' 
    },
    { 
      titleKey: TranslationKeyEnum.Sales, 
      value: formatCurrency(12345), // Use proper currency formatting
      icon: AttachMoney, 
      color: '#dc2626' 
    },
    { 
      titleKey: TranslationKeyEnum.Orders, 
      value: '567', 
      icon: ShoppingCart, 
      color: '#059669' 
    },
    { 
      titleKey: TranslationKeyEnum.Growth, 
      value: '+23%', 
      icon: TrendingUp, 
      color: '#7c3aed' 
    },
  ];

  // Create translated columns configuration for the data table
  const translatedColumnsConfig = [
    { key: 'name' as const, label: TranslationKeyEnum.Name },
    { key: 'age' as const, label: TranslationKeyEnum.Age },
    { key: 'email' as const, label: TranslationKeyEnum.Email },
    { key: 'phone' as const, label: TranslationKeyEnum.Phone },
    { key: 'city' as const, label: TranslationKeyEnum.City },
    { key: 'createdAt' as const, label: TranslationKeyEnum.CreatedAt },
    { key: 'status' as const, label: TranslationKeyEnum.Status },
  ];

  return (
    <Box>
      {/* Header with language switcher */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {t(TranslationKeyEnum.Dashboard)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t(TranslationKeyEnum.WelcomeToDashboard)}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid key={index}>
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
                      {t(stat.titleKey)}
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
              {t(TranslationKeyEnum.RecentActivity)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(TranslationKeyEnum.NoRecentActivity)}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t(TranslationKeyEnum.Clients)}
            </Typography>
            <DataTableGeneric
              data={FakeClientsDataTableModel.data}
              columnsConfig={translatedColumnsConfig.map(col => ({
                key: col.key,
                label: t(col.label) // Translate the column labels
              }))}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;