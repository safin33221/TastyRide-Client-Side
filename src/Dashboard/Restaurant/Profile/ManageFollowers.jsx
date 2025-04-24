import React from 'react';
import useUserData from '../../../Hooks/useUserData';
import useRestaurantData from '../../../Hooks/useRestaurantData';

const ManageFollowers = () => {

    const [userData, isPending, refetch] = useUserData()
    const [restaurantData, isResDataPending, isResDataRefetch] = useRestaurantData()
    return (

        <div className="overflow-x-auto rounded-box mx-auto md:w-11/12 border border-base-content/5 bg-base-100 w-full">
            <table className="table overflow-x-auto">
                {/* head */}
                <thead>


                    <tr>

                        <th>Email</th>

                    </tr>
                </thead>
                <tbody>

                    {restaurantData?.followers?.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="py-4 text-center">
                                No  Follower Yet .
                            </td>
                        </tr>
                    ) : (
                        userData?.restaurantDetails?.followers.map((user, idx) => (
                            <tr key={userData._id} className=" md:text-xl ">
                                {/* <td>{idx + 1} </td> */}

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