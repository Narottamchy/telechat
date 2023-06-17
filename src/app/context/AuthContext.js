"use client"
import React, { createContext, useEffect, useRef, useState } from 'react';
import {io} from 'socket.io-client';
import dotenv from "dotenv";
dotenv.config();

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState({});
  const [person,setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);

  const socket = useRef();

  useEffect(()=>{
    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER}`)
  },[])

  return (
    <AuthContext.Provider value={{ account, setAccount, person, setPerson, socket ,activeUsers, setActiveUsers , newMessageFlag, setNewMessageFlag}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };