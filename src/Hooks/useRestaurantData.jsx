import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useUserData from './useUserData';

const useRestaurantData = () => {

    const [userData] = useUserData()
    const axiosPublic = useAxiosPublic()
    const { data: restaurantData = [], isPending: isResDataPending, refetch: isResDataRefetch } = useQuery({

        queryKey: ['restaurantData', userData?.email],
        enabled: !!userData?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/restaurant/${userData?.email}`)
            return res.data
        }
    })
    return [restaurantData, isResDataPending, isResDataRefetch]
};

export default useRestaurantData;