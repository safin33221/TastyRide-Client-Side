import { Link, Outlet } from "react-router";
import Navbar from "../Shared/Navbar";
import Headroom from "react-headroom";
import Footer from "../Shared/Footer";
import { MdMessage } from "react-icons/md";
import { useState } from "react";
import ChatBot from "../Components/ChatBot";

const MainLayout = () => {
  const [openChat, setOpenChat] = useState(false);
  let str = "Okay, I've reviewed the website content for TastyRide. Here's a summary of what I see:\n\n**Overall Impression:**\n\n*   TastyRide appears to be a platform for ordering international cuisine. The site highlights a variety of different food options and"

let formattedStr = str.replace(/\*\*(.*?)\*\*/g, "<h1 className='font-bold'>$1</h1>");

console.log(formattedStr)
  return (
    <div className="relative">
      <nav>
        <Headroom>
          <Navbar />
        </Headroom>
      </nav>
      <main className=" min-h-[calc(100vh-65px)] mx-auto">
        <p dangerouslySetInnerHTML={{__html:formattedStr}}/>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>

      {/* chatbot */}
      <div>
        {openChat ? (
          <ChatBot setOpenChat={setOpenChat}/>
        ) : (
          <div onClick={() => setOpenChat(true)} className="z-[9999999] fixed bottom-0 right-0 bg-red-500 py-3 px-4 rounded-full flex gap-2 items-center text-white m-5 active:scale-95 cursor-pointer select-none">
            <MdMessage className="text-4xl"/>
            {/* Chat */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
