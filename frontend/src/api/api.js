import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
});

export const fetchRoles = async () => {
    try {
        const { data } = await api.get(`/roles`);
        return data;
    } catch (error) {
        throw Error(error.response.statusText);
    }
 }

export const addNewUser = async (user) => {
    try {
        const { data } = await api.post(
            ``,
            user
        );
        return data;
    } catch (error) {
        throw Error(error.response.statusText);
    }
};

export const updateUser = async (user) => {
    try {
        const { data } = await api.put(
            `user/${user._id}`,
            user
        );
        return data;
    } catch (error) {
        throw Error(error.response.statusText);
    }
};


export const deleteUser = async ({ id }) => {
    try {
        const { data } = await api.delete(
            `user/${id}`,
        );
        return data;
    } catch (error) {
        throw Error(error.response.statusText);
    }
};

export const fetchUsers = async ( page, npp, filter  ) => {
    try {
        const { data } = await api.get(`/users?npp=${npp}&page=${page}&filter=${filter}`);
        return data;
    } catch (error) {
        throw Error(error.response.statusText);
    }
};


export const fetchManagers = async ( page, filter ) => {
    try {
        const { data } = await api.get(`/managers`);
        return data;
    } catch (error) {
        throw Error(error.response.statusText);
    }
};
