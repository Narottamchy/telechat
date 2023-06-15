"use client"
import 'react-toastify/dist/ReactToastify.css';
import ChatUI from "./components/Chat/ChatUI";
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';


export default function Home() {

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <ChatUI />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}