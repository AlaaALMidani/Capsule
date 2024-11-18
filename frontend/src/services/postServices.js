import { uploadProgress } from '../pages/home/homeSlices'
import { token } from './userServices';
const baseUrl = "http://localhost:3002/api/posts/";
const addPost = "addPost";



export class PostServices {

    static async addPost(data ,dispatch) {
        console.log('addPost')
        console.log(data)
        return fetch(`${baseUrl}${addPost}`, {
            method: "post",
            body: data,
            headers:{
                'authorization':`${token}`
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                dispatch(uploadProgress(percentCompleted)); 
              },
        })
            .then((response) => response.json())
            .then(data => data)
            .catch(error =>
                error.message
            );
    }

    
}