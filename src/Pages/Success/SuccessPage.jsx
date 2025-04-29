import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useCart } from "../../Hooks/useCart";

const SuccessPage = () => {
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { refetch } = useCart(); // still needed

  const queryParams = new URLSearchParams(location.search);
  const tranId = queryParams.get("tran_id");
  const total_amount = queryParams.get("amount");
  const currency = queryParams.get("currency");
  const createdAt = queryParams.get("tran_date");

  const info = JSON.parse(localStorage.getItem("info"));
  const cart = JSON.parse(localStorage.getItem("cart"));

  const restaurant = cart?.map(data => data.foodOwner);
  const restaurantEmail = restaurant ? restaurant[0] : null;

  const order = {
    tranId,
    total_amount,
    currency,
    createdAt,
    info,
    cart,
    restaurantEmail,
  };

  useEffect(() => {
    const placeOrderAndClearCart = async () => {
      try {
        // ❗ ADD PROTECTION: check if cart and info exist
        if (!cart || !info || cart.length === 0) {
          console.log("Cart or info missing, skipping order placement.");
          return;
        }

        // 1. Place order
        const res = await axiosPublic.post(`/api/orders`, order);
        console.log("Order placed:", res.data);

        // 2. After 2 seconds, clear cart
        if (user) {
          setTimeout(async () => {
            try {
              const clearRes = await axiosPublic.delete(`/api/clear-cart/${user.email}`);
              console.log("Cart cleared:", clearRes.data);

              refetch(); // Refresh cart state
              
              // Also remove from localStorage
              localStorage.removeItem('cart');
              localStorage.removeItem('info');

            } catch (error) {
              console.error("Failed to clear cart:", error);
            }
          }, 2000);
        }

      } catch (error) {
        console.error("Failed to place order:", error);
      }
    };

    placeOrderAndClearCart();
  }, [axiosPublic, order, refetch, user, cart, info]); // dependencies updated!

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase. Here are your transaction details:
        </p>
        <div className="mt-4">
          <p>
            <strong>Transaction ID:</strong> {tranId || "N/A"}
          </p>
          <p>
            <strong>Amount:</strong> {total_amount} {currency}
          </p>
          <p>
            <strong>Date:</strong> {createdAt || "N/A"}
          </p>
        </div>
        <Link
          to={`/my-order`}
          className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-white"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
