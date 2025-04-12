import React from 'react';

const AdminDashboard = () => {
    return (
        <div className='mt-4 px-3'>
            <div className='grid grid-cols-4 gap-2 '>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Admin</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Users</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Restaurants</div>
                <div className='border h-28 rounded-xl flex items-center justify-center'>Total Riders</div>
            </div>
        </div>
    );
};

export default AdminDashboard;