import User from "../models/User";

export const getUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    }catch(err){
        res.status(404).json({message:err.message});
    }
}

export const getUserFriends = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,locations,picturePath})=>{
                return {_id,firstName,lastName,occupation,locations,picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    
    }catch(err){
        res.status(404).json({message:err.message});
    }
}

// update 

export const addRemoveFriend = async(req,res)=>{
    try{
        const {id,friendId} = req.params;
        const user = await findById(id);
        const friend = await findById(friendId);
        if(user.friends.include(friendId)){
            user.friends = user.friends.filter((id)=> id!=friendId);
            friend.friends = friend.friends.filter((id)=>id!=id);
        }
        else{
            user.friend.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,locations,picturePath})=>{
                return {_id,firstName,lastName,occupation,locations,picturePath};
            }
        );
        res.status(200).json(formattedFriends);


    }catch(error){
        res.status(404).json({message:err.message});
    }
}
