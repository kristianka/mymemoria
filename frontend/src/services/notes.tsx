import axios from "axios";
const baseUrl = "/api/notes";
import { CreateNoteInterface, NoteInterface, UpdateNoteInterface } from "../types";

let token: string | null;

const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const config = {
        headers: { Authorization: token }
    };
    if (!token) {
        return null;
    }
    const res = await axios.get<NoteInterface[]>(baseUrl, config);
    return res.data;
};

const create = (newObject: CreateNoteInterface) => {
    const config = {
        headers: { Authorization: token }
    };
    return axios.post(baseUrl, newObject, config);
};

const update = (obj: UpdateNoteInterface) => {
    const config = {
        headers: { Authorization: token }
    };
    return axios.put(`${baseUrl}/${obj.id}`, obj, config);
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
