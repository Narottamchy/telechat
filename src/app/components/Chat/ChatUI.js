import { AuthContext } from '@/app/context/AuthContext'
import Login from '@/app/login/page';
import React, {useState, useEffect, useContext} from 'react'
import { auth } from '../firebase/firebase';
import ChatPage from './ChatPage/ChatPage';
import Loading from '../Loading/Loading';

const ChatUI = () => {
  const { account, setAccount } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setTimeout(()=>{
        setAccount(user);
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