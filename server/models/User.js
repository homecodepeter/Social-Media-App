import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName:  {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email:  {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password:  {
        type: String,
        required: true,
        min: 5,
    },
    friends: {
        type: Array,
        default: []
    },
    picture:  {
       type: String,
       default: ""
    },
   location: String,
},
{ timestamps: true}
);

const User = mongoose.model("users", UserSchema);

export default User;