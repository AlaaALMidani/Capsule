import * as React from 'react';
import { Post } from '../../components/Post.js';

const UserHome = () => {
  const fakePosts = [
    {
      _id: "6387e15b4c92e828e1fbd001",
      productName: "Pharmacy Product 1",
      userId: "6457d324f582b029e3a10d01",
      description: "This is a great product for health improvement.",
      postPhoto: "http://localhost:3002/uploads/photo1.jpg",
      video: "http://localhost:3002/uploads/video1.mp4",
      PDF: "http://localhost:3002/uploads/manual1.pdf",
      likes: ["6457d324f582b029e3a10d01", "6457d324f582b029e3a10d02"],
      isLiked: true,
      likesCount: 2,
      createdAt: "2023-11-10T10:12:34.789Z",
    },
    {
      _id: "6387e15b4c92e828e1fbd002",
      productName: "Pharmacy Product 2",
      userId: "6457d324f582b029e3a10d02",
      description: "This product helps in boosting immunity.",
      postPhoto: null,
      video: null,
      PDF: "http://localhost:3002/uploads/manual2.pdf",
      likes: ["6457d324f582b029e3a10d03"],
      isLiked: false,
      likesCount: 1,
      createdAt: "2023-11-12T15:22:18.789Z",
    },
    {
      _id: "6387e15b4c92e828e1fbd003",
      productName: "Pharmacy Product 3",
      userId: "6457d324f582b029e3a10d03",
      description: "An essential item for daily healthcare.",
      postPhoto: "http://localhost:3002/uploads/photo3.jpg",
      video: null,
      PDF: null,
      likes: [],
      isLiked: false,
      likesCount: 0,
      createdAt: "2023-11-14T09:08:56.789Z",
    },
    {
      _id: "6387e15b4c92e828e1fbd004",
      productName: "Pharmacy Product 4",
      userId: "6457d324f582b029e3a10d04",
      description: "A top-rated product for skin care.",
      postPhoto: null,
      video: "http://localhost:3002/uploads/video4.mp4",
      PDF: null,
      likes: ["6457d324f582b029e3a10d02", "6457d324f582b029e3a10d04"],
      isLiked: true,
      likesCount: 2,
      createdAt: "2023-11-15T13:45:20.789Z",
    },
    {
      _id: "6387e15b4c92e828e1fbd005",
      productName: "Pharmacy Product 5",
      userId: "6457d324f582b029e3a10d05",
      description: "Helps in maintaining overall wellness.",
      postPhoto: "http://localhost:3002/uploads/photo5.jpg",
      video: "http://localhost:3002/uploads/video5.mp4",
      PDF: "http://localhost:3002/uploads/manual5.pdf",
      likes: ["6457d324f582b029e3a10d01"],
      isLiked: false,
      likesCount: 1,
      createdAt: "2023-11-16T08:00:00.789Z",
    },
  ];
  

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div id="section-1" className="grid grid-cols-1 md:grid-cols-3 bg-[#103758]">
        {/* Text Section */}
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

        {/* Button Section */}
        <div className="pb-[10%] md:pb-[20%] flex items-center justify-center md:items-end">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            type="button"
          >
            Add Order
          </button>
        </div>

        {/* Image Section with Slow Bounce Animation */}
        <div className="flex justify-center md:justify-end">  
  <img  
    src="home.png"  
    alt="Home"  
    className="w-2/3 h-auto animate-bounce duration-1000" 
  />  
</div>
      </div>

      {/* Center Posts Section */}
      <div className="flex flex-col items-center justify-center py-10 px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Pharmacies</h2>
        <div className="grid grid-cols-1 gap-8 w-full max-w-6xl">
           {fakePosts.map((post) => (
        <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
          <Post
            title={post.productName}
            content={post.description}
            image={post.postPhoto}
            video={post.video}
            pdf={post.PDF}
            likesCount={post.likesCount}
            isLiked={post.isLiked}
          />
        </div>
      ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
