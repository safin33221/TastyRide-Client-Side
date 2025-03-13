import React, { useRef } from "react";
import SectionTitle from "../../Shared/SectionTitle";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import FoodCard from "../../Shared/FoodCard";


const foods = [
    {
      foodName: "Margherita Pizza",
      foodImg: "https://secretrecipebd.com/wp-content/uploads/2021/07/vegatable_pizza.jpg",
      price: 12.99,
      review: 4.7,
    },
    {
      foodName: "Cheeseburger",
      foodImg: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg",
      price: 9.49,
      review: 4.5,
    },
    {
      foodName: "Sushi Platter",
      foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTarw3kiN1sD9Zl9D-1yCEcgZaHjf-D4AbGVw&s",
      price: 18.99,
      review: 4.8,
    },
    {
      foodName: "Pasta Carbonara",
      foodImg: "https://i.ibb.co/tJvv79J/pasta-carbonara.jpg",
      price: 14.25,
      review: 4.6,
    },
    {
      foodName: "Grilled Salmon",
      foodImg: "https://i.ibb.co/r5Whbfm/grilled-salmon.jpg",
      price: 20.99,
      review: 4.9,
    },
    {
      foodName: "Chicken Biryani",
      foodImg: "https://i.ibb.co/Lp9X6FN/chicken-biryani.jpg",
      price: 11.99,
      review: 4.7,
    },
    {
      foodName: "Tacos al Pastor",
      foodImg: "https://i.ibb.co/6Y5JRGc/tacos.jpg",
      price: 8.99,
      review: 4.4,
    },
    {
      foodName: "Chocolate Lava Cake",
      foodImg: "https://i.ibb.co/m5Qyqtf/chocolate-lava-cake.jpg",
      price: 6.99,
      review: 4.8,
    },
    {
      foodName: "Caesar Salad",
      foodImg: "https://i.ibb.co/xfrPKXT/caesar-salad.jpg",
      price: 7.49,
      review: 4.3,
    },
    {
      foodName: "Mango Smoothie",
      foodImg: "https://i.ibb.co/3mgXmfq/mango-smoothie.jpg",
      price: 5.99,
      review: 4.6,
    },
  ];


const CategoryFoods = () => {
    const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  return (
    <div>
      <SectionTitle
        title={"Our Products"}
        desc={"We have a lot of international cuisine"}
      />
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button className="py-3 px-5 bg-red-700 font-semibold text-white uppercase">
            Breakfast
          </button>
          <button className="py-3 px-5 bg-yellow-500 font-semibold text-white uppercase">
            Lunch
          </button>
          <button className="py-3 px-5 bg-yellow-500 font-semibold text-white uppercase">
            Dinner
          </button>
        </div>
        <div className="space-x-2 flex text-white font-semibold text-2xl">
          <div ref={prevButtonRef} className="p-3 bg-red-700 cursor-pointer select-none">
            <IoIosArrowBack />
          </div>
          <div ref={nextButtonRef} className="p-3 bg-red-700 cursor-pointer select-none">
            <IoIosArrowForward />
          </div>
        </div>
      </div>

      <Swiper
        style={{ zIndex: "0" }}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        // loop={true}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevButtonRef.current;
          swiper.params.navigation.nextEl = nextButtonRef.current;
        }}
        // pagination={{ clickable: true }}
        breakpoints={{
          // Adjust the number of cards based on viewport width
          375: { slidesPerView: 1, spaceBetween: 10 }, // Small screens (phones)
          424: { slidesPerView: 1, spaceBetween: 10 }, // Small screens (phones)
          768: { slidesPerView: 2, spaceBetween: 15 }, // Medium screens (tablets in portrait mode)
          1024: { slidesPerView: 3, spaceBetween: 20 }, // Large screens (tablets in landscape mode)
          1280: { slidesPerView: 4, spaceBetween: 20 }, // Extra large screens (desktops)
        }}
        onInit={(swiper) => {
          swiper.update(); // Ensure swiper updates on initialization
        }}
      >
        {foods.map((food, index) => (
            <SwiperSlide key={index}>
                <FoodCard food={food}/>
            </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
};

export default CategoryFoods;
