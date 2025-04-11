import React from 'react';
import useUserData from '../../../Hooks/useUserData';

const ManageFollowers = () => {

    const [userData, isPending, refetch] = useUserData()
    return (

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>


                    <tr>
                        <th>No</th>
                        <th>Email</th>
                       
                    </tr>
                </thead>
                <tbody>

                    {userData?.restaurantDetails?.followers?.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="py-4 text-center">
                                No food items found.
                            </td>
                        </tr>
                    ) : (
                        userData?.restaurantDetails?.followers.map((user, idx) => (
                            <tr key={user._id} className="hover:bg-gray-100 text-2xl font-bold">
                                <td>{idx + 1} </td>

                                <td className='text-2xl font-bold'>{user}</td>
                               
                            </tr>
                        ))
                    )}


                </tbody>
            </table>
        </div>
        // <div>
        //     {
        //         userData?.restaurantDetails?.followers?.map(user => (
        //             <h1>{user}</h1>
        //         ))
        //     }
        // </div>
    );
};

export default ManageFollowers;