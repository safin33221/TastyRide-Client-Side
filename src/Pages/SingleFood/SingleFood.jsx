import React, { useState } from "react";
import PrimaryButton from "../../Shared/PrimaryButton";
import { useNavigate, useParams, Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import useUserData from "../../Hooks/useUserData";
import { useAddToCart } from "../../Hooks/userAddToCart";

function SingleFood() {
  const { id } = useParams();
  const [userData] = useUserData();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addToCart = useAddToCart();

  const {
    data: food,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["food", id],
    enabled: !!id, // Only fetch when ID exists
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/foods/${id}`);
      return res.data;
    },
  });

  // get the total likes and dislikes
  const { mutate: reactToFood } = useMutation({
    mutationFn: async ({ reaction }) => {
      const res = await axiosPublic.patch(`/api/foods/reaction/${id}`, {
        userId: userData?._id,
        reaction,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("food", food._id);
    },
  });

  // console.log("Food", food)

  // manage the add to favorite functionality state
  const [isFavorited, setIsFavorited] = useState(false);

  // add to cart function
  const handleAddToCart = (food) => {
    addToCart(food);
    
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching food details!</p>;

  const toggleFavorite = () => setIsFavorited(!isFavorited);

  return (
    <section className="max-w-5xl mx-auto flex justify-center items-center h-screen">
      <div className="card lg:card-side w-full bg-white shadow-sm">
        {/* Back Button */}
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 text-xl flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>

        {/* Love Icon */}
        <button
          className="absolute top-4 right-4 text-red-500 text-2xl cursor-pointer"
          onClick={toggleFavorite}
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* food image */}
        <div className="w-1/2 flex justify-center items-center p-6 md:p-8 lg:p-10">
          <div className="w-[350px] h-[350px] overflow-hidden rounded-lg">
            <img
              src={food?.food?.image}
              alt={`${food?.food?.foodName} image`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* food dfood?.etails */}
        <div className="card-body">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">
              {food?.food?.availability ? "Available" : "Not Available"}
            </span>
            <div className="flex justify-between">
              <div>
                <h2 className="text-3xl font-bold">{food?.food?.foodName}</h2>
                <p className="font-semibold">{food?.food?.category}</p>
              </div>
              <span className="text-xl font-bold">{food?.food?.price} tk</span>
            </div>
            {/* description */}
            <div className="mt-4">
              <p>{food?.food?.description}</p>
            </div>
            {/* ingredients */}
            <h3 className="mt-6 text-xl font-bold">Ingredients</h3>
            <ul className="mt-2 flex flex-col gap-2 text-xs">
              {food?.food?.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
            {/* special tags  */}
            <div className="space-x-2 mt-4">
              {food?.food?.tags.map((tag, index) => {
                const tagColors = {
                  Spicy: "badge-primary",
                  Vegan: "badge-secondary",
                  "Gluten-Free": "badge-info",
                };
                return (
                  <div
                    key={index}
                    className={`badge badge-outline ${tagColors[tag]}`}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>

            {/* Like & Dislike Buttons */}
            <div className="mt-6 flex items-center gap-4">
              <button
                className={`btn btn-sm btn-success btn-outline flex items-center gap-2`}
                onClick={() => {
                  reactToFood({ reaction: "like" });
                }}
              >
                <FaThumbsUp /> {food?.food?.likes.length}
              </button>
              <button
                className={`btn btn-sm btn-error btn-outline flex items-center gap-2`}
                onClick={() => {
                  reactToFood({ reaction: "dislike" });
                }}
              >
                <FaThumbsDown /> {food?.food?.dislikes.length}
              </button>
            </div>

            {/* order now button */}
            <div onClick={() => handleAddToCart(food?.food)} className="mt-6">
              <PrimaryButton text={"Order Now"} />
            </div>

            {/* Restaurant Info */}
            <div className="flex items-center gap-4 mt-6">
              <div className="avatar">
                <Link to={`/restaurantProfile/${food?.food?.addedBy}`}>
                  <div className="w-16 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        food?.restaurantProfile ||
                        "https://placehold.co/150?text=profile"
                      }
                      alt={food?.restaurantName}
                      className="rounded-full"
                    />
                  </div>
                </Link>
              </div>

              <Link to={`/restaurantProfile/${food?.food?.addedBy}`}>
              <h2 className="text-2xl font-bold text-red-500 hover:text-red-600 hover:underline">
                {food?.restaurantName ? food?.restaurantName : "Restaurant Name"}
              </h2>
              </Link>
            </div>
            {/* <div className="mt-6 flex gap-2 items-center ">
              <Link to={`/profile/${userData?._id}`}><img src={userData?.restaurantDetails?.profilePhoto} className="w-12 h-12 rounded-full" alt="" /></Link>
              <Link to={`/profile/${userData?._id}`}>
                <h1 className="text-2xl font-bold hover:underline hover:cursor-pointer">{userData?.restaurantDetails?.restaurantName}</h1>
                <h1>1k Followers</h1>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleFood;
