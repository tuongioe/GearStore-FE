import React from 'react';

const MessagePopUp = ({ message, isShowed }) => {
  return (
    <div
      className={` fixed drop-shadow-2xl z-[50] top-[150px] left-0 right-0 p-[10px] flex gap-[20px] rounded-xl items-center justify-center bg-[#4dbb6c] animate-in slide-in-from-right ${
        !isShowed && 'hidden'
      }`}
    >
      <img src="/icon/success.svg" alt="" className="w-[36px] h-[36px]" />
      <p className="text-white text-4xl font-medium text-center">{message}</p>
    </div>
  );
};

export default MessagePopUp;
