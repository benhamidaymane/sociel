

export default function Oneline({users}) {
    return(
        <li className="rightbarfriend">
            <div className="righbarprofileImgContainer">
                <img src={users.ImgProfile} alt="dsf"  className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{users.username}</span>
        </li>
    )
}