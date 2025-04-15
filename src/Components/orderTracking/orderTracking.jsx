

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// Status-specific images (replace with actual image URLs)
const statusImages = {
  Pending: "https://i.ibb.co.com/WWSc9jCv/3581435.webp", // Placeholder for Pending (e.g., shopping bag)
  Cooking: "https://i.ibb.co.com/S4Z67Jvc/cooking-pan-3d-icon-download-in-png-blend-fbx-gltf-file-formats-frying-pack-food-drink-icons-5379604.webp", // Cooking image (as provided)
  On_the_Way: "https://i.ibb.co.com/21BVwsDf/What-is-a-delivery-service-1024x536.webp", // Placeholder for On the Way (e.g., rider)
  Delivered: "https://i.ibb.co.com/yFcBxFMg/download-1.webp", // Placeholder for Delivered (e.g., checkmark)
  Cancelled: "https://i.ibb.co.com/zhF2PqJD/images.png", // Placeholder for Cancelled (e.g., cross)
};

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
    if (status === "On the Way" && minutesToAdd <= 15) {
      return "Anytime now"; // Match the "Anytime now" text
    }
    const start = new Date(created.getTime() + minutesToAdd * 60000);
    const end = new Date(start.getTime() + 15 * 60000);
    return `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} – ${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;
  };

  // Map status to messages, estimated time, and progress
  const getStatusDetails = (status, createdAt) => {
    const timeRange = calculateTimeRange(createdAt, status);
    let progress = 0;
    let message = "";
    let subMessage = "";

    switch (status) {
      case "Pending":
        progress = 25; // First bar filled
        message = "Order placed";
        subMessage = "We have received your order";
        break;
      case "Cooking":
        progress = 50; // First and second bars filled
        message = "Preparing your order";
        subMessage = "The rider is waiting at the restaurant";
        break;
      case "On the Way":
        progress = 75; // First, second, and third bars filled
        message = "On the way";
        subMessage =
          timeRange === "Anytime now"
            ? "Get ready, the rider will be there anytime now"
            : "Your order is on its way";
        break;
      case "Delivered":
        progress = 100; // All bars filled
        message = "Delivered";
        subMessage = "Your order has been delivered";
        break;
      case "Cancelled":
        progress = 0; // No bars filled
        message = "Cancelled";
        subMessage = "Your order has been cancelled";
        break;
      default:
        progress = 0;
        message = "Unknown status";
        subMessage = "";
    }

    return { message, subMessage, timeRange, progress };
  };

  // Handle loading and error states
  if (orderLoading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (orderError) {
    if (orderError.message.includes("Order not found")) {
      return (
        <div className="text-center py-10 text-red-600">
          Error: Order not found. Please check the order ID or contact support !
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

  const { message, subMessage, timeRange, progress } = getStatusDetails(order.status, order.createdAt);

  // Determine the image based on the status
  const statusImage = statusImages[order.status.replace(" ", "_")] || statusImages.Pending;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-12 text-center text-gray-800">Track Your Order</h1>

        {/* Header Section */}
        <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
          <div className="flex-1">
            <p className="text-sm text-gray-500 uppercase">Arriving by</p>
            <p className="text-lg font-semibold text-gray-800">{timeRange}</p>
            {/* Progress Bar */}
            <div className="flex mt-2 space-x-1">
              <div className={`h-2 rounded-full flex-1 ${progress >= 25 ? "bg-red-500" : "bg-gray-200"}`}></div>
              <div className={`h-2 rounded-full flex-1 ${progress >= 50 ? "bg-red-500" : "bg-gray-200"}`}></div>
              <div className={`h-2 rounded-full flex-1 ${progress >= 75 ? "bg-red-500" : "bg-gray-200"}`}></div>
              <div className={`h-2 rounded-full flex-1 ${progress >= 100 ? "bg-red-500" : "bg-gray-200"}`}></div>
            </div>
            <p className="text-md font-medium text-gray-700 mt-2">{message}</p>
            <p className="text-sm text-gray-500">{subMessage}</p>
          </div>
          <img src={statusImage} alt={`${order.status} Icon`} className="w-28 h-20 ml-6" />
        </div>

        {/* Order Details Section */}
        <div className="p-4 bg-white mt-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 uppercase mb-4">Order Details</h2>
          <div className="space-y-1">
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
            <p className="text-sm text-gray-500">Order number #{order._id.slice(-8)}</p>
            <p className="text-sm text-gray-500 mt-1">Delivery Address:</p>
            <p className="text-sm text-gray-700">
              {order.info.cus_add1}, {order.info.cus_city}, {order.info.cus_country}
            </p>
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
