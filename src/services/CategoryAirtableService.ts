// src/services/CategoryAirtableService.ts - Service for categories with recursive relationships
import axiosInstance from './StarcmdAirtableAxiosInstance';
import { configManager } from '../config/configManager';
import { ApiErrorEnum } from '../enums/ApiErrorEnum';
import { ApiErrorHandler } from '../helpers/ApiErrorHandler';
import { EmailExampleAirtableService } from './EmailExampleAirtableService';
import type { 
  CategorySection,
  AirtableCategoryFields,
  AirtableRecord,
  AirtableResponse,
  AirtableCreateRequest,
  AirtableUpdateRequest,
  CategoryHierarchy
} from '../models/CategoryData';

export class CategoryAirtableService {
  private static instance: CategoryAirtableService;
  private readonly tableName: string;
  private readonly tableId: string = 'tblMqtB7fzXgBGAOs';
  private emailExampleService: EmailExampleAirtableService;

  private constructor() {
    const appConfig = configManager.getAppConfig();
    this.tableName = appConfig.starcmdAirtableCategoriesTableName;
    this.emailExampleService = EmailExampleAirtableService.getInstance();
  }

  public static getInstance(): CategoryAirtableService {
    if (!CategoryAirtableService.instance) {
      CategoryAirtableService.instance = new CategoryAirtableService();
    }
    return CategoryAirtableService.instance;
  }

  /**
   * Convert category data to Airtable fields format
   */
  private mapCategoryToAirtableFields(
    category: CategorySection, 
    emailExampleIds?: string[],
    parentCategoryId?: string,
    subcategoryIds?: string[],
    clientId?: string
  ): AirtableCategoryFields {
    return {
      "Nom de la catégorie": category.name,
      "Description": category.description,
      ...(emailExampleIds && emailExampleIds.length > 0 && { "Exemples d'e-mails": emailExampleIds }),
      ...(clientId && { "Client": [clientId] }),
      ...(parentCategoryId && { "Catégorie principale": [parentCategoryId] }),
      ...(subcategoryIds && subcategoryIds.length > 0 && { "Sous-catégories": subcategoryIds }),
      ...(category.keywords && { "Mots-cléfs": category.keywords }),
      ...(category.senderType && { "Type d'expéditeur": category.senderType }),
      ...(category.subjectPattern && { "Modèle de sujet": category.subjectPattern }),
      ...(category.format && { "Format du message": category.format }),
      ...(category.attachments && { "Types de pièces jointes probables": category.attachments }),
      ...(category.urgency && { "Niveau d'urgence par défaut": category.urgency })
    };
  }

  /**
   * Convert Airtable fields to category data format
   */
  private mapAirtableFieldsToCategory(fields: AirtableCategoryFields, record: AirtableRecord<AirtableCategoryFields>): CategorySection {
    return {
      id: record.id,
      name: fields["Nom de la catégorie"] || "",
      description: fields["Description"] || "",
      keywords: fields["Mots-cléfs"],
      senderType: fields["Type d'expéditeur"],
      subjectPattern: fields["Modèle de sujet"],
      format: fields["Format du message"],
      attachments: fields["Types de pièces jointes probables"],
      urgency: fields["Niveau d'urgence par défaut"],
      examples: [], // Will be populated separately
      subcategories: [], // Will be populated separately
      parentCategoryId: fields["Catégorie principale"]?.[0]
    };
  }

