import React from 'react'
import { setLogout } from '../state'
import { useDispatch } from 'react-redux'

const UserProfile = ({image, name, location, friends}) => {
  const dispatch = useDispatch();
  return (
    <div className='grid justify-center w-[300px] border p-3 rounded-md'>
<img src={`http://localhost:4001/assets/${image}`} alt='image'
 className='w-[200px] h-[200px] rounded-full' />
 <div className='grid justify-center'>
    <h2 className='font-bold text-[20px] mt-2 mb-2'>{name}</h2>
    <h3 className='font-semibold mb-2'><i className="fa-solid pr-2 fa-location-dot"></i>{location}</h3>
    <h3 className='font-semibold'><i className="fa-solid pr-2 fa-user"></i>listFriend {friends}</h3>
 </div>
 <button
 className='border border-black p-2 mt-3 rounded-md font-semibold'
  onClick={() => dispatch(setLogout())}
 >
    LOG OUT</button>
    </div>
  )
}

export default UserProfile