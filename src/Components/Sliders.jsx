import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const Sliders = () => {
  const images = [
    'https://i.ibb.co.com/qhLq8rg/slide1-1.png',
    'https://i.ibb.co.com/XZVg57d1/slide2.png',
    'https://i.ibb.co.com/Qv6HNSB3/slider3-1.png',
    'https://i.ibb.co.com/bjf6n01j/slider3-2.png',
    'https://i.ibb.co.com/Kt0LydF/slider3-3.png',
  ];

  return (
    <div className="w-full h-[700px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Food ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Sliders;
