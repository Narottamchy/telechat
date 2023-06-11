"use client"
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { auth } from './components/firebase/firebase'
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [userName, setUserName] = useState("");
  const [verified,setVerified] = useState("Not Verified");

  const LogOut = async () => {
    signOut(auth).then(() => {
      toast(userName+" has logout");
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        if(user.emailVerified){setVerified("mailVerified")}
        else{setVerified("Not Verified");}
      } else {setUserName("");setVerified("Not Verified");}
    });
  }, []);
  return (
    <>
      <Link href="/login">Login</Link>
      <Link href="/signup">SignUp</Link>
      <button onClick={LogOut}>signOut</button>
      <h1>Hello {userName}</h1>
      <h1>hi your email is {verified}</h1>
      <ToastContainer />
    </>
  )
}
