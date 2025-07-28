import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  Stack
} from '@mui/material';

interface MailExample {
  subject: string;
  body: string;
  sender?: string;
}

interface CategorySection {
  name: string;
  description: string;
  senderType?: string;
  keywords?: string;
  subjectPattern?: string;
  format?: string;
  attachments?: string;
  urgency?: string;
  examples: MailExample[];
  confidenceLevel: 'auto' | 'high' | 'manual';
}

export default function CategoryForm() {
  const [sections, setSections] = useState<CategorySection[]>([]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        name: '',
        description: '',
        examples: [],
        confidenceLevel: 'manual',
      },
    ]);
  };

  const updateSection = (index: number, field: keyof CategorySection, value: any) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Ajouter une catégorie de mails
      </Typography>
      <Button onClick={addSection} variant="contained" sx={{ mb: 3 }}>
        ➕ Ajouter une section
      </Button>

      {sections.map((section, i) => (
        <Box key={i} sx={{ mb: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Section {i + 1}</Typography>

          <TextField
            label="Nom de la catégorie"
            fullWidth
            value={section.name}
            onChange={(e) => updateSection(i, 'name', e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description détaillée"
            fullWidth
            multiline
            minRows={3}
            value={section.description}
            onChange={(e) => updateSection(i, 'description', e.target.value)}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1">Options avancées</Typography>

          <Stack spacing={2} sx={{ mb: 2 }}>
            <TextField label="Type d'expéditeur" fullWidth onChange={(e) => updateSection(i, 'senderType', e.target.value)} />
            <TextField label="Mots-clés fréquents" fullWidth onChange={(e) => updateSection(i, 'keywords', e.target.value)} />
            <TextField label="Objet typique" fullWidth onChange={(e) => updateSection(i, 'subjectPattern', e.target.value)} />
            <TextField label="Structure ou format" fullWidth onChange={(e) => updateSection(i, 'format', e.target.value)} />
            <TextField label="Pièces jointes fréquentes" fullWidth onChange={(e) => updateSection(i, 'attachments', e.target.value)} />
            <TextField label="Urgence" fullWidth onChange={(e) => updateSection(i, 'urgency', e.target.value)} />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1">Niveau de confiance</Typography>
          <FormControlLabel
            control={<Checkbox checked={section.confidenceLevel === 'auto'} onChange={() => updateSection(i, 'confidenceLevel', 'auto')} />}
            label="Toujours classer automatiquement"
          />
          <FormControlLabel
            control={<Checkbox checked={section.confidenceLevel === 'high'} onChange={() => updateSection(i, 'confidenceLevel', 'high')} />}
            label="Classer uniquement avec un haut niveau de confiance"
          />
          <FormControlLabel
            control={<Checkbox checked={section.confidenceLevel === 'manual'} onChange={() => updateSection(i, 'confidenceLevel', 'manual')} />}
            label="Envoyer une suggestion à valider"
          />
        </Box>
      ))}
    </Box>
  );
}
