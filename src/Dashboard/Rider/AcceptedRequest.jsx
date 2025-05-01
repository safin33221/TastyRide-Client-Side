import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

export default function AcceptedRequest() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  // console.log(user)

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/allOrders");
      console.log("at accepted delivery", res.data);
      return res.data;
    },
  });

  const handleDelivered = async (id) => {
    const res = await axiosPublic.put(`/api/orders/${id}`, {
      status: "Delivered",
    });
    console.log(res.data)
    if(res.data.success){
        toast.success("Order Delivered")
        refetch()
    }
  };

  const filteredOrders = orders?.filter(
    (prev) => prev.acceptedBy === user?.email
  );
  return (
    <div className="md:m-5 xl:m-10 bg-white md:p-5 xl:p-10 md:rounded-xl">
      <h1 className="font-semibold text-2xl mb-5">Delivery Request</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Index</th>
              <th>Order Id</th>
              <th>Total Amount</th>
              <th>Restaurant Name</th>
              <th>Customer Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredOrders?.map((order, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{order?._id}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>{order?.total_amount}</td>
                <td>{order?.restaurantEmail}</td>
                <td>{order?.info?.cus_add1}</td>
                <th>
                  <button
                    onClick={() => handleDelivered(order?._id)}
                    className={`btn btn-xs ${
                      order?.status === "On-the-Way"
                        ? "btn-warning"
                        : "btn-success"
                    } text-white`}
                  >
                    {order?.status === "On-the-Way" ? "Deliver" : "Delivered"}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
