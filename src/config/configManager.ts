import type { AppConfig } from './appConfig';
import { getAppConfig } from './appConfig';
import type { AppDevConfig } from './appDevConfig';
import { getAppDevConfig } from './appDevConfig';

export class ConfigManager {
  private commonConfig: AppConfig;
  private appDevConfig: AppDevConfig;

  constructor() {
    this.commonConfig = getAppConfig();
    this.appDevConfig = getAppDevConfig();
  }

    getAppConfig(): CurrentAppConfig {
        if(import.meta.env.DEV)
            return new CurrentAppConfig(this.commonConfig, this.appDevConfig);
        
        else(import.meta.env.PROD)
            return new CurrentAppConfig(this.commonConfig, this.appDevConfig /*"TO DO: Add production App Config"*/); 
    }
}

export class CurrentAppConfig{
    public appTitle: string;
    public appVersion: string;
    public defaultLanguage: string;
    public backendApi: string;
    public airtableApiKey: string;
    public apiCallTimeout: string;
    
    // Airtable configuration
    public airtableBaseUrl: string;
    public starcmdAirtableToken: string;
    public starcmdAirtableClientTableName: string;
    public starcmdAirtableCategoriesTableName: string;
    public starcmdAirtableEmailExempleTableName: string;
    
    // Table IDs for more stable API access
    public starcmdAirtableClientTableId: string;
    public starcmdAirtableCategoriesTableId: string;
    public starcmdAirtableEmailExempleTableId: string;

    constructor(AppConfig: AppConfig, Config: AppDevConfig) {
        this.appTitle = AppConfig.appTitle;
        this.appVersion = AppConfig.version;
        this.airtableApiKey = Config.airtableApiKey;
        this.backendApi = Config.backendApi;
        this.defaultLanguage = AppConfig.defaultLanguage;
        this.apiCallTimeout = AppConfig.apiCallTimeout;
        
        // Airtable configuration
        this.airtableBaseUrl = Config.airtableBaseUrl;
        this.starcmdAirtableToken = Config.starcmdAirtableToken;
        this.starcmdAirtableClientTableName = Config.starcmdAirtableClientTableName;
        this.starcmdAirtableCategoriesTableName = Config.starcmdAirtableCategoriesTableName;
        this.starcmdAirtableEmailExempleTableName = Config.starcmdAirtableEmailExempleTableName;
        
        // Table IDs
        this.starcmdAirtableClientTableId = Config.starcmdAirtableClientTableId;
        this.starcmdAirtableCategoriesTableId = Config.starcmdAirtableCategoriesTableId;
        this.starcmdAirtableEmailExempleTableId = Config.starcmdAirtableEmailExempleTableId;
    }
}

export const configManager = new ConfigManager();