import React from "react";

function SingleFood() {
  return (
    <section className="max-w-5xl mx-auto flex justify-center items-center h-screen">
      <div className="card lg:card-side w-full shadow-sm">
        <div className="w-1/2 flex justify-center items-center p-6 md:p-8 lg:p-10">
          <div className="w-[350px] h-[350px] overflow-hidden rounded-lg">
            <img
              src="https://rumkisgoldenspoon.com/wp-content/uploads/2021/05/Bhuna-khichuri-recipe.jpg"
              alt="buna khichuri"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="card-body">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">Available</span>
            <div className="flex justify-between">
              <div>
                <h2 className="text-3xl font-bold">Buna Khichuri</h2>
                <p className="font-semibold">Non-veg</p>
              </div>
              <span className="text-xl font-bold">290 tk</span>
            </div>
            {/* description */}
            <div className="mt-4">
              <p>
                Bhuna khichuri is a pure Bengali delicacy and it is also known
                as bhuni khichuri. It is a traditional Bengali dish that is made
                with rice, lentils, and vegetables. It is a very popular dish in
                Bangladesh and West Bengal. Bhuna khichuri is a very healthy and
                nutritious dish. It is a complete meal in itself.
              </p>
            </div>
            {/* ingredients */}
            <h3 className="mt-6 text-xl font-bold">Ingredients</h3>
            <ul className="mt-2 flex flex-col gap-2 text-xs">
              <li>
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
                <span>Small grain rice</span>
              </li>
              <li>
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
                <span>Split yellow lentils</span>
              </li>
              <li>
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
                <span> fried onions</span>
              </li>
              <li>
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
                <span>chicken</span>
              </li>
            </ul>
            {/* special tags  */}
            <div className="space-x-2 mt-4">
              <div className="badge badge-outline badge-primary">Spicy</div>
              <div className="badge badge-outline badge-secondary">Vegan</div>
              <div className="badge badge-outline badge-info">Gluten Free</div>
            </div>
            <div className="mt-6">
              <button className="btn btn-primary btn-block">Add To Card</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleFood;
