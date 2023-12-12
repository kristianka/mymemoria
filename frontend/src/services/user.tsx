import axios from "axios";
const baseUrl = "/api/users/";

const getAll = () => {
    return axios.get(baseUrl);
};

const getById = (id: string) => {
    return axios.get(`${baseUrl}/${id}`);
};

const register = async (credentials: { name: string; uid: string }) => {
    const res = await axios.post(baseUrl, credentials);
    return res.data;
};

export default { getAll, getById, register };
