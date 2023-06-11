"use client"
import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  return (
    <MyContext.Provider value={{ account, setAccount }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };