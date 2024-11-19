import React from 'react';
import Post from '../components/Post'; 
import { Grid2 } from "@mui/material";


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
      <div className="w-full mt-10 mt-10p-[5%] pt-[100px] space-y-6">
      {fakePosts.map((post) => (
          <div className="mb-4">
            <Grid2 item xs={12} sm={6} md={4} key={post.id} spacing={2}>
              <Post key={post.id}
            description={post.description}
            profilePhoto={post.profilePhoto}
            postPhoto={post.postPhoto}
            pharmacyName={post.pharmacyName}
            postDate={post.postDate} />
            </Grid2>
          </div>
        ))}
        
      </div>
    
  );
};

export default MyPostsPage;