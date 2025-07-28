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
  const [selected, setSelected] = useState<{ parent: number; child?: number } | null>(null);

  const addSection = () => {
    setSections([
      ...sections,
      {
        name: '',
        description: '',
        examples: [],
        confidenceLevel: 'manual',
        subcategories: [],
      },
    ]);
    setSelected({ parent: sections.length });
  };

  const addSubcategory = (parentIndex: number) => {
    const updated = [...sections];
    const parent = updated[parentIndex];
    if (!parent.subcategories) parent.subcategories = [];
    parent.subcategories.push({
      name: '',
      description: '',
      examples: [],
      confidenceLevel: 'manual',
      subcategories: [],
    });
    setSections(updated);
  };

  const updateSection = (parentIndex: number, field: keyof CategorySection, value: any, childIndex?: number) => {
    const updated = [...sections];
    if (childIndex !== undefined) {
      const subcats = updated[parentIndex].subcategories ?? [];
      subcats[childIndex] = { ...subcats[childIndex], [field]: value };
      updated[parentIndex].subcategories = subcats;
    } else {
      updated[parentIndex] = { ...updated[parentIndex], [field]: value };
    }
    setSections(updated);
  };

  const getCurrentSection = () => {
    if (!selected) return null;
    const parent = sections[selected.parent];
    if (!parent) return null;
    if (selected.child !== undefined) return parent.subcategories?.[selected.child] ?? null;
    return parent;
  };

  return (
    <Grid container spacing={4}>
      {/* Left column: Category + Subcategory list */}
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
              <Box key={index}>
                <ListItemButton
                  selected={selected?.parent === index && selected?.child === undefined}
                  onClick={() => setSelected({ parent: index })}
                >
                  <ListItemText primary={section.name || `Catégorie ${index + 1}`} />
                </ListItemButton>

                {/* Subcategories */}
                {section.subcategories?.map((sub, subIndex) => (
                  <ListItemButton
                    key={`sub-${index}-${subIndex}`}
                    sx={{ pl: 4 }}
                    selected={selected?.parent === index && selected?.child === subIndex}
                    onClick={() => setSelected({ parent: index, child: subIndex })}
                  >
                    <ListItemText primary={sub.name || `↳ Sous-catégorie ${subIndex + 1}`} />
                  </ListItemButton>
                ))}
              </Box>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Right column: Editor */}
      <Grid item xs={12} md={8}>
        {selected && getCurrentSection() && (
          <CategoryEditor
            section={getCurrentSection()!}
            onChange={(field, value) =>
              updateSection(selected.parent, field, value, selected.child)
            }
            onAddSubcategory={
              selected.child === undefined
                ? () => addSubcategory(selected.parent)
                : undefined // only allow sub-subcategories if you want recursion
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
