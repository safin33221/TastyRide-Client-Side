import { Link, Outlet } from "react-router";
import Navbar from "../Shared/Navbar";
import Headroom from "react-headroom";
import Footer from "../Shared/Footer";
import { MdMessage } from "react-icons/md";
import { useEffect, useState } from "react";
import ChatBot from "../Components/ChatBot";
import NewLetterModal from "../Components/NewLetterModal/NewLetterModal";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const MainLayout = () => {
  const axiosPublic = useAxiosPublic();
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
      {/* <div>
        {openChat ? (
          <ChatBot setOpenChat={setOpenChat}/>
        ) : (
          <div onClick={() => setOpenChat(true)} className="z-[9999999] fixed bottom-0 right-0 bg-red-500 py-3 px-4 rounded-full flex gap-2 items-center text-white m-5 active:scale-95 cursor-pointer select-none">
            <MdMessage className="text-4xl"/>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default MainLayout;
