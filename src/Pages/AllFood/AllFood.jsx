import React from "react";

const AllFood = () => {
  return (
    <div>
      {/* hero section for all food items */}
      <div
        className="hero min-h-96"
        style={{
          backgroundImage:
            "url(https://lovefoodhatewaste.ca/wp-content/uploads/2020/11/FoodBackgroundNomeat.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Menu Page</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFood;