  /**
   * Create a single category without subcategories
   */
  private async createSingleCategory(
    category: CategorySection, 
    parentCategoryId?: string,
    clientId?: string
  ): Promise<string> {
    try {
      // First create email examples
      let emailExampleIds: string[] = [];
      if (category.examples && category.examples.length > 0) {
        emailExampleIds = await this.emailExampleService.createEmailExamples(category.examples, category.id!);
      }

      // Create the category record
      const airtableFields = this.mapCategoryToAirtableFields(
        category, 
        emailExampleIds, 
        parentCategoryId,
        undefined, // subcategoryIds will be set later
        clientId
      );

      const requestData: AirtableCreateRequest<AirtableCategoryFields> = {
        records: [{ fields: airtableFields }]
      };

      const response = await axiosInstance.post<AirtableResponse<AirtableCategoryFields>>(
        `/${this.tableName}`,
        requestData
      );

      if (response.data.records && response.data.records.length > 0) {
        const categoryId = response.data.records[0].id!;
        
        // Update email examples to link back to category
        if (emailExampleIds.length > 0) {
          await this.emailExampleService.updateEmailExamples(
            emailExampleIds, 
            category.examples, 
            categoryId
          );
        }

        return categoryId;
      } else {
        throw ApiErrorHandler.createFromBusinessLogicError(
          ApiErrorEnum.PROFILE_CREATE_FAILED,
          "No category created"
        );
      }
    } catch (error: any) {
      console.error('Error creating single category:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Flatten category hierarchy for processing
   */
  private flattenCategoryHierarchy(categories: CategorySection[], parentId?: string, level: number = 0): CategoryHierarchy[] {
    const flattened: CategoryHierarchy[] = [];
    
    for (const category of categories) {
      // Add current category
      flattened.push({
        category: { ...category, subcategories: [] }, // Remove subcategories for individual processing
        parentId,
        level
      });
      
      // Add subcategories recursively
      if (category.subcategories && category.subcategories.length > 0) {
        // We'll need to use the actual category ID, so we'll process this after creation
        const subFlattened = this.flattenCategoryHierarchy(category.subcategories, undefined, level + 1);
        flattened.push(...subFlattened);
      }
    }
    
    return flattened;
  }

  /**
   * Create categories with full hierarchy support
   */
  public async createCategoriesWithHierarchy(categories: CategorySection[], clientId?: string): Promise<CategorySection[]> {
    try {
      console.log("createCategoriesWithHierarchy");
      const createdCategories: { [tempId: string]: string } = {}; // Map temp IDs to real IDs
      const categoryMap: { [realId: string]: CategorySection } = {};
      const results: CategorySection[] = [];

      // Process categories level by level to handle dependencies
      const processLevel = async (cats: CategorySection[], parentId?: string): Promise<CategorySection[]> => {
        const levelResults: CategorySection[] = [];

        for (const category of cats) {
          // Create the main category
          const categoryId = await this.createSingleCategory(category, parentId, clientId);
          
          // Store the mapping
          const tempId = `temp_${Date.now()}_${Math.random()}`;
          createdCategories[tempId] = categoryId;
          
          // Create the result object
          const resultCategory: CategorySection = {
            ...category,
            id: categoryId,
            subcategories: []
          };

          categoryMap[categoryId] = resultCategory;
          levelResults.push(resultCategory);

          // Process subcategories recursively
          if (category.subcategories && category.subcategories.length > 0) {
            const subcategoryResults = await processLevel(category.subcategories, categoryId);
            resultCategory.subcategories = subcategoryResults;
            
            // Update parent category to link to subcategories
            await this.updateCategorySubcategories(categoryId, subcategoryResults.map(sub => sub.id!));
          }
        }

        return levelResults;
      };

      const results_processed = await processLevel(categories);
      return results_processed;

    } catch (error: any) {
      console.error('Error creating categories with hierarchy:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Update category to link subcategories
   */
  private async updateCategorySubcategories(categoryId: string, subcategoryIds: string[]): Promise<void> {
    try {
      const requestData: AirtableUpdateRequest<Partial<AirtableCategoryFields>> = {
        records: [{
          id: categoryId,
          fields: {
            "Sous-catégories": subcategoryIds
          }
        }]
      };

      await axiosInstance.patch<AirtableResponse<AirtableCategoryFields>>(
        `/${this.tableName}`,
        requestData
      );
    } catch (error: any) {
      console.error('Error updating category subcategories:', error);
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Get categories by client with full hierarchy
   */
  public async getCategoriesByClient(clientId: string): Promise<CategorySection[]> {
    try {
      const filterFormula = `{Client} = "${clientId}"`;
      const response = await axiosInstance.get<AirtableResponse<AirtableCategoryFields>>(
        `/${this.tableName}?filterByFormula=${encodeURIComponent(filterFormula)}`
      );

      if (!response.data.records || response.data.records.length === 0) {
        return [];
      }

      // Convert records to categories
      const allCategories = await Promise.all(
        response.data.records.map(async (record) => {
          const category = this.mapAirtableFieldsToCategory(record.fields, record);
          
          // Load email examples
          if (record.fields["Exemples d'e-mails"] && record.fields["Exemples d'e-mails"].length > 0) {
            category.examples = await this.emailExampleService.getEmailExamplesByCategory(record.id!);
          }
          
          return category;
        })
      );

      // Build hierarchy (only return root categories, subcategories will be nested)
      const rootCategories = allCategories.filter(cat => !cat.parentCategoryId);
      const categoryMap = new Map(allCategories.map(cat => [cat.id!, cat]));

      // Build the hierarchy
      const buildHierarchy = (category: CategorySection): CategorySection => {
        const subcategoryIds = response.data.records
          .find(record => record.id === category.id)?.fields["Sous-catégories"] || [];
        
        category.subcategories = subcategoryIds
          .map(id => categoryMap.get(id))
          .filter(Boolean)
          .map(subcat => buildHierarchy(subcat!));
        
        return category;
      };

      return rootCategories.map(buildHierarchy);

    } catch (error: any) {
      console.error('Error getting categories by client:', error);
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Update a category and its hierarchy
   */
  public async updateCategory(category: CategorySection, clientId?: string): Promise<CategorySection> {
    try {
      if (!category.id) {
        throw ApiErrorHandler.createFromBusinessLogicError(
          ApiErrorEnum.CLIENT_NOT_FOUND,
          "Category ID is required for update"
        );
      }

      // Update email examples
      let emailExampleIds: string[] = [];
      if (category.examples && category.examples.length > 0) {
        // Get existing email example IDs
        const existingCategory = await this.getCategoryById(category.id);
        const existingEmailIds = existingCategory ? 
          await this.getEmailExampleIdsByCategory(category.id) : [];
        
        emailExampleIds = await this.emailExampleService.updateEmailExamples(
          existingEmailIds,
          category.examples,
          category.id
        );
      }

      // Update category
      const airtableFields = this.mapCategoryToAirtableFields(
        category,
        emailExampleIds,
        category.parentCategoryId,
        category.subcategories?.map(sub => sub.id!).filter(Boolean),
        clientId
      );

      const requestData: AirtableUpdateRequest<AirtableCategoryFields> = {
        records: [{
          id: category.id,
          fields: airtableFields
        }]
      };

      const response = await axiosInstance.patch<AirtableResponse<AirtableCategoryFields>>(
        `/${this.tableName}`,
        requestData
      );

      if (response.data.records && response.data.records.length > 0) {
        return this.mapAirtableFieldsToCategory(response.data.records[0].fields, response.data.records[0]);
      } else {
        throw ApiErrorHandler.createFromBusinessLogicError(
          ApiErrorEnum.PROFILE_UPDATE_FAILED,
          "No category updated"
        );
      }
    } catch (error: any) {
      console.error('Error updating category:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Delete a category and its subcategories
   */
  public async deleteCategory(categoryId: string): Promise<boolean> {
    try {
      // Get category with subcategories
      const category = await this.getCategoryById(categoryId);
      if (!category) {
        throw ApiErrorHandler.createFromBusinessLogicError(
          ApiErrorEnum.CLIENT_NOT_FOUND,
          "Category not found"
        );
      }

      // Delete subcategories recursively
      if (category.subcategories && category.subcategories.length > 0) {
        for (const subcategory of category.subcategories) {
          if (subcategory.id) {
            await this.deleteCategory(subcategory.id);
          }
        }
      }

      // Delete email examples
      const emailExampleIds = await this.getEmailExampleIdsByCategory(categoryId);
      if (emailExampleIds.length > 0) {
        await this.emailExampleService.deleteEmailExamples(emailExampleIds);
      }

      // Delete the category itself
      await axiosInstance.delete(`/${this.tableName}?records[]=${categoryId}`);
      return true;
    } catch (error: any) {
      console.error('Error deleting category:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }

  /**
   * Get a single category by ID
   */
  private async getCategoryById(categoryId: string): Promise<CategorySection | null> {
    try {
      const response = await axiosInstance.get<AirtableResponse<AirtableCategoryFields>>(
        `/${this.tableName}/${categoryId}`
      );

      if (response.data && 'fields' in response.data) {
        // Single record response format
        const record = response.data as unknown as AirtableRecord<AirtableCategoryFields>;
        const category = this.mapAirtableFieldsToCategory(record.fields, record);
        category.examples = await this.emailExampleService.getEmailExamplesByCategory(categoryId);
        return category;
      }
      return null;
    } catch (error: any) {
      console.error('Error getting category by ID:', error);
      return null;
    }
  }

  /**
   * Get email example IDs for a category
   */
  private async getEmailExampleIdsByCategory(categoryId: string): Promise<string[]> {
    try {
      const response = await axiosInstance.get<AirtableResponse<AirtableCategoryFields>>(
        `/${this.tableName}/${categoryId}`
      );

      if (response.data && 'fields' in response.data) {
        const record = response.data as unknown as AirtableRecord<AirtableCategoryFields>;
        return record.fields["Exemples d'e-mails"] || [];
      }
      return [];
    } catch (error: any) {
      console.error('Error getting email example IDs:', error);
      return [];
    }
  }

  /**
   * Save all categories for a user (creates or updates based on existing data)
   */
  public async saveUserCategories(categories: CategorySection[], userId: string): Promise<CategorySection[]> {
    try {
      // Delete existing categories for this client
      const existingCategories = await this.getCategoriesByClient(userId);
      
      for(const test of existingCategories)
        console.log("existing cat : "+test);
      for (const category of existingCategories) {
        if (category.id) {
          console.log("delete : "+category.id);
          await this.deleteCategory(category.id);
        }
      }
      
      // Create new categories
      return await this.createCategoriesWithHierarchy(categories, userId);
    } catch (error: any) {
      console.error('Error saving user categories:', error);
      
      if (error && typeof error === 'object' && 'code' in error && Object.values(ApiErrorEnum).includes(error.code as ApiErrorEnum)) {
        throw error;
      }
      throw ApiErrorHandler.createFromHttpError(error);
    }
  }
}