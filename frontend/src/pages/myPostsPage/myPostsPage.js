import React, { useEffect } from 'react';
import Post from '../../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPostsAsync } from '../../slices/postSlices';
import Skeleton from '@mui/material/Skeleton';
import LoadingCard from '../../components/OnLoading';
import NoData from '../../components/NoData';
import HeroSection from '../../components/HeroSection';
import Healthcare from "../../assets/img/Healthcare.png"

const MyPostsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPostsAsync());
  }, [dispatch]);

  const state = useSelector((state) => state.post.getMyPosts);
  console.log(state);

  return (
    <div className="min-h-screen">
      <HeroSection 
        title='Your Personal Pharmacy Showcase'
        description='Manage and showcase your exclusive products and offers. This is your space to share updates and connect with customers effortlessly.'
        buttonEnabled={false}
        imageSrc={require("../../assets/img/Healthcare.png")}
      />

      {state.loading ? (
        <div className="flex flex-col px-44 mt-20">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      ) : state.error ? (
        <div>error</div>
      ) : state.data && !state.data.success ? (
        <div className="mt-32">
          <NoData />
        </div>
      ) : state.success ? (
        <div className="bg-gray-100 flex flex-col items-center mt-10 p-[5%] pt-[100px] space-y-10">
          <h1 className="text-3xl font-bold mb-6">My Posts</h1>
          <div className="w-full max-w-4xl space-y-6">
            {state.data.posts.map((post) => (
              <Post
                key={post.id}
                description={post.description}
                postPhoto={post.postPhoto}
                productName={post.productName}
                video={post.video}
                createdAt={post.createdAt}
                isLiked={post.isLiked}
                likesCount={post.likesCount}
                isMine={true}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const SkeletonCard = ({ titleWidth = '80%', subtitleWidth = '40%', imageHeight = 190, textLines = 2 }) => {
  return (
    <div>
      <Skeleton animation="wave" height={10} width={titleWidth} style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={10} width={subtitleWidth} />
      <Skeleton sx={{ height: imageHeight }} animation="wave" variant="rectangular" />
      {[...Array(textLines)].map((_, index) => (
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} key={index} />
      ))}
    </div>
  );
};

export default MyPostsPage;
