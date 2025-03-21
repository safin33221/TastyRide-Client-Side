import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { FaCheck, FaRegEdit } from 'react-icons/fa';
import AboutRestaurant from './AboutRestaurant';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useUserData from '../../../Hooks/useUserData';
import Swal from 'sweetalert2';


const RestaurantProfile = () => {
    const { user } = useAuth()
    const [userData, isPending, refetch] = useUserData()
    const axiosPublic = useAxiosPublic()
    const [restaurantName, setRestaurantName] = useState(userData?.restaurantDetails?.restaurantName);
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    console.log(userData);


    const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
    };
    const handleSaveClick = async () => {
        setIsEditing(false); // Disable edit mode
        // Here you can add logic to save the updated name to the server if needed
        console.log("Updated Restaurant Name:", restaurantName);
        try {
            const { res } = await axiosPublic.patch(`/api/restaruntProfile/${user?.email}`, { restaurantName })
            refetch()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Restaurant name change successfully",
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div>

                {/* Main Profile Content */}
                <div
                    className="relative  z-0 w-full mb-52  min-h-96 bg-cover bg-center flex items-center justify-center "
                    style={{
                        backgroundImage:
                            "url('https://i.ibb.co.com/cTCcpBZ/DALL-E-2024-12-23-19-10-48-A-beautifully-styled-restaurant-themed-banner-background-image-with-a-war.webp')",
                    }}
                >

                    <button className=' btn absolute right-10 top-5 text-slate-500 bg-slate-100 rounded-full'>Edit Cover Photo</button>


                    <div className='left-10 -bottom-50 absolute md:flex gap-10 items-center '>
                        <img src={user?.photoURL} className='  border-2  h-72 w-72  flex items-center justify-center  rounded-full z-20' alt="" />

                        <div>
                            {/* Toggle between input and text */}
                            {isEditing ? (
                                <div className="flex items-center gap-4">
                                    <input
                                        type="text"
                                        defaultValue={userData?.restaurantDetails?.restaurantName}
                                        onChange={(e) => setRestaurantName(e.target.value)}
                                        className="text-4xl font-bold border-b-2 outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={handleSaveClick}
                                        className="text-green-500 text-2xl btn"
                                    >
                                        save
                                    </button>
                                </div>
                            ) : (
                                <h1 className="text-4xl font-bold flex gap-4">
                                    {userData?.restaurantDetails?.restaurantName}
                                    <span
                                        onClick={handleEditClick}
                                        className="cursor-pointer text-gray-500"
                                    >
                                        <FaRegEdit />
                                    </span>
                                </h1>
                            )}

                            <div className="flex gap-5">
                                <h1 className="text-2xl text-gray-500">1k Follower</h1>
                                <h1 className="text-2xl text-gray-500">3.4 Review</h1>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='divider divide-black'></div>

                {/* name of each tab group should be unique */}
                <div className="tabs tabs-border">
                    <input type="radio" name="my_tabs_2" className="tab text-xl" aria-label="Foods" />
                    <div className="tab-content border-base-300  p-10">Tab content 1</div>

                    <input type="radio" name="my_tabs_2" className="tab text-xl" aria-label="About" defaultChecked />
                    <div className="tab-content border-base-300  p-10">
                        <AboutRestaurant />
                    </div>

                    <input type="radio" name="my_tabs_2" className="tab text-xl" aria-label="Followers" />
                    <div className="tab-content border-base-300  p-10">Tab content 3</div>
                </div>



            </div>


        </div>
    );
};

export default RestaurantProfile;