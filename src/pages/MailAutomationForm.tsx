import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material';
import CategoryEditor from '../components/CategoryEditor';
import type { CategorySection } from '../components/CategoryEditor';

export default function MailAutomationForm() {
  const [sections, setSections] = useState<CategorySection[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const addSection = () => {
    setSections([
      ...sections,
      {
        name: '',
        description: '',
        examples: [],
        confidenceLevel: 'manual',
        subcategories: []
      },
    ]);
    setSelectedIndex(sections.length);
  };

  const addSubcategory = (parentIndex: number) => {
    const newSections = [...sections];
    const parent = newSections[parentIndex];
    if (!parent.subcategories) parent.subcategories = [];
    parent.subcategories.push({
      name: '',
      description: '',
      examples: [],
      confidenceLevel: 'manual',
      subcategories: []
    });
    setSections(newSections);
  };

  const updateSection = (index: number, field: keyof CategorySection, value: any) => {
    const newSections = [...sections];
    newSections[index] = {
      ...newSections[index],
      [field]: value
    };
    setSections(newSections);
  };

  return (
    <Grid container spacing={4}>
      {/* Colonne gauche : Liste des catégories */}
      <Grid item xs={12} md={4}>
        <Typography variant="h5" gutterBottom>
          Catégories
        </Typography>
        <Button onClick={addSection} variant="contained" sx={{ mb: 2 }}>
          ➕ Nouvelle catégorie
        </Button>
        <Paper elevation={1}>
          <List dense>
            {sections.map((section, index) => (
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                <ListItemText primary={section.name || `Catégorie ${index + 1}`} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Colonne droite : Formulaire dynamique */}
      <Grid item xs={12} md={8}>
        {selectedIndex !== null && (
          <CategoryEditor
            section={sections[selectedIndex]}
            onChange={(field, value) => updateSection(selectedIndex, field, value)}
            onAddSubcategory={() => addSubcategory(selectedIndex)}
          />
        )}
      </Grid>
    </Grid>
  );
}
