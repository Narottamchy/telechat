import React, { useContext } from 'react'


const ChatBody = ({account, message, theme,person}) => {
  return (
    <>{account.uid === message.senderId ? <div key={message._id} className="col-start-6 col-end-13 p-3 rounded-lg">
    <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 overflow-hidden">
        <img 
             height= "auto"
             width={"100%"}
            src={person.photoURL || "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"}
             alt="Logo"
            className="h-full w-full"
          />
        </div>
        <div className="relative mr-3 text-sm bg-blue-500 max-w-xl break-words py-2 px-4 shadow rounded-xl">
            <div>{message.text}</div>
        </div>
    </div>
</div>: <div key={message._id} className="col-start-1 col-end-8 p-3 rounded-lg">
    <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 overflow-hidden">
        <img 
             height= "auto"
             width={"100%"}
            src={account.photoURL || "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"}
             alt="Logo"
            className="h-full w-full"
          />
        </div>
        <div className={`relative ml-3 text-sm bg-${theme.bg} py-2 px-4 max-w-xl break-words shadow rounded-xl`}>
            <div>{message.text}</div>
        </div>
    </div>
</div>}</>
  )
}

export default ChatBody