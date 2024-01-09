import { useEffect, useState } from "react";
import Post from "../post/post";
import Share from "../share/Share";
import "./feed.css";
import axios from 'axios'
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";


export default function Feed({username}) {

    const [posts,setPosts]=useState([])
    const {user}=useContext(AuthContext)
    

    useEffect( ()=>{
      const fetchPosts = async () =>{
        const res=  username ?
         await axios.get("/posts/profile/"+username)
         :await axios.get("posts/timeline/"+user._id)
        setPosts(res.data.sort((p1,p2)=>{
            // order by asc  les posts 
            return new Date(p1.createdAt) - new Date(p2.createdAt)
        }))
      }
      fetchPosts()
    },[username,user._id])
    return(
        <div className="feed">
            <div className="feedwrapper">
                {username === user.username && <Share />}
                 {posts.map((p)=>(
                    <Post key={p._id} post={p} />
                ))} 
            </div>
        </div>
    )
    
}