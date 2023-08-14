const HttpRequestMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
};

const BASE_ENDPOINT = "http://127.0.0.1:5000";
// const USER_ENDPOINT = "http://127.0.0.1:5000/user";
// const CHAT_ENDPOINT = "http://127.0.0.1:5000/chat";

const headerConfig = { "Content-Type": "application/json", Credentials: "include" };

class HttpClient {
    static authorization;

    static async get(url, headerOptions = {}) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.GET,
            headers: {
                authorization: `Bearer ${this.authorization}`,
                ...headerOptions,
            },
        });
        const response = await request.json();
        return response;
    }

    static async post(url, body, headerOptions = {}) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.POST,
            headers: {
                Credentials: "include",
                authorization: `Bearer ${this.authorization}`,
                ...headerOptions,
            },
            body: body,
        });

        const response = await request.json();
        return response;
    }

    static async patch(url, body, headerOptions = {}) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.PATCH,
            headers: {
                ...headerConfig,
                ...headerOptions,
                authorization: `Bearer ${this.authorization}`,
            },
            body: JSON.stringify(body),
        });

        const response = await request.json();
        return response;
    }

    static async put(url, body, headerOptions = {}) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.PUT,
            headers: {
                ...headerConfig,
                headerOptions,
                authorization: `Bearer ${this.authorization}`,
            },
            body: JSON.stringify(body),
        });

        const response = await request.json();
        return response;
    }

    static async delete(url, headerOptions = {}) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.DELETE,
            headers: { ...headerOptions, authorization: `Bearer ${this.authorization}` },
        });

        const response = await request.json();
        return response;
    }
}

export default HttpClient;
