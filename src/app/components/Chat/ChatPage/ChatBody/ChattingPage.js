import { AuthContext } from '@/app/context/AuthContext'
import { getConversation, getMessages, newMessages } from '@/app/service/api';
import React, { useContext, useEffect, useState, useRef } from 'react'
import ChatBody from './ChatBody';
import { io } from 'socket.io-client';


const ChattingPage = ({ theme }) => {
    const { person, account, activeUsers, socket, newMessageFlag, setNewMessageFlag } = useContext(AuthContext);
    const [text, setText] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [conversation, setConversation] = useState({});
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);

    const chatContainerRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const handleTyping = () => {
        socket.current.emit('typing', { isTyping: true });
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.current.emit('typing', { isTyping: false });
        }, 1000);
    };



    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            const container = chatContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    };

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, []);

    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ senderId: account.uid, receiverId: person.uid });
            setConversation(data);
        }
        getConversationDetails();
    }, [person.uid])

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation?._id);
            setMessages(data);
        }
        conversation?._id && getMessageDetails();
    }, [person.uid, conversation?._id, newMessageFlag])

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
            setMessages((prev) => [...prev, incomingMessage]);

    }, [incomingMessage, conversation]);


    useEffect(() => {
        socket.current.on('typing', (data) => {
            setIsTyping(data.isTyping);
        });
    }, []);



    const receiverId = conversation?.members?.find(member => member !== account.uid);

    const sendText = async (e) => {
        const code = e.keycode || e.which;
        if (code === 13 && text.trim() !== '') {
            setSendingMessage(true);
            let message = {
                senderId: account.uid,
                receiverId: receiverId,
                conversationId: conversation?._id,
                type: 'text',
                text: text
            };
            socket.current.emit('sendMessage', message);
            await newMessages(message);
            setText('');
            setNewMessageFlag(prev => !prev);
            setSendingMessage(false);
        }
    }

    const sendTextBtn = async () => {
        if (text.trim() !== '') {
          setSendingMessage(true);
          let message = {
            senderId: account.uid,
            receiverId: receiverId,
            conversationId: conversation?._id,
            type: 'text',
            text: text
          };
          socket.current.emit('sendMessage', message);
          await newMessages(message);
          setText('');
          setNewMessageFlag(prev => !prev);
          setSendingMessage(false);
        }
      };
      



    return (
        <div className={`flex flex-col flex-auto bg-blue-400 h-full p-4`}>
            <div className={`flex flex-col flex-auto bg-${theme.bg} flex-shrink-0 rounded-2xl h-full p-4`}>
                {/*Chat header*/}
                <div className="flex items-center justify-between mb-2 pl-2">
                    <div className="flex items-center space-x-2">
                        <div className="h-12 w-12 rounded-full bg-indigo-500 overflow-hidden flex-shrink-0">
                            <img
                                src={person.photoURL || "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"}
                                 alt="Logo"
                                className="h-full w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{person.displayName}</span>
                            <span className="text-gray-500">{activeUsers?.find(user => user.uid === person.uid) ? <>{isTyping ? 'Typing...' : 'Online'}</> : 'Offline'}</span>
                        </div>
                    </div>
                </div>
                {/* Chatting */}
                <div ref={chatContainerRef} className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                            {messages && messages.map((message) => (
                                <ChatBody key={message._id} theme={theme} person={person} message={message} account={account} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Text Box Footer */}
                <div className={`flex flex-row items-center h-16 rounded-xl bg-${theme.bg} w-full px-4`}>
                    <div className="flex-grow ml-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                onChange={(e) => {
                                    setText(e.target.value);
                                    handleTyping();
                                }}
                                onKeyPress={(e) => { sendText(e) }}
                                value={text}
                                placeholder='Send Message'
                                className="flex w-full border text-black rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            />
                            
                        </div>
                    </div>
                    <div className="ml-4">
                        <button onClick={sendTextBtn} className={`flex h-10 items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0 ${
    sendingMessage ? 'animate-pulse' : ''}`}>
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