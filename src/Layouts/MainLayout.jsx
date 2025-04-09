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
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if the user is already subscribed
    const checkSubscription = async () => {
      try {
        const response = await axiosPublic.get('/api/check-subscription');
        setIsSubscribed(response.data.isSubscribed);
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    checkSubscription();

    if (!isSubscribed){
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000); // Show modal after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
    
  }, []);

  const handleOnClose = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <nav>
        <Headroom>
          <Navbar />
        </Headroom>
      </nav>
      <main className=" min-h-[calc(100vh-65px)] mx-auto">
        <Outlet />
        {/* newletter modal */}
        {
          showModal && <NewLetterModal onClose={handleOnClose} />
        }
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
