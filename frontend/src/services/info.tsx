import axios from "axios";
import { useTranslation } from "react-i18next";
const baseUrl = "/api/info";
import { toast } from "react-toastify";

const serverHealthCheck = async () => {
    const { t } = useTranslation();
    try {
        const res = await axios.get(`${baseUrl}/health`);
        return res.status;
    } catch (error) {
        toast.error(t("serverError"));
    }
};

export default { serverHealthCheck };
