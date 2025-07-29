export const appConfig = {
  defaultLanguage: 'fr',
  appTitle: 'STARCMD.AI',
  version: '1.0.0',
  apiCallTimeout: '10000',
  source: 'Service : Catégorisation Automatique Mail'
};

export type AppConfig = typeof appConfig;

export function getAppConfig(): AppConfig {
  return appConfig;
}