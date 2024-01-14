import { auth } from "../firebase";

const ErrorPage = () => {
    return (
        <div className="m-auto p-5">
            <h1 className="m-3 text-center normal-case text-2xl">
                Sorry, something went wrong. Please try again later.
            </h1>
            <p className="m-3 text-center normal-case text-l p-3">
                Your session might've expired. You can try refreshing the page or signing out.
            </p>
            <div className="m-3 flex justify-center">
                <button
                    onClick={() => window.location.reload()}
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Refresh
                </button>
                <button
                    onClick={() => {
                        auth.signOut();
                    }}
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};
export default ErrorPage;
