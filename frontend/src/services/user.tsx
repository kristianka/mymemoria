import axios from "axios";
const baseUrl = "/api/users/";
import { BackendUserInterface } from "../types";

let token: string | null;

const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const getUser = async () => {
    const config = {
        headers: { Authorization: token }
    };
    const res = await axios.get<BackendUserInterface>(baseUrl, config);
    return res.data;
};

export default { setToken, getUser };
