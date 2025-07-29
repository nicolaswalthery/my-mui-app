// src/models/CategoryData.ts - Data models for categories and email examples
export interface MailExample {
  subject: string;
  body: string;
  sender?: string;
}

export interface CategorySection {
  id?: string; // Airtable record ID when loaded from database
  name: string;
  description: string;
  senderType?: string;
  keywords?: string;
  subjectPattern?: string;
  format?: string;
  attachments?: string;
  urgency?: string;
  examples: MailExample[];
  subcategories?: CategorySection[];
  parentCategoryId?: string; // For linking to parent category
}

// Airtable field mapping for Categories table using field names
export interface AirtableCategoryFields {
  [key: string]: any;
  // Using field names for better readability
  "Nom de la catégorie": string;
  "Description": string;
  "Exemples d'e-mails"?: string[]; // Links to email examples
  "Client"?: string[]; // Links to clients
  "Catégorie principale"?: string[]; // Parent category
  "Sous-catégories"?: string[]; // Child categories
  "Mots-cléfs"?: string;
  "Type d'expéditeur"?: string;
  "Modèle de sujet"?: string;
  "Format du message"?: string;
  "Types de pièces jointes probables"?: string;
  "Niveau d'urgence par défaut"?: string;
}

// Airtable field mapping for Email Examples table using field names
export interface AirtableEmailExampleFields {
  [key: string]: any;
  "Sujet": string; // Subject
  "Corps": string; // Body
  "Expéditeur"?: string; // Sender
  "Catégorie"?: string[]; // Link back to category
}

export interface AirtableRecord<T = any> {
  id?: string;
  fields: T;
  createdTime?: string;
}

export interface AirtableResponse<T = any> {
  records: AirtableRecord<T>[];
  offset?: string;
}

export interface AirtableCreateRequest<T = any> {
  records: {
    fields: T;
  }[];
}

export interface AirtableUpdateRequest<T = any> {
  records: {
    id: string;
    fields: T;
  }[];
}

// Helper type for category creation with hierarchy
export interface CategoryHierarchy {
  category: CategorySection;
  parentId?: string;
  level: number; // 0 for root categories, 1+ for subcategories
}