// src/components/CategoryEditor.tsx
import React from 'react';
import {
  Box,
  TextField,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Button
} from '@mui/material';

export interface MailExample {
  subject: string;
  body: string;
  sender?: string;
}

export interface CategorySection {
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
  subcategories?: CategorySection[];
}

interface CategoryEditorProps {
  section: CategorySection;
  onChange: (field: keyof CategorySection, value: any) => void;
  onAddSubcategory?: () => void;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({
  section,
  onChange,
  onAddSubcategory
}) => (
  <Box sx={{ p: 2, mb: 4, border: '1px dashed #ccc', borderRadius: 2 }}>
    <TextField
      label="Nom de la catégorie"
      fullWidth
      value={section.name}
      onChange={(e) => onChange('name', e.target.value)}
      sx={{ mb: 2 }}
    />

    <TextField
      label="Description"
      fullWidth
      multiline
      minRows={2}
      value={section.description}
      onChange={(e) => onChange('description', e.target.value)}
      sx={{ mb: 2 }}
    />

    <Stack spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Mots-clés"
        fullWidth
        value={section.keywords || ''}
        onChange={(e) => onChange('keywords', e.target.value)}
      />
    </Stack>

    <Typography variant="subtitle2" gutterBottom>
      Niveau de confiance
    </Typography>
    <FormControlLabel
      control={
        <Checkbox
          checked={section.confidenceLevel === 'auto'}
          onChange={() => onChange('confidenceLevel', 'auto')}
        />
      }
      label="Classer automatiquement"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={section.confidenceLevel === 'high'}
          onChange={() => onChange('confidenceLevel', 'high')}
        />
      }
      label="Classer avec haute confiance"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={section.confidenceLevel === 'manual'}
          onChange={() => onChange('confidenceLevel', 'manual')}
        />
      }
      label="Valider manuellement"
    />

    {onAddSubcategory && (
      <Button variant="outlined" sx={{ mt: 2 }} onClick={onAddSubcategory}>
        ➕ Ajouter une sous-catégorie
      </Button>
    )}

    {section.subcategories?.map((subcat, idx) => (
      <CategoryEditor
        key={idx}
        section={subcat}
        onChange={(field, value) => {
          const newSubcategories = [...(section.subcategories ?? [])];
          newSubcategories[idx] = { ...newSubcategories[idx], [field]: value };
          onChange('subcategories', newSubcategories);
        }}
      />
    ))}
  </Box>
);

export default CategoryEditor;
