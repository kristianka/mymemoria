import i18next from "i18next";

// toggle between languages
export const changeLanguage = () => {
    const lang = i18next.language === "en" ? "fi" : "en";
    i18next.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
};
