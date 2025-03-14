import React, { useRef, useState } from "react";
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
    foodImg:
      "https://secretrecipebd.com/wp-content/uploads/2021/07/vegatable_pizza.jpg",
    price: 12.99,
    review: 4.7,
    category: "Dinner",
  },
  {
    foodName: "Cheeseburger",
    foodImg:
      "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg",
    price: 9.49,
    review: 4.5,
    category: "Lunch",
  },
  {
    foodName: "Sushi Platter",
    foodImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTarw3kiN1sD9Zl9D-1yCEcgZaHjf-D4AbGVw&s",
    price: 18.99,
    review: 4.8,
    category: "Dinner",
  },
  {
    foodName: "Pasta Carbonara",
    foodImg: "https://i.ibb.co/tJvv79J/pasta-carbonara.jpg",
    price: 14.25,
    review: 4.6,
    category: "Breakfast",
  },
  {
    foodName: "Grilled Salmon",
    foodImg: "https://i.ibb.co/r5Whbfm/grilled-salmon.jpg",
    price: 20.99,
    review: 4.9,
    category: "Dinner",
  },
  {
    foodName: "Chicken Biryani",
    foodImg: "https://i.ibb.co/Lp9X6FN/chicken-biryani.jpg",
    price: 11.99,
    review: 4.7,
    category: "Lunch",
  },
  {
    foodName: "Tacos al Pastor",
    foodImg: "https://i.ibb.co/6Y5JRGc/tacos.jpg",
    price: 8.99,
    review: 4.4,
    category: "Dinner",
  },
  {
    foodName: "Chocolate Lava Cake",
    foodImg: "https://i.ibb.co/m5Qyqtf/chocolate-lava-cake.jpg",
    price: 6.99,
    review: 4.8,
    category: "Breakfast",
  },
  {
    foodName: "Caesar Salad",
    foodImg: "https://i.ibb.co/xfrPKXT/caesar-salad.jpg",
    price: 7.49,
    review: 4.3,
    category: "Dinner",
  },
  {
    foodName: "Mango Smoothie",
    foodImg: "https://i.ibb.co/3mgXmfq/mango-smoothie.jpg",
    price: 5.99,
    review: 4.6,
    category: "Lunch",
  },
];

const CategoryFoods = () => {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [category, setCategory] = useState("Breakfast");

  const filteredFoods = foods.filter((prev) => prev.category === category);
  return (
    <div>
      <SectionTitle
        title={"Our Products"}
        desc={"We have a lot of international cuisine"}
      />
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => setCategory("All")}
            className={`py-3 px-5 ${
              category === "All" ? "bg-red-700" : "bg-yellow-500"
            } font-semibold text-white uppercase cursor-pointer select-none`}
          >
            All
          </button>
          <button
            onClick={() => setCategory("Breakfast")}
            className={`py-3 px-5 ${
              category === "Breakfast" ? "bg-red-700" : "bg-yellow-500"
            } font-semibold text-white uppercase cursor-pointer select-none`}
          >
            Breakfast
          </button>
          <button
            onClick={() => setCategory("Lunch")}
            className={`py-3 px-5 ${
              category === "Lunch" ? "bg-red-700" : "bg-yellow-500"
            } font-semibold text-white uppercase cursor-pointer select-none`}
          >
            Lunch
          </button>
          <button
            onClick={() => setCategory("Dinner")}
            className={`py-3 px-5 ${
              category === "Dinner" ? "bg-red-700" : "bg-yellow-500"
            } font-semibold text-white uppercase cursor-pointer select-none`}
          >
            Dinner
          </button>
        </div>
        <div className="space-x-2 flex text-white font-semibold text-2xl">
          <div
            ref={prevButtonRef}
            className="p-3 bg-red-700 cursor-pointer select-none"
          >
            <IoIosArrowBack />
          </div>
          <div
            ref={nextButtonRef}
            className="p-3 bg-red-700 cursor-pointer select-none"
          >
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
        {category === "All"
          ? foods.map((food, index) => (
              <SwiperSlide key={index}>
                <FoodCard food={food} />
              </SwiperSlide>
            ))
          : filteredFoods.map((food, index) => (
              <SwiperSlide key={index}>
                <FoodCard food={food} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default CategoryFoods;
