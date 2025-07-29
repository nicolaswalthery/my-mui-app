// src/entities/ClientAirtableDbEntity.ts - Secure version without storing record IDs client-side
import axiosInstance from '../../services/StarcmdAirtableAxiosInstance';
import { configManager } from '../../config/configManager';
import { ApiErrorEnum } from '../../enums/ApiErrorEnum';
import { ApiErrorHandler } from '../../helpers/ApiErrorHandler';

export interface ClientData {
  firstName: string;
  lastName: string;
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

export class ClientAirtableDbEntity {
  private static instance: ClientAirtableDbEntity;
  private readonly tableName: string;

  private constructor() {
    const appConfig = configManager.getAppConfig();
    this.tableName = appConfig.starcmdAirtableClientTableName;
  }

  public static getInstance(): ClientAirtableDbEntity {
    if (!ClientAirtableDbEntity.instance) {
      ClientAirtableDbEntity.instance = new ClientAirtableDbEntity();
    }
    return ClientAirtableDbEntity.instance;
  }

  /**
   * Convert client data to Airtable fields format
   */
  private mapClientDataToAirtableFields(clientData: ClientData): AirtableClientFields {
    return {
      "Prénom": clientData.firstName,
      "Nom": clientData.lastName,
      "E-mail": clientData.email,
      "Source Enregistrement": clientData.sourceEnregistrement || "Application Web"
    };
  }

  /**
   * Convert Airtable fields to client data format
   */
  private mapAirtableFieldsToClientData(fields: AirtableClientFields): ClientData {
    return {
      firstName: fields["Prénom"] || "",
      lastName: fields["Nom"] || "",
      email: fields["E-mail"] || "",
      sourceEnregistrement: fields["Source Enregistrement"]
    };
  }

  /**
   * Create a new client record in Airtable
   */
  public async createClient(clientData: ClientData): Promise<ClientData> {
    try {
      const airtableFields = this.mapClientDataToAirtableFields(clientData);
      
      const requestData: AirtableCreateRequest = {
        records: [
          {
            fields: airtableFields
          }
        ]
      };

      const response = await axiosInstance.post<AirtableResponse>(
        `/${this.tableName}`,
        requestData
      );

      if (response.data.records && response.data.records.length > 0) {
        // Return only the client data, not the Airtable record ID
        return this.mapAirtableFieldsToClientData(response.data.records[0].fields);
      } else {
        throw ApiErrorHandler.createFromBusinessLogicError(
          ApiErrorEnum.PROFILE_CREATE_FAILED,
          "No record created"
        );
      }
    } catch (error: any) {
      console.error('Error creating client:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Update a client by email (more secure than using record ID)
   */
  public async updateClientByEmail(currentEmail: string, clientData: ClientData): Promise<ClientData> {
    try {
      // First, find the record by email
      const existingRecord = await this.findRecordByEmail(currentEmail);
      
      if (!existingRecord) {
        throw ApiErrorHandler.createFromBusinessLogicError(
          ApiErrorEnum.CLIENT_NOT_FOUND,
          "Client not found"
        );
      }

      const airtableFields = this.mapClientDataToAirtableFields(clientData);
      
      const requestData = {
        records: [
          {
            id: existingRecord.id,
            fields: airtableFields
          }
        ]
      };

      const response = await axiosInstance.patch<AirtableResponse>(
        `/${this.tableName}`,
        requestData
      );

      if (response.data.records && response.data.records.length > 0) {
        return this.mapAirtableFieldsToClientData(response.data.records[0].fields);
      } else {
        throw ApiErrorHandler.createFromBusinessLogicError(
          ApiErrorEnum.PROFILE_UPDATE_FAILED,
          "No record updated"
        );
      }
    } catch (error: any) {
      console.error('Error updating client:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Find a client record by email (internal method that returns full record)
   */
  private async findRecordByEmail(email: string): Promise<AirtableRecord | null> {
    try {
      const filterFormula = `{E-mail} = "${email}"`;
      const response = await axiosInstance.get<AirtableResponse>(
        `/${this.tableName}?filterByFormula=${encodeURIComponent(filterFormula)}`
      );

      if (response.data.records && response.data.records.length > 0) {
        return response.data.records[0];
      }
      return null;
    } catch (error: any) {
      console.error('Error finding client by email:', error);
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Find a client by email (public method that returns only client data)
   */
  public async findClientByEmail(email: string): Promise<ClientData | null> {
    try {
      const record = await this.findRecordByEmail(email);
      
      if (record && record.fields) {
        return this.mapAirtableFieldsToClientData(record.fields);
      }
      return null;
    } catch (error: any) {
      console.error('Error finding client by email:', error);
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Create or update a client using email as the identifier
   */
  public async upsertClientByEmail(clientData: ClientData, currentEmail?: string): Promise<ClientData> {
    try {
      const emailToSearch = currentEmail || clientData.email;
      
      // Check if client exists by email
      const existingRecord = await this.findRecordByEmail(emailToSearch);
      
      if (existingRecord) {
        // Update existing record
        return await this.updateClientByEmail(emailToSearch, clientData);
      } else {
        // Create new record
        return await this.createClient(clientData);
      }
    } catch (error: any) {
      console.error('Error upserting client:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Check if a client exists by email
   */
  public async clientExistsByEmail(email: string): Promise<boolean> {
    try {
      const client = await this.findClientByEmail(email);
      return client !== null;
    } catch (error: any) {
      console.error('Error checking client existence:', error);
      // For this method, we return false on error instead of throwing
      // since it's used for existence checks
      return false;
    }
  }

  /**
   * Validate if the current user can update a specific email
   * This should be enhanced with proper authentication checks
   */
  public async canUpdateClient(currentUserEmail: string, targetEmail: string): Promise<boolean> {
    // Basic validation - in a real app, you'd check against authenticated user
    // and potentially implement more sophisticated authorization logic
    return currentUserEmail === targetEmail;
  }
}