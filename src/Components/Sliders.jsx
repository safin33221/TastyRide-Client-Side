import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';

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
        className="w-full md:h-[500px] h-[400px]"
        style={{ zIndex: "0" }}
      >
        {sliders.map((slider, index) => (
          <SwiperSlide key={index}>
            <img
              src={slider.image}
              alt={`Food ${index + 1}`}
              className="w-full h-full bg-cover -z-10"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Sliders;
