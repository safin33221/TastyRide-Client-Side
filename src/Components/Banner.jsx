import React, { useState } from "react";
import bannerAnimation from "../assets/banner/QPpY0uCUSn.json";
import Lottie from "lottie-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";

function Banner() {
  const axiosPublic = useAxiosPublic()
  const [isShowRestaurantsTabs, setIsShowRestaurantsTabs] = useState(false)
  const [restaurantData, setRestaurantData] = useState([])
  const handleSearchRestaurant = async (location) => {
    try {
      const res = await axiosPublic.get(`/api/location/restaurant/${location}`)
      setRestaurantData(res?.data)
    } catch (error) {
      console.log(error);
    }

  }
  // console.log(restaurantData);


  return (
    <section className="w-full h-full md:h-screen lg:max-h-[500px] py-10 md:py-0 flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4">
          <div
            className="w-full md:w-7/12">
            <div className="flex flex-col">
              <div className="mb-5">
                <h1 className="font-bold text-5xl md:text-6xl mb-3 text-red-500">
                  Fresh, Fresh
                </h1>
                <div>
                  <h1 className="font-bold text-5xl md:text-6xl mb-3">
                    <span className="text-red-500">& Right</span> To Your Door
                  </h1>
                </div>
                <h6>Order dishes from favorite restaurants near you.</h6>
              </div>
            </div>
            <form action="" className="w-full">
              <div className="join w-full relative">
                <div className="w-8/12">
                  <label className=" validator join-item w-full">
                    <input
                      onFocus={() => setIsShowRestaurantsTabs(true)}
                      onChange={(e) => handleSearchRestaurant(e.target.value)}
                      type="text"
                      className="w-full input input-lg input-error rounded-r-none focus:border-2 focus:outline-0 py-2"
                      placeholder="Enter Your Location"
                      required
                    />
                  </label>
                  {
                    isShowRestaurantsTabs && (
                      <div className="border-2 w-8/12 bg-gray-400 h-52  absolute top-12">

                      </div>
                    )
                  }
                </div>
                <button className="btn btn-lg btn-error bg-red-500 hover:bg-red-600 text-white join-item">
                  Find Food
                </button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-5/12">
            <Lottie
              animationData={bannerAnimation}
              loop={true}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
