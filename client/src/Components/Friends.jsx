import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setFriends } from "../state/index"

export const Friends = ({friendId, name, userPicture }) => {

  const { _id } = useSelector((state) => state.user.user);
  const friends = useSelector((state) => state.user.friends);
  const dispatch = useDispatch();

  const isFriend = friends.find((friend) => friend._id === friendId);
    
  const handleClick = async () => {
     const response = await fetch(`http://localhost:4001/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"}
     })
     const data = await response.json();
     dispatch(setFriends({ friends: data }));
  }

  return (
    <div className='flex justify-between items-center p-2 border-b-2'>
      <Link
      to={`/profile/${friendId}`}
      className='w-[58%] flex items-center justify-between'
      >
      <div>
       <img src={`http://localhost:4001/assets/${userPicture}`}
       className='w-[50px] h-[50px] rounded-full'
       alt='userpicture' />
   </div>
       <h3 className='font-bold'>{name}</h3>
         </Link>
       <div>
        <button onClick={() => handleClick()}
        className='border p-2 w-[86px] border-black font-semibold rounded-md'>
          {isFriend ? (<h2>Following</h2>) : (<h2>Follow</h2>)}
          </button>
       </div>
    </div>
  )
}
