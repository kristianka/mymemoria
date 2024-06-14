import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";

const CookiePopUp = () => {
    const { t } = useTranslation();
    return (
        <div className="">
            {/* // needs to be done likes because doesnt support className tailwind */}
            <CookieConsent
                style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "1rem",
                    borderRadius: "0.50rem"
                }}
                buttonId="cookieAcceptButton"
                buttonStyle={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "0.25rem"
                }}
                buttonText={t("cookieAccept")}
                location="bottom"
            >
                <div className="flex">
                    <div className="m-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="stroke-info shrink-0 w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>
                    <div className="ml-3">
                        <div className="text-md">{t("cookieTitle")}</div>
                        <div className="text-sm">{t("cookieInfo")}</div>
                    </div>
                </div>
            </CookieConsent>
        </div>
    );
};

export default CookiePopUp;
