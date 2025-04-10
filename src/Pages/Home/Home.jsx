import { useEffect, useState } from "react";
import CategoryFoods from "../../Components/CategoryFoods/CategoryFoods";
import EasyOrder from "../../Components/EasyOrder/EasyOrder";
import ExploreRestaurant from "../../Components/ExploreRestaurant/ExploreRestaurant";
import InterNationalFood from "../../Components/internatinalFood/InterNationalFood";
import OurClient from "../../Components/OurClient/OurClient";
import PopularCollection from "../../Components/PopularCollection/PopularCollection";
import Sliders from "../../Components/Sliders";
import CountDown from "../../EidFeatures/CountDown";
import DiscountsProduct from "../../EidFeatures/DiscountProducts/DiscountsProduct";
import SectionDivider from "../../Shared/SectionDivider";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import NewLetterModal from "../../Components/NewLetterModal/NewLetterModal";


const Home = () => {
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect( () =>{
    const checkSubscription = async () => {
      setIsLoading(true);
      try {
       if(user?.email) { 
         const res = await axiosPublic.get(`/api/subscribe/${user?.email}`);
         setIsSubscribed(res?.data?.isSubscribed);
       }else{
        setIsSubscribed(false); //user is not logged in
       }
      } catch (error) {
        console.error("Error checking subscription:", error);
      }finally{
        setIsLoading(false);
      }
    }
    checkSubscription();
  }, [user?.email]);

  useEffect(() => {
        if(!isLoading){
          if (!isSubscribed){
            const timer = setTimeout(() => {
              setShowModal(true);
            }, 5000); // Show modal after 5 seconds
            return () => clearTimeout(timer); // Cleanup the timer on unmount
          }else{
            setShowModal(false);
          }
        }
    
  }, [ isSubscribed, isLoading ]);
  


  const handleOnClose = () => {
    setShowModal(false);
  };
  return (
    <div>

      <Sliders></Sliders>
      <div className="container mx-auto">
        <SectionDivider></SectionDivider>
        {/* <DiscountsProduct /> */}
        <ExploreRestaurant />
        <InterNationalFood></InterNationalFood>
        <SectionDivider></SectionDivider>
        <section>
          <CategoryFoods />
        </section>
        <SectionDivider></SectionDivider>
        <PopularCollection></PopularCollection>
        <SectionDivider></SectionDivider>
        <EasyOrder />
        <SectionDivider></SectionDivider>
        <OurClient></OurClient>
        <SectionDivider></SectionDivider>
        {/* newletter modal */}
        {
          showModal && <NewLetterModal onClose={handleOnClose} />
        }
      </div>
    </div>
  );
};

export default Home;
