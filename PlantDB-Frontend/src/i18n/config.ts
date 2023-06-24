import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import enApp from "./en/app.json";
import enHome from "./en/home.json";

export const defaultNS = "app";

export const resources = {
  en: {
    app: enApp,
    home: enHome
  }
};

i18next.use(initReactI18next).init({
  lng: "en",
  debug: true,
  fallbackNS: "app",
  resources,
  defaultNS,
});