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
    static async get(url) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.GET,
        });
        const response = await request.json();
        return response;
    }

    static async post(url, body) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.POST,
            headers: {
                Credentials: "include",
            },
            body: body,
        });

        const response = await request.json();
        return response;
    }

    static async patch(url, body) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.PATCH,
            headers: headerConfig,
            body: JSON.stringify(body),
        });

        const response = await request.json();
        return response;
    }

    static async put(url, body) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.PUT,
            headers: headerConfig,
            body: JSON.stringify(body),
        });

        const response = await request.json();
        return response;
    }

    static async delete(url) {
        const request = await fetch(`${BASE_ENDPOINT}${url}`, {
            method: HttpRequestMethods.DELETE,
        });

        const response = await request.json();
        return response;
    }
}

export default HttpClient;
