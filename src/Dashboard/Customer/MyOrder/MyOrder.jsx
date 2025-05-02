import React from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router";
import Loading from "../../../Pages/Loader/Loading";

const MyOrder = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    // Fetch user's orders
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["userOrders", user?.email],
        queryFn: async () => {
            const response = await axiosPublic.get(`/api/orders/user/${user?.email}`);
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error("Failed to fetch orders");
        },
        refetchInterval: 10000, // Poll every 10 seconds to see seller updates
    });

    // Mutation for cancelling an order
    const cancelOrderMutation = useMutation({
        mutationFn: async (orderId) => {
            const response = await axiosPublic.put(`/api/orders/cancel/${orderId}`, {
                userEmail: user?.email,
            });
            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to cancel order");
            }
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userOrders", user?.email]);
            Swal.fire("Success", "Order cancelled", "success");
        },
        onError: (error) => {
            console.error("Error cancelling order:", error);
            Swal.fire("Error", error.message || "Failed to cancel order", "error");
        },
    });

    const handleCancel = async (orderId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        });

        if (result.isConfirmed) {
            cancelOrderMutation.mutate(orderId);
        }
    };

    if (isLoading) return <Loading/>

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">My Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border table-auto rounded-md shadow-sm">
                    <thead>
                        <tr className="bg-gray-200 text-sm sm:text-base">
                            <th className="py-2 px-4 border whitespace-nowrap">Order ID</th>
                            <th className="py-2 px-4 border whitespace-nowrap">Items</th>
                            <th className="py-2 px-4 border whitespace-nowrap">Total</th>
                            <th className="py-2 px-4 border whitespace-nowrap">Status</th>
                            <th className="py-2 px-4 border whitespace-nowrap">Actions</th>
                            <th className="py-2 px-4 border whitespace-nowrap">Track</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-sm sm:text-base text-gray-600">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-100 text-sm sm:text-base">
                                    <td className="py-2 px-4 border whitespace-nowrap">{order._id.slice(-8)}</td>
                                    <td className="py-2 px-4 border">
                                        {order.cart.map((item, index) => (
                                            <div key={index}>{item.name} (x{item.quantity})</div>
                                        ))}
                                    </td>
                                    <td className="py-2 px-4 border whitespace-nowrap">Tk {order.total_amount}</td>
                                    <td className="py-2 px-4 border whitespace-nowrap">{order.status}</td>
                                    <td className="py-2 px-4 border space-x-2 whitespace-nowrap">

                                        <button
                                            onClick={() => handleCancel(order._id)}
                                            className={`btn px-3 py-1 bg-red-500 text-white  rounded-md hover:bg-red-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 `}
                                            disabled={order.status != "Pending"}
                                        >
                                            cancel
                                        </button>

                                    </td>
                                    <td className="py-2 px-4 border whitespace-nowrap">
                                        <Link to={`/order-tracking/${order._id}`}>
                                            <button className="px-3 py-1 bg-green-500 rounded-md">Track Order</button>
                                        </Link>
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

export default MyOrder;