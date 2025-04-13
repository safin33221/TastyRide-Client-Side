import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import {
    PieChart, Pie, Cell, Legend, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import moment from 'moment/moment';

const AdminDashboard = () => {
    const axiosPublic = useAxiosPublic()

    // -----------------------------------------Fetch Users Data
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const userRes = await axiosPublic.get(`/api/users`)
            return userRes.data
        }

    })
    //-------------------------------------------Fetch Orders Data
    const { data: foods = [] } = useQuery({
        queryKey: ['foods'],
        queryFn: async () => {
            const foodRes = await axiosPublic.get('/api/foods')
            return foodRes.data.data
        }
    })
    //-------------------------------------------Fetch Orders Data
    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const ordersRes = await axiosPublic.get('/api/allOrders')
            return ordersRes.data
        }
    })
    console.log(orders);



    const TotalAdmin = users?.filter(user => user.role === 'admin')
    const TotalCustomers = users?.filter(user => user.role === 'customer')
    const TotalRestaurant = users?.filter(user => user.role === 'restaurant')
    const TotalRiders = users?.filter(user => user.role === 'riders')



    // Format orders to use in chart
    const chartData = orders?.map(order => ({
        date: moment(order?.createdAt).format("MMM D, h:mm A"),
        amount: order.info.total_amount
    }));

    const orderStatuses = ["Pending", "Cooking", "On The Way", "Delivered", "Canceled"];

    const statusSummary = orderStatuses.map((status) => ({
        name: status,
        value: orders?.filter((order) => order.status === status).length,
    }));

    const COLORS = ["#facc15", "#60a5fa", "#38bdf8", "#22c55e", "#ef4444"];

    return (
        <div className='mt-4 px-3 space-y-2'>


            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 '>
                <div className='shadow hover:shadow-xl transition-all duration-200 hover:bg-indigo-100 h-28 rounded-xl flex items-center justify-center text-xl  uppercase  font-bold text-center '>
                    "{TotalAdmin?.length || 0}" <br /> Admin
                </div>
                <div className='shadow hover:shadow-xl transition-all duration-200 hover:bg-indigo-100 h-28 rounded-xl flex items-center justify-center text-xl  uppercase  font-bold text-center '>
                    "{TotalCustomers?.length}" <br /> Customers
                </div>
                <div className='shadow hover:shadow-xl transition-all duration-200 hover:bg-indigo-100 h-28 rounded-xl flex items-center justify-center text-xl  uppercase  font-bold text-center '>
                    "{TotalRestaurant?.length}" <br /> Restaurants
                </div>
                <div className='shadow hover:shadow-xl transition-all duration-200 hover:bg-indigo-100 h-28 rounded-xl flex items-center justify-center text-xl  uppercase  font-bold text-center '>
                    "{TotalRiders?.length}" <br /> Riders
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div className='border h-28 rounded-xl flex items-center justify-center text-xl  uppercase  font-bold text-center '>
                    {foods?.length} <br /> Total Foods
                </div>
                <div className='border h-28 rounded-xl flex items-center justify-center text-xl  uppercase  font-bold text-center '>
                    {orders?.length} <br /> Total Sales
                </div>
            </div>


            <div className='grid md:grid-cols-2 gap-2'>
                <div className='  rounded-xl flex items-center justify-center'>

                    <div className="p-6  rounded-xl shadow-lg w-full max-w-4xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-4 text-center">📈 Sales Overview</h2>
                        <ResponsiveContainer width="100%" height={400} >
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
                                <YAxis />
                                <Tooltip formatter={(value) => `৳${value}`} />
                                <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='  rounded-xl flex items-center justify-center'>
                    <div className="p-6  rounded-xl shadow-md w-full max-w-3xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            🚀 Order Status Summary
                        </h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={statusSummary}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={40} // donut style
                                    label
                                >
                                    {statusSummary.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} Orders`} />
                                <Legend verticalAlign="bottom" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
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