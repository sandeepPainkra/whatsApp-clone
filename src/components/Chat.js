import { Avatar, IconButton } from "@material-ui/core";
import { Mic, MoreHoriz, Search, Send } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { useSelector } from "react-redux";
import { selectRoomId, selectRoomName } from "../features/roomSlice";
import firebase from "firebase";
import db from "./firebase";
import userEvent from "@testing-library/user-event";
import { selectUser } from "../features/userSlice";

const Chat = () => {
   const [message, setMessage] = useState([]);
   const roomName = useSelector(selectRoomName);
   const roomId = useSelector(selectRoomId);
   const [input, setInput] = useState("");
   const user = useSelector(selectUser);

   useEffect(() => {
      if (roomId) {
         db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
               setMessage(snapshot.docs.map((doc) => doc.data()));
            });
      }
   }, [roomId]);
   console.log(message);
   const SendMessage = (e) => {
      e.preventDefault();
      if (roomId) {
         db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            displayName: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            email: user.email,
            photoURL: user.photoURL,
         });
      }

      setInput("");
   };
   return (
      <>
         <div className="chat">
            <div className="chat_header">
               <div className="chat_headerLeft">
                  <Avatar />
                  <div className="chat_headerLeftInfo">
                     <h2>{roomName}</h2>
                     <p>
                        {new Date(
                           message[0]?.timestamp?.toDate()
                        ).toUTCString()}
                     </p>
                  </div>
               </div>
               <div className="chat_headerRight">
                  <Search />
                  <MoreHoriz />
               </div>
            </div>
            <div className="chat_body">
               {message.map((message) => {
                  console.log(message);
                  return (
                     <p
                        className={`chat_message ${
                           user?.email === message.email && "message_reciever"
                        } `}
                     >
                        {message.message}
                        <small>
                           {new Date(message.timestamp?.toDate()).toUTCString()}
                        </small>
                     </p>
                  );
               })}
            </div>
            <div className="chat_input">
               <EmojiEmotionsIcon fontSize="large" />
               <form>
                  <input
                     type="text"
                     value={input}
                     onChange={(event) => setInput(event.target.value)}
                     placeholder="Type a message.."
                  />
                  <IconButton
                     disabled={!input}
                     onClick={SendMessage}
                     type="submit"
                  >
                     <Send
                        disabled={!input}
                        fontSize="large"
                        variant="contained"
                        color="primary"
                     />
                  </IconButton>
               </form>
               <Mic />
            </div>
         </div>
      </>
   );
};

export default Chat;
