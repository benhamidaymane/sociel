import { useEffect, useState } from "react";
import  "./conversation.css";
import axios from "axios";


export default function Conversation({conversation,currentUser}) {

    const [user,setUser]=useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOlDER
    

    useEffect(()=>{
        const friendId=conversation.member.find(m=>m !== currentUser._id)


        const getUser= async ()=>{
            try{
                const res= await axios.get("/users?userId="+friendId)
                setUser(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getUser()
    },[currentUser,conversation])
    
    return(
        <div className="conversation">
             <img src={user?.profilePicture? PF+user.profilePicture : PF+"profil/NoAvatar.jpg"} alt="" className="conversationImg" />
             <span className="converstaionName">{user?.username}</span>
        </div>
    )
}