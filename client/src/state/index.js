import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mode:"light",
    user:null,
    token:null,
    posts:[],
}
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{ // reducers are the functions that defines the changes in the global/intialState
        setMode:(state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin:(state,action) =>{  // action includes all the arguments

            state.user = action.payload.user;
            state.token = action.payload.token;

        },
        setLogout:(state)=>{
            state.user = null;
            state.token = null;
        },
        setFriends:(state,action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.log("user friends non existenet");
            }
        },
        setPosts:(state,action)=>{
            state.posts = action.payload.posts;
        },
        setPost:(state,action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload._id)return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }

    }
})

export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost} = authSlice.actions;
export default authSlice.reducer;