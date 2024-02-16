import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    posts: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogIn: (state, action) => {
            state.user = action.payload;
            state.token = action.payload;
        },
        setLogout: (state) => {
          state.user = null;
          state.token = null;
        },
        setFriends: (state, action) => {
          if(state.user){
            state.user.friends = action.payload.friends;
          }else {
            console.error("User Freinds none-existent :( ")
          }
        },
        setPosts: (state, action) => {
         state.posts = action.payload.posts;
        },
        setComments: (state, action) => {
             state.comments = action.payload.comments;
        },
        setPost: (state, action) => {
           const updatedPost = state.posts.map((post) => {
            if(post._id === action.payload.post._id) return action.payload.post;
            return post;
           })
           state.posts = updatedPost;
        }
    }
})

export const { setMode, setFriends, setLogIn, setLogout, setPosts, setPost} = authSlice.actions;

export default authSlice.reducer;