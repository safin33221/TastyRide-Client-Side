import React from 'react';

const AdminDashboard = () => {
    return (
        <div className='mt-4 px-3 space-y-2'>
            <div className='grid grid-cols-4 gap-2 '>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Admin</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Users</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Restaurants</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Riders</div>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Foods</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'> Total Sales</div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
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