


import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// Placeholder status icon (replace with actual icon if needed)
const statusIcon = "https://i.ibb.co.com/99VXqJQq/3640086.webp";

const OrderTracking = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Check if orderId is missing
  if (!orderId) {
    console.log("Order ID is missing in URL");
    return (
      <div className="text-center py-10 text-red-600">
        Error: Order ID is missing. Please go to your orders to track.
        <br />
        <button
          onClick={() => navigate("/dashboard/my-order")}
          className="mt-4 text-blue-600 underline"
        >
          Go to My Orders
        </button>
      </div>
    );
  }

  console.log("Order ID from URL:", orderId);

  // Fetch the specific order with polling for live updates
  const { data: order, isLoading: orderLoading, error: orderError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/orders/${orderId}`, {
        params: { userEmail: user?.email },
      });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch order");
    },
    refetchInterval: 5000, // Poll every 5 seconds for live updates
    refetchIntervalInBackground: true, // Continue polling even if the tab is not in focus
  });

  // Calculate estimated arrival time
  const calculateTimeRange = (createdAt, status) => {
    const created = new Date(createdAt);
    let minutesToAdd;
    switch (status) {
      case "Pending":
        minutesToAdd = 45;
        break;
      case "Cooking":
        minutesToAdd = 30;
        break;
      case "On the Way":
        minutesToAdd = 15;
        break;
      case "Delivered":
        return "Delivered";
      case "Cancelled":
        return "N/A";
      default:
        minutesToAdd = 0;
    }
    const start = new Date(created.getTime() + minutesToAdd * 60000);
    const end = new Date(start.getTime() + 15 * 60000);
    return `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} – ${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;
  };

  // Map status to messages and estimated time
  const getStatusDetails = (status, createdAt) => {
    const timeRange = calculateTimeRange(createdAt, status);
    switch (status) {
      case "Pending":
        return {
          message: "Order placed",
          subMessage: "We have received your order",
          timeRange,
        };
      case "Cooking":
        return {
          message: "Preparing your order",
          subMessage: "The rider is waiting at the restaurant",
          timeRange,
        };
      case "On the Way":
        return {
          message: "On the way",
          subMessage: "Your order is on its way",
          timeRange,
        };
      case "Delivered":
        return {
          message: "Delivered",
          subMessage: "Your order has been delivered",
          timeRange,
        };
      case "Cancelled":
        return {
          message: "Cancelled",
          subMessage: "Your order has been cancelled",
          timeRange,
        };
      default:
        return {
          message: "Unknown status",
          subMessage: "",
          timeRange: "",
        };
    }
  };

  // Handle loading and error states
  if (orderLoading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (orderError) {
    if (orderError.message.includes("Order not found")) {
      return (
        <div className="text-center py-10 text-red-600">
          Error: Order not found. Please check the order ID or contact support.
          <br />
          <button
            onClick={() => navigate("/dashboard/my-order")}
            className="mt-4 text-blue-600 underline"
          >
            Go to My Orders
          </button>
        </div>
      );
    }
    if (orderError.message.includes("Unauthorized")) {
      navigate("/login");
      return null;
    }
    return <div className="text-center py-10 text-red-600">Error: {orderError.message}</div>;
  }

  // Additional check to ensure order exists
  if (!order) return <div className="text-center py-10 text-red-600">Error: Order not found</div>;

  const { message, subMessage, timeRange } = getStatusDetails(order.status, order.createdAt);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Track Your Order</h1>
      <div className="border rounded-lg shadow-sm bg-white">
        {/* Header Section */}
        <div className="bg-gray-50 p-4 rounded-t-lg flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 uppercase">Arriving by</p>
            <p className="text-lg font-semibold text-gray-800">{timeRange}</p>
            <p className="text-md font-medium text-gray-700 mt-1">{message}</p>
            <p className="text-sm text-gray-500">{subMessage}</p>
          </div>
          <img src={statusIcon} alt="Status Icon" className="w-16 h-16" />
        </div>

        {/* Order Details Section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 uppercase mb-4">Order Details</h2>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Order number #{order._id.slice(-8)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Customer Name:</p>
            <p className="text-sm text-gray-700">{order.info.cus_name}</p>
            <p className="text-sm text-gray-500 mt-1">Customer Email:</p>
            <p className="text-sm text-gray-700">{order.info.cus_email}</p>
            <p className="text-sm text-gray-500 mt-1">Customer Phone:</p>
            <p className="text-sm text-gray-700">{order.info.cus_phone}</p>
            <p className="text-sm text-gray-500 mt-1">Delivery Address:</p>
            <p className="text-sm text-gray-700">
              {order.info.cus_add1}, {order.info.cus_city}, {order.info.cus_country}
            </p>
            <p className="text-sm text-gray-500 mt-1">Order Status:</p>
            <p className="text-sm text-gray-700">{order.status}</p>
            <p className="text-sm text-gray-500 mt-1">Order Items:</p>
            {order.cart.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 py-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <p className="text-sm text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total and Item Count */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500 uppercase">
              Total ({order.cart.length} items)
            </p>
            <p className="text-lg font-semibold text-pink-600">Tk {order.total_amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;