import * as React from 'react';
import { Post } from '../../components/Post.js';
import AddOrder from '../../components/AddOrder.js';

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
      <div id="section-1" className=" pt-16 flex justify-around">
        <AddOrder />

        <img
          src="doctorImage2.png"
          alt="Home"
          className="h-96"
        />

      </div>
      <div className="">

        {posts.map(post => (
          <Post key={post.id} title={post.title} content={post.description} />
        ))}
      </div>
    </div>
  );
};

export default UserHome;
