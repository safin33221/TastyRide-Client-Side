import React from "react";
import bannerAnimation from "../assets/banner/QPpY0uCUSn.json";
import Lottie from "lottie-react";

function Banner() {
  return (
    <section className="w-full h-full md:h-screen lg:max-h-[600px] py-12 flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4">
          <div className="w-full md:w-7/12">
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
              <div className="join w-full">
                <div className="w-8/12">
                  <label className=" validator join-item w-full">
                    <input
                      type="text"
                      className="w-full input input-lg input-error rounded-r-none focus:border-2 focus:outline-0 py-2"
                      placeholder="Enter Your Location"
                      required
                    />
                  </label>
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
