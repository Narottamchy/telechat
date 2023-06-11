import { MyContext } from '@/app/context/MyContext'
import Login from '@/app/login/page';
import React, {useState, useEffect, useContext} from 'react'
import { auth } from '../firebase/firebase';
import ChatPage from './ChatPage/ChatPage';
import Loading from '../Loading/Loading';

const ChatUI = () => {
  const { account, setAccount } = useContext(MyContext);
  const [userName, setUserName] = useState("");
  const [verified, setVerified] = useState("Not Verified");
  const [loading, setLoading] = useState(true);

  const LogOut = async () => {
    signOut(auth).then(() => {
      toast(userName + " has logout");
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setTimeout(()=>{
        if (user) {
          setUserName(user.displayName);
          setAccount(user);
          if (user.emailVerified) { setVerified("mailVerified") }
          else { setVerified("Not Verified"); }
        } else { setUserName(""); setVerified("Not Verified"); }
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