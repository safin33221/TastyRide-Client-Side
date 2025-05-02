import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import PrimaryButton from '../Shared/PrimaryButton';
import { Link } from 'react-router';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import SectionTitle from '../Shared/SectionTitle';

const Sliders = () => {
  const axiosPublic = useAxiosPublic()
  // const images = [
  //   'https://i.ibb.co.com/qhLq8rg/slide1-1.png',
  //   'https://i.ibb.co.com/XZVg57d1/slide2.png',
  //   'https://i.ibb.co.com/Qv6HNSB3/slider3-1.png',
  //   'https://i.ibb.co.com/bjf6n01j/slider3-2.png',
  //   'https://i.ibb.co.com/Kt0LydF/slider3-3.png',
  // ];

  const { data: sliders = [] } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/ad")
      return res.data.data
    }
  })
  console.log(sliders);
  // filter by accepted banner ad 
  const acceptedAds = sliders.filter(prev => prev.status === "accepted")
  // console.log(acceptedAds)

  return (
    <div className="w-full z-0 container mx-auto">
      <SectionTitle title={`Best Deals of the Week`} desc={`Curated discounts to help you save more every day`} />
      <Swiper
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={20}
        
        loop={true}
        
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full md:h-[200px] h-[200px]"
        style={{ zIndex: "0" }}

        breakpoints={{
          640: {
            slidesPerView: 1, // 1 slide on mobile screens
          },
          768: {
            slidesPerView: 2, // 2 slides on tablets
          },
          1024: {
            slidesPerView: 3, // 3 slides on larger screens
          },
        }}
      >
        {acceptedAds.map((slider, index) => (
          <SwiperSlide key={index}>
            <div style={{ backgroundImage: `url(${slider.image})` }} className='w-full h-full relative bg-cover bg-center flex justify-center items-center'>
              <div className='bg-[rgba(0,0,0,0.5)] backdrop-blur-xs p-10 flex items-center justify-center  flex-col gap-3 w-full h-full'>
                <h1 className='text-white text-xl md:text-3xl font-semibold text-center'>{slider.title}</h1>
                <p className='text-gray-400 text-center text-sm md:text-xl font-semibold  mx-auto'>{slider.description.slice(0, 100)}</p>
                <Link to={`restaurantProfile/${slider.addedBy}`} className='inline-flex'><PrimaryButton text={"Order Now"} /></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="custom-prev  absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
          &#8592; {/* Left arrow */}
        </button>
        <button className="custom-next absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          &#8594; {/* Right arrow */}
        </button>
    </div>
  );
};

export default Sliders;
