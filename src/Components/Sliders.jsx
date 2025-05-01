import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import PrimaryButton from '../Shared/PrimaryButton';
import { Link } from 'react-router';

const Sliders = () => {
  const axiosPublic = useAxiosPublic();
  const { data: sliders = [] } = useQuery({
    queryKey: ['slider'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/ad');
      return res.data.data;
    },
  });
  console.log(sliders);
  // filter by accepted banner ad
  const acceptedAds = sliders.filter(prev => prev.status === 'accepted');
  // console.log(acceptedAds)

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
        style={{ zIndex: '0' }}
      >
        {acceptedAds.map((slider, index) => (
          <SwiperSlide key={index}>
            <div
              style={{ backgroundImage: `url(${slider.image})` }}
              className="w-full h-full relative bg-cover bg-center flex justify-center items-center"
            >
              <div className="bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-10 flex items-center justify-center w-[500px] flex-col gap-3">
                <h1 className="text-white text-3xl font-semibold text-center">
                  {slider.title}
                </h1>
                <p className="text-gray-400 text-center font-semibold  mx-auto">
                  {slider.description}
                </p>
                <Link
                  to={`restaurantProfile/${slider.addedBy}`}
                  className="inline-flex"
                >
                  <PrimaryButton text={'Order Now'} />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Sliders;
