import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Chat from "./components/Chat";
import { auth } from "./components/firebase";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { LogIn, selectUser } from "./features/userSlice";

function App() {
   const dispatch = useDispatch();
   const user = useSelector(selectUser);
   console.log(user);
   useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
         dispatch(
            LogIn({
               displayName: authUser.displayName,
               email: authUser.email,
               photoURL: authUser.photoURL,
            })
         );
      });
   }, []);
   return (
      <>
         {user ? (
            <div className="app">
               <div className="app_body">
                  <Sidebar />
                  <Chat />
               </div>
            </div>
         ) : (
            <Login />
         )}
      </>
   );
}

export default App;
