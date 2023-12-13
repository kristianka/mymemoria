import axios from "axios";
const baseUrl = "/api/users/";

let token: string | null;

const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

// TO DO:
// MAKE RETURN USER DATA FROM BACKEND: NAME & PROFILE PICTURE
const getAll = () => {
    const config = {
        headers: { Authorization: token }
    };
    return axios.get(baseUrl, config).then((response) => response.data);
};

const getById = (id: string) => {
    return axios.get(`${baseUrl}/${id}`);
};

const register = async (credentials: { name: string; uid: string }) => {
    const res = await axios.post(baseUrl, credentials);
    return res.data;
};

export default { setToken, getAll, getById, register };
