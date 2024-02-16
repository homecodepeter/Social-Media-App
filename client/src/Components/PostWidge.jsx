import React, { useState } from 'react'
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/index"

const PostWidge = ({userId}) => {
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");

    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("description",  post);
        if(image){
           formData.append("picture", image);
           formData.append("picture", image.name);
        }
    const response = await fetch("http://localhost:4001/posts", {
        method: "POST",
        body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
    }

  return (
    <div className='w-[300px]'>
            <div>
    <Dropzone
             acceptedFiles=".jpg,.jpeg,.png"
             multiple={false}
             onDrop={(acceptedFiles) => 
                setImage(acceptedFiles[0])
            }
             >
            {({ getRootProps, getInputProps}) => (
                <div
                {...getRootProps()}
              className='p-2 mt-2 border border-[#2A69AD] rounded-sm'
                >
              <input {...getInputProps() } />
              {!image ? (
                <p>Add Picture Here</p>
              ): (
                <div className='flex justify-between'>
                    <span>{image.name}</span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
              )}
                </div>
            )}
             </Dropzone>
    </div>
    <input type="text"
    className='w-[100%] h-[40px] outline-none mt-2 mb-2'
    onChange={e => setPost(e.target.value)}
    value={post}
     placeholder="what's on your mind...." />
     <button onClick={handleClick}
      className='bg-green-800 font-semibold rounded-md text-white w-[100%] h-[40px]'>
        New Post!</button>
    </div>
  )
}

export default PostWidge