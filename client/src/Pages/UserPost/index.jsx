import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UserProfile from '../../Components/UserProfile';
import PostWidge from '../../Components/PostWidge';
import PostsWidges from '../../Components/PostsWidges';
import { useParams } from 'react-router-dom';

const UserPostSingle = () => {
  const [user, setUser] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);


  const getUser = async () => {
    const response = await fetch(
      `http://localhost:4001/users/${id}`,
      {
        method: "GET",
      }
      )
      const data = await response.json();
      setUser(data)
  }

  useEffect(() => {
   getUser();
   setLoading(false)
  }, []);

  if(!user) return null;

  return (
    <div className='flex w-[70%] justify-center m-auto'>
    <div className='flex-1'>
      <UserProfile 
      image={user.picture} 
      name={`${user.firstName} ${user.lastName}`}
      location={user.location}
      friends={user.friends.length}
       />
    </div>
    <div className='flex-1'>
      <PostWidge userId={user._id} />
      <PostsWidges userId={user._id} isProfile  />
    </div>
       </div>
  )
}

export default UserPostSingle