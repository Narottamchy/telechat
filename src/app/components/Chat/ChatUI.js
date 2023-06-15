import { AuthContext } from '@/app/context/AuthContext'
import Login from '@/app/login/page';
import React, {useState, useEffect, useContext} from 'react'
import { auth } from '../firebase/firebase';
import ChatPage from './ChatPage/ChatPage';
import Loading from '../Loading/Loading';
import { addUser } from '@/app/service/api';



const ChatUI = () => {
  const { account, setAccount } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setTimeout(()=>{
        setAccount(user);
        console.log(user);
        addUser(user);
        setLoading(false);
      },2000);
      
    });
  }, []);
  return (
    <>{loading ? <Loading/> : <>{account ? <ChatPage/> : <Login/>}</>}
</>

  )
}

export default ChatUI