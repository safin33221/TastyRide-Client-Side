import React from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useNotification = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: notificationData, isPending } = useQuery({
        queryKey: ['notificationData', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/notifications/${user?.email}`)
            return res.data

        }

    })

    return [notificationData, isPending]
};

export default useNotification;
