// src/models/UserSessionModel.ts
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
  subcategories?: CategorySection[];
}

export interface UserSessionModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  // Add mail automation categories
  mailCategories?: CategorySection[];
  // Add selected category state
  selectedCategory?: { parent: number; child?: number } | null;
  // Add any other user preferences
  preferences?: {
    showHelpCard?: boolean;
    [key: string]: any;
  };
}