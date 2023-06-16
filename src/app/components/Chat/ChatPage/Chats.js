import { AuthContext } from '@/app/context/AuthContext'
import React, { useContext } from 'react'

const Chats = ({ user }) => {
    const {setPerson} = useContext(AuthContext);
    const getUser=()=>{
        setPerson(user);
    }
    return (
        <button onClick={()=>{getUser()}} className="flex flex-row items-center hover:bg-gray-100 hover:text-black rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full overflow-hidden">
            <img
                src={user.photoURL}
                alt="Logo"
                className="h-full w-full"
              />
            </div>
            <div className="ml-2 text-sm font-semibold">{user.displayName}</div>
        </button>
    )
}

export default Chats