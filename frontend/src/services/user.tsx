import axios from "axios";
const baseUrl = "/api/users/";

const getAll = () => {
    return axios.get(baseUrl);
};

const getById = (id: string) => {
    return axios.get(`${baseUrl}/${id}`);
};

export default { getAll, getById };
