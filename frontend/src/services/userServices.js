const baseUrl = "http://localhost:3002/api/users/";
const register = "register";
const login = "login"

const UserTypes = {
    client : 'CLINT',
    pharmacy: 'PHARMACY',
    warehouse: 'WAREHOUSE',
    delivery: 'DELIVERY'
}
export const userType = UserTypes.pharmacy
export const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzNkMzk4MjJjMWYwODUyYWEwYzUxZDciLCJwaG9uZU51bWJlciI6IjA5Mzc2NTk0NTQiLCJpYXQiOjE3MzIwOTIyNTQsImV4cCI6MTczMjE3ODY1NH0.t1cLu6nlt6m7fHDr9lE1lpzwaSjAT3WNw6u6zHolyyU'
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