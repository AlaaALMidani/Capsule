import React, { useEffect } from 'react';
import Post from '../../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts } from '../../slices/postSlices';
import Skeleton from '@mui/material/Skeleton';
import LoadingCard from '../../components/OnLoading';
const MyPostsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPosts())
  }, [dispatch]);
  // Add success to the dependency array
  const state = useSelector(state => state.post)
  console.log(state)
  if (state.loading)
    return (

      <div className="flex flex-col px-44 mt-20 ">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    )

  if (state.error)
    return (<div>error</div>)

  if (state.success)
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-10 p-[5%] pt-[100px] space-y-10">
        <h1 className="text-3xl font-bold mb-6">My Posts</h1>
        <div className="w-full max-w-4xl space-y-6">

          {state.myPosts.posts.map((post) => (
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