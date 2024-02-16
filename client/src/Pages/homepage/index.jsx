import React from 'react'
import UserProfile from '../../Components/UserProfile'
import PostsWidges from '../../Components/PostsWidges'
import PostWidge from  '../../Components/PostWidge'
import { useSelector } from 'react-redux'
import FriendsList from '../../Components/FriendsList'

const HomePage = () => {

  const { user } = useSelector((state) => state.user);

  return (
    <div className='flex justify-between w-[96%] m-auto'>
   <div className='flex-1'>
     <UserProfile image={user.picture} 
     name={`${user.firstName} ${user.lastName}`}
     location={user.location}
     friends={user.friends.length}
      />
   </div>
   <div className='flex-1'>
     <PostWidge userId={user._id} />
     <PostsWidges />
   </div>
   <div className='flex-1'>
    <div className='flex justify-center mt-2'>
     <img className='w-[300px] h-[300px] rounded-md'
     src={`https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg`} alt='image' />
    </div>
    <FriendsList userId={user._id} />
   </div>
     
      </div>
  )
}

export default HomePage