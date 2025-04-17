import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export default function DeliveryRequest() {
  const axiosPublic = useAxiosPublic();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/allOrders");
      console.log(res.data);
      return res.data;
    },
  });
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
            {orders?.map((order, i) => (
              <tr>
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
                    <button className="btn btn-xs btn-success">Accept</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
