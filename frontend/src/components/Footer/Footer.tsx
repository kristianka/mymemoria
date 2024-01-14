import { Link } from "react-router-dom";
import { ArrowLongUpIcon } from "@heroicons/react/20/solid";

const Footer = () => {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="mt-auto footer grid-rows-1 p-7 bg-base-200 text-base-content flex">
            <nav>
                <header className="footer-title">Notes app</header>
                <Link to="/info">Info</Link>
                <a
                    className="link link-hover"
                    target="_blank"
                    href="https://github.com/kristianka/fullstack-project/issues/new?labels=bug"
                >
                    Report a bug
                </a>
                <a
                    className="link link-hover"
                    target="_blank"
                    href="https://github.com/kristianka/fullstack-project/issues/new?labels=enhancement"
                >
                    Send feedback
                </a>
            </nav>
            <nav>
                <header className="footer-title">Source code</header>
                <a
                    className="link link-hover"
                    target="_blank"
                    href="https://github.com/kristianka/fullstack-project"
                >
                    <img src="/github-mark.svg" alt="github logo" className="w-10 h-10" />
                </a>
            </nav>
            <nav className="ml-auto">
                <header className="footer-title">Back to top</header>
                <ArrowLongUpIcon
                    onClick={handleClick}
                    className="m-auto link link-hover w-10 h-10"
                />
            </nav>
        </footer>
    );
};

export default Footer;
