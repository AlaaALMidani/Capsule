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
export const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzNkMzRkODJjMWYwODUyYWEwYzUxYzAiLCJwaG9uZU51bWJlciI6IjA5MzQ1NTIxMTEiLCJpYXQiOjE3MzIxMDMyNTksImV4cCI6MTczNDY5NTI1OX0.rU9IQWxf8jAXWTYwoDf-jX3iBUYts7ekEd3xnwk-tDc'
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