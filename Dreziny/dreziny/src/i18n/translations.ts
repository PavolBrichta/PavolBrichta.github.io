export const translations = {
  en: {
    home: 'Home',
    gallery: 'Gallery',
    contact: 'Contact',
    viteReact: 'Vite + React',
    countIs: 'count is',
    editCode: 'Edit src/App.tsx and save to test HMR',
    clickLogos: 'Click on the Vite and React logos to learn more',
    contactTitle: 'Contact',
    contactDescription: 'For bookings, you can reach us at',
    orCall: 'or call us at',
    location: 'The track starts in Jablonica and ends in Brezova pod Bradlom. In this direction, rides are from 9:00 AM to 12:00 PM. In the opposite direction from Brezova pod Bradlom, rides are from 1:00 PM to 3:00 PM.',
    openingHours: 'The operation is open daily from March to September, from Tuesday to Sunday.',
    price: 'Price: ',
  },
  sk: {
    home: 'Domov',
    gallery: 'Galéria',
    contact: 'Kontakt',
    viteReact: 'Vite + React',
    countIs: 'počet je',
    editCode: 'Upravte src/App.tsx a uložte na testovanie HMR',
    clickLogos: 'Kliknutím na logá Vite a React sa dozviete viac',
    contactTitle: 'Kontakt',
    contactDescription: 'Pre rezerváciu nás môžete kontaktovať na e-mailovej adrese',
    orCall: 'alebo zavolajte na číslo',
    location: 'Trať začína v Jablonici a končí v Brezovej pod Bradlom. Týmto smerom sa jazdí od 9,00 hod do 12,00 hod. Opačným smerom z Brezovej pod Bradlom sa jazdí od 13,00 hod o 15,00 hod.',
    openingHours: 'Prevádzka je otvorená každý deň od marca do septembra, od utorka do nedele.',
    price: 'Cena: ',
  },
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
