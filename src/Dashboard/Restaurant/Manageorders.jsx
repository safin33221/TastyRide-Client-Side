import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/orders/seller/${user?.email}`);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error("Failed to fetch orders");
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await axiosPublic.put(`/api/orders/${orderId}`, { status });
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update order status");
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user?.email]);

      Swal.fire("Success", "Order status updated", "success");
    },
    onError: (error) => {
      console.error("Error updating order:", error);
      Swal.fire("Error", error.message || "Failed to update order status", "error");
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: async (orderId) => {
      const response = await axiosPublic.delete(`/api/orders/${orderId}`);
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete order");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user?.email]);
      Swal.fire("Deleted", "Order has been deleted", "success");
    },
    onError: (error) => {
      console.error("Error deleting order:", error);
      Swal.fire("Error", error.message || "Failed to delete order", "error");
    },
  });

  const handleStatusChange = async (orderId, newStatus, order) => {
    console.log(order);
    const notification = {
      to_email: order.info.cus_email,
      from_email: order?.restaurantEmail,
      title: `Your order is now ${newStatus}!`,
      type: "order_update",       // or "promotion", "message", etc.
      read: false,
      data: order,
      createdAt: new Date()
    }

    await updateOrderMutation.mutate({ orderId, status: newStatus })
    console.log(notification);
    const { res } = await axiosPublic.post('/api/notifications', notification)
    console.log(res);

  };

  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteOrderMutation.mutate(orderId);
    }
  };

  if (isLoading) return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
        Manage Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border table-auto rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-sm sm:text-base">
              <th className="py-2 px-4 border whitespace-nowrap">Order ID</th>
              <th className="py-2 px-4 border whitespace-nowrap">Customer</th>
              <th className="py-2 px-4 border whitespace-nowrap">Items</th>
              <th className="py-2 px-4 border whitespace-nowrap">Total</th>
              <th className="py-2 px-4 border whitespace-nowrap">Status</th>
              <th className="py-2 px-4 border whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 text-center text-sm sm:text-base text-gray-600"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 text-sm sm:text-base"
                >
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    {order.info.cus_name}
                  </td>
                  <td className="py-2 px-4 border">
                    {order.cart.map((item, index) => (
                      <div key={index}>
                        {item.name} (x{item.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    ${order.total_amount}
                  </td>
                  <td className="py-2 px-4 border whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value, order)
                      }
                      className="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={updateOrderMutation.isLoading}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Cooking">Cooking</option>
                      {/* <option value="On-the-Way">On-the-Way</option> */}
                      {/* <option value="Delivered">Delivered</option> */}
                    </select>
                  </td>
                  <td className="py-2 px-4 border space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      disabled={deleteOrderMutation.isLoading}
                    >
                      {deleteOrderMutation.isLoading &&
                      deleteOrderMutation.variables === order._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;