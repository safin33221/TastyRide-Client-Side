import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Restaurants = () => {
  const { email } = useParams();
  const axiosPublic = useAxiosPublic();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // const { data: restaurant, isPending } = useQuery({
  //     queryKey: ['restaurant', email],

  //     queryFn: async () => {
  //         const res = await axiosPublic.get(`/api/restaurantProfile/${email}`)
  //         return res.data
  //     }
  // })

  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      try {
        const res = await axiosPublic.get(`/api/restaurantProfile/${email}`);
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile");
      }
    };
    fetchRestaurantProfile();
  }, [email]);

  if (error) {
    return <div className="text-error text-center mt-10">{error}</div>;
  }
  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {/* <div className=''>
                <img
                    className='h-[350px] w-full bg-contain bg-center flex items-center relative'
                    src={user?.restaurantDetails?.coverPhoto} alt="" />
                <img src={user?.restaurantDetails?.profilePhoto} className='rounded-full absolute bottom-16 left-10' alt="" />
            </div> */}
    </div>
  );
};

export default Restaurants;
