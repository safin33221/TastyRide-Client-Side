import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router';


const FoodCard = ({ food }) => {
    const applyRandomDiscounts = (food) => {


        const ShouldApplyDiscounts = Math.random() < 0.6 // ৩০% সম্ভাবনা থাকবে ডিসকাউন্ট অ্যাপ্লাই করার  
        const discountsPercentage = ShouldApplyDiscounts ? Math.floor(Math.random() * 21) + 5 : 0 //৫-২৫% এর মধ্যে ডিসকাউন্ট 

        return {
            ...food,
            discountPrice: ShouldApplyDiscounts ? food.price - (food.price * discountsPercentage) / 100 : food.price,
            discountsPercentage,
        }


    };
    const discountsFoods = applyRandomDiscounts(food)
    const { _id, image, foodName, category, availability, price, discountPrice, discountsPercentage } = discountsFoods
    if (discountsPercentage <= 0) return

    return (
        <div>

            <div
                key={_id}
                className="bg-white p-4  rounded-lg shadow-lg relative transition-all duration-300 group hover:bg-yellow-500 hover:shadow-xl"
            >
                <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
                    <FaHeart />
                </button>
                <img
                    src={image}
                    alt={foodName}
                    className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-lg font-bold mt-3">{foodName}</h2>
                <div className="flex items-center mt-2">
                    <span className=" text-gray-600">Category ({category})</span>
                </div>
                <p className="text-gray-500 line-through">
                    Availability {availability}
                </p>
                <div className='flex gap-3'>
                    <p className="text-red-300 font-bold line-through">${price} </p>

                    <p className="text-red-500 font-bold ">${discountPrice.toFixed(2)} </p>
                    <p className="text-red-500 font-bold absolute  top-5 right-5 text-xl bg-white p-1 rounded-2xl ">{discountsPercentage}% Off</p>
                </div>
                <Link to={`/all-food/${_id}`}>
                    <button className="bg-black text-white w-full mt-3 py-2 flex items-center justify-center gap-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <FaShoppingCart /> Add to Cart
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default FoodCard;