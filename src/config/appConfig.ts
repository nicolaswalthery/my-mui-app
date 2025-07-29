export const appConfig = {
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE,
  appTitle: import.meta.env.VITE_APP_TITLE,
  version: import.meta.env.VITE_VERSION,
  apiCallTimeout: import.meta.env.VITE_API_CALL_TIMEOUT,
  source: import.meta.env.VITE_SOURCE,
}

export type AppConfig = typeof appConfig;

export function getAppConfig(): AppConfig {
  return appConfig;
}
