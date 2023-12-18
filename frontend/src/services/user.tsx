import axios from "axios";
const baseUrl = "/api/users/";
import { BackendUserInterface } from "../types";
import infoService from "./info";
import { auth } from "../firebase";
import { toast } from "react-toastify";

let token: string | null;

const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const getUser = async () => {
    try {
        const config = {
            headers: { Authorization: token }
        };
        if (!token) {
            return null;
        }
        const res = await axios.get<BackendUserInterface>(baseUrl, config);
        return res.data;
    } catch (error) {
        const serverRes = await infoService.serverHealthCheck();
        // log user out if unauthorized but server ok
        // this can happen when changing env on backend
        if (serverRes === 200) {
            auth.signOut();
            toast.error("Signed out due to server error. Please try again later.");
        }

        console.log(error);
    }
};

const register = async (newUser: object) => {
    const res = await axios.post(baseUrl, newUser);
    return res.data;
};

export default { setToken, getUser, register };
