import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    userId: {
        type: String,
    },
    userpicture: {
        type: String,
    },
    picture: {
        type: String,
    },
    userName: {
        type: String,
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
       type: Array,
       default: []
    }
},
{timestamps: true}
)

const Post = mongoose.model("Post", postSchema);


export default Post;