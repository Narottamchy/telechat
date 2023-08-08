import { AuthContext } from '@/app/context/AuthContext'
import { setConversation } from '@/app/service/api';
import React, { useContext } from 'react'

const Chats = ({ user }) => {
    const {setPerson,account} = useContext(AuthContext);
    const getUser= async ()=>{
        setPerson(user);
        await setConversation({senderId:account.uid,receiverId:user.uid})
    }
    return (
        <>{user.uid === account.uid ? <></>: <button onClick={()=>{getUser()}} className="flex flex-row items-center hover:bg-gray-100 hover:text-black rounded-xl p-2">
        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full overflow-hidden">
        <img 
             height= "auto"
             width={"100%"}
            src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"}
             alt="Logo"
            className="h-full w-full"
          />
        </div>
        <div className="ml-2 text-sm font-semibold">{user.displayName}</div>
    </button>}
        </>
        
    )
}

export default Chats