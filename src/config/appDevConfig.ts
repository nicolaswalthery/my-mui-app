export const appDevelopementConfig = {
  backendApi: 'http://localhost:3000/api',
  airtableApiKey: '',
};

export type AppDevConfig = typeof appDevelopementConfig;

export function getAppDevConfig(): AppDevConfig {
  return appDevelopementConfig;
}