import React, { useEffect, useContext, useState } from 'react'
import SideBar from './SideBar'
import { ThemeContext } from '@/app/context/ThemeContext'
import { getUsers } from '@/app/service/api'
import Chats from './Chats'
import ChattingPage from './ChattingPage'
import EmptyChat from './EmptyChat'
import { AuthContext } from '@/app/context/AuthContext'



const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const { theme } = useContext(ThemeContext);
  const {person} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      setUsers(response);
    }
    fetchData();
  }, []);

  return (
    <>
      {/* component */}
      <div className={`flex h-screen bg-black antialiased text-${theme.text}`}>
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className={`flex flex-col py-8 pl-6 pr-2 w-64 bg-${theme.bg} flex-shrink-0`}>
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-full text-indigo-700 bg-indigo-500 h-10 w-10">

              </div>
              <div className="ml-2 font-bold text-2xl">TeleChat</div>
              <SideBar />
            </div>

            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center text-black bg-gray-300 h-4 w-4 rounded-full">
                  {users.length}
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-64 overflow-y-auto">
                {users.map((user) => (
                  <Chats key={user._id} user={user} />
                ))}
              </div>
              <div className="flex flex-row items-center justify-between text-xs mt-6">
                <span className="font-bold">Archived</span>
                <span className="flex items-center justify-center bg-gray-300 text-black h-4 w-4 rounded-full">
                  7
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2">
                <button className="flex flex-row items-center hover:bg-gray-100 hover:text-black rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    H
                  </div>
                  <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                </button>
              </div>
            </div>
          </div>
          {Object.keys(person).length ? <ChattingPage theme={theme}/> : <EmptyChat theme={theme}/>}
        </div>
      </div>
    </>
  )
}

export default ChatPage