import { useEffect, useState } from "react";
import infoService from "../../services/info";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

const InfoPage = () => {
    const { t } = useTranslation();
    const [serverStatus, setServerStatus] = useState(true);

    const healthcheck = async () => {
        const res = await infoService.serverHealthCheck(t);
        if (res === 200) {
            setServerStatus(true);
        } else {
            setServerStatus(false);
        }
    };

    useEffect(() => {
        healthcheck();
        // causes infinite loop without
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="m-auto">
            <h1 className="m-5 text-center normal-case text-2xl">{t("info")}</h1>
            <div className="m-10">
                <div>
                    <h2 className="m-5 text-center normal-case text-xl">{t("serverStatus")}</h2>
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
                    <h2 className="m-5 text-center normal-case text-xl"> {t("readmeTip1")}</h2>
                    <p className="m-5 text-center normal-case text-gray-500">
                        {t("readmeTip2")}{" "}
                        <a
                            href="https://github.com/kristianka/fullstack-project/blob/main/README.md"
                            className="text-blue-500"
                        >
                            {t("readmeTip3")}
                        </a>{" "}
                        {t("readmeTip4")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
