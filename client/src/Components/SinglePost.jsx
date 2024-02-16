import React, { useState } from 'react'
import { Friends } from './Friends'
import { useDispatch, useSelector } from 'react-redux'
import { setPost, setComments } from '../state';

const SinglePost = ({
  postId,
  userId,
  name,
  description, 
  picture,
  userpicture,
  likes,
  comments
}) => {

  const loggedInUserId = useSelector((state) => state.user.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likedCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const [iscomments, setIsComments] = useState(false);
  const [text, setText] = useState("")
  
  const patchLiked = async () => {
      const response = await fetch(`http://localhost:4001/posts/${postId}/like`, {
        method: "PATCH",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({ userId: loggedInUserId })
      })
      const updatedPost = await response.json();

      dispatch(setPost({post: updatedPost}))

  }


  const AddCommmentsHandle = async () => {
    
      const data = {
        postId,
        userId,
        userName: name,
        userpicture,
        desc: text
      }

      const response = await fetch("http://localhost:4001/posts/comments", {
        method: "POST",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      const feedback = await response.json();
      dispatch(setPost({post: feedback}))
      setText("")
  }

  return (
    <div
     className='w-[340px] mt-3 grid justify-center border p-2 border-gray relative rounded-md'>
      <div>
    <Friends userPicture={userpicture} name={name} friendId={userId} />
      </div>
    <div className='mt-3'>
      <h3 className='font-semibold pb-2'>{description}</h3>
      <img src={`http://localhost:4001/assets/${picture}`}
      className='h-[400px] w-[120%] rounded-md'
       alt='postpicture' />
    </div>
    <div className='flex mt-4'>
      <button className='mr-4' onClick={patchLiked}>
        {isLiked ? (<i className="fa-solid text-red-600 fa-heart"></i>) :
        (<i className="fa-regular text-red-600 text-[20px] fa-heart"></i>)
      }
      <h3>{likedCount}</h3>
        </button>
      <button onClick={() => setIsComments(true)}>
        <i className="fa-regular text-[20px] fa-comment"></i>
        </button>
    </div>
    {iscomments && (
          <div className='bg-red-400 h-[340px] bottom-0 left-0 w-[100%] p-2 absolute'>
            <div className='flex items-center justify-between'>
            <h1>Comments {comments.length}</h1>
            <span 
            onClick={() => setIsComments(false)}
            className='text-[20px] font-semibold cursor-pointer'>X</span>
              </div>
              <div className='overflow-y-scroll h-[80%]'>
                {comments.map(comm => (
                <div className='flex mb-4' key={comm.desc}>
                <img src={`http://localhost:4001/assets/${comm.userpicture}`}
                alt="image" 
                className='w-[50px] h-[50px] rounded-full' 
                />
                <div>
                 <h3 className='ml-3 font-bold'>{comm.userName}</h3>
                  <p className='ml-3'>{comm.desc}</p>
                  </div>
                  </div>
                ))}
                </div>
            <div className='mt-7 absolute bottom-1'>
              <input type="text"
              onChange={e => setText(e.target.value)}
              value={text}
              className='w-[66%] h-[36px] outline-none pl-2 rounded-md'
               placeholder='what did you think....' />
              <button onClick={AddCommmentsHandle}
              className='border p-2 rounded-md ml-2 font-medium'>comment</button>
              </div>
            </div>
        )}
    </div>
  )
}

export default SinglePost;