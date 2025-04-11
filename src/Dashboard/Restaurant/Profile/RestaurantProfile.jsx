import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { FaCheck, FaRegEdit, FaUser } from 'react-icons/fa';
import AboutRestaurant from './AboutRestaurant';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useUserData from '../../../Hooks/useUserData';
import Swal from 'sweetalert2';
import { IoIosReverseCamera } from "react-icons/io";
import { imageUpload } from '../../../Utils/Utils';
import { useQuery } from '@tanstack/react-query';
import Foods from './Foods';
import ManageFollowers from './ManageFollowers';
import toast from 'react-hot-toast';



const RestaurantProfile = () => {
    const { user } = useAuth()
    const [userData, isPending, refetch] = useUserData()
    const axiosPublic = useAxiosPublic()

    const [selectProfilePhoto, setSelectedProfilePhoto] = useState(null)
    const [selectCoverPhoto, setSelectedCoverPhoto] = useState(null)

    const [profilePhotoFile, setProfilePhotoFile] = useState(null)
    const [CoverPhotoFile, setCoverPhotoFile] = useState(null)

    const [restaurantName, setRestaurantName] = useState(userData?.restaurantDetails?.restaurantName || 'N/A');
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode 






    // Change Profile Photo functionality Start-----------------------------------------------------
    const handleProfileSelcet = (e) => {
        const file = (e.target.files[0]);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedProfilePhoto(reader.result)
            }
            reader.readAsDataURL(file)
            setProfilePhotoFile(file)
        }
    }
    const handleProfileChange = async () => {
        if (profilePhotoFile) {
            const profilePhoto = await imageUpload(profilePhotoFile)
            await axiosPublic.patch(`/api/restaruntProfile/${user?.email}`, { profilePhoto })
            refetch()
            setProfilePhotoFile(null)
            setSelectedProfilePhoto(null)

        }
    }
    // Change Profile Photo functionality end------------------------------------------------------




    // Change Cover Photo functionality Start-----------------------------------------------------
    const handleCoverSelcet = (e) => {
        const file = (e.target.files[0]);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedCoverPhoto(reader.result)
            }
            reader.readAsDataURL(file)
            setCoverPhotoFile(file)
        }
    }
    const handleCoverPhotoChange = async () => {
        if (CoverPhotoFile) {
            const coverPhoto = await imageUpload(CoverPhotoFile)
            await axiosPublic.patch(`/api/restaruntProfile/${user?.email}`, { coverPhoto })
            refetch()
            setCoverPhotoFile(null)
            setSelectedCoverPhoto(null)

        }
    }
    // Change Cover Photo functionality End-----------------------------------------------------


    // Change Restaurant Name Functionality Start---------------------------------------------------
    const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
    };
    const handleSaveClick = async () => {
        setIsEditing(false); // Disable edit mode
        // Here you can add logic to save the updated name to the server if needed
        console.log("Updated Restaurant Name:", restaurantName);
        try {
            await axiosPublic.patch(`/api/restaruntProfile/${user?.email}`, { restaurantName })
            refetch()
            toast.success('Restaurant name change successfully')
        } catch (error) {
            console.log(error);
        }
    };
    // Change Restarant Name Functionality End-------------------------------------------------------





    return (
        <div>
            <div>

                {/* Main Profile Content */}

                {/* Cover Photo in background */}
                <div
                    className="relative  z-0 w-full mb-52   bg-cover bg-center flex items-center justify-center "

                >
                    <img
                            className=' w-full object-cover h-[200px]  md:h-[400px] bg-center flex items-center'
                        src={selectCoverPhoto || userData?.restaurantDetails?.coverPhoto || 'https://i.ibb.co.com/cTCcpBZ/DALL-E-2024-12-23-19-10-48-A-beautifully-styled-restaurant-themed-banner-background-image-with-a-war.webp'} alt="" />


                    <label className=' absolute top-2 right-5' >

                        {
                            CoverPhotoFile ?
                                <>
                                    <button
                                        onClick={handleCoverPhotoChange}
                                        className="text-green-500 text-xl md:text-2xl btn">
                                        save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedCoverPhoto(null)
                                            setCoverPhotoFile(null)
                                        }
                                        }
                                        className="text-red-500 mx-3 text-xl md:text-2xl btn">
                                        Cancel
                                    </button>

                                </>
                                :
                                <>
                                    <input
                                        type="file"
                                        accept='image/*'
                                        className='hidden'
                                        onChange={handleCoverSelcet}
                                        id="CoverfileInput" />


                                    <button
                                        onClick={() => document.getElementById('CoverfileInput').click()}
                                        className='text-2xl bg-white  rounded-full btn' >
                                        <FaRegEdit />
                                    </button>
                                </>
                        }

                    </label>






                    {/* Profile Photo , Name and Other Info */}
                    <div className='left-10 -bottom-50 absolute md:flex gap-10 items-center '>
                        <div className='relative'>
                            {/* Profile Image */}
                            <img src={selectProfilePhoto || userData?.restaurantDetails?.profilePhoto || 'https://i.ibb.co.com/XMyNxFf/user.jpg'}
                                className='  border-2 w-52 mx-auto  md:h-72 md:w-72  flex items-center justify-center  rounded-full z-20' alt="" />

                            <label className=' absolute bottom-10 right-1' >
                                <input
                                    type="file"
                                    accept='image/*'
                                    className='hidden'
                                    onChange={handleProfileSelcet}
                                    id="fileInput" />
                                <button

                                ><IoIosReverseCamera
                                        onClick={() => document.getElementById('fileInput').click()}
                                        className=' text-4xl md:text-5xl bg-white border rounded-full' />
                                </button>
                            </label>
                            {
                                profilePhotoFile &&
                                <div className='flex mx-auto items-center justify-center mt-5'>
                                    <button
                                        onClick={handleProfileChange}
                                        className="text-green-500 text-2xl btn">
                                        save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedProfilePhoto(null)
                                            setProfilePhotoFile(null)
                                        }
                                        }
                                        className="text-red-500 mx-3 text-2xl btn">
                                        Cancel
                                    </button>
                                </div>
                            }
                        </div>


                        {/* Restarant Name */}
                        <div className='mt-5'>
                            {/* Toggle between input and text */}
                            {isEditing ? (
                                <div className="flex items-center gap-4 flex-col md:flex-row ">
                                    <input
                                        type="text"
                                        defaultValue={userData?.restaurantDetails?.restaurantName}
                                        placeholder='Restarunt Name'
                                        onChange={(e) => setRestaurantName(e.target.value)}
                                        className=" text-xl md:text-4xl font-bold border-b-2 outline-none focus:border-blue-500"
                                    />
                                    <div className='flex gap-3'>
                                        <button
                                            onClick={handleSaveClick}
                                            className="text-green-500 text-lg md:text-2xl btn"
                                        >
                                            save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="text-red-500 text-lg md:text-2xl btn"
                                        >
                                            cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <h1 className="text-xl md:text-4xl  font-bold flex gap-4">
                                    {userData?.restaurantDetails?.restaurantName || "N/A"}
                                    <span
                                        onClick={handleEditClick}
                                        className="cursor-pointer text-gray-500"
                                    >
                                        <FaRegEdit />
                                    </span>
                                </h1>
                            )}
                            {/* Others Infomation */}
                            <div className="flex gap-5">
                                <h1 className="text-2xl text-gray-500">{userData?.restaurantDetails?.followers?.length} Follower</h1>
                                <h1 className="text-2xl text-gray-500">3.4 Review</h1>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='divider divide-black'></div>


                {/* Tabs Content */}
                {/* name of each tab group should be unique */}
                <div className="tabs tabs-border w-full">
                    <input type="radio" name="my_tabs_2" className="tab text-xl" aria-label="Foods" />
                    <div className="tab-content border-base-300  p-2">
                        <Foods />
                    </div>

                    <input type="radio" name="my_tabs_2" className="tab text-xl" aria-label="About" defaultChecked />
                    <div className="tab-content border-base-300  p-2">
                        <AboutRestaurant />
                    </div>

                    <input type="radio" name="my_tabs_2" className="tab text-xl" aria-label="Followers" />
                    <div className="tab-content border-base-300  p-2 overflow-x-auto">
                        <ManageFollowers />
                    </div>
                </div>



            </div>


        </div>
    );
};

export default RestaurantProfile;