import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
    try {
     const { userId, description, picture, } = req.body;
     const user = await User.findById(userId)
     const newPost = new Post({
         userId,
         userName: `${user.firstName} ${user.lastName}`,
         description,
         userpicture: user.picture,
         picture,
         likes: {},
         comments: []
     })
 
     await newPost.save();
 
     const post = await Post.find();
     res.status(201).json(post)
 
    } catch (error) {
     res.status(409).json({ Message: error.message })
    }
 }

 export const getFeedPosts = async (req,res) => {
      try {
        const post = await Post.find();
        res.status(200).json(post);
      } catch (error) {
        res.status(404).json({ Message: error.message })
      }
 }

export const getUserPost = async (req, res) => {
       try {
        const { id }  = req.params;
        const post = await Post.find({ userId: id })
        console.log(post)
        res.status(200).json(post);
       } catch (error) {
        res.status(404).json({ Message: error.message })
       }
}

export const getUserComments = async (req, res) => {
     try {
        const { desc, userName, userpicture, userId, postId } = req.body;
        const post = await Post.findById(postId);
        console.log(post);
        console.log(req.body)
  
         post.comments.push({ desc, userName, userpicture, userId, postId });

         const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { comments: post.comments },
            { new: true }
        );

        res.status(200).json(updatedPost);

     } catch (error) {
        res.status(404).json({ Message: error.message })
     }
}


export const getLikesPost = async (req,res) => {
   try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log("UserID", userId)
    console.log("Id", id)

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if(isLiked) {
        post.likes.delete(userId);
    }else {
        post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
    );

    res.status(200).json(updatedPost)

   } catch (error) {
    res.status(404).json({ Message: "Failed To LIked"})
   }

}