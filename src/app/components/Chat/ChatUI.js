import { AuthContext } from '@/app/context/AuthContext';
import Login from '@/app/login/page';
import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebase';
import ChatPage from './ChatPage/ChatPage';
import Loading from '../Loading/Loading';
import { addUser, getUsers } from '@/app/service/api'; // Import getUsers

const ChatUI = () => {
  const [users, setUsers] = useState([]); // State for users
  const { account, setAccount } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (user) => {
      try {
          setAccount(user);
        await addUser(user);
        
        let response = await getUsers();
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    auth.onAuthStateChanged((user) => {
      fetchData(user);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loading /> // Display loading spinner while fetching data
      ) : (
        <>
          {account ? <ChatPage users={users} /> : <Login />}
        </>
      )}
    </>
  );
};

export default ChatUI;
