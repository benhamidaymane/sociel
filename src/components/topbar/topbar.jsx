
import { Search ,Person, Chat, Notifications } from "@mui/icons-material"
import './topbar.css'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/Authcontext"
export default function Topbar() {
    const {user}=useContext(AuthContext)
    const PF =process.env.REACT_APP_PUBLIC_FOlDER
    

    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">LiteRome</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search  className="searchicon"/>
                    <input type="text" placeholder=" searcg for friend post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink" > Homepage</span>
                    <span className="topbarLink"> Timeline</span>
                </div>
                <div className="topbarIcons">
                     <div className="topbaIconItem">
                        <Person className="topbarIcon" /> 
                        <span className="topbarIconbadge">1</span>
                     </div>
                     <div className="topbaIconItem">
                        <Chat className="topbarIcon"/> 
                        <span className="topbarIconbadge">1</span>
                     </div>
                     <div className="topbaIconItem">
                        <Notifications className="topbarIcon"/> 
                        <span className="topbarIconbadge">1</span>
                     </div>
                </div>
             <Link to={`/profile/${user.username}`}>
             <img src={user.profilePicture ? PF+user.profilePicture :PF+"profil/NoAvatar.jpg"} alt="" className="topbarImg" />
             
             </Link>
            </div>
        </div>
    )
}