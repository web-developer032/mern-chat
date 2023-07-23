import HttpClient from "@/services/httpClient";

const USERS_ENDPOINT = "/api/user";

const userEndpoints = {
    FETCH_ALL_USERS: `${USERS_ENDPOINT}/`,
    CREATE_USER: `${USERS_ENDPOINT}/`,
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
        const user = await this.post(userEndpoints.CREATE_USER, body);
        return user;
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
