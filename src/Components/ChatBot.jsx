import React, { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const customQs = [
  "What is TastyRide?",
  "How can I track my order?",
  "Is there any veggie food available?",
  "Is there any veggie food available?",
]

const ChatBot = ({ setOpenChat }) => {
  const axiosPublic = useAxiosPublic();
  const [chats, setChats] = useState([
    { sender: "bot", message: "Hello! How can I assist you today?" },
  ]); // Default bot message
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chats]);

  const handleSendChat = async (e) => {
    e.preventDefault();
    const chat = e.target.chat.value.trim();
    if (!chat) return;

    setChats((prev) => [...prev, { sender: "user", message: chat }]);
    e.target.reset();
    setLoading(true);

    try {
      const res = await axiosPublic.post("/api/chat", { message: chat });
      console.log(res.data)
      setChats((prev) => [...prev, { sender: "bot", message: res.data.reply }]);
    } catch (error) {
      setChats((prev) => [...prev, { sender: "bot", message: "Error fetching response!" }]);
    } finally {
      setLoading(false);
    }
  };

  // handle custom qs to
  const handleCustomQs = async(qs) => {
    setChats((prev) => [...prev, {sender: "user", message: qs}])
    setLoading(true);

    try {
      const res = await axiosPublic.post("/api/chat", { message: qs });
      console.log(res.data)
      setChats((prev) => [...prev, { sender: "bot", message: res.data.reply }]);
    } catch (error) {
      setChats((prev) => [...prev, { sender: "bot", message: "Error fetching response!" }]);
    } finally {
      setLoading(false);
    }
  }

  const formatText = (str) => {
    // Convert **text** to <h1 className="text-2xl font-bold">
    str = str.replace(/\*\*(.*?)\*\*/g, '<h1 class="text-xl font-semibold">$1</h1>');
    
    // Convert *text* to <em> (Italic text)
    str = str.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
    // Convert new lines into <br /> for better formatting
    str = str.replace(/\n/g, "<br />");
  
    return str;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-red-500 fixed bottom-0 right-0 py-5 m-5 w-[450px] h-[550px] overflow-hidden z-[500]">
      {/* Chat Header */}
      <div className="flex justify-between items-center px-5 mb-3">
        <div
          onClick={() => setOpenChat(false)}
          className="p-2 rounded-full bg-red-500 text-white cursor-pointer"
        >
          <IoClose />
        </div>
        <h1 className="font-semibold text-2xl">Chat</h1>
        <div className="rounded-full text-red-500 text-2xl font-bold cursor-pointer">
          <GiHamburgerMenu />
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-slate-200 rounded-t-2xl p-5 flex flex-col justify-between h-[485px]">
        <div className="flex-1 h-full overflow-auto mb-2 space-y-4" ref={chatRef}>
          {chats.map((chat, i) => (
            <div key={i} className={`flex ${chat.sender === "user" ? "justify-end" : "items-start"}`}>
              {chat.sender === "bot" && (
                <div className="w-10 h-10 bg-white rounded-full p-1 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://img.icons8.com/?size=100&id=Xkr03BWm9C1n&format=png&color=FA5252"
                    alt="Chatbot Avatar"
                  />
                </div>
              )}
              <p
                className={`p-2 px-4 rounded-2xl max-w-[70%] ${
                  chat.sender === "user"
                    ? "bg-red-500 text-white mr-2"
                    : "bg-gray-100 text-gray-800 ml-2"
                }`}
                dangerouslySetInnerHTML={{__html:formatText(chat.message)}}
              >
                {/* {chat.message} */}
              </p>
              {chat.sender === "user" && (
                <div className="w-10 h-10 bg-white rounded-full p-1 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://img.icons8.com/?size=100&id=84020&format=png&color=000000"
                    alt="User Avatar"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-start">
              <div className="w-10 h-10 bg-white rounded-full p-1 flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src="https://img.icons8.com/?size=100&id=Xkr03BWm9C1n&format=png&color=FA5252"
                  alt="Chatbot Avatar"
                />
              </div>
              <p className="bg-gray-100 p-2 px-4 rounded-2xl ml-2 text-gray-800 max-w-[70%]">
                Typing...
              </p>
            </div>
          )}
        </div>

        {/* Input Field */}
        <form onSubmit={handleSendChat} >
          <div className=" flex gap-1 text-xs overflow-x-scroll scroll-smooth mb-1">
          {customQs?.map((qs, i) => (
            <p onClick={() => handleCustomQs(qs)} className="bg-white rounded-3xl py-1 px-2 font-semibold text-gray-400 cursor-pointer text-nowrap">{qs}</p>
          ))}
          </div>
          <div className="relative">
          <input
            type="text"
            className="py-3 pl-5 pr-12 bg-white w-full rounded-full outline-none border border-gray-300 focus:border-red-500"
            name="chat"
            placeholder="Type a message..."
          />
          <button
            className="absolute right-2 top-[14%]  bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none cursor-pointer"
          >
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
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
