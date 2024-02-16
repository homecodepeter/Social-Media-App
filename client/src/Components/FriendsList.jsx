import React, { useEffect } from 'react'
import { setFriends } from '../state'
import { useDispatch, useSelector } from 'react-redux'
import { Friends } from './Friends';

const FriendsList = ({userId}) => {
   const dispatch = useDispatch();
   const friends = useSelector((state) => state.user.friends)
  const getFriend = async () => {
    const response = await fetch(`http://localhost:4001/user/${userId}/friends`, {
      method: "GET"
    })
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  }


  useEffect(() => {
    getFriend();
  }, [])

  return ( 
    <div className='mt-3 border w-[300px] p-2'>
     <div className='flex justify-between items-center'>
        <h3 className='font-semibold'>Friends </h3>
        <i className="fa-solid fa-user"></i>
     </div>
     <div>
      {friends.map(({_id, firstName, lastName, picture}) => (
         <Friends 
        key={_id}
        friendId={_id}
        name={`${firstName} ${lastName}`}
        userPicture={picture}
        /> 
      ))}
     </div>
    </div>
  )
}

export default FriendsList