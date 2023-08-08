import React, { useEffect, useContext, useState } from 'react';
import SideBar from './Sidebar/SideBar';
import { ThemeContext } from '@/app/context/ThemeContext';
import Chats from './Sidebar/Chats';
import ChattingPage from './ChatBody/ChattingPage';
import EmptyChat from './ChatBody/EmptyChat';
import { AuthContext } from '@/app/context/AuthContext';

const ChatPage = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useContext(ThemeContext);
  const { person, account, socket, setActiveUsers } = useContext(AuthContext);

  useEffect(() => {
    socket.current.emit('addUsers', account);
    socket.current.on('getUsers', (users) => {
      setActiveUsers(users);
    });
  }, [account]);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* component */}
      <div className={`flex h-screen bg-black antialiased text-${theme.text}`}>
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className={`flex flex-col py-8 pl-6 pr-2 w-1/4 bg-${theme.bg} flex-shrink-0`}>
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-full text-indigo-700 bg-indigo-500 h-10 w-10">

              </div>
              <div className="ml-2 font-bold text-2xl">TeleChat</div>
              <SideBar />
            </div>
            {/* Search box */}
            <div className="flex justify-center mt-4 mr-2">
              <input
                type="text"
                placeholder="Search"
                className={`p-2 rounded-lg bg-${theme.bg} text-${theme.text} border border-${theme.border}`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            {/*Conversations */}
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center text-black bg-gray-300 h-4 w-4 rounded-full">
                  {users.length - 1}
                </span>
              </div>
      {/*Users */}
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
        {filteredUsers.map((user) => (
          <Chats key={user._id} user={user} />
        ))}
      </div>
      </div>
          </div>
          {/*Chatting page */}
          {Object.keys(person).length ? <ChattingPage theme={theme} /> : <EmptyChat theme={theme} />}
        </div>
      </div>
    </>
  );
};

export default ChatPage;

