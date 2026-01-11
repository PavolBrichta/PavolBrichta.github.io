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
    contactDescription: 'If you want to get in touch, send an email to',
    name: 'Name',
    email: 'Email',
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
    contactDescription: 'Ak sa chcete spojiť, pošlite e-mail na',
    name: 'Meno',
    email: 'E-mail',
  },
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
