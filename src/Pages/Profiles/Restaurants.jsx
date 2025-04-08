import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Restaurants = () => {
  const { email } = useParams();
  const axiosPublic = useAxiosPublic();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);


  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      try {
        setLoading(true);
        // fetch restaurant profile by email
        const res = await axiosPublic.get(`/api/restaurantProfile/${email}`);
        setProfile(res.data);

        // fetch menu by email
        const menuData = await axiosPublic.get(`/api/food/by-email/${email}`);
        if (menuData?.data?.success && Array.isArray(menuData?.data?.data)) {
          setMenus(menuData.data.data);
        } else {
          console.error("Expected an array but got:", menuData);
          setMenus([]);
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurantProfile();
  }, [email]);

  //   console.log(menus);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  //  error state
  if (error) {
    return error === "Restaurant not found" ? (
      <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl border border-error">
          <div className="card-body text-center items-center">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-error"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="card-title text-2xl font-bold text-error text-center">
              Oops!
            </h2>
            <p className="text-neutral mt-2 text-xl font-bold">{error}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-base-100">
        {/* banner section */}
        <div className="relative h-64 md:h-80 w-full">
          <img
            src="https://placehold.co/1200x400?text=Cover+Page&font=poppins"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Section */}
        <div className="max-w-5xl mx-auto -mt-16 px-4">
          <div className="flex flex-col items-center  gap-6">
            <div className="avatar">
              <div className="w-32 md:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://placehold.co/150?text=profile"
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-neutral mt-1 text-red-500">
                Restaurant profile does not set up yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* banner section */}
      <div className="relative h-64 md:h-80 w-full">
        <img
          src={
            profile?.coverPhoto ||
            "https://placehold.co/1200x400/transparent/red/?text=Cover+Page&font=poppins"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          {/* <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            {profile?.restaurantName}
          </h1> */}
        </div>
      </div>

      {/* Profile Section -mt-16 */}
      <div className="max-w-5xl mx-auto -mt-16 px-4">
        <div className="flex flex-col items-center  gap-6">
          <div className="avatar">
            <div className="w-32 md:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  profile?.profilePhoto ||
                  "https://placehold.co/150?text=profile"
                }
                alt="Profile"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-red-600">
              {profile?.restaurantName}
            </h2>
            <p className="text-neutral mt-1">
              {profile.description || "A place for delicious meals"}
            </p>
          </div>
        </div>
      </div>

      {/* menu section */}
      {/* Menu Section */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h3 className="text-2xl font-bold text-red-500">Our Menu</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <figure>
                <img
                  src={menu.image}
                  alt={menu.foodName}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body">
                <h4 className="card-title text-lg font-semibold text-neutral">
                  {menu.foodName}
                </h4>
                <p className="text-sm text-gray-600">{menu.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-red-500 font-bold">
                    ${menu.price.toFixed(2)}
                  </span>
                  <Link to={`/all-food/${menu._id}`}>
                  <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white">
                    Details
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
