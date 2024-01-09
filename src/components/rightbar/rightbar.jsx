import { useContext, useEffect, useState } from "react"
import { Users } from "../../dummyData"
import Oneline from "../online/online"
import "./rightbar.css"
import { Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../../context/Authcontext"
import { Add, Remove } from "@mui/icons-material"




export default function Rightbar({user}) {
    const [friends,setFriends]=useState([])
    const PF =process.env.REACT_APP_PUBLIC_FOlDER
    const {user:currentUser}=useContext(AuthContext)
    const [followed,setFollowed]=useState(false)
    const { dispatch } = useContext(AuthContext);

   


    useEffect(()=>{
        setFollowed(currentUser.followins.includes(user?.id))
    },[user])

    useEffect(()=>{
        const getFriends =async()=>{
            try {
            const friendlist=    await axios.get("/users/friends/"+currentUser._id)
            setFriends(friendlist.data)
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()
    },[user])

    

    const handlerClick = async ()=>{
        try {
           if (followed) {
            await axios.put('/users/'+user._id+'/unfollow',{
                userId:currentUser._id})
            dispatch({type:"UNFOLLOW",payload:user._id})   
        }
           
           else{
            await axios.put('/users/'+user._id+'/follow',{
                userId:currentUser._id})
            dispatch({type:"FOLLOW",payload:user._id})   
       
           }
           
        } 
        
        catch (error) {
            console.log(error)
        }
        setFollowed(!followed)
    }

    

    
    const HomeRightbar=()=>{
        return(
            <>
            <div className="birthdayContainer">
                    <img src="/asset/geft2.jpg" alt=""  className="bithdayImg"/>
                    <span className="birthdaytext">
                       <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
                    </span>
            </div>
            <img src="/asset/gift.jpg" alt="" className="rightbarAd" />
            <h4 className="rightbartitle">Online friends</h4>
            <ul className="rightbarfreindsList">
                    {
                        Users.map(e=>(
                            <Oneline key={e.UserId} users={e} />
                        ))
                    }     
            </ul>
            </>
        )
    }

    const ProfileRightbar=()=>{
        return (
            <>
            {user.username !== currentUser.username && (
              <button className="rightbarFollowButton" onClick={handlerClick}>
               {followed ? "unfollow" :"follow"}
               {followed ? <Remove />  :<Add></Add> }
               
              </button>
            )}
            <h4 className="rightbarTitle"> User information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">from:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">relationShip:</span>
                    <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" :user.relationship === 1 ?"Married" : "-" }</span>
                </div>
                
            </div>
            <h4 className="rightbartitle"> User friends</h4>
            <div className="rightbarFollowings">
                {
                    friends.map((friends)=>{
                        return(
                    <Link to={"/profile/"+friends.username} style={{textDecoration:"none",color:"black"}}>
                    <div className="rightbarFollowing">
                      <img src={ friends.profilePicture ? PF+friends.profilePicture : PF+"profil/NoAvatar.jpg"} alt=""  className="rightbarFollowingImg" />
                      <span className="rightbarfollowingName">{friends.username}</span>
                    </div>
                    </Link>
                        )
                    })
                }
                
            </div>
            </>
        )
    }

    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                {
                    user ? <ProfileRightbar /> :<HomeRightbar />
                }
            </div>
        </div>
    )
    
}