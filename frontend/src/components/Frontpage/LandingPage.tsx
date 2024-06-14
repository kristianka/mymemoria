import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AnnouncementBanner from "../AnnouncementBanner";

const LandingPage = () => {
    const { t } = useTranslation();
    document.title = t("appName");
    return (
        <>
            <div className="m-3 rounded-lg sm:ml-auto sm:w-1/3">
                <AnnouncementBanner />
            </div>
            <div className="flex flex-col mt-auto min-h-full place-items-center">
                <div className="text-center">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {t("appName")}
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">{t("appUrl")}</p>
                    <p className="text-base leading-7 text-gray-600">{t("landingPageHint")}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/login"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {t("signIn")}
                        </Link>
                        <Link
                            to="/register"
                            className="text-sm font-semibold text-gray-900 hover:text-gray-600"
                        >
                            {t("createAnAccount")} <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
