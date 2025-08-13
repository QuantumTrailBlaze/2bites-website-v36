import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Use i18next-http-backend to load translations from your /public/locales folder
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Default language if the user's language is not available
    fallbackLng: 'es',
    // List of supported languages
    supportedLngs: ['es', 'ca'],
    // Enable debug mode in development for console logs
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    
    // Configuration for the language detector
    detection: {
      // Order and from where user language should be detected
      // We will use the URL path as the primary source
      order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      // Where to look for the language in the path
      lookupFromPathIndex: 0,
    }
  });

export default i18n;
