export const translations = {
  en: {
    home: 'Home',
    gallery: 'Gallery',
    contact: 'Contact',
    homeTitle: 'If you are looking for an unusual fun, you are in the right place!',
    homeDescription1: 'Try riding a draisine! Draisines are a great way to spend time in nature with family and friends. Discover the beauty of the surroundings from a different perspective and enjoy an unforgettable experience.',
    homeDescription2: 'Reserve your draisine today and get ready for an adventure full of fun and laughter!',
    homeDescription3: 'Our draisine offer is suitable for all age groups and guarantees a safe and comfortable ride.',
    homeDescription4: 'Our draisines are built to provide maximum comfort and safety during the ride. With our draisines, you can discover beautiful routes and enjoy the beauty of nature.',
    homeDescription5: 'We look forward to your visit and wish you a pleasant ride on a draisine!',
    contactDescription: 'For bookings, you can reach us at',
    contactOrCall: 'or call us at',
    contactLocation: 'The track starts in Jablonica and ends in Brezova pod Bradlom. In this direction, rides are from 9:00 AM to 12:00 PM. In the opposite direction from Brezova pod Bradlom, rides are from 1:00 PM to 3:00 PM.',
    contactOpeningHours: 'The operation is open daily from March to September, from Tuesday to Sunday.',
    contactPrice: 'Price: ',
  },
  sk: {
    home: 'Domov',
    gallery: 'Galéria',
    contact: 'Kontakt',
    homeTitle: 'Ak hľadáte netradičnú zábavu, ste na správnom mieste!',
    homeDescription1: 'Vyskúšajte jazdu na drezine! Dreziny sú skvelým spôsobom, ako stráviť čas v prírode s rodinou a priateľmi. Objavte krásy okolia z inej perspektívy a užite si nezabudnuteľný zážitok.',
    homeDescription2: 'Rezervujte si svoju drezinu ešte dnes a pripravte sa na dobrodružstvo plné zábavy a smiechu!',
    homeDescription3: 'Naša ponuka drezín je vhodná pre všetky vekové kategórie a zaručuje bezpečnú a pohodlnú jazdu.',
    homeDescription4: 'Naše dreziny sú stavané tak, aby poskytovali maximálny komfort a bezpečnosť počas jazdy. S našimi drezinami môžete objavovať malebné trasy a užívať si krásy prírody.',
    homeDescription5: 'Tešíme sa na vašu návštevu a prajeme vám príjemnú jazdu na drezine!',
    contactDescription: 'Pre rezerváciu nás môžete kontaktovať na e-mailovej adrese',
    contactOrCall: 'alebo zavolajte na číslo',
    contactLocation: 'Trať začína v Jablonici a končí v Brezovej pod Bradlom. Týmto smerom sa jazdí od 9,00 hod do 12,00 hod. Opačným smerom z Brezovej pod Bradlom sa jazdí od 13,00 hod o 15,00 hod.',
    contactOpeningHours: 'Prevádzka je otvorená každý deň od marca do septembra, od utorka do nedele.',
    contactPrice: 'Cena: ',
  },
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
