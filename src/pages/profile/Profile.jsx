import { useState ,useEffect} from "react";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "./Profile.css"
import axios from 'axios'
import { useParams } from "react-router-dom";


export default function Profile(profile) {
    const PF =process.env.REACT_APP_PUBLIC_FOlDER
    const [user,setUser]=useState({});
    const params=useParams()
    
    useEffect( ()=>{
        const fetchUsers = async () =>{
          const res=  await axios.get(`/users?username=${params.username}`)
          setUser(res.data)
        }
        fetchUsers()
      },[params.username])
    return(
        <>
        <Topbar />
        <div className="profile">
           <Sidebar />
           <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                <img  className="profileCoverImg" src={user.CoverPicture ? PF+user.CoverPicture : PF+"NoCover.jpg"} alt="mlikujyhg" />
                
                  <img className="profileUserImg" src={user.profilePicture ? PF+user.CoverPicture : PF+"profil/NoAvatar.jpg"} alt=";j,hngb" />
                 
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName"> {user.username}</h4>
                    <span className="profileInfoDesc"> {user.desc}</span>
                 </div>
                
            </div>
            <div className="profileRightBottom">
            <Feed username={params.username} />
            <Rightbar  user={user}/>
            </div>
           </div>
           
        </div>
        </>
    )
}