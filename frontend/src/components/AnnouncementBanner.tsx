import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AnnouncementBanner = () => {
    const { t } = useTranslation();

    const [showBanner, setShowBanner] = useState(false);
    useEffect(() => {
        const isDismissed = localStorage.getItem("bannerDismissed");
        if (!isDismissed) {
            setShowBanner(true);
        }
    }, []);

    const dismissBanner = () => {
        // Set local storage flag and update state to hide banner
        localStorage.setItem("bannerDismissed", "true");
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className="rounded-lg mt-3 bg-gradient-to-r from-red-500 via-purple-400 to-blue-500">
            <div className="max-w-[90rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
                <div className="flex justify-center md:grid-cols-1 text-center">
                    <p className="mt-1 text-white font-medium">
                        {t("announcementBannerMain")} {""}
                        {
                            <a
                                href="https://github.com/kristianka/mymemoria/releases"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                {t("announcementBannerSub")}
                            </a>
                        }
                    </p>
                    <div className="ml-3 text-center md:text-left md:flex md:justify-end md:items-center">
                        <button
                            onClick={dismissBanner}
                            id="dismissBannerButton"
                            className="py-3 px-6 inline-flex justify-center items-center gap-2 rounded-full font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                        >
                            {t("close")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
