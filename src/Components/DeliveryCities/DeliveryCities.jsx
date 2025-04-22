import React, { useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";

// Static city data (replace with API data if needed)
const cities = [
  { name: "Dhaka", restaurants: 3442, image: "https://i.ibb.co.com/MFFM5Cb/dhaka.jpg" },
  { name: "Chattogram", restaurants: 347, image: "https://i.ibb.co.com/spMmPZQw/chattogram.jpg" },
  { name: "Khulna", restaurants: 156, image: "https://i.ibb.co.com/vgTs2FB/khulna.jpg" },
  { name: "Sylhet", restaurants: 144, image: "https://i.ibb.co.com/JWPpnmnH/sylhet.jpg" },
  { name: "Narayanganj", restaurants: 144, image: "https://i.ibb.co.com/Xkj6GNJX/nayangonj.jpg" },
  { name: "Rajshahi", restaurants: 67, image: "https://i.ibb.co.com/fVq9b6d5/rajshai.jpg" },
  { name: "Mymensingh", restaurants: 60, image: "https://i.ibb.co.com/5g69bqT1/Mymensingh.jpg" },
  { name: "Bogra", restaurants: 64, image: "https://i.ibb.co.com/Y65YWFc/Bogra.webp" },
  { name: "Cumilla", restaurants: 48, image: "https://i.ibb.co.com/1fZXkXPm/Cumilla.jpg" },
  { name: "Tangail", restaurants: 33, image: "https://i.ibb.co.com/SwN5pZhn/Tangail.jpg" },
  { name: "Gazipur", restaurants: 28, image: "https://i.ibb.co.com/Lz1qZXTj/Gazipur.webp" },
  { name: "Cox's Bazar", restaurants: 28, image: "https://i.ibb.co.com/4RccVFdV/Cox-s-Bazar.jpg" },
  // Add more cities as needed
];

const DeliveryCities = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleCities = showAll ? cities : cities.slice(0, 10); // Show 10 cities initially

  const handleToggleCities = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md-px-0">
        <SectionTitle title={`Where We Deliver`} desc={` Explore the areas where fast, fresh delivery is guaranteed.`}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {visibleCities.map((city, index) => (
            <div
              key={index}
              className="relative  bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-64 object-cover  transform scale-100 hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 bg-[rgba(0,0,0,0.2)]  text-white">
                <h3 className="text-2xl font-semibold text-white">{city.name}</h3>
                <p className="text-lg text-gray-50">{city.restaurants} Restaurants</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleToggleCities}
            className="bg-red-500 text-white px-4 py-2 rounded-md  hover:bg-red-600 transition-colors duration-300 flex items-center justify-center mx-auto"
          >
            {showAll ? "Show Less" : "Show More Cities"}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={showAll ? "M12 4v16m8-8H4" : "M12 4v16m8-8H4"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeliveryCities;