import type { Locale } from "./site";
const messages = {
  "pt-BR": {
    institution: "A Cia da Terra",
    allServices: "Todas as soluções",
    serviceMenu: "Soluções para a sua individualidade.",
    socialTitle: "O cuidado continua por aqui.",
    socialText: "Acompanhe a Cia da Terra nos nossos canais oficiais.",
    socialLink: "Acompanhar no Instagram",
    careLabel: "Nosso jeito de cuidar",
    serviceLinks: "Soluções",
  },
  en: {
    institution: "Cia da Terra",
    allServices: "All solutions",
    serviceMenu: "Solutions for your individuality.",
    socialTitle: "Care continues here.",
    socialText: "Follow Cia da Terra through our official channels.",
    socialLink: "Follow us on Instagram",
    careLabel: "Our approach to care",
    serviceLinks: "Solutions",
  },
};
export const editorial = (locale: Locale) => messages[locale];
