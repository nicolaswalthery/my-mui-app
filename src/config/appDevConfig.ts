export const appDevelopementConfig = {
  backendApi: 'http://localhost:3000/api',
  airtableApiKey: import.meta.env.AIRTABLE_API_KEY,
  airtableBaseUrl: `https://api.airtable.com/v0/${import.meta.env.AIRTABLE_BASE_ID}`,
};

export type AppDevConfig = typeof appDevelopementConfig;

export function getAppDevConfig(): AppDevConfig {
  return appDevelopementConfig;
}