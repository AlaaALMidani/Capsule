import React from 'react';
import Post from '../components/Post'; 

const fakePosts = [
  {
    id: 1,
    description: "This is a sample post description for post 1.",
    profilePhoto: "https://example.com/profile1.jpg",
    postPhoto: "https://example.com/post1.jpg",
    pharmacyName: "Pharmacy One",
    postDate: "November 1, 2023",
  },
  {
    id: 2,
    description: "This is a sample post description for post 2.",
    profilePhoto: "https://example.com/profile2.jpg",
    postPhoto: "https://example.com/post2.jpg",
    pharmacyName: "Pharmacy Two",
    postDate: "November 2, 2023",
  },
  {
    id: 3,
    description: "This is a sample post description for post 3.",
    profilePhoto: "",
    postPhoto: "https://example.com/post3.jpg",
    pharmacyName: "Pharmacy Three",
    postDate: "November 3, 2023",
  },
];

const MyPostsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-10 p-[5%] pt-[100px] flex items-center  space-y-10">
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>
      <div className="w-full max-w-4xl space-y-6">
        {fakePosts.map((post) => (
          <Post
            key={post.id}
            description={post.description}
            profilePhoto={post.profilePhoto}
            postPhoto={post.postPhoto}
            pharmacyName={post.pharmacyName}
            postDate={post.postDate}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPostsPage;