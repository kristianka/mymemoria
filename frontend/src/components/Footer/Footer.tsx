const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <nav>
                <header className="footer-title">Notes app</header>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
            </nav>
            <nav>
                <header className="footer-title">Info</header>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;
