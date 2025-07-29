// src/models/ClientData.ts - Data models only
export interface ClientData {
  firstName?: string;
  lastName?: string;
  email: string;
  sourceEnregistrement: string;
}

export interface AirtableClientFields {
  "Prénom": string;
  "Nom": string;
  "E-mail": string;
  "Source Enregistrement": string;
}

export interface AirtableRecord {
  id?: string;
  fields: AirtableClientFields;
  createdTime?: string;
}

export interface AirtableResponse {
  records: AirtableRecord[];
}

export interface AirtableCreateRequest {
  records: {
    fields: AirtableClientFields;
  }[];
}

export interface AirtableUpdateRequest {
  records: {
    id: string;
    fields: AirtableClientFields;
  }[];
}