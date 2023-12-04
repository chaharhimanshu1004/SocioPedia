import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async(req,res)=>{
    try{
        const {userId,description,picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
        userId,
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        description,
        userPicturePath,
        likes:{},
        comments:[],
        })
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post); // 201 for creating something

    }catch(err){
        res.status(409).json({message:err.message}); 
    }
}

// READ

export const getFeedPosts= async(req,res)=>{
    try{
        const post = await Post.find();
        res.status(200).json(post); // 200 for getting

    }catch(err){
        res.status(409).json({message:err.message}); 

    }
}

export const getUserPosts = async(req,res)=>{
    try{
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    }catch(err){
        res.status(409).json({message:err.message}); 

    }
}


// Update
export const likePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId); // means if userId exists then the post is liked by the specific user
        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
        )
        res.status(200).json(updatedPost); // update the frontend by this

    }catch(err){
        res.status(409).json({message:err.message}); 

    }
}