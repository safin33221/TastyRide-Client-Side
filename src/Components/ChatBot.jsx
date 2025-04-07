import React from "react";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const ChatBot = ({ setOpenChat }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-red-500 fixed bottom-0 right-0 py-5 m-5 w-[350px] h-[450px] overflow-hidden">
      {/* chat header  */}
      <div className="flex justify-between items-center px-5 mb-3">
        <div
          onClick={() => setOpenChat(false)}
          className="p-2 rounded-full bg-red-500 text-white cursor-pointer"
        >
          <IoClose />
        </div>
        <h1 className="font-semibold text-2xl">Chat</h1>
        <div className=" rounded-full text-red-500 text-2xl font-bold cursor-pointer">
          <GiHamburgerMenu />
        </div>
      </div>

      <div className="bg-slate-200 rounded-t-2xl p-5 flex flex-col justify-between h-[385px]">
      {/* Chat Area */}
      <div className="flex-1 h-full overflow-auto mb-2 space-y-4">
        {/* Chatbot Message (Left-aligned) */}
        <div className="flex items-start">
          <div className="w-10 h-10 bg-white rounded-full p-1 flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src="https://img.icons8.com/?size=100&id=Xkr03BWm9C1n&format=png&color=FA5252"
              alt="Chatbot Avatar"
            />
          </div>
          <p className="bg-gray-100 p-2 px-4 rounded-2xl ml-2 text-gray-800 max-w-[70%]">
            Hello! How can I assist you today?
          </p>
        </div>

        {/* User Message (Right-aligned) */}
        <div className="flex items-start justify-end">
          <p className="bg-red-500 text-white p-2 px-4 rounded-2xl mr-2 max-w-[70%]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, sequi.
          </p>
          <div className="w-10 h-10 bg-white rounded-full p-1 flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src="https://img.icons8.com/?size=100&id=84020&format=png&color=000000"
              alt="User Avatar"
            />
          </div>
        </div>
      </div>

      {/* Input Field with Send Button */}
      <div className="relative">
        <input
          type="text"
          className="py-3 pl-5 pr-12 bg-white w-full rounded-full outline-none border border-gray-300 focus:border-red-500"
          placeholder="Type a message..."
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 010-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
    </div>
  );
};

export default ChatBot;
