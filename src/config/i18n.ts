
import { SupportedLangEnum, TranslationKeyEnum } from '../enums/TranslationKeyEnum';

const translations: Record<SupportedLangEnum, Record<TranslationKeyEnum, string>> = {
  [SupportedLangEnum.English]: { [TranslationKeyEnum.Welcome]: 'Welcome', [TranslationKeyEnum.Logout]: 'Log out', [TranslationKeyEnum.Theme]: 'Theme' },
  [SupportedLangEnum.French]: { [TranslationKeyEnum.Welcome]: 'Bienvenue', [TranslationKeyEnum.Logout]: 'Déconnexion', [TranslationKeyEnum.Theme]: 'Thème' },
};

export const getTranslations = (lang: SupportedLangEnum): Record<string,string> => {
  return translations[lang];
};

export const getTranslation = (
  lang: SupportedLangEnum,
  key: TranslationKeyEnum
): string => {
  return translations[lang][key];
};
