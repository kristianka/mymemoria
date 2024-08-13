import { Link } from "react-router-dom";
import { ArrowLongUpIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="mt-auto footer grid-rows-1 p-7 bg-base-200 text-base-content flex">
            <nav>
                <header className="footer-title">{t("appUrl")}</header>
                <Link className="hover:underline" to="/info">
                    {t("info")}
                </Link>
                <a
                    className="link link-hover"
                    target="_blank"
                    href="https://github.com/kristianka/mymemoria/issues/new?labels=bug"
                >
                    {t("reportABug")}
                </a>
                <a
                    className="link link-hover"
                    target="_blank"
                    href="https://github.com/kristianka/mymemoria/issues/new?labels=enhancement"
                >
                    {t("sendFeedback")}
                </a>
                <a className="link link-hover" target="_blank" href="https://kristiankahkonen.com/">
                    kristiankahkonen.com
                </a>
            </nav>
            <nav>
                <header className="footer-title">{t("sourceCode")}</header>
                <a
                    className="link link-hover"
                    target="_blank"
                    href="https://github.com/kristianka/mymemoria"
                >
                    <img src="/github-mark.svg" alt="github logo" className="w-10 h-10" />
                </a>
            </nav>
            <nav className="ml-auto">
                <header className="footer-title">{t("backToTop")}</header>
                <ArrowLongUpIcon
                    onClick={handleClick}
                    className="m-auto link link-hover w-10 h-10"
                />
            </nav>
        </footer>
    );
};

export default Footer;
