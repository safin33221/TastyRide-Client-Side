import { useEffect, useState } from 'react';
import CategoryFoods from '../../Components/CategoryFoods/CategoryFoods';
import EasyOrder from '../../Components/EasyOrder/EasyOrder';
import ExploreRestaurant from '../../Components/ExploreRestaurant/ExploreRestaurant';
import InterNationalFood from '../../Components/internatinalFood/InterNationalFood';
import LocationModal from '../../Components/Location/LocationModal';
import OurClient from '../../Components/OurClient/OurClient';
import PopularCollection from '../../Components/PopularCollection/PopularCollection';
import Sliders from '../../Components/Sliders';
import CountDown from '../../EidFeatures/CountDown';
import DiscountsProduct from '../../EidFeatures/DiscountProducts/DiscountsProduct';
import SectionDivider from '../../Shared/SectionDivider';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Reviews from '../../Components/Reviews/Reviews';
import NewsLetterModal from '../../Components/NewsLetterModal/NewsLetterModal';
import DeliveryCities from '../../Components/DeliveryCities/DeliveryCities';
import BecomePartner from '../../Components/LandingPage/BecomePartner';

const Home = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isShowModal = localStorage.getItem('isShowModal');
  useEffect(() => {
    const checkSubscription = async () => {
      setIsLoading(true);
      try {
        if (user?.email) {
          const res = await axiosPublic.get(`/api/subscribe/${user?.email}`);
          setIsSubscribed(res?.data?.isSubscribed);
        } else {
          setIsSubscribed(false); //user is not logged in
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSubscription();
  }, [user?.email]);

  useEffect(() => {
    if (!isLoading) {
      if (!isSubscribed && !isShowModal) {
        const timer = setTimeout(() => {
          setShowModal(true);
          localStorage.setItem('isShowModal', true);

          const resetTimer = setTimeout(() => {
            localStorage.removeItem('isShowModal');
          }, 10800000); // 3 hours in milliseconds

          return () => clearTimeout(resetTimer); // Cleanup the timer on unmount
        }, 10000); // Show modal after 5 seconds
        return () => clearTimeout(timer); // Cleanup the timer on unmount
      } else {
        setShowModal(false);
      }
    }
  }, [isSubscribed, isLoading]);

  const handleOnClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      <Sliders></Sliders>
      {/* {showModal && <LocationModal onClose={() => setShowModal(false)} />} */}
      <div className="container mx-auto">
        <SectionDivider></SectionDivider>
        {/* <DiscountsProduct /> */}
        <ExploreRestaurant />
        <SectionDivider></SectionDivider>
        <BecomePartner></BecomePartner>
        <SectionDivider></SectionDivider>

        <section>
          {/* <CategoryFoods /> */}
          {/* <RandomFood/> */}
        </section>
        {/* <SectionDivider></SectionDivider>
        <PopularCollection></PopularCollection>
        <SectionDivider></SectionDivider> */}
        <DeliveryCities></DeliveryCities>
        <SectionDivider></SectionDivider>
        <InterNationalFood></InterNationalFood>
        <SectionDivider></SectionDivider>
        <OurClient></OurClient>
        <SectionDivider></SectionDivider>
        <EasyOrder />
        <Reviews></Reviews>
        <SectionDivider></SectionDivider>
        {/* newletter modal */}
        {showModal && <NewsLetterModal onClose={handleOnClose} />}
      </div>
    </div>
  );
};

export default Home;
