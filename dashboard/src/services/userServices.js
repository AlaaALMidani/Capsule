
import axios from "axios";
import { apiURLs } from "../config/apiURLs.js";


const baseUrl = "http://localhost:3000/";
const register = "register";
const login = "login"
export class UserServices {
    
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



export const fetchAddUserAPI = async () => {
  try {
    const response = await axios.get(apiURLs.fetchAddUser);
    console.log("API response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const submitDataToAPI = async (values) => {
  try {
    const response = await axios.post(apiURLs.fetchAddUser, values);
    console.log("Submitted data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};
