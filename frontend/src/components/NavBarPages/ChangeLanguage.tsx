import { changeLanguage } from "../../misc";
import { useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import { useTranslation } from "react-i18next";

const ChangeLanguageDropdown = () => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(
        i18n.language === "en" ? "gb" : i18n.language
    );

    // english flag is GB, little hacky
    const handleLanguageChange = (language: string) => {
        if (language === "en") {
            changeLanguage(language);
            setSelectedLanguage("gb");
            return;
        }
        changeLanguage(language);
        setSelectedLanguage(language);
    };

    return (
        <>
            <div className="m-1 dropdown dropdown-start">
                <label tabIndex={0} className="btn bg-base-100 rounded-lg">
                    <span className={`fi fi-${selectedLanguage}`}></span>
                    <p>{t("changeLanguage")}</p>
                </label>
                <div
                    className="menu menu-sm dropdown-content mt-1 z-[10] p-2 shadow bg-base-100 rounded-box"
                    aria-labelledby="dropdownDefaultButton"
                >
                    <button
                        onClick={() => handleLanguageChange("en")}
                        className="rounded-md block px-4 py-2 hover:bg-gray-200 text-left"
                    >
                        <span className="mr-2 fi fi-gb"></span>
                        English
                    </button>
                    <button
                        onClick={() => handleLanguageChange("fi")}
                        className="rounded-md block px-4 py-2 hover:bg-gray-200 text-left"
                    >
                        <span className="mr-2 fi fi-fi"></span>
                        Finnish
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChangeLanguageDropdown;
