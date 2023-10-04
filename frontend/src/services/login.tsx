import axios from "axios";
const baseUrl = "/api/login";

interface credentials {
    username: string;
    password: string;
}

const login = async (credentials: credentials) => {
    const res = await axios.post(baseUrl, credentials);
    return res.data;
};

export default { login };
