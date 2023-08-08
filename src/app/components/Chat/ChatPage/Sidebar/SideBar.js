import { AuthContext } from "@/app/context/AuthContext";
import { useState, useContext } from "react";
import { auth } from "../../../firebase/firebase";
import { sendEmailVerification, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "@/app/context/ThemeContext";


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const {theme,setTheme} = useContext(ThemeContext);
  const account = useContext(AuthContext);
  const [userName, setUserName] = useState(account.account.displayName);

  const switchTheme= () =>{
    if(theme.bg === "white") {setTheme({bg:"black",text:"white"})} 
    else{setTheme({bg:"white",text:"black"});}
  }

  const LogOut = async () => {
    signOut(auth).then(() => {
      toast(userName + " has logout");
    }).catch((e) => {
      // console.log(e);
    });
  }

  const sendMail = async () => {
    await sendEmailVerification(account.account)
      .then(() => {
        toast("Please Check Your Mail");
      })
      .catch((e) => {
        // console.log(e);
        toast(e.code);
      });
  }

  return (
    <>
      {showSidebar ? (
        <svg
          className={`w-7 h-7 flex text-4xl text-${theme.text} items-center cursor-pointer fixed left-6 bottom-6 z-50`}
          onClick={() => setShowSidebar(!showSidebar)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-7 h-7 fixed  z-30 flex items-center cursor-pointer left-6 bottom-6"
          onClick={() => setShowSidebar(!showSidebar)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )}

      <div
        className={`top-0 w-1/4 text-${theme.text} fixed bg-${theme.bg} h-full z-60  ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "-translate-x-full"
          }`}
      >
        <div className={`flex flex-col py-8 pl-4 pr-4 w-full bg-${theme.bg} flex-shrink-0`}>
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className={`flex items-center justify-center rounded-full text-${theme.text} bg-indigo-500 h-10 w-10`}>

            </div>
            <div className={`ml-2 font-bold text-2xl`}>TeleChat</div>
          </div>
          <div className="flex flex-col items-center bg-indigo-300 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img 
             height= "auto"
             width={"100%"}
                src={account.account.photoURL || "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"}
                 alt="Logo"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2 text-black">{account.account.displayName}</div>
            <div className="text-xs text-black">{account.account.a}</div>
            <div className="flex flex-row items-center mt-3">
              <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                <div className="h-3 w-3 bg-white rounded-full self-end mr-1" />
              </div>
              <div className="leading-none ml-1 text-xs text-black">Active</div>
            </div>
          </div>
          <div className="flex flex-col mt-8">

            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
              <button className="flex flex-row items-center hover:bg-gray-100 hover:text-black rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  A
                </div>
                <div className="ml-2 text-sm font-semibold">About</div>
              </button>
              {account.account.emailVerified ? <button className="flex flex-row items-center hover:text-black hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full">
                  <img 
             height= "auto"
             width={"100%"}
                    src="https://cdn-icons-png.flaticon.com/512/561/561249.png?w=740&t=st=1686581002~exp=1686581602~hmac=1a2a03eaf430967ab0cdc0ee23b98f2a6f2f7b93b4295d728a3b0810b628c7cf"
                     alt="Logo"
                    className="h-full w-full"
                  />
                </div>
                <div className="ml-2 text-sm font-semibold">Mail</div>
                <div className="flex items-center justify-center ml-auto text-xs text-white h-4 w-4 rounded leading-none">
                  <img 
             height= "auto"
             width={"100%"}
                    src="https://cdn-icons-png.flaticon.com/512/969/969566.png?w=740&t=st=1686581102~exp=1686581702~hmac=ead42c4ef8d5d89314333942dbfd455bee41eeef0b17a68d0b0f68915503738d"
                     alt="Logo"
                    className="h-full w-full"
                  />
                </div>

              </button> : <button  onClick={sendMail} className="flex flex-row items-center hover:text-black hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full">
                  <img 
             height= "auto"
             width={"100%"}
                    src="https://cdn-icons-png.flaticon.com/512/561/561249.png?w=740&t=st=1686581002~exp=1686581602~hmac=1a2a03eaf430967ab0cdc0ee23b98f2a6f2f7b93b4295d728a3b0810b628c7cf"
                     alt="Logo"
                    className="h-full w-full"
                  />
                </div>
                <div className="ml-2 text-sm font-semibold">Mail</div>
              </button>}
              
              <button onClick={switchTheme} className="flex flex-row items-center hover:text-black hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full">
                  <img 
             height= "auto"
             width={"100%"}
                    src="https://cdn-icons-png.flaticon.com/512/391/391097.png?w=740&t=st=1686581376~exp=1686581976~hmac=bd0acfc7f94884a71dcec9750e1be25448ec7d668c70f1d9c06920b7d9e2d05a"
                     alt="Logo"
                    className="h-full w-full"
                  />
                </div>
                <div className="ml-2 text-sm font-semibold">Theme</div>
              </button>
              <button className="flex flex-row items-center hover:bg-gray-100 hover:text-black rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full">
                  <img 
             height= "auto"
             width={"100%"}
                    src="https://cdn-icons-png.flaticon.com/512/300/300220.png?w=740&t=st=1686581870~exp=1686582470~hmac=307a03ba730b09b1f783be6f4c2404ac9f907bfe8b4f75c7430c4a5e50408d07"
                     alt="Logo"
                    className="h-full w-full"
                  />
                </div>
                <div className="ml-2 text-sm font-semibold">Privacy</div>
              </button>
              <button onClick={LogOut} className="flex flex-row items-center hover:text-black hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full">
                  <img 
             height= "auto"
             width={"100%"}
                    src="https://cdn-icons-png.flaticon.com/512/248/248930.png?w=740&t=st=1686580807~exp=1686581407~hmac=5a60067921ce3e1db02b370367c0d379b226b2b33b994e956187236c0fc2f62f"
                     alt="Logo"
                    className="h-full w-full"
                  />
                </div>
                <div className="ml-2 text-sm font-semibold">Logout</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Sidebar;