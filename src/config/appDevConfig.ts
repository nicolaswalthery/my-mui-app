export const appDevelopementConfig = {
  backendApi: import.meta.env.VITE_BACKEND_API,
  airtableApiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
  airtableBaseUrl: import.meta.env.VITE_AIRTABLE_BASE_URL,
  starcmdAirtableToken: import.meta.env.VITE_STARCMD_AIRTABLE_TOKEN,
  starcmdAirtableClientTableName: import.meta.env.VITE_STARCMD_AIRTABLE_CLIENT_TABLE_NAME,
  starcmdAirtableCategoriesTableName: import.meta.env.VITE_STARCMD_AIRTABLE_CATEGORIES_TABLE_NAME,
  starcmdAirtableEmailExempleTableName: import.meta.env.VITE_STARCMD_AIRTABLE_EMAIL_EXAMPLE_TABLE_NAME,
  starcmdAirtableClientTableId: import.meta.env.VITE_STARCMD_AIRTABLE_CLIENT_TABLE_ID,
  starcmdAirtableCategoriesTableId: import.meta.env.VITE_STARCMD_AIRTABLE_CATEGORIES_TABLE_ID,
  starcmdAirtableEmailExempleTableId: import.meta.env.VITE_STARCMD_AIRTABLE_EMAIL_EXAMPLE_TABLE_ID,
  sendGridDevApiKey: import.meta.env.VITE_SENDGRID_API_KEY,
}

export type AppDevConfig = typeof appDevelopementConfig;

export function getAppDevConfig(): AppDevConfig {
  return appDevelopementConfig;
}
