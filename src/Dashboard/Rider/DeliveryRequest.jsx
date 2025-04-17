import React from 'react'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

export default function DeliveryRequest() {
    const axiosPublic = useAxiosPublic()

    const {data: orders=[]} = useQuery({
        queryKey:['orders'],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/allOrders")
            console.log(res.data)
            return res.data
        }
    })
  return (
    <div className='md:m-5 xl:m-10 bg-white md:p-5 xl:p-10 md:rounded-xl'>
        <h1 className='font-semibold text-2xl mb-5'>Delivery Request</h1>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          Index
        </th>
        <th>Order Id</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        orders?.map((order, i) => (
            <tr>
        <th>
          1
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{order?._id}</div>
              {/* <div className="text-sm opacity-50">United States</div> */}
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Purple</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
        ))
      }
    </tbody>
  </table>
</div>
    </div>
  )
}
