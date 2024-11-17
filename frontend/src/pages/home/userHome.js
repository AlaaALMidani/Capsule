import * as React from 'react';
import { Post } from '../../components/Post.js';
import AddOrder from '../../components/AddOrder.js';

const UserHome = () => {
<<<<<<< HEAD
  const fakePosts = [
    {
      _id: '6387e15b4c92e828e1fbd001',
      productName: 'Pharmacy Product 1',
      userId: '6457d324f582b029e3a10d01',
      description: 'This is a great product for health improvement.',
      postPhoto: null,
      video: null,
      PDF: 'http://localhost:3002/uploads/manual1.pdf',
      likes: ['6457d324f582b029e3a10d01', '6457d324f582b029e3a10d02'],
      isLiked: true,
      likesCount: 2,
      createdAt: '2023-11-10T10:12:34.789Z',
    },
    {
      _id: '6387e15b4c92e828e1fbd002',
      productName: 'Pharmacy Product 2',
      userId: '6457d324f582b029e3a10d02',
      description: 'This product helps in boosting immunity.',
      postPhoto: null,
      video: null,
      PDF: 'http://localhost:3002/uploads/manual2.pdf',
      likes: ['6457d324f582b029e3a10d03'],
      isLiked: false,
      likesCount: 1,
      createdAt: '2023-11-12T15:22:18.789Z',
    },
    {
      _id: '6387e15b4c92e828e1fbd003',
      productName: 'Pharmacy Product 3',
      userId: '6457d324f582b029e3a10d03',
      description: 'An essential item for daily healthcare.',
      postPhoto: 'http://localhost:3002/uploads/photo3.jpg',
      video: null,
      PDF: null,
      likes: [],
      isLiked: false,
      likesCount: 0,
      createdAt: '2023-11-14T09:08:56.789Z',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div id="section-1" className="grid grid-cols-1 md:grid-cols-3 bg-[#103758]">
        <div className="flex items-center justify-center">
          <div className="p-[10%]">
            <p className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
              Welcome to Leen Pharmacy
            </p>
            <p className="text-white text-lg md:text-xl">
              We are committed to providing the best pharmaceutical care.
            </p>
          </div>
        </div>
        <div className="pb-[10%] md:pb-[20%] flex items-center justify-center md:items-end">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full"
            type="button"
          >
            Add Order
          </button>
        </div>
        <div className="flex justify-center md:justify-end">
          <img src="home.png" alt="Home" className="w-2/3 h-auto animate-bounce duration-1000" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-10 px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Pharmacies</h2>
        <div className="grid grid-cols-1 gap-8 w-full max-w-6xl">
          {fakePosts.map((post) => (
            <Post
              key={post._id}
              title={post.productName}
              content={post.description}
              image={post.postPhoto}
              video={post.video}
              pdf={post.PDF}
              likesCount={post.likesCount}
              isLiked={post.isLiked}
            />
          ))}
        </div>
=======
  const posts = [
    { id: 1, title: 'Pharmacy 1', description: 'Description for pharmacy 1.' },
    { id: 2, title: 'Pharmacy 2', description: 'Description for pharmacy 2.' },
    { id: 3, title: 'Pharmacy 3', description: 'Description for pharmacy 3.' },
    { id: 4, title: 'Pharmacy 4', description: 'Description for pharmacy 4.' },
    { id: 5, title: 'Pharmacy 5', description: 'Description for pharmacy 5.' },
  ];
  return (
    <div>
      <div id="section-1" className=" pt-16">


        {/* Button Section */}
        
          <AddOrder />  
  

        {/* Image Section with Slow and Less Bounce Animation */}

        <img
          src="doctorImage2.png"
          alt="Home"
          className="h-96"
        />

      </div>
      <div className="  ">
        {posts.map(post => (
          <Post key={post.id} title={post.title} content={post.description} />
        ))}
>>>>>>> b2e60f9311c43168b2006579e1d319e64be54d86
      </div>
    </div>
  );
};

export default UserHome;

