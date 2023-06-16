import React from 'react'

const EmptyChat = ({theme}) => {
    return (
        <div className={`flex flex-col flex-auto bg-blue-400 h-full p-4`}>
            <div className={`flex flex-col flex-auto bg-${theme.bg} flex-shrink-0 rounded-2xl h-full p-4`}>
                EmptyChat
            </div>
        </div>
    )
}

export default EmptyChat