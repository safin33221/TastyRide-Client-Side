import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Foods = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic(


    )
    const { data: foods = [] } = useQuery({
        queryKey: ['foods', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/food/by-email/${user?.email}`)
            return res.data.data

        }

    })
    console.log(foods);
    return (
        <div>
            
        </div>
    );
};

export default Foods;