import { Link, Outlet } from "react-router";
import Navbar from "../Shared/Navbar";
import Headroom from "react-headroom";
import Footer from "../Shared/Footer";
import { MdMessage } from "react-icons/md";
import { useState } from "react";
import ChatBot from "../Components/ChatBot";

const MainLayout = () => {
  const [openChat, setOpenChat] = useState(false);
  return (
    <div className="relative">
      <nav>
        <Headroom>
          <Navbar />
        </Headroom>
      </nav>
      <main className=" min-h-[calc(100vh-65px)] mx-auto">
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
          <div onClick={() => setOpenChat(true)} className="z-[9999999] fixed bottom-0 right-0 bg-red-500 p-3 rounded-xl flex gap-2 items-center text-white m-5 active:scale-95 cursor-pointer select-none">
            <MdMessage />
            Chat
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
