const AnnouncementBanner = () => {
    return (
        <div className="rounded-lg mt-3 bg-gradient-to-r from-red-500 via-purple-400 to-blue-500">
            <div className="max-w-[90rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
                <div className="flex justify-center md:grid-cols-1 text-center">
                    <p className="mt-1 text-white font-medium">
                        Hey, welcome back! We have released some exciting new features.{" "}
                        {
                            <a
                                href="https://github.com/kristianka/fullstack-project/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Click here to see the full changelog!
                            </a>
                        }
                    </p>
                    <div className="ml-3 text-center md:text-left md:flex md:justify-end md:items-center">
                        <a
                            className="py-3 px-6 inline-flex justify-center items-center gap-2 rounded-full font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                            href="#"
                        >
                            Dismiss
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
