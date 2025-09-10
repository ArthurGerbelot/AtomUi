import { ApiVersion } from "@/components/version";
import { Language } from "@/components/version/languages";
import { useVersionStore, useLanguageStore } from "@/components/version/NavigationProvider";

// Hook version - to be used inside React components
export const useUrl = () => {
  const { version } = useVersionStore();
  const { language } = useLanguageStore();

  const getUrl = (url?: string, customVersion?: ApiVersion, customLanguage?: Language) => {
    const finalVersion = customVersion || version;
    const finalLanguage = customLanguage || language;

    return `/${finalLanguage}/${finalVersion}/${url ?? ''}`.replace(/\/+/g, '/');
  };

  return { getUrl };
};

// Default static version - uses default values
export const getUrl = (url?: string, version: ApiVersion = 'lastest', language: Language = 'en') => {
  return `/${language}/${version}/${url ?? ''}`.replace(/\/+/g, '/');
};