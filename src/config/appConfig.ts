export const appConfig = {
  defaultLanguage: 'fr',
  appTitle: 'My MUI App',
  version: '1.0.0',
  apiCallTimeout: '10000'
};

export type AppConfig = typeof appConfig;

export function getAppConfig(): AppConfig {
  return appConfig;
}