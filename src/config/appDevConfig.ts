export const appDevelopementConfig = {
  backendApi: 'http://localhost:3000/api',
  airtableApiKey: import.meta.env.AIRTABLE_API_KEY,
  starcmdAirtableBaseUrl: `https://api.airtable.com/v0/${import.meta.env.STARCMD_AIRTABLE_BASE_ID}`,
  starcmdAirtableToken: 'patkmu6TWHjlfUaZU.076f5773bab358208dce350becc4d18381f4aec5f72ebb48e61a22c402431688',
  starcmdAirtableClientTableName: 'Clients',
  starcmdAirtableCategoriesTableName: 'Catégories',
  starcmdAirtableEmailExempleTableName: 'Emails Exemple',
};

export type AppDevConfig = typeof appDevelopementConfig;

export function getAppDevConfig(): AppDevConfig {
  return appDevelopementConfig;
}