import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useUserData from '../../../Hooks/useUserData';

const AboutRestaurant = () => {
    const { user } = useAuth()
    const [userData, isPending, refetch] = useUserData()
    console.log(userData);
    const axiosPublic = useAxiosPublic()
    const [isEditing, setIsEditing] = useState(false)
    const [description, setDescription] = useState(userData?.restaurantDetails?.description)


    const handleEditClick = () => {
        setIsEditing(true)
    }
    const handleSaveClick = async () => {
        setIsEditing(false)
        console.log(description);

        try {
            await axiosPublic.patch(`/api/restaruntProfile/${user?.email}`, { description })
            refetch()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Description change successfully",
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className='border-b  min-h-32 p-10 relative'>
                {
                    isEditing ?
                        <>
                            <textarea
                                onChange={(e) => setDescription(e.target.value)}
                                cols={100}
                                rows={5}
                                type="text"
                                className='text-xl font-medium p-4'
                                defaultValue={description}
                                placeholder='Description'
                            />
                            <button
                                onClick={handleSaveClick}
                                className='btn m-5'> Save</button>
                        </>
                        :
                        <>
                            <p className='text-xl font-medium'>{userData?.restaurantDetails?.description || 'N/A'} </p>
                            <button onClick={handleEditClick}
                                className='btn btn-outline absolute top-1 right-3  '>Edit Bio</button>
                        </>
                }
            </div>
            <div className='  min-h-52 w-11/12 mx-auto'>
                <h1 className='text-3xl font-bold '>Others information</h1>
                <h2 className='text-2xl font-bold'>Name: <span className='text-gray-500 font-normal'>{userData?.username || ' N/A'}</span></h2>
                <h2 className='text-2xl font-bold'>Email: <span className='text-gray-500 font-normal'>{userData?.email}</span></h2>
                <h2 className='text-2xl font-bold'>Phone: <span className='text-gray-500 font-normal'>{userData?.phoneNumber || ' N/A'}</span></h2>
                <h2 className='text-2xl font-bold'>Address: <span className='text-gray-500 font-normal'>{userData?.address || ' N/A'}</span></h2>

            </div>
        </div>
    );
};

export default AboutRestaurant;