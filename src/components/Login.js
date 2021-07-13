import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";

const Login = () => {
   const SignIn = () => {
      auth.signInWithPopup(provider).catch((error) => alert(error.message));
   };
   return (
      <div className="login">
         <div className="login_inner">
            <img
               src="https://tse1.mm.bing.net/th?id=OIP.HT81DsS-pt0LE33O5F-_QwHaEK&pid=Api&P=0&w=290&h=164"
               alt="logo image"
            />
            <h3>Sign in whatsapp</h3>
            <Button onClick={SignIn}>Sign in with google</Button>
         </div>
      </div>
   );
};

export default Login;
