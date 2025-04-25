import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle";

const CityRestaurants = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { data: restaurants = [], isLoading, error } = useQuery({
    queryKey: ["restaurants", cityName],
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/restaurants/city/${cityName}`);
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={`Restaurants in ${cityName}`} desc={`Discover the best dining options in ${cityName}.`} />
          <p className="text-center text-gray-500">Loading restaurants...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={`Restaurants in ${cityName}`} desc={`Discover the best dining options in ${cityName}.`} />
          <p className="text-center text-red-500">Error loading restaurants: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={`Restaurants in ${cityName}`} desc={`Discover the best dining options in ${cityName}.`} />
        {restaurants.length === 0 ? (
          <p className="text-center text-gray-500">
            No restaurants found in {cityName}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/restaurantProfile/${restaurant.email}`)}
              >
                <img
                  src={restaurant.logo || "https://i.ibb.co.com/default-placeholder.jpg"}
                  alt={restaurant.businessName}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {restaurant.businessName}
                  </h3>
                  <p className="text-sm text-gray-500">{restaurant.type}</p>
                  <p className="text-sm text-gray-500">{restaurant.address}</p>
                  <p className="text-sm text-gray-500">
                    Open: {restaurant.openTime} - {restaurant.closeTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CityRestaurants;