import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

export default function DeliveryRequest() {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth()
  // console.log(user)

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/allOrders");
      console.log(res.data);
      return res.data;
    },
  });

  const filteredOrders = orders?.filter(prev => prev.status === "On-the-Way")

  const handleAcceptRequest = async(id) => {
    const res = await axiosPublic.patch(`/api/accepted-rider/${id}`, {acceptedBy:user?.email})
    console.log(res.data)
    const statusRes = await axiosPublic.put(`/api/orders/${id}`, {status: "Accepted"})
    console.log(statusRes.data)
    if(statusRes.data.success){
      toast.success("Order accepted")
      refetch()
    }
  }
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
                    <button onClick={() => handleAcceptRequest(order?._id)} className="btn btn-xs btn-success text-white">Accept</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
