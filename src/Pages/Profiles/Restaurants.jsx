import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Restaurants = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()

    const { data: user, isPending } = useQuery({
        queryKey: ['user', id],

        queryFn: async () => {
            const res = await axiosPublic.get(`/api/user/${id}`)
            return res.data
        }
    })


    return (
        <div>
            <div className=''>
                <img
                    className='h-[350px] w-full bg-contain bg-center flex items-center relative'
                    src={user?.restaurantDetails?.coverPhoto} alt="" />
                <img src={user?.restaurantDetails?.profilePhoto} className='rounded-full absolute bottom-16 left-10' alt="" />
            </div>

        </div>
    );
};

export default Restaurants;