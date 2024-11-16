import * as React from 'react';
import { Post } from '../../components/Post.js';

const UserHome = () => {
    const posts = [  
        { id: 1, title: 'Pharmacy 1', description: 'Description for pharmacy 1.' },  
        { id: 2, title: 'Pharmacy 2', description: 'Description for pharmacy 2.' },  
        { id: 3, title: 'Pharmacy 3', description: 'Description for pharmacy 3.' },  
        { id: 4, title: 'Pharmacy 4', description: 'Description for pharmacy 4.' },  
        { id: 5, title: 'Pharmacy 5', description: 'Description for pharmacy 5.' },  
      ];  
  return (
    <div>
      <div id="section-1" className="grid grid-cols-1 md:grid-cols-3 bg-[#103758]">
        {/* Text Section */}
        <div className="flex items-center justify-center">
          <div className="p-[10%]">
            <p className="text-white text-4xl">Leen Leen Leen Leen Leen Leen Leen</p>
            <p className="text-white text-xl">we are bla bla bla bla bla bla bla bla</p>
          </div>
        </div>

        {/* Button Section */}
        <div className="pb-[20%] flex items-end justify-center">
          <button className="text-white">add order</button>
        </div>

        {/* Image Section with Slow and Less Bounce Animation */}
        <div className="flex justify-end">
          <img
            src="home.png"
            alt="Home"
            className="max-w-full h-auto animate-slow-bounce"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4">  
        {posts.map(post => (  
          <Post key={post.id} title={post.title} content={post.description} />  
        ))}  
      </div>  
    </div>
  );
};

export default UserHome;
