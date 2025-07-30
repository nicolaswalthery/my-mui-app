// src/services/EmailExampleAirtableService.ts - Service for email examples
import axiosInstance from './StarcmdAirtableAxiosInstance';
import { configManager } from '../config/configManager';
import { ApiErrorEnum } from '../enums/ApiErrorEnum';
import { ApiErrorHandler } from '../helpers/ApiErrorHandler';
import type { 
  MailExample,
  AirtableEmailExampleFields,
  AirtableResponse,
  AirtableCreateRequest,
  AirtableUpdateRequest
} from '../models/CategoryData';

export class EmailExampleAirtableService {
  private static instance: EmailExampleAirtableService;
  private readonly tableName: string;

  private constructor() {
    const appConfig = configManager.getAppConfig();
    this.tableName = appConfig.starcmdAirtableEmailExempleTableName;
  }

  public static getInstance(): EmailExampleAirtableService {
    if (!EmailExampleAirtableService.instance) {
      EmailExampleAirtableService.instance = new EmailExampleAirtableService();
    }
    return EmailExampleAirtableService.instance;
  }

  /**
 * Convert mail example to Airtable fields format
 */
  private mapMailExampleToAirtableFields(example: MailExample, categoryId: string): AirtableEmailExampleFields {
    const airtableFields = {
      "Sujet": example.subject,
      "Corps": example.body,
      "Expéditeur": example.sender || "",
      "Catégorie": [categoryId]
    };
    return airtableFields;
  }

  /**
   * Convert Airtable fields to mail example format
   */
  private mapAirtableFieldsToMailExample(fields: AirtableEmailExampleFields): MailExample {
    return {
      subject: fields["Sujet"] || "",
      body: fields["Corps"] || "",
      sender: fields["Expéditeur"]
    };
  }

  public async createEmailExamples(examples: MailExample[], categoryId: string): Promise<string[]> {
    try {
      if (examples.length === 0) {
        return [];
      }
      
      // Build request data
      const requestData: AirtableCreateRequest<AirtableEmailExampleFields> = {
        records: examples.map(example => ({
          fields: this.mapMailExampleToAirtableFields(example, categoryId)
        }))
      };
      
      // Declare response variable at the outer scope
      let response;
      
      try {
        response = await axiosInstance.post<AirtableResponse<AirtableEmailExampleFields>>(
          `/${this.tableName}`,
          requestData
        );
      } catch (axiosError: any) {
        // Check if it's an Airtable-specific error
        if (axiosError.response?.data?.error) {
          console.error("Airtable error type:", axiosError.response.data.error.type);
          console.error("Airtable error message:", axiosError.response.data.error.message);
        }
        
        throw axiosError; // Re-throw to be caught by outer catch
      }
      
      if (response.data.records && response.data.records.length > 0) {
        const recordIds = response.data.records.map(record => record.id!);
        return recordIds;
      } else {
        throw ApiErrorHandler.createFromBusinessLogicError(
          ApiErrorEnum.PROFILE_CREATE_FAILED,
          "No email examples created"
        );
      }
    } catch (error: any) {
      console.error('Error creating email examples:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Update email examples for a category
   */
  public async updateEmailExamples(
    exampleIds: string[], 
    examples: MailExample[], 
    categoryId: string
  ): Promise<string[]> {
    try {
      if (examples.length === 0) return [];

      // If we have more examples than existing IDs, create new ones
      const updateRecords = examples.slice(0, exampleIds.length);
      const newExamples = examples.slice(exampleIds.length);

      let updatedIds = [...exampleIds];

      // Update existing records
      if (updateRecords.length > 0) {
        const updateRequestData: AirtableUpdateRequest<AirtableEmailExampleFields> = {
          records: updateRecords.map((example, index) => ({
            id: exampleIds[index],
            fields: this.mapMailExampleToAirtableFields(example, categoryId)
          }))
        };

        await axiosInstance.patch<AirtableResponse<AirtableEmailExampleFields>>(
          `/${this.tableName}`,
          updateRequestData
        );
      }

      // Create new records if needed
      if (newExamples.length > 0) {
        const newIds = await this.createEmailExamples(newExamples, categoryId);
        updatedIds = [...updatedIds, ...newIds];
      }

      // Delete excess records if we have fewer examples now
      if (exampleIds.length > examples.length) {
        const idsToDelete = exampleIds.slice(examples.length);
        await this.deleteEmailExamples(idsToDelete);
        updatedIds = updatedIds.slice(0, examples.length);
      }

      return updatedIds;
    } catch (error: any) {
      console.error('Error updating email examples:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Delete email examples
   */
  public async deleteEmailExamples(exampleIds: string[]): Promise<boolean> {
    try {
      if (exampleIds.length === 0) return true;

      // Airtable allows deleting multiple records at once
      const deleteParams = new URLSearchParams();
      exampleIds.forEach(id => deleteParams.append('records[]', id));

      await axiosInstance.delete(`/${this.tableName}?${deleteParams.toString()}`);
      return true;
    } catch (error: any) {
      console.error('Error deleting email examples:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Get email examples by category ID
   */
  public async getEmailExamplesByCategory(categoryId: string): Promise<MailExample[]> {
    try {
      const filterFormula = `{Catégorie} = "${categoryId}"`;
      const response = await axiosInstance.get<AirtableResponse<AirtableEmailExampleFields>>(
        `/${this.tableName}?filterByFormula=${encodeURIComponent(filterFormula)}`
      );

      if (response.data.records && response.data.records.length > 0) {
        return response.data.records.map(record => 
          this.mapAirtableFieldsToMailExample(record.fields)
        );
      }
      return [];
    } catch (error: any) {
      console.error('Error getting email examples by category:', error);
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }
}