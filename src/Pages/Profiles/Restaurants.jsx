import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useUserData from "../../Hooks/useUserData";
import Loading from "../Loader/Loading";

const Restaurants = () => {
  const { user } = useAuth();
  const [userData] = useUserData()
  const { email } = useParams();
  const axiosPublic = useAxiosPublic();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [following, setFollowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // find if the user already follow the restaurant
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const res = await axiosPublic.get(`/api/restaurant/follow?userEmail=${user?.email}&restaurantEmail=${email}`);
        setFollowing(res?.data?.isFollowing);
      } catch (error) {
        console.log(error?.response?.data?.message || "Error fetching follow status");
      }
    }
    if (user?.email) {
      fetchFollowStatus();
    }
  }, [user?.email, email])

  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      try {
        setLoading(true);
        // fetch restaurant profile by email
        const res = await axiosPublic.get(`/api/SingleRestaurantProfile/${email}`);
        setProfile(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurantProfile();
  }, [email]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await axiosPublic.get(`/api/food/by-email/${email}`);
        if (res?.data?.success && Array.isArray(res?.data?.data)) {
          setMenus(res.data.data);
        } else {
          console.error("Expected an array but got:", res);
          setMenus([]);
        }
      } catch (err) {
        console.log(err?.response?.data?.message || "Error fetching menus");
      }
    };
    fetchMenus();
  }, []);

  console.log(menus);

  // Loading State
  if (loading) return <Loading />
  //  error state
  if (error === "Restaurant not found") {
    return (
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
    );
  }



  // follow the restaurant
  const handleFollowRestaurant = async () => {
    let message;
    try {
      if (user?.email) {
        const res = await axiosPublic.patch(`/api/restaurant/follow`, { userEmail: user?.email, restaurantEmail: email });
        console.log(res?.data);

        setFollowing(res?.data?.isFollowing);
        if (res?.data?.isFollowing) {
          message = "Followed!";
        } else {
          message = "Unfollowed!";
        }
        await Swal.fire({
          title: message,
          text: message + "the restarunt successfully!",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#ef4444",
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        setErrorMessage("Please login first to follow the restaurant.");
      }
    } catch (err) {
      console.log(err?.response?.data?.message || "Error following restaurant");
      setErrorMessage(err?.response?.data?.message || "Error following restaurant");
    }
  };

  // follow button
  const followButton = (
    <>
      <div
        onClick={handleFollowRestaurant}
        className={`btn btn-md text-sm mt-4 
        ${following
            ? "border-black bg-white"
            : "border-red-500 bg-red-500 hover:bg-red-600 text-white"
          }`}
      >
        {following ? "Following" : "Follow"}
      </div>
      {
        errorMessage && <p className="text-red-500 mt-2 text-center">{errorMessage}</p>
      }
    </>
  );

  return (
    <div className="min-h-screen bg-base-100">
      {error ? (
        <>
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
                <p className="mt-1 text-red-500">
                  Restaurant profile does not set up yet.
                </p>
                {/* follow button */}
                {followButton}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
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
                      profile?.logo ||
                      "https://placehold.co/150?text=profile"
                    }
                    alt="Profile"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-red-600">
                  {profile?.businessName}
                </h2>
                <p className="text-neutral mt-1">
                  {profile.description || "A place for delicious meals"}
                </p>
                {/* follow button */}
                {followButton}
              </div>
            </div>
          </div>
        </>
      )}
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
