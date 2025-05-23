

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loader/Loading";

const CheckoutComponent = () => {
  const { cart, refetch, isLoading, isError } = useCart();
  const { user } = useAuth();
  const [shippingMethods, setShippingMethods] = useState("cod");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const restaurantEmail = cart?.map(data => data.foodOwner);
  let total_amount = cart?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  let discount = 0
  if (total_amount > 500) {
    discount = total_amount * 0.05; // 5% discount
  } else if (total_amount >= 1000) {
    discount = total_amount * 0.10; // 10% discount
  } else if (total_amount >= 1000) {
    discount = total_amount * 0.25; // 10% discount
  }
  console.log(total_amount);
  total_amount  = (total_amount + 30) - discount
  console.log(total_amount);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const form = e.target;
    const cus_name = form.name.value;
    const cus_email = form.email.value;
    const cus_phone = form.number.value;
    const cus_add1 = form.address.value;
    const cus_city = form.city.value;
    const cus_country = form.country.value;

    const info = { cus_name, cus_email, cus_phone, cus_add1, cus_city, cus_country, total_amount };

    try {
      // Validate cart and restaurantEmail
      if (!cart || cart.length === 0) {
        Swal.fire("Error", "Your cart is empty. Please add items to place an order.", "error");
        return;
      }
      if (!restaurantEmail || !restaurantEmail[0]) {
        Swal.fire("Error", "Restaurant email is missing. Please try again.", "error");
        return;
      }

      if(shippingMethods !== "cod"){
        localStorage.setItem("info", JSON.stringify(info))
        localStorage.setItem("cart", JSON.stringify(cart))
      }

      if (shippingMethods === "cod") {
        const orderDetails = {
          info,
          cart,
          restaurantEmail: restaurantEmail[0],
          paymentMethod: 'cod',
          total_amount: total_amount,
          status: 'Pending',
          createdAt: new Date(),
        };

        console.log("Order Details:", orderDetails);
        const result = await axiosPublic.post('/api/orders', orderDetails);
        console.log("Server Response:", result.data);

        if (result.data.success) {
          // Get the orderId from the response
          const orderId = result.data.data._id;
          console.log("Order ID for Redirect:", orderId); // Log the orderId

          // Clear the cart
          await axiosPublic.delete(`/api/clear-cart/${user.email}`);
          refetch();

          Swal.fire({
            title: "Your Order is Confirmed",
            showDenyButton: true,
            confirmButtonText: "Track Order",
            denyButtonText: "Return Home",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/order-tracking/${orderId}`); // Include the orderId in the redirect
            } else if (result.isDenied) {
              navigate("/");
            }
          });
        } else {
          Swal.fire("Error", result.data.message || "Failed to place order", "error");
        }
      } else {
        const orderDetails = {
          info,
          cart,
          restaurantEmail: restaurantEmail[0],
          paymentMethod: 'sslcommez',
          total_amount: total_amount,
          status: 'Pending',
          createdAt: new Date(),
        };
        const response = await axiosPublic.post('/init-payment', orderDetails);
        const { GatewayPageURL } = response.data;
        if (GatewayPageURL) {
          window.location.href = GatewayPageURL;
        } else {
          Swal.fire("Error", "Failed to initiate payment", "error");
        }
      }
    } catch (error) {
      console.error("Error in handlePlaceOrder:", error);
      Swal.fire("Error", "An error occurred while processing your order", "error");
    }
  };

  if (isLoading) return <Loading />
  if (isError) return <div>Error loading cart</div>;

  return (
    // JSX remains unchanged
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <Link to={"/cart"} className="font-semibold text-gray-900">
                  Cart
                </Link>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cart?.map((item, index) => (
              <div key={index} className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.image}
                  alt="Nike Air Max Pro 8888"
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="float-right text-gray-400">
                    {item?.category}
                  </span>
                  <p className="text-lg font-bold">{item.price}$  <span className="font-normal">X</span> {item.quantity} </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div onClick={() => setShippingMethods("cod")} className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                defaultChecked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="https://png.pngtree.com/png-clipart/20220603/original/pngtree-red-badge-cod-cash-on-delivery-png-image_7900047.png"
                  alt="COD"
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cash on Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div onClick={() => setShippingMethods("sslcommez")} className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="https://tds-images.thedailystar.net/sites/default/files/styles/very_big_201/public/images/2022/12/14/sslcommerz.png"
                  alt="Fedex"
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">SSLCOMMEZ</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div>
            <form onSubmit={handlePlaceOrder}>
              <div className="relative">
                <label
                  htmlFor="name"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  name="name"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="type here"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  required
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                  defaultValue={user?.email}
                  readOnly
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="number"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  required
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="type here"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="address"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Full Address
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  name="address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="type here"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="city"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  name="city"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="type here"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="country"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  required
                  name="country"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="type here"
                />
              </div>
              <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white cursor-pointer">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutComponent;