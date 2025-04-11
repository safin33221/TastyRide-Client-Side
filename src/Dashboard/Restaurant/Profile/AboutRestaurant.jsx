import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useUserData from '../../../Hooks/useUserData';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { FaEdit } from 'react-icons/fa';

const AboutRestaurant = () => {
    const { user } = useAuth()
    const [userData, isPending, refetch] = useUserData()

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
            toast.success('Description Update successfully')
        } catch (error) {
            toast.error('Error !!')
        }
    }
    return (
        <div>
            <div className='border-b  min-h-32 p-2 md:p-10 relative'>
                {
                    isEditing ?
                        <div className='md:flex'>
                            <textarea
                                onChange={(e) => setDescription(e.target.value)}

                                type="text"
                                className='text-xl w-full md:w-11/12 border border-dashed font-medium p-4'
                                defaultValue={description}
                                placeholder='Description'
                            />
                            <button
                                onClick={handleSaveClick}
                                className='btn m-5'> Save</button>
                        </div>
                        :
                        <>
                            <p className='text-xl font-medium'>{userData?.restaurantDetails?.description || 'N/A'} </p>
                            <button onClick={handleEditClick}
                                className='btn btn-outline absolute -top-10 right-3  '>Edit Bio</button>
                        </>
                }
            </div>
            <div className='  min-h-52 w-11/12 mx-auto'>
                <h1 className='text-xl font-bold underline mb-3 flex items-center gap-3 '>Others information <Link to={`/userProfile`}><FaEdit/></Link></h1>
                <h2 className='text-2xl font-bold'>Name: <span className='text-gray-500 font-normal'>{userData?.username || ' N/A'}</span></h2>
                <h2 className='text-2xl font-bold'>Email: <span className='text-gray-500 font-normal'>{userData?.email}</span></h2>
                <h2 className='text-2xl font-bold'>Phone: <span className='text-gray-500 font-normal'>{userData?.phoneNumber || ' N/A'}</span></h2>
                <h2 className='text-2xl font-bold'>Address: <span className='text-gray-500 font-normal'>{userData?.address || ' N/A'}</span></h2>

            </div>
        </div>
    );
};

export default AboutRestaurant;