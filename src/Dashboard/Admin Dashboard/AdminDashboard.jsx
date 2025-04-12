import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const AdminDashboard = () => {
    const axiosPublic = useAxiosPublic()
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const userRes = await axiosPublic.get(`/api/users`)
            return userRes.data
        }

    })
    const TotalAdmin = users?.filter(user => user.role === 'admin')
    const TotalCustomers = users?.filter(user => user.role === 'customer')
    const TotalRestaurant = users?.filter(user => user.role === 'restaurant')
    const TotalRiders = users?.filter(user => user.role === 'riders')

    return (
        <div className='mt-4 px-3 space-y-2'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 '>
                <div className='border h-28 rounded-xl flex items-center justify-center text-xl bg-indigo-200 uppercase  font-bold text-center '>
                     {TotalAdmin.length || 0} <br /> Admin
                </div>
                <div className='border h-28 rounded-xl flex items-center justify-center text-xl bg-indigo-200 uppercase  font-bold text-center '>
                      {TotalCustomers?.length} <br /> Customers
                </div>
                <div className='border h-28 rounded-xl flex items-center justify-center text-xl bg-indigo-200 uppercase  font-bold text-center '>
                     {TotalRestaurant?.length} <br /> Restaurants
                </div>
                <div className='border h-28 rounded-xl flex items-center justify-center text-xl bg-indigo-200 uppercase  font-bold text-center '>
                     {TotalRiders?.length} <br /> Riders
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Foods</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'> Total Sales</div>
            </div>
            <div className='grid md:grid-cols-2 gap-2'>
                <div className='border h-80 rounded-xl flex items-center justify-center'>Sales Overview by Date</div>
                <div className='border h-80 rounded-xl flex items-center justify-center'> Pi cahrt Order Status Summary Pending Cooking On The Way Delivered Canceled</div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Positive Review</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'> Negative Review</div>
            </div>
            <div>
                <div className='border mb-2 h-28 rounded-xl flex items-center justify-center'> Top 5 Selling Foods</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'> Food Data</div>

            </div>
            <div className=' gap-2'>
                <div className='border h-80 rounded-xl flex items-center justify-center'>Recent orders details</div>

            </div>
        </div>
    );
};

export default AdminDashboard;