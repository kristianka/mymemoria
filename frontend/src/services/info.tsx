import axios from "axios";
const baseUrl = "/api/info";
import { toast } from "react-toastify";

const serverHealthCheck = async () => {
    try {
        const res = await axios.get(`${baseUrl}/health`);
        console.log("server status:", res.status);
        return res.status;
    } catch (error) {
        toast.error("The server is down. Please try again later.");
    }
};

export default { serverHealthCheck };
