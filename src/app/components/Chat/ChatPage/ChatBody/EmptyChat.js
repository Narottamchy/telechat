import React from 'react'
import Image from 'next/image';

const imageStyle = {
    backgroundImage: `url("/bg-1.svg")`,
    backgroundRepeat: "repeat-x",
    backgroundSize: "auto 100%",
  };

const EmptyChat = ({theme}) => {
    return (
        <div className={`flex flex-col flex-auto bg-blue-400 h-full`}>
            <div style={imageStyle} className={`flex flex-col flex-auto bg-${theme.bg} h-full p-4`}>
            
            </div>
        </div>
    )
}

export default EmptyChat