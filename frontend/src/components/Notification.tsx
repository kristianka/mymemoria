interface props {
    content: string | null;
    type: string | null;
}

const Notification = (props: props) => {
    const { content, type } = props;
    console.log("Notification", content, type);
    if (!content || !type) {
        return null;
    }

    if (type === "login") {
        return (
            <div className="mt-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{content}</h1>
            </div>
        );
    }

    if (type === "success") {
        return (
            <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
                <div className="flex items-start gap-4">
                    <span className="text-green-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </span>

                    <div className="flex-1">
                        <strong className="block font-medium text-gray-900">Success</strong>

                        <p className="mt-1 text-sm text-gray-700">{content}</p>
                    </div>

                    <button className="text-gray-500 transition hover:text-gray-600">
                        <span className="sr-only">Dismiss popup</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    if (type === "error") {
        return (
            <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <div className="flex items-center gap-2 text-red-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <strong className="block font-medium">Something went wrong</strong>
                </div>

                <p className="mt-2 text-sm text-red-700">{content}</p>
            </div>
        );
    }
};

export default Notification;
