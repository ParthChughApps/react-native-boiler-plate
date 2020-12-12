import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en_IN.json';
import translationHi from './locales/hi_IN.json';

const resources = {
  en_IN: {
    translation: translationEN,
  },
  hi_IN: {
    translation: translationHi,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en_IN',
    keySeparator: '.',
    // keySeparator: true, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
