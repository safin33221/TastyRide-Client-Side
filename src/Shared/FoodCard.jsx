import React from "react";
import { useTranslation } from "react-i18next";


const FoodCard = ({ food }) => {
  const { t } = useTranslation();
  return (
    <div className="shadow-lg mt-10">
      <div className="bg-white w-full h-[380px]">
      <img className="w-full h-full object-cover" src={food.image} alt="" />
      </div>
      <div className="flex items-center justify-center gap-2 flex-col p-3 bg-gray-100">
        <p className="font-semibold text-gray-600">{t(`${food.category}`)}</p>
        <h1 className="font-semibold text-xl">{t(`${food.foodName}`)}</h1>
        <hr className="w-full text-gray-400 my-2"/>
        <p className="font-semibold text-gray-600 text-xl">${t(`${food.price}`)}</p>
      </div>

    </div>
  );
};

export default FoodCard;
