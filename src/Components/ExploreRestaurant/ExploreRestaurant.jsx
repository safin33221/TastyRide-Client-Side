

import React from 'react';
import SectionTitle from '../../Shared/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const ExploreRestaurant = () => {
  const axiosPublic = useAxiosPublic();

  const { data: restaurantData = [], isPending, error } = useQuery({
    queryKey: ['restaurantData'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/approvedRestaurants'); // Add /api prefix
      return res.data.data;
    },
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="pb-10">
      <SectionTitle
        title="SavorSphere: Discover Culinary Treasures"
        desc="Where Every Bite Tells a Story – Explore Hidden Gems, Local Flavors & Global Delights"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
        {restaurantData.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No restaurants available at the moment.
          </p>
        ) : (
          restaurantData.map((restaurant) => (
            <Link key={restaurant._id} to={`/restaurantProfile/${restaurant.email}`}>
              <div className="bg-gray-100 hover:shadow-xl h-full hover:cursor-pointer shadow-md overflow-hidden border border-gray-200 mx-2 md:mx-0 transition-all duration-300 ease-in-out">
                <img
                  className="w-full h-48 object-cover"
                  src={restaurant?.coverPhoto || 'https://i.ibb.co.com/default-placeholder.jpg'}
                  alt={restaurant.businessName}
                  loading="lazy"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 rounded-full"
                      src={restaurant.logo || 'https://i.ibb.co.com/default-placeholder.jpg'}
                      alt={`${restaurant.businessName} Logo`}
                    />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {restaurant.businessName}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <span>৳৳</span>
                    <span>•</span>
                    <span>{restaurant.type}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-base">★</span>
                      <span>4.5</span>
                      <span className="text-gray-400">(200+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱️ 30–45 min</span>
                      <span className="text-pink-500 font-medium">• Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ExploreRestaurant;