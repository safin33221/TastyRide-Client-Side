import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';




import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';


import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import SectionTitle from '../../Shared/SectionTitle';
import Loading from '../../Pages/Loader/Loading';

const ExploreRestaurant = () => {
  const axiosPublic = useAxiosPublic();

  const { data: restaurantData = [], isPending, error } = useQuery({
    queryKey: ['restaurantData'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/approvedRestaurants'); // Add /api prefix
      return res.data.data;
    },
  });

  if (isPending) return null

  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="px-4 md:px-6  lg:px-2  ">
      <SectionTitle
        title="Explore Top Restaurants"
        desc="Where Every Bite Tells a Story – Explore Hidden Gems, Local Flavors & Global Delights"
      />

      <div className=" h-full">
        <Swiper
          navigation={true}
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={10}



          // autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-full "
          style={{ zIndex: "0" }}

          breakpoints={{
            340: {
              slidesPerView: 1.1, // 1 slide on mobile screens
            },
            768: {
              slidesPerView: 2, // 2 slides on tablets
            },
            1024: {
              slidesPerView: 5, // 3 slides on larger screens
            },
          }}
        >
          {
            restaurantData.map((restaurant, index) => (
              <SwiperSlide key={index}>
                <Link  key={restaurant._id} to={`/restaurantProfile/${restaurant.email}`}>
                  <div className="bg-gray-100  hover:shadow-2xl my-5 h-full hover:cursor-pointer shadow-md overflow-auto border border-gray-200 mx-2 md:mx-0 transition-all duration-300 ease-in-out">
                    <img
                      className="w-full h-48 object-cover"
                      src={restaurant?.coverPhoto || 'https://i.ibb.co.com/default-placeholder.jpg'}
                      alt={restaurant.businessName}
                      loading="lazy"
                    />
                    <div className="p-4 space-y-2 h-full">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-8 rounded-full"
                          src={restaurant.logo || 'https://i.ibb.co.com/default-placeholder.jpg'}
                          alt={`${restaurant.businessName} Logo`}
                        />
                        <h3 className="text-lg font-semibold text-gray-800">
                          {restaurant.businessName}
                        </h3>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 gap-2">
                        <span>৳৳</span>
                        <span>•</span>
                        <span>{restaurant.type}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-base">★</span>
                          <span>4.5</span>
                          <span className="text-gray-400">(200+)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>⏱️ 30–45 min</span>
                          <span className="text-pink-500 font-medium">• Free</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
        <button className="custom-prev absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
          &#8592; {/* Left arrow */}
        </button>
        <button className="custom-next absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          &#8594; {/* Right arrow */}
        </button>
        {/* {restaurantData.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No restaurants available at the moment.
          </p>
        ) : (
          restaurantData.map((restaurant) => (
            <Link key={restaurant._id} to={`/restaurantProfile/${restaurant.email}`}>
              <div className="bg-gray-100 hover:shadow-xl h-full hover:cursor-pointer shadow-md overflow-hidden border border-gray-200 mx-2 md:mx-0 transition-all duration-300 ease-in-out">
                <img
                  className="w-full h-48 object-cover"
                  src={restaurant?.coverPhoto || 'https://i.ibb.co.com/default-placeholder.jpg'}
                  alt={restaurant.businessName}
                  loading="lazy"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 rounded-full"
                      src={restaurant.logo || 'https://i.ibb.co.com/default-placeholder.jpg'}
                      alt={`${restaurant.businessName} Logo`}
                    />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {restaurant.businessName}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <span>৳৳</span>
                    <span>•</span>
                    <span>{restaurant.type}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-base">★</span>
                      <span>4.5</span>
                      <span className="text-gray-400">(200+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱️ 30–45 min</span>
                      <span className="text-pink-500 font-medium">• Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )} */}
      </div>
    </div>
  );
};

export default ExploreRestaurant;