import { uploadProgress } from '../slices/postSlices'
import { token } from './userServices';
const baseUrl = "http://localhost:3002/api/posts/";
const addPost = "addPost";
const myPosts = 'getOwnPosts'
const allPosts ='getAllPosts'

export class PostServices {

    static async addPost(data, dispatch) {
        console.log('addPost')
        console.log(data)
        return fetch(`${baseUrl}${addPost}`, {
            method: "post",
            body: data,
            headers: {
                'authorization': `${token}`
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted)
                dispatch(uploadProgress(percentCompleted));
            },
        })
            .then((response) => response.json())
            .then(data => data)
            .catch(error =>
                error.message
            );
    }

    static async getMyPosts() {

        return fetch(`${baseUrl}${myPosts}`, {
            method: "get",
            headers: {
                'authorization': `${token}`
            },
        })
            .then((response) => response.json())
            .then(data => data)
            .catch(error =>
                error.message
            );
    }

    static async getAllPosts() {

        return fetch(`${baseUrl}${allPosts}`, {
            method: "get",
            headers: {
                'authorization': `${token}`
            },
        })
            .then((response) => response.json())
            .then(data => data)
            .catch(error =>
                error.message
            );
    }

}