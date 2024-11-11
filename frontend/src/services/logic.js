const baseUrl = "http://localhost:3000/";
const register = "register";
const login = "login"
export class Fetch {
    static async register(data) {
        return fetch(`${baseUrl}${register}`, {
            method: "post",
            body: data,
        })
            .then((response) => response.json())
            .then(data => data)
            .catch(error =>
                error.message
            );
    }

    static async login(data) {
        return fetch(`${baseUrl}${login}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(data => data)
            .catch(error =>
                error.message
            );
    }
}