// src/services/EmailExampleAirtableService.ts - Service for email examples
import axiosInstance from './StarcmdAirtableAxiosInstance';
import { configManager } from '../config/configManager';
import { ApiErrorEnum } from '../enums/ApiErrorEnum';
import { ApiErrorHandler } from '../helpers/ApiErrorHandler';
import type { 
  MailExample,
  AirtableEmailExampleFields,
  AirtableRecord,
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
    console.log("=== createEmailExamples START ===");
    console.log("Number of examples:", examples.length);
    console.log("Category ID:", categoryId);
    
    if (examples.length === 0) {
      console.log("No examples to create, returning empty array");
      return [];
    }
    
    // Log each example
    examples.forEach((example, index) => {
      console.log(`Example ${index + 1}:`, example);
    });
    
    // Build request data
    const requestData: AirtableCreateRequest<AirtableEmailExampleFields> = {
      records: examples.map(example => ({
        fields: this.mapMailExampleToAirtableFields(example, categoryId)
      }))
    };
    
    // Log the complete request data
    console.log("Request data built:", JSON.stringify(requestData, null, 2));
    console.log("Number of records in request:", requestData.records.length);
    
    // Log each record in the request
    requestData.records.forEach((record, index) => {
      console.log(`Record ${index + 1} fields:`, record.fields);
    });
    
    console.log("Sending POST request to:", `/${this.tableName}`);
    console.log("Table name value:", this.tableName);
    console.log("Axios instance base URL:", axiosInstance.defaults.baseURL);
    console.log("Full URL will be:", `${axiosInstance.defaults.baseURL}/${this.tableName}`);
    
    // FIXED: Declare response variable at the outer scope
    let response;
    
    try {
      // Add request interceptor logging if needed
      console.log("About to make POST request...");
      
      response = await axiosInstance.post<AirtableResponse<AirtableEmailExampleFields>>(
        `/${this.tableName}`,
        requestData
      );
      
      console.log("POST request successful!");
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      
    } catch (axiosError: any) {
      console.error("Axios error occurred!");
      console.error("Error response status:", axiosError.response?.status);
      console.error("Error response data:", axiosError.response?.data);
      console.error("Error message:", axiosError.message);
      console.error("Request config:", axiosError.config);
      
      // Check if it's an Airtable-specific error
      if (axiosError.response?.data?.error) {
        console.error("Airtable error type:", axiosError.response.data.error.type);
        console.error("Airtable error message:", axiosError.response.data.error.message);
      }
      
      throw axiosError; // Re-throw to be caught by outer catch
    }
    
    // Now response is accessible here
    console.log("Response received:", response.data);
    console.log("Number of records in response:", response.data.records?.length || 0);
    
    if (response.data.records && response.data.records.length > 0) {
      const recordIds = response.data.records.map(record => record.id!);
      console.log("Created record IDs:", recordIds);
      console.log("=== createEmailExamples END SUCCESS ===");
      return recordIds;
    } else {
      console.log("No records in response, throwing error");
      throw ApiErrorHandler.createFromBusinessLogicError(
        ApiErrorEnum.PROFILE_CREATE_FAILED,
        "No email examples created"
      );
    }
  } catch (error: any) {
    console.error('=== createEmailExamples ERROR ===');
    console.error('Error creating email examples:', error);
    console.error('Error type:', typeof error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
      console.error('Throwing known API error:', error.code);
      throw error;
    }
    console.error('Throwing HTTP error');
    throw ApiErrorHandler.createFromHttpError(error);
  }
}

  /**
   * Update email examples for a category
   */
  public async updateEmailExamples(
    exampleIds: string[], 
    examples: MailExample[], 
    categoryId?: string
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