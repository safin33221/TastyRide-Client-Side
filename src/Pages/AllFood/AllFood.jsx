import React, { useEffect, useState, useMemo } from 'react';
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaMicrophone,
} from 'react-icons/fa';
import { Link } from 'react-router';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useAddToCart } from '../../Hooks/userAddToCart';

const AllFood = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['All']); // Initialize with 'All'

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get('/api/foods')
      .then(response => {
        console.log('API Response:', response.data.data); // Debugging
        if (response?.data?.success && Array.isArray(response?.data?.data)) {
          setFoods(response.data.data);

          // Extract unique categories from the data
          const uniqueCategories = [
            'All',
            ...new Set(response?.data?.data.map(food => food.category)),
          ];
          setCategories(uniqueCategories); // Update categories state
        } else {
          console.error('Expected an array but got:', response);
          setFoods([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredFoods = useMemo(() => {
    return foods
      .filter(food => food.foodName) // Filter out items without a `foodName`
      .filter(
        food =>
          (selectedCategory === 'All' || food.category === selectedCategory) &&
          food.foodName?.toLowerCase().includes(searchTerm.toLowerCase()) // Use optional chaining
      )
      .sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
  }, [foods, selectedCategory, searchTerm, sortOrder]);

  // add to cart function

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!foods.length) return <p>No food data available.</p>;

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = event => {
      const voiceText = event.results[0][0].transcript;
      setSearchTerm(voiceText); // Set the voice input as the search term
    };

    recognition.onerror = event => {
      console.error('Speech Recognition Error:', event.error);
      alert('Voice search failed. Please try again.');
    };
  };

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

            <button
              onClick={handleVoiceSearch}
              title="Voice Search"
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              <FaMicrophone size={20} />
            </button>
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
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredFoods.map(
            ({
              _id,
              image,
              foodName,
              category,
              availability,
              price,
              addedBy,
            }) => (
              <div
                key={_id}
                className="bg-white p-4 border-indigo-50 shadow-lg relative transition-all duration-300 group hover:bg-yellow-500 hover:shadow-xl flex flex-col justify-between"
              >
                <>
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
                  <p className="text-red-500 font-bold">${price}</p></>
                <Link to={`/all-food/${_id}`}>
                  <button className="bg-red-500 text-white w-full mt-3 py-2 flex items-center  justify-center gap-2    transition-opacity duration-300 cursor-pointer">
                    <FaShoppingCart /> Add to Cart
                  </button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFood;
