import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "./firebase";
import { useDispatch } from "react-redux";
import { selectRoomId, setRoomDetails } from "../features/roomSlice";
import { useSelector } from "react-redux";

const SidebarChat = ({ addNewChat, id, content }) => {
   const roomId = useSelector(selectRoomId);
   const [message, setMessage] = useState([]);
   const dispatch = useDispatch();
   const SetRoom = () => {
      if (id) {
         dispatch(
            setRoomDetails({
               roomName: content,
               roomId: id,
            })
         );
      }
   };

   useEffect(() => {
      db.collection("rooms")
         .doc(id)
         .collection("messages")
         .orderBy("timestamp", "desc")
         .onSnapshot((snapshot) => {
            setMessage(snapshot.docs.map((doc) => doc.data()));
         });
   }, []);

   const AddNewChat = () => {
      const chatName = prompt("Enter Room Name:");
      if (chatName) {
         console.log(chatName);
         db.collection("rooms").add({
            chatName: chatName,
         });
      }
   };
   return !addNewChat ? (
      <div onClick={SetRoom} className="sidebarChat">
         <Avatar src={message[0]?.photoURL} />
         <div className="sidebarChat_info">
            <h2>{content}</h2>
            <p>{message[0]?.message}</p>
         </div>
      </div>
   ) : (
      <div onClick={AddNewChat} className="sidebarChat addNewChat">
         <h2>Add New Chat</h2>
      </div>
   );
};

export default SidebarChat;
