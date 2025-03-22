import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import PrimaryButton from '../Shared/PrimaryButton';

const Sliders = () => {
  const axiosPublic = useAxiosPublic()
  const images = [
    'https://i.ibb.co.com/qhLq8rg/slide1-1.png',
    'https://i.ibb.co.com/XZVg57d1/slide2.png',
    'https://i.ibb.co.com/Qv6HNSB3/slider3-1.png',
    'https://i.ibb.co.com/bjf6n01j/slider3-2.png',
    'https://i.ibb.co.com/Kt0LydF/slider3-3.png',
  ];

  const {data: sliders=[]} = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/ad")
      return res.data.data
    }
  })

  return (
    <div className="w-full z-0">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full md:h-[600px] h-[400px]"
        style={{ zIndex: "0" }}
      >
        {sliders.map((slider, index) => (
          <SwiperSlide key={index}>
            <div style={{backgroundImage: `url(${slider.image})`}} className='w-full h-full relative bg-cover bg-center flex justify-center items-center'>
            {/* <img
              src={slider.image}
              alt={`Food ${index + 1}`}
              className="w-full h-full object-cover"
            /> */}

            <div className='bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-10 flex items-center justify-center flex-col gap-3'>
              <h1 className='text-white text-3xl font-semibold text-center'>{slider.title}gg</h1>
              <p className='text-gray-400 text-center font-semibold'>{slider.description}</p>
              <div className='inline-flex'><PrimaryButton text={"Order Now"}/></div>
            </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Sliders;
