import { Bookmark, Chat, Event, Group, HelpOutline, RssFeed , School, VideoFile, VideogameAsset, WorkOutline} from "@mui/icons-material"
import "./sidebar.css"
import { Users } from "../../dummyData"

import CFriend from "../cFriends/cfriend"

export default function Sidebar() {

    return(
        <div className="sidebar">
           <div className="sideBarWrapper">
              <ul className="sidebarList">
                <li className="sidebarListItem">
                    <RssFeed  className="sidebarIcon"/>
                    <span className="sidebarListItemtext">Feed</span>
                </li>
                <li className="sidebarListItem">
                    <Chat  className="sidebarIcon"/>
                    <span className="sidebarListItemtext">Feed</span>
                </li>
                <li className="sidebarListItem">
                    <VideoFile  className="sidebarIcon"/>
                    <span className="sidebarListItemtext">Feed</span>
                </li>
               
                <li className="sidebarListItem">
                    <Group  className="sidebarIcon"/>
                    <span className="sidebarListItemtext">Feed</span>
                </li>
                <li className="sidebarListItem">
                    <Bookmark  className="sidebarIcon"/>
                    <span className="sidebarListItemtext">Feed</span>
                </li>
                <li className="sidebarListItem">
                    <HelpOutline  className="sidebarIcon"/>
                    <span className="sidebarListItemtext">Feed</span>
                </li>
                <li className="sidebarListItem">
                    <WorkOutline  className="sidebarIcon"/>
                    <span className="sidebarListItemtext">Feed</span>
                </li>
                <li className="sidebarListItem">
                    <Event  className="sidebarIcon"/>
                    <span className="sidebarListItemtext">Feed</span>
                </li>
                <li className="sidebarListItem">
                    <School  className="sidebarIcon"/>
                    <span className="sidebarListItemtext">Feed</span>
                </li>
              </ul>
              <button className="sidebarButton">Show more </button>
              <hr  className="sidebarHr"/>
              <ul className="sidebarFriendList">
                 {Users.map(u=>(
                    <CFriend key={u.UserId} users={u} />
                 ))}
              </ul>
           </div> 
        </div>
    )
    
}