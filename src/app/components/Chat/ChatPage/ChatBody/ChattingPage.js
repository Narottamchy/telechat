import { AuthContext } from '@/app/context/AuthContext'
import { getConversation, getMessages, newMessages } from '@/app/service/api';
import React, { useContext, useEffect, useState } from 'react'
import ChatBody from './ChatBody';

const ChattingPage = ({ theme }) => {
    const { person,account } = useContext(AuthContext);
    const [text,setText] = useState('');
    const [conversation,setConversation] = useState({}); 
    const [messages,setMessages] = useState([]);
    const [messageFlag,setMessageFlag] = useState(false);
    const sendText = async (e) =>{
        const code = e.keycode || e.which;
        if(code===13 && text.trim() !== ''){
            let message={
                senderId:account.uid,
                receiverId:person.uid,
                conversationId:conversation._id,
                type:'text',
                text: text
            };
            await newMessages(message);
            setText('');
            setMessageFlag(prev=> !prev);
        }
    }

    useEffect(()=>{
        const getConversationDetails = async () =>{
            let data = await getConversation({senderId:account.uid,receiverId:person.uid});
            setConversation(data);
        }
        getConversationDetails();
    },[person.uid])

    useEffect(()=>{
        const getMessageDetails = async () =>{
            let data =  await getMessages(conversation._id);
            setMessages(data);
        }
        conversation._id && getMessageDetails();
    },[person.uid,conversation._id,messageFlag])

    return (
        <div className={`flex flex-col flex-auto bg-blue-400 h-full p-4`}>
            <div className={`flex flex-col flex-auto bg-${theme.bg} flex-shrink-0 rounded-2xl h-full p-4`}>
                {/*Chat header*/}
                <div className="flex items-center justify-between mb-2 pl-2">
                    <div className="flex items-center space-x-2">
                        <div className="h-12 w-12 rounded-full bg-indigo-500 overflow-hidden flex-shrink-0">
                            <img
                                src={person.photoURL}
                                alt="Logo"
                                className="h-full w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{person.displayName}</span>
                            <span className="text-gray-500">Offline</span>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                        </svg>
                    </button>
                </div>
                {/* Chatting */}
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                            {messages && messages.map((message)=>(
                                <ChatBody key={message._id} theme={theme} message={message} account={account}/>
                            ))}
                            
                        </div>
                    </div>
                </div>
                {/* Text Box Footer */}
                <div className={`flex flex-row items-center h-16 rounded-xl bg-${theme.bg} w-full px-4`}>
                    <div>
                        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-grow ml-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                onChange={(e)=>{
                                    setText(e.target.value)
                                }}
                                onKeyPress={(e)=>{sendText(e)}}
                                value={text}
                                placeholder='Send Message'
                                className="flex w-full border text-black rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            />
                            <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="ml-4">
                        <button className={`flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0`}>
                            <span>Send</span>
                            <span className="ml-2">
                                <svg
                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChattingPage