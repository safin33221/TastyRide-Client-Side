import React, { useState } from 'react';
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaStar,
} from 'react-icons/fa';

const AllFood = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  // all image link

  // https://i.ibb.co.com/jkBnJf9q/1.png
  // https://i.ibb.co.com/tTSvNf6n/2.png
  // https://i.ibb.co.com/Fk1X201S/3.png
  // https://i.ibb.co.com/qYhFGgvG/4.png
  // https://i.ibb.co.com/1YkRGMW9/5.png
  // https://i.ibb.co.com/bMx8HT26/6.png

  const foods = [
    {
      id: 1,
      name: 'Chinese Pasta',
      price: 28.52,
      discount: 5,
      img: 'https://i.ibb.co.com/jkBnJf9q/1.png',
      category: 'Pasta',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Whopper Burger King',
      price: 28.52,
      discount: 5,
      img: 'https://i.ibb.co.com/tTSvNf6n/2.png',
      category: 'Burger',
      rating: 4.0,
    },
    {
      id: 3,
      name: 'Delicious Burger',
      price: 28.52,
      discount: 5,
      img: 'https://i.ibb.co.com/Fk1X201S/3.png',
      category: 'Burger',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Ruti With Chicken',
      price: 28.52,
      discount: 5,
      img: 'https://i.ibb.co.com/qYhFGgvG/4.png',
      category: 'Chicken',
      rating: 4.2,
    },
    {
      id: 5,
      name: 'Grilled Chicken',
      price: 28.52,
      discount: 5,
      img: 'https://i.ibb.co.com/1YkRGMW9/5.png',
      category: 'Chicken',
      rating: 4.8,
    },
    {
      id: 6,
      name: 'French Fries',
      price: 28.52,
      discount: 5,
      img: 'https://i.ibb.co.com/bMx8HT26/6.png',
      category: 'Fries',
      rating: 3.9,
    },
  ];

  const categories = ['All', 'Pasta', 'Burger', 'Chicken', 'Fries'];

  const filteredFoods = foods
    .filter(
      food =>
        (selectedCategory === 'All' || food.category === selectedCategory) &&
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

  return (
    <div>
      {/* Hero section */}
      <div
        className="hero min-h-96"
        style={{
          backgroundImage:
            'url(https://lovefoodhatewaste.ca/wp-content/uploads/2020/11/FoodBackgroundNomeat.jpg)',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Menu Page</h1>
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="p-6 bg-gray-100">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center bg-white p-2 rounded-lg shadow-sm flex-1">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search food..."
              className="ml-2 outline-none flex-1"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="bg-white p-2 rounded-lg shadow-sm"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            className="bg-white p-2 rounded-lg shadow-sm flex items-center"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
            <span className="ml-2">
              Price {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
            </span>
          </button>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {filteredFoods.map(food => (
            <div
              key={food.id}
              className="bg-white p-4 rounded-lg shadow-lg relative transition-all duration-300 group hover:bg-yellow-500 hover:shadow-xl"
            >
              <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
                <FaHeart />
              </button>
              <img
                src={food.img}
                alt={food.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-bold mt-3">{food.name}</h2>
              {/* Star Rating */}
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-${
                      index < Math.round(food.rating) ? 'yellow' : 'gray'
                    }-400`}
                  />
                ))}
                <span className="ml-2 text-gray-600">({food.rating})</span>
              </div>
              <p className="text-gray-500 line-through">$30.52</p>
              <p className="text-red-500 font-bold">${food.price}</p>
              {/* Add to Cart Button (Hidden by default, shown on hover) */}
              <button className="bg-black text-white w-full mt-3 py-2 flex items-center justify-center gap-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFood;
