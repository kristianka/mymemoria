import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import EnTranslation from "./en/translation.json";
import FiTranslation from "./fi/translation.json";

i18next.use(initReactI18next).init({
    lng: "en", // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
        en: {
            translation: EnTranslation
        },
        fi: {
            translation: FiTranslation
        }
    }
    // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
    // set returnNull to false (and also in the i18next.d.ts options)
    // returnNull: false,
});
