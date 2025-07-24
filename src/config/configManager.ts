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
            return new CurrentAppConfig(this.commonConfig, this.appDevConfig.backendApi);
        else(import.meta.env.PROD)
            return new CurrentAppConfig(this.commonConfig, "TO DO: Add production API URL");
    }
}

export class CurrentAppConfig{
    private config: AppConfig;
    private appDevConfig: AppDevConfig;

    constructor(AppCommonConfig: AppConfig, backendApi: string) {
        this.config = AppCommonConfig;
        this.appDevConfig = { backendApi };
    }
}