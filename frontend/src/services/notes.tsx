import axios from "axios";
const baseUrl = "/api/notes";
import { CreateNoteInterface } from "../types";

let token: string | null;

const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const config = {
        headers: { Authorization: token }
    };
    return axios.get(baseUrl, config).then((response) => response.data);
};

const create = (newObject: CreateNoteInterface) => {
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

const getById = (id: string) => {
    const config = {
        headers: { Authorization: token }
    };
    return axios.get(`${baseUrl}/${id}`, config).then((response) => response.data);
};

export default { getAll, create, update, remove, setToken, getById };
