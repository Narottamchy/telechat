import React from 'react'

const Chats = ({ user }) => {
    return (
        <div><button className="flex flex-row items-center hover:bg-gray-100 hover:text-black rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                H
            </div>
            <div className="ml-2 text-sm font-semibold">{user.displayName}</div>
        </button></div>
    )
}

export default Chats