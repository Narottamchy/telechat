"use client"
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState({});
  const [person,setPerson] = useState({});

  return (
    <AuthContext.Provider value={{ account, setAccount, person, setPerson }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };