import React from "react";
import PrimaryButton from "../../Shared/PrimaryButton";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

function SingleFood() {
  const {id} = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: food, isLoading, isError } = useQuery({
    queryKey: ["food", id],
    enabled: !!id, // Only fetch when ID exists
    queryFn: async ()=> {
      const res = await axiosPublic.get(`/api/foods/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching food details!</p>;

  

  return (
    <section className="max-w-5xl mx-auto flex justify-center items-center h-screen">
      <div className="card lg:card-side w-full bg-white shadow-sm">
        <div className="w-1/2 flex justify-center items-center p-6 md:p-8 lg:p-10">
          <div className="w-[350px] h-[350px] overflow-hidden rounded-lg">
            <img
              src={food?.image}
              alt={`${food?.foodName} image`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="card-body">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">{food?.availability ? "Available" : "Not Available"}</span>
            <div className="flex justify-between">
              <div>
                <h2 className="text-3xl font-bold">{food?.foodName}</h2>
                <p className="font-semibold">{food?.category}</p>
              </div>
              <span className="text-xl font-bold">{food?.price} tk</span>
            </div>
            {/* description */}
            <div className="mt-4">
              <p>
                {food?.description}
              </p>
            </div>
            {/* ingredients */}
            <h3 className="mt-6 text-xl font-bold">Ingredients</h3>
            <ul className="mt-2 flex flex-col gap-2 text-xs">
              {
                food?.ingredients.map((ingredient, index) => (
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
                ))
              }
             
            </ul>
            {/* special tags  */}
            <div className="space-x-2 mt-4">

              {
                food?.tags.map((tag, index) => {
                  const tagColors = {
                    Spicy: "badge-primary",
                    Vegan: "badge-secondary",
                    "Gluten-Free": "badge-info",
                  };
                  return (
                    <div key={index} className={`badge badge-outline ${tagColors[tag]}`}>{tag}</div>
                  )
                }   
                )
              }
            </div>
            <div className="mt-6">
             <PrimaryButton text={"Order Now"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleFood;
