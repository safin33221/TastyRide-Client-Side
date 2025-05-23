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
import { useTranslation } from "react-i18next";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// const foods = [
//   {
//     foodName: "Margherita Pizza",
//     foodImg:
//       "https://secretrecipebd.com/wp-content/uploads/2021/07/vegatable_pizza.jpg",
//     price: 12.99,
//     review: 4.7,
//     category: "Dinner",
//   },
//   {
//     foodName: "Cheeseburger",
//     foodImg:
//       "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg",
//     price: 9.49,
//     review: 4.5,
//     category: "Lunch",
//   },
//   {
//     foodName: "Sushi Platter",
//     foodImg:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTarw3kiN1sD9Zl9D-1yCEcgZaHjf-D4AbGVw&s",
//     price: 18.99,
//     review: 4.8,
//     category: "Dinner",
//   },
//   {
//     foodName: "Pasta Carbonara",
//     foodImg: "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
//     price: 14.25,
//     review: 4.6,
//     category: "Breakfast",
//   },
//   {
//     foodName: "Grilled Salmon",
//     foodImg: "https://www.allrecipes.com/thmb/CfocX_0yH5_hFxtbFkzoWXrlycs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-12720-grilled-salmon-i-VAT-4x3-888cac0fb8a34f6fbde7bf836850cd1c.jpg",
//     price: 20.99,
//     review: 4.9,
//     category: "Dinner",
//   },
//   {
//     foodName: "Chicken Biryani",
//     foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP8l2kuZDANQExDsYteLg0NEUEjLkjudABRg&s",
//     price: 11.99,
//     review: 4.7,
//     category: "Lunch",
//   },
//   {
//     foodName: "Tacos al Pastor",
//     foodImg: "https://www.seriouseats.com/thmb/4kbwN13BlZnZ3EywrtG2AzCKuYs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210712-tacos-al-pastor-melissa-hom-seriouseats-37-f72cdd02c9574bceb1eef1c8a23b76ed.jpg",
//     price: 8.99,
//     review: 4.4,
//     category: "Dinner",
//   },
//   {
//     foodName: "Chocolate Lava Cake",
//     foodImg: "https://www.foodandwine.com/thmb/XdFd-DvTtouryLCjeCqwhfmmK-A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/molten-chocolate-cake-FT-RECIPE0220-0a33d7d0ab0c45588f7bfe742d33a9bc.jpg",
//     price: 6.99,
//     review: 4.8,
//     category: "Breakfast",
//   },
//   {
//     foodName: "Caesar Salad",
//     foodImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq_QHLySdpuhk3weCNYHxYp6tc2naOquvCQQ&s",
//     price: 7.49,
//     review: 4.3,
//     category: "Dinner",
//   },
//   {
//     foodName: "Mango Smoothie",
//     foodImg: "https://www.cubesnjuliennes.com/wp-content/uploads/2021/04/Mango-Smoothie-Recipe.jpg",
//     price: 5.99,
//     review: 4.6,
//     category: "Lunch",
//   },
// ];

// addedBy: "resturant1@gmail.com";
// availability: true;
// category: "Beverages";
// description: "good ";
// dislikes: [];
// foodName: "Naga Burger";
// image: "https://i.ibb.co.com/DDDwqJyN/1.png";
// ingredients: ["burger"];
// likes: [];
// price: 350;
// tags: (3)[("Vegan", "Spicy", "Gluten-Free")];
// __v: 0;
// _id: "67ddbeed43287605cfdb6919";

const CategoryFoods = () => {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [category, setCategory] = useState("All");
  const { t } = useTranslation();

  const axiosPublic = useAxiosPublic();
  const { data: foods, isPending } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/foods`);
      return res.data.data;
    },
  });

  const filteredFoods = foods?.filter((prev) => prev.category === category);
  return (
    <div className="px-3 md:px-0">
      <SectionTitle
        title={t("sectionTitle.title2")}
        desc={t("sectionTitle.desc2")}
      />
      <div className="flex flex-col md:flex-row justify-between items-center m-5 xl:m-0">
        <div className="space-x-2">
          <button
            onClick={() => setCategory("All")}
            className={`py-2 px-3 md:px-5 md:py-3 ${
              category === "All" ? "bg-red-700" : "bg-yellow-500"
            } font-semibold text-white uppercase cursor-pointer select-none text-sm md:text-lg`}
          >
            {t("categoryFood.btn1")}
          </button>
          <button
            onClick={() => setCategory("Breakfast")}
            className={`py-2 px-3 md:px-5 md:py-3 ${
              category === "Breakfast" ? "bg-red-700" : "bg-yellow-500"
            } font-semibold text-white uppercase cursor-pointer select-none text-sm md:text-lg`}
          >
            {t("categoryFood.btn2")}
          </button>
          <button
            onClick={() => setCategory("Lunch")}
            className={`py-2 px-3 md:px-5 md:py-3 ${
              category === "Lunch" ? "bg-red-700" : "bg-yellow-500"
            } font-semibold text-white uppercase cursor-pointer select-none text-sm md:text-lg`}
          >
            {t("categoryFood.btn3")}
          </button>
          <button
            onClick={() => setCategory("Dinner")}
            className={`py-2 px-3 md:px-5 md:py-3 ${
              category === "Dinner" ? "bg-red-700" : "bg-yellow-500"
            } font-semibold text-white uppercase cursor-pointer select-none text-sm md:text-lg`}
          >
            {t("categoryFood.btn4")}
          </button>
        </div>
        <div className="space-x-2 flex text-white font-semibold text-xl md:text-2xl mt-4 md:mt-0">
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
          ? foods?.map((food, index) => (
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
