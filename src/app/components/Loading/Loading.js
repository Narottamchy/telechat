import React, { useEffect, useState } from 'react';

const Loading = () => {
  return (
    <>
      {/* Duplicated element with ping utility */}
      <div className="flex justify-center items-center h-screen">
          <div className="animate-ping rounded-full bg-indigo-500 w-32 h-32 absolute" />
          <div className="rounded-full bg-indigo-500 w-32 h-32 absolute" />
      </div>
    </>
  );
};


export default Loading;
