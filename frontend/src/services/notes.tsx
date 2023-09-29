import axios from "axios";
const baseUrl = "/api/notes";

let token: string | null = null;

const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    return axios.get(baseUrl);
};

const create = (newObject: string) => {
    const config = {
        headers: { Authorization: token }
    };
    return axios.post(baseUrl, newObject, config);
};

const update = (id: string) => {
    const config = {
        headers: { Authorization: token }
    };
    return axios.put(`${baseUrl}/${id}`, null, config);
};

const remove = (id: string) => {
    const config = {
        headers: { Authorization: token }
    };
    return axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, remove, setToken };
