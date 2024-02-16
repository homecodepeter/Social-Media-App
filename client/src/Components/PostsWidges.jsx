import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from '../state';
import SinglePost from './SinglePost';

const PostsWidges = ({userId, isProfile = false}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const getPosts = async () => {
    const response = await fetch("http://localhost:4001/posts")
    const data = await response.json();
    dispatch(setPosts({posts: data}))
  }

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:4001/posts/${userId}/posts`)
    const data = await response.json();
    dispatch(setPosts({posts: data}));
}

  useEffect(() => {
    if(isProfile){
      getUserPosts();
  }else {
      getPosts();
  }
  }, [])

  if(!posts) return null;
 
  return (
    <>
    {posts.map(
      ({
    _id, userId, userName, description, picture,
    userpicture, likes, comments
    }) => (
      <SinglePost 
      postId={_id}
      userId={userId}
      name={userName}
      description={description}
      picture={picture}
      userpicture={userpicture}
      likes={likes}
      comments={comments}
      key={_id}
       />
    ))}
    
    </>

  )
}

export default PostsWidges