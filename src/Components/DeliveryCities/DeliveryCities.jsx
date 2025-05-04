
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle";

const DeliveryCities = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [showAll, setShowAll] = useState(false);

  const { data: cities = [], isLoading, error } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await axiosPublic.get("/api/allApprovedRestaurant");
      console.log("Cities API Response:", response.data); // Debug the response
      return response.data.data;
    },
  });

  const visibleCities = showAll ? cities : cities.slice(0, 10);

  const handleToggleCities = () => {
    setShowAll(!showAll);
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Delivery Cities" desc="Discover the cities where we bring fast, fresh, and reliable delivery right to your door." />
          <p className="text-center text-gray-500">Loading cities...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Delivery Cities" desc="Discover the cities where we bring fast, fresh, and reliable delivery right to your door." />
          <p className="text-center text-red-500">Error loading cities: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Our Delivery Cities" desc="Discover the cities where we bring fast, fresh, and reliable delivery  right to your door." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {visibleCities.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No cities available at the moment.
            </p>
          ) : (
            visibleCities.map((city, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() =>
                  city.name
                    ? navigate(`/restaurants/city/${city.name.toLowerCase()}`)
                    : console.warn("City name is undefined:", city)
                }
              >
                <img
                  src={city.image || "https://i.ibb.co.com/default-placeholder.jpg"}
                  alt={city.name || "Unknown City"}
                  className="w-full h-64 object-cover transform scale-100 hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 bg-[rgba(0,0,0,0.2)] text-white">
                  <h3 className="text-2xl font-semibold text-white">
                    {city.name || "Unknown City"}
                  </h3>
                  <p className="text-lg text-gray-50">
                    {city.restaurants || 0} Restaurants
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        {cities.length > 10 && (
          <div className="mt-8 text-center">
            <button
              onClick={handleToggleCities}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center justify-center mx-auto"
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
                  d={showAll ? "M18 12H6" : "M12 4v16m8-8H4"}
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeliveryCities;