import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "./home.css"

export default function Home() {
    

    return(
        <>
        
            <Topbar />
            <div className="homeContainer">
               <Sidebar />
               <Feed />
               <Rightbar />
            </div>
            

        </>
    )
}
