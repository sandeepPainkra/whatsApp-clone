import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Search } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, selectUser } from "../features/userSlice";

function Sidebar() {
   const [Room, setRoom] = useState([]);
   const user = useSelector(selectUser);
   const dispatch = useDispatch();
   useEffect(() => {
      db.collection("rooms").onSnapshot((snapshot) => {
         setRoom(
            snapshot.docs.map((doc) => ({
               id: doc.id,
               data: doc.data(),
            }))
         );
      });
   }, []);
   const SignOut = () => {
      if (user) {
         dispatch(LogOut());
      }
   };
   return (
      <>
         <div className="sidebar">
            <div className="sidebar_header">
               <Avatar onClick={SignOut} src={user.photoURL} />
               <div className="sidebar_headerRight">
                  <IconButton>
                     <DataUsageIcon />
                  </IconButton>
                  <IconButton>
                     <MoreVertIcon />
                  </IconButton>
               </div>
            </div>

            <div className="sidebar_search">
               <Search />
               <input placeholder="Search or start new chat" />
            </div>
            <hr />

            <div className="sidebarChat_body">
               <SidebarChat addNewChat />
               {Room.map((data) => {
                  return (
                     <SidebarChat
                        id={data.id}
                        key={data.id}
                        content={data.data.chatName}
                     />
                  );
               })}
            </div>
         </div>
      </>
   );
}
export default Sidebar;
