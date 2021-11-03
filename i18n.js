import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next);
i18next.init({
  fallbackLng: 'cs',
  nsSeparator: '|',
  debug: false,
  initImmediate: false,
  resources: {
    sk: {
      translation: {
        reviews: {
          key_0: '{{count}} hodnotenie',
          key_1: '{{count}} hodnotenia',
          key_2: '{{count}} hodnotení',
        },
        products: {
          key_0: 'produktu',
          key_1: 'produkty',
          key_2: 'produktov',
        },
        years: {
          key_0: '{{count}} rok',
          key_1: '{{count}} roky',
          key_2: '{{count}} rokov',
        },
      },
    },
    cs: {
      translation: {
        reviews: {
          key_0: '{{count}} hodnocení',
          key_1: '{{count}} hodnocení',
          key_2: '{{count}} hodnocení',
        },
        products: {
          key_0: 'produktu',
          key_1: 'produkty',
          key_2: 'produktů',
        },
        years: {
          key_0: '{{count}} rok',
          key_1: '{{count}} roky',
          key_2: '{{count}} roků',
        },
      },
    },
  },
});

export default i18next;
