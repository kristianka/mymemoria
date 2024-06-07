import { Link } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div className="grid min-h-full m-auto place-items-center rounded-lg">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <FaceFrownIcon className="w-20 h-20 m-auto text-indigo-600"></FaceFrownIcon>
                <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {t("pageNotFound")}
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">{t("pageNotFoundInfo")}</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to={"/"}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {t("goBackToHomepage")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
