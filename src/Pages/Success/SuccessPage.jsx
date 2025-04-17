// frontend/src/components/SuccessPage.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useCart } from "../../Hooks/useCart";
import { Link } from "react-router";

const SuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { cart, refetch, isLoading, isError } = useCart();

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const tranId = queryParams.get("tran_id");
  const amount = queryParams.get("amount");
  const currency = queryParams.get("currency");
  const tranDate = queryParams.get("tran_date");

  useEffect(() => {
      if(user){
        const deleteCartData = async () => {
            const res = await axiosPublic.delete(`/api/clear-cart/${user.email}`);
            refetch()
        }
        return deleteCartData;
      }
  }, []);

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
            <strong>Amount:</strong> {amount} {currency}
          </p>
          <p>
            <strong>Date:</strong> {tranDate || "N/A"}
          </p>
        </div>
        <Link
          to={`/my-order`}
          href="/order-tracking"
          className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-white"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
