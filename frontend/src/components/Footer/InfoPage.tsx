import { useEffect, useState } from "react";
import infoService from "../../services/info";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

const InfoPage = () => {
    const [serverStatus, setServerStatus] = useState(true);

    const healthcheck = async () => {
        const res = await infoService.serverHealthCheck();
        if (res === 200) {
            setServerStatus(true);
        } else {
            setServerStatus(false);
        }
    };

    useEffect(() => {
        healthcheck();
    }, []);

    return (
        <div className="m-auto">
            <h1 className="m-5 text-center normal-case text-2xl">Info</h1>
            <div className="m-10">
                <div>
                    <h2 className="m-5 text-center normal-case text-xl">Server status</h2>
                    <div className="flex justify-center">
                        {serverStatus ? (
                            <>
                                <CheckCircleIcon className="w-10 h-10 text-green-500" />
                            </>
                        ) : (
                            <XCircleIcon className="w-10 h-10 text-red-500" />
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="m-5 text-center normal-case text-xl">
                        {" "}
                        Please checkout the readme in the GitHub repository for answers.
                    </h2>
                    <p className="m-5 text-center normal-case text-gray-500">
                        The readme file in the{" "}
                        <a
                            href="https://github.com/kristianka/fullstack-project/blob/main/README.md"
                            className="text-blue-500"
                        >
                            GitHub repository
                        </a>{" "}
                        should answer all of your questions. If it doesn't, you can open a request
                        from the footer. Please note that it will be public.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
