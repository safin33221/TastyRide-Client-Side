import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// Placeholder images (replace with actual URLs or local assets)
const foodImage1 = "https://via.placeholder.com/80x80.png?text=Food+1";
const foodImage2 = "https://via.placeholder.com/80x80.png?text=Food+2";
const backgroundFoodImage = "https://via.placeholder.com/300x200.png?text=Food+Background";

const OrderTracking = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Fetch user's orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["userOrders", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/orders/user/${user?.email}`);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error("Failed to fetch orders ....");
    },
  });

  // Function to map status to messages and estimated time
  const getStatusDetails = (status) => {
    switch (status) { 
      case "Pending":
        return {
          message: "Order placed",
          subMessage: "We have received your order",
          timeRange: "20:45 – 21:00", // Placeholder, replace with dynamic logic
        };
      case "Cooking":
        return {
          message: "Preparing your order",
          subMessage: "The rider is waiting at the restaurant",
          timeRange: "20:45 – 21:00",
        };
      case "On the Way":
        return {
          message: "On the way",
          subMessage: "Your order is on its way",
          timeRange: "20:45 – 21:00",
        };
      case "Delivered":
        return {
          message: "Delivered",
          subMessage: "Your order has been delivered",
          timeRange: "Delivered",
        };
      default:
        return {
          message: "Unknown status",
          subMessage: "",
          timeRange: "",
        };
    }
  };

  if (isLoading) return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Track Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const { message, subMessage, timeRange } = getStatusDetails(order.status);
            return (
              <div key={order._id} className="border rounded-lg shadow-sm bg-white">
                {/* Header Section */}
                <div className="bg-gray-50 p-4 rounded-t-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Arriving by</p>
                    <p className="text-lg font-semibold text-gray-800">{timeRange}</p>
                    <p className="text-md font-medium text-gray-700 mt-1">{message}</p>
                    <p className="text-sm text-gray-500">{subMessage}</p>
                  </div>
                  <img
                    src="https://via.placeholder.com/50.png?text=Cooking"
                    alt="Status Icon"
                    className="w-12 h-12"
                  />
                </div>

                {/* Order Details Section */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      {/* Food Images */}
                      {order.cart.slice(0, 2).map((item, index) => (
                        <img
                          key={index}
                          src={item.image || (index === 0 ? foodImage1 : foodImage2)}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      ))}
                    </div>
                    <p className="text-lg font-semibold text-pink-600">Tk {order.total_amount}</p>
                  </div>

                  <div className="mt-4">
                    <p className="text-lg font-semibold text-gray-800">
                      Kacchi Ghar - Banani
                    </p>
                    <p className="text-sm text-gray-500">
                      Order number #{order._id.slice(-8)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Delivery Address:</p>
                    <p className="text-sm text-gray-700">
                      {order.info.cus_add1}, {order.info.cus_city}, {order.info.cus_country}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Dhaka</p>
                    <p className="text-sm text-gray-700">
                      Flat Number: Block F road-1 house-5
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Note to rider: none</p>
                    <p className="text-sm text-gray-700">less</p>
                  </div>

                  {/* Items Summary */}
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      View Details ({order.cart.length} items)
                    </p>
                    <p className="text-lg font-semibold text-pink-600">Tk {order.total_amount}</p>
                  </div>
                </div>

                {/* Background Image */}
                <div
                  className="h-32 bg-cover bg-center rounded-b-lg"
                  style={{ backgroundImage: `url(${backgroundFoodImage})` }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;