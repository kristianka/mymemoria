import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = "/api/info";

const serverHealthCheck = async (t: (key: string) => string) => {
    try {
        const res = await axios.get(`${baseUrl}/health`);
        return res.status;
    } catch (error) {
        toast.error(t("serverDown"));
    }
};

export default { serverHealthCheck };
