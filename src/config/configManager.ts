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
            return new CurrentAppConfig(this.commonConfig, this.appDevConfig /*"TO DO: Add production Ap Config"*/); 
    }
}

export class CurrentAppConfig{
    public appTitle: string;
    public appVersion: string;
    public defaultLanguage: string;
    public backendApi: string;
    public airableApiKey: string;
    public apiCallTimeout: string;

    constructor(AppConfig: AppConfig, Config: AppDevConfig) {
        this.appTitle = AppConfig.appTitle;
        this.appVersion = AppConfig.version;
        this.airableApiKey = Config.airtableApiKey;
        this.backendApi = Config.backendApi;
        this.defaultLanguage = AppConfig.defaultLanguage;
        this.apiCallTimeout = AppConfig.apiCallTimeout;
    }
}

export const configManager = new ConfigManager();