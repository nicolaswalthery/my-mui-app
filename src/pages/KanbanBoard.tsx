import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import KanbanBoard from '../components/KanbanBoardProps';
import type { KanbanColumn, KanbanItem } from '../components/KanbanBoardProps';

const KanbanPage: React.FC = () => {
  // Initial data
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'todo',
      title: 'À faire',
      color: '#1976d2',
      items: [
        {
          id: '1',
          title: 'Analyser les besoins client',
          description: 'Rencontrer le client pour comprendre ses besoins spécifiques',
          priority: 'high',
          assignee: 'Marie'
        },
        {
          id: '2',
          title: 'Créer les wireframes',
          description: 'Dessiner les maquettes principales de l\'application',
          priority: 'medium',
          assignee: 'Pierre'
        },
        {
          id: '3',
          title: 'Rédiger la documentation',
          description: 'Documentation technique du projet',
          priority: 'low'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'En cours',
      color: '#ed6c02',
      items: [
        {
          id: '4',
          title: 'Développement de l\'API',
          description: 'Implémenter les endpoints REST',
          priority: 'high',
          assignee: 'Thomas'
        },
        {
          id: '5',
          title: 'Tests unitaires',
          description: 'Écrire les tests pour les composants',
          priority: 'medium',
          assignee: 'Sarah'
        }
      ]
    },
    {
      id: 'done',
      title: 'Terminé',
      color: '#2e7d32',
      items: [
        {
          id: '6',
          title: 'Configuration du projet',
          description: 'Mise en place de l\'environnement de développement',
          priority: 'medium',
          assignee: 'Alex'
        },
        {
          id: '7',
          title: 'Choix des technologies',
          description: 'Sélection du stack technique',
          priority: 'high'
        }
      ]
    }
  ]);

  // Event handlers
  const handleColumnsChange = (newColumns: KanbanColumn[]) => {
    setColumns(newColumns);
    console.log('Columns updated:', newColumns);
  };

  const handleItemMove = (itemId: string, fromColumnId: string, toColumnId: string) => {
    console.log(`Item ${itemId} moved from ${fromColumnId} to ${toColumnId}`);
    // Here you could make an API call to update the backend
  };

  const handleItemAdd = (columnId: string, item: Omit<KanbanItem, 'id'>) => {
    console.log(`New item added to column ${columnId}:`, item);
    // Here you could make an API call to save the new item
  };

  const handleItemEdit = (itemId: string, item: Partial<KanbanItem>) => {
    console.log(`Item ${itemId} edited:`, item);
    // Here you could make an API call to update the item
  };

  const handleItemDelete = (itemId: string, columnId: string) => {
    console.log(`Item ${itemId} deleted from column ${columnId}`);
    // Here you could make an API call to delete the item
  };

  const handleColumnTitleChange = (columnId: string, newTitle: string) => {
    console.log(`Column ${columnId} title changed to: ${newTitle}`);
    // Here you could make an API call to update the column title
  };

  const resetBoard = () => {
    setColumns([
      {
        id: 'todo',
        title: 'À faire',
        color: '#1976d2',
        items: [
          {
            id: `${Date.now()}-1`,
            title: 'Analyser les besoins client',
            description: 'Rencontrer le client pour comprendre ses besoins spécifiques',
            priority: 'high',
            assignee: 'Marie'
          },
          {
            id: `${Date.now()}-2`,
            title: 'Créer les wireframes',
            description: 'Dessiner les maquettes principales de l\'application',
            priority: 'medium',
            assignee: 'Pierre'
          }
        ]
      },
      {
        id: 'in-progress',
        title: 'En cours',
        color: '#ed6c02',
        items: [
          {
            id: `${Date.now()}-3`,
            title: 'Développement de l\'API',
            description: 'Implémenter les endpoints REST',
            priority: 'high',
            assignee: 'Thomas'
          }
        ]
      },
      {
        id: 'done',
        title: 'Terminé',
        color: '#2e7d32',
        items: [
          {
            id: `${Date.now()}-4`,
            title: 'Configuration du projet',
            description: 'Mise en place de l\'environnement de développement',
            priority: 'medium',
            assignee: 'Alex'
          }
        ]
      }
    ]);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Tableau Kanban
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gérez vos tâches avec un système de glisser-déposer intuitif
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={resetBoard}
        >
          Réinitialiser
        </Button>
      </Stack>

      <KanbanBoard
        columns={columns}
        onColumnsChange={handleColumnsChange}
        onItemMove={handleItemMove}
        onItemAdd={handleItemAdd}
        onItemEdit={handleItemEdit}
        onItemDelete={handleItemDelete}
        onColumnTitleChange={handleColumnTitleChange}
      />

      {/* Instructions */}
      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Instructions d'utilisation :
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body2" sx={{ mb: 1 }}>
            <strong>Glisser-déposer :</strong> Cliquez et faites glisser les cartes entre les colonnes
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1 }}>
            <strong>Modifier les titres :</strong> Cliquez sur l'icône d'édition dans l'en-tête des colonnes
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1 }}>
            <strong>Ajouter des tâches :</strong> Utilisez le bouton "Ajouter une tâche" dans chaque colonne
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1 }}>
            <strong>Supprimer des tâches :</strong> Cliquez sur l'icône de suppression sur chaque carte
          </Typography>
          <Typography component="li" variant="body2">
            <strong>Priorités :</strong> Les tâches sont marquées avec des couleurs (rouge: haute, orange: moyenne, vert: basse)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default KanbanPage;