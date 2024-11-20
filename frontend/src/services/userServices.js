const baseUrl = "http://localhost:3002/api/users/";
const register = "register";
const login = "login"

export const UserTypes = {
    client : 'CLINT',
    pharmacy: 'PHARMACY',
    warehouse: 'WAREHOUSE',
    delivery: 'DELIVERY'
}
export const userType = UserTypes.pharmacy
export const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzNkMzk4MjJjMWYwODUyYWEwYzUxZDciLCJwaG9uZU51bWJlciI6IjA5Mzc2NTk0NTQiLCJpYXQiOjE3MzIwOTM2NDgsImV4cCI6MTczMjE4MDA0OH0.BL7D_83G4utFxKD05Nym75FZtX36vL_XU4-687MhLbM'
export class UserServices {

    static async register(data) {
        console.log('ri')
        console.log(data)
        return fetch(`${baseUrl}${register}`, {
            method: "post",
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