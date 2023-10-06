import axios from "axios";
const baseUrl = "/api/login";

interface LoginCredentials {
    username: string;
    password: string;
}

const login = async (credentials: LoginCredentials) => {
    const res = await axios.post(baseUrl, credentials);
    return res.data;
};

export default { login };
