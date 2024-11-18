import { uploadProgress } from '../pages/home/homeSlices'
const baseUrl = "http://localhost:3002/api/posts/";
const addPost = "addPost";



export class PostServices {

    static async addPost(data) {
        console.log('addPost')
        console.log(data)
        return fetch(`${baseUrl}${addPost}`, {
            method: "post",
            body: data,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                
              },
        })
            .then((response) => response.json())
            .then(data => data)
            .catch(error =>
                error.message
            );
    }

    
}