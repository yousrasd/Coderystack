export const languages = {
  en: "English",
};

export const defaultLang = "en";

export const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.contact": "Contact",
    "post.readMore": "Read More",
    "footer.rightsReserved": "All Rights Reserved",
    "category.title": (category: string) => `All blogs about ${category}`,
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
