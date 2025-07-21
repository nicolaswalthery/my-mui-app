import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';

// Types
export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
  color?: string;
}

interface KanbanBoard {
  columns: KanbanColumn[];
  onColumnsChange: (columns: KanbanColumn[]) => void;
  onItemMove?: (itemId: string, fromColumnId: string, toColumnId: string) => void;
  onItemAdd?: (columnId: string, item: Omit<KanbanItem, 'id'>) => void;
  onItemEdit?: (itemId: string, item: Partial<KanbanItem>) => void;
  onItemDelete?: (itemId: string, columnId: string) => void;
  onColumnTitleChange?: (columnId: string, newTitle: string) => void;
}

const KanbanBoard: React.FC<KanbanBoard> = ({
  columns,
  onColumnsChange,
  onItemMove,
  onItemAdd,
  onItemEdit,
  onItemDelete,
  onColumnTitleChange,
}) => {
  const [draggedItem, setDraggedItem] = useState<{ item: KanbanItem; columnId: string } | null>(null);
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [addingItem, setAddingItem] = useState<string | null>(null);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, item: KanbanItem, columnId: string) => {
    setDraggedItem({ item, columnId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.columnId === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    const newColumns = columns.map(column => {
      if (column.id === draggedItem.columnId) {
        // Remove item from source column
        return {
          ...column,
          items: column.items.filter(item => item.id !== draggedItem.item.id)
        };
      } else if (column.id === targetColumnId) {
        // Add item to target column
        return {
          ...column,
          items: [...column.items, draggedItem.item]
        };
      }
      return column;
    });

    onColumnsChange(newColumns);
    onItemMove?.(draggedItem.item.id, draggedItem.columnId, targetColumnId);
    setDraggedItem(null);
  };

  // Column title editing
  const handleColumnTitleEdit = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (column) {
      setEditingColumn(columnId);
      setNewColumnTitle(column.title);
    }
  };

  const handleColumnTitleSave = (columnId: string) => {
    if (newColumnTitle.trim()) {
      const newColumns = columns.map(column =>
        column.id === columnId
          ? { ...column, title: newColumnTitle.trim() }
          : column
      );
      onColumnsChange(newColumns);
      onColumnTitleChange?.(columnId, newColumnTitle.trim());
    }
    setEditingColumn(null);
    setNewColumnTitle('');
  };

  const handleColumnTitleCancel = () => {
    setEditingColumn(null);
    setNewColumnTitle('');
  };

  // Item management
  const handleAddItem = (columnId: string) => {
    if (newItemTitle.trim()) {
      const newItem: KanbanItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: newItemTitle.trim(),
        description: newItemDescription.trim() || undefined,
        priority: 'medium'
      };

      const newColumns = columns.map(column =>
        column.id === columnId
          ? { ...column, items: [...column.items, newItem] }
          : column
      );

      onColumnsChange(newColumns);
      onItemAdd?.(columnId, {
        title: newItem.title,
        description: newItem.description,
        priority: newItem.priority
      });
    }
    
    setAddingItem(null);
    setNewItemTitle('');
    setNewItemDescription('');
  };

  const handleDeleteItem = (itemId: string, columnId: string) => {
    const newColumns = columns.map(column =>
      column.id === columnId
        ? { ...column, items: column.items.filter(item => item.id !== itemId) }
        : column
    );
    
    onColumnsChange(newColumns);
    onItemDelete?.(itemId, columnId);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, p: 2, overflowX: 'auto', minHeight: '500px' }}>
      {columns.map((column) => (
        <Paper
          key={column.id}
          sx={{
            minWidth: 300,
            maxWidth: 300,
            bgcolor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
          }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: column.color || 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {editingColumn === column.id ? (
              <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
                <TextField
                  size="small"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleColumnTitleSave(column.id)}
                  sx={{
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                  }}
                  autoFocus
                />
                <Button
                  size="small"
                  onClick={() => handleColumnTitleSave(column.id)}
                  sx={{ color: 'white', minWidth: 'auto' }}
                >
                  ✓
                </Button>
                <Button
                  size="small"
                  onClick={handleColumnTitleCancel}
                  sx={{ color: 'white', minWidth: 'auto' }}
                >
                  ✕
                </Button>
              </Stack>
            ) : (
              <>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {column.title} ({column.items.length})
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleColumnTitleEdit(column.id)}
                  sx={{ color: 'inherit' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>

          {/* Column Content */}
          <Box sx={{ p: 2, minHeight: 400, maxHeight: 600, overflowY: 'auto' }}>
            <Stack spacing={2}>
              {/* Items */}
              {column.items.map((item) => (
                <Card
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, column.id)}
                  sx={{
                    cursor: 'grab',
                    '&:hover': {
                      boxShadow: 2,
                      transform: 'translateY(-1px)',
                    },
                    '&:active': {
                      cursor: 'grabbing',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <DragIcon sx={{ color: 'text.secondary', mt: 0.5 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {item.title}
                        </Typography>
                        {item.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {item.description}
                          </Typography>
                        )}
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                          {item.priority && (
                            <Chip
                              label={item.priority}
                              size="small"
                              color={getPriorityColor(item.priority) as any}
                              sx={{ textTransform: 'capitalize' }}
                            />
                          )}
                          {item.assignee && (
                            <Chip
                              label={item.assignee}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Stack>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteItem(item.id, column.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {/* Add Item Form */}
              {addingItem === column.id ? (
                <Card sx={{ bgcolor: 'background.paper' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack spacing={2}>
                      <TextField
                        size="small"
                        placeholder="Titre de la tâche"
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        autoFocus
                      />
                      <TextField
                        size="small"
                        placeholder="Description (optionnel)"
                        value={newItemDescription}
                        onChange={(e) => setNewItemDescription(e.target.value)}
                        multiline
                        rows={2}
                      />
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleAddItem(column.id)}
                          disabled={!newItemTitle.trim()}
                        >
                          Ajouter
                        </Button>
                        <Button
                          size="small"
                          onClick={() => setAddingItem(null)}
                        >
                          Annuler
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ) : (
                /* Add Item Button */
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setAddingItem(column.id)}
                  sx={{
                    borderStyle: 'dashed',
                    color: 'text.secondary',
                    borderColor: 'text.secondary',
                    '&:hover': {
                      borderStyle: 'solid',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  Ajouter une tâche
                </Button>
              )}
            </Stack>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default KanbanBoard;