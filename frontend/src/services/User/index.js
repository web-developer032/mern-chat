import HttpClient from "@/services/httpClient";

const USERS_ENDPOINT =  import.meta.env.VITE_USER_API;

const userEndpoints = {
    FETCH_ALL_USERS: `${USERS_ENDPOINT}/`,
    CREATE_USER: `${USERS_ENDPOINT}/`,
    SIGN_UP: `${USERS_ENDPOINT}/signup`,
    LOG_IN: `${USERS_ENDPOINT}/login`,
    LOG_IN_BY_TOKEN: `${USERS_ENDPOINT}/loginUsingToken`,
    FETCH_USER: (id) => `${USERS_ENDPOINT}/${id}`,
    UPDATE_USER: (id) => `${USERS_ENDPOINT}/${id}`,
    DELETE_USER: (id) => `${USERS_ENDPOINT}/${id}`,
};

class UserServices extends HttpClient {
    static async fetchAllUsers() {
        const users = await this.get(userEndpoints.FETCH_ALL_USERS);
        return users;
    }

    static async fetchUser(id) {
        const user = await this.get(userEndpoints.FETCH_USER(id));
        return user;
    }

    static async createUser(body) {
        try {
            const user = await this.post(userEndpoints.CREATE_USER, body);
            return user;
        } catch (error) {
            return error.response;
        }
    }

    static async signupUser(body) {
        try {
            const user = await this.post(userEndpoints.SIGN_UP, body);
            return user;
        } catch (error) {
            return error.response;
        }
    }

    static async loginUser(body) {
        try {
            const user = await this.post(userEndpoints.LOG_IN, body);
            return user;
        } catch (error) {
            return error.response;
        }
    }

    static async loginUsingToken() {
        try {
            const user = await this.get(userEndpoints.LOG_IN_BY_TOKEN);
            return user;
        } catch (error) {
            return error.response;
        }
    }

    static async updateUser(id, body) {
        const user = await this.patch(userEndpoints.UPDATE_USER(id), body);
        return user;
    }

    static async deleteUser(id) {
        const isDeleted = await this.delete(userEndpoints.DELETE_USER(id));
        return isDeleted;
    }
}

export default UserServices;
