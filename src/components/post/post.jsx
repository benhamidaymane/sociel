import { MoreVert } from "@mui/icons-material"
import "./post.css"
import axios  from 'axios'
import { useState ,useEffect, useContext } from "react"
import {format} from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/Authcontext"

export default function Post({post}) {
    const [like,setLike]=useState(post.likes.length)
    const [isLike,setIsLike]=useState(false)
    const [user,setUser]=useState({})
    const PF =process.env.REACT_APP_PUBLIC_FOlDER
    const {user:currentUser} =useContext(AuthContext)

    const handlerLike = ()=>{
        try{
            axios.put("/posts/"+post._id+"/like" ,{userId:currentUser._id})
        }catch(err){

        }
        setLike(isLike ? like-1 : like+1)
        setIsLike(!isLike)
    }
    useEffect(()=>{
        setIsLike(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect( ()=>{
        const fetchUsers = async () =>{
          const res=  await axios.get(`/users?userId=${post.userId}`)
          setUser(res.data)
        }
        fetchUsers()
      },[post.userId])
    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        <img src={user.profilePicture ? PF+user.profilePicture : PF+"profil/NoAvatar.jpg"}  alt="user not found photo " className="postProfileImg" />
                        </Link>
                        <span className="postUsername"> 
                        {user.username} 
                        </span>
                        <span className="postDate">{format(post.createdAt)} </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCentre">
                    <span className="postText"> {post.desc} </span>
                    <img src= {PF+post.img} alt="hey aymae " className="postImg" />
                </div>
                <div className="postButtom">
                    <div className="postBottomLeft">
                    <img className="LikeIcon" 
                    src={`${PF}like-10447.png`}
                    alt="like"
                    onClick={handlerLike}
                    />
                    <img className="LikeIconJador"
                    src={`${PF}like-10438.png`}
                    alt="jadore " 
                    onClick={handlerLike}
                    />
                    <span className="postLikeCounter">{like}peaple like it </span>
                        
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment}comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}