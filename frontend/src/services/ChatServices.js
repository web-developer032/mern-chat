import HttpClient from "@/services/httpClient";

const CHATS_ENDPOINT = "/api/chat";

const chatEndpoints = {
    FETCH_ALL_CHATS: `${CHATS_ENDPOINT}/`,
    CREATE_CHAT: `${CHATS_ENDPOINT}/`,
    FETCH_CHAT: (id) => `${CHATS_ENDPOINT}/${id}`,
    UPDATE_CHAT: (id) => `${CHATS_ENDPOINT}/${id}`,
    DELETE_CHAT: (id) => `${CHATS_ENDPOINT}/${id}`,
};

class UserServices extends HttpClient {
    static async fetchAllChats() {
        const chats = await this.get(chatEndpoints.FETCH_ALL_CHATS);
        return chats;
    }

    static async fetchChat(id) {
        const chat = await this.get(chatEndpoints.FETCH_CHAT(id));
        return chat;
    }

    static async createChat(body) {
        const chat = await this.post(chatEndpoints.CREATE_CHAT, body);
        return chat;
    }

    static async updateChat(id, body) {
        const chat = await this.patch(chatEndpoints.UPDATE_CHAT(id), body);
        return chat;
    }

    static async deleteChat(id) {
        const isDeleted = await this.delete(chatEndpoints.DELETE_CHAT(id));
        return isDeleted;
    }
}

export default UserServices;
