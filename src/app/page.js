"use client"
import 'react-toastify/dist/ReactToastify.css';
import ChatUI from "./components/Chat/ChatUI";
import { MyContextProvider } from './context/MyContext';


export default function Home() {
  
  return (
    <>
    <MyContextProvider>
      <ChatUI />
    </MyContextProvider>
    </>
  )
}