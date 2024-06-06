import i18next from "i18next";

// toggle between languages
export const changeLanguage = (language: string) => {
    const newLanguage = language;
    i18next.changeLanguage(newLanguage);
    localStorage.setItem("i18nextLng", newLanguage);
};
