export const appDevelopementConfig = {
  backendApi: 'http://localhost:3000/api',
  airtableApiKey: import.meta.env.AIRTABLE_API_KEY,
  airtableBaseUrl: `https://api.airtable.com/v0/appQwGr4YP0JUjVlZ`, // Updated to match existing pattern
  starcmdAirtableToken: 'patkmu6TWHjlfUaZU.076f5773bab358208dce350becc4d18381f4aec5f72ebb48e61a22c402431688',
  starcmdAirtableClientTableName: 'Clients',
  starcmdAirtableCategoriesTableName: 'Catégories',
  starcmdAirtableEmailExempleTableName: 'Emails Exemple',
  // Table IDs for more stable API access
  starcmdAirtableClientTableId: 'tblClientTableId', // You'll need to provide the actual client table ID
  starcmdAirtableCategoriesTableId: 'tblMqtB7fzXgBGAOs', // Categories table ID as provided
  starcmdAirtableEmailExempleTableId: 'tblEmailExampleTableId', // You'll need to provide the actual email example table ID
};

export type AppDevConfig = typeof appDevelopementConfig;

export function getAppDevConfig(): AppDevConfig {
  return appDevelopementConfig;
}