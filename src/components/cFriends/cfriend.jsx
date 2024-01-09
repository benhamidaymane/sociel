import "./cfriend.css"

export default function CFriend({users}) {
  const PF=process.env.REACT_APP_PUBLIC_FOlDER
    return(
        <li className="sidebarFriend">
            <img src={users.ImgProfile} alt={users.username} className="sidebarFriendImg" />
            <span className="sidebarFriendName">{users.username}</span>
        </li>
    )
    
}