import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { FaCheck, FaRegEdit } from 'react-icons/fa';


const Profile = () => {
    const { user } = useAuth()
    const [restaurantName, setRestaurantName] = useState("Restaurant Name"); 
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
    };
    const handleSaveClick = () => {
        setIsEditing(false); // Disable edit mode
        // Here you can add logic to save the updated name to the server if needed
        console.log("Updated Restaurant Name:", restaurantName);
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
                                        value={restaurantName}
                                        onChange={(e) => setRestaurantName(e.target.value)}
                                        className="text-4xl font-bold border-b-2 outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={handleSaveClick}
                                        className="text-green-500 text-2xl"
                                    >
                                        <FaCheck />
                                    </button>
                                </div>
                            ) : (
                                <h1 className="text-4xl font-bold flex gap-4">
                                    {restaurantName}
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
                    <div className="tab-content border-base-300  p-10">Tab content 2</div>

                    <input type="radio" name="my_tabs_2" className="tab text-xl" aria-label="Followers" />
                    <div className="tab-content border-base-300  p-10">Tab content 3</div>
                </div>

                {/* <div className='shadow-2xl p-10 min-h-52 w-11/12 mx-auto rounded-2xl relative'>
                    <h1 className='text-3xl font-bold '>Owner information</h1>
                    <h2 className='text-2xl font-bold'>Name: <span className='text-gray-500 font-normal'>N/A</span></h2>
                    <h2 className='text-2xl font-bold'>Email: <span className='text-gray-500 font-normal'>N/A</span></h2>
                    <h2 className='text-2xl font-bold'>Phone: <span className='text-gray-500 font-normal'>N/A</span></h2>
                    <h2 className='text-2xl font-bold'>Address: <span className='text-gray-500 font-normal'>N/A</span></h2>
                    <button className='absolute top-5 right-5 btn btn-outline rounded-full text-slate-500 hover:bg-slate-100'>Edit Info</button>
                </div> */}

            </div>


        </div>
    );
};

export default Profile;