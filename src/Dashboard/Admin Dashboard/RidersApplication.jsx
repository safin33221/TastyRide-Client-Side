import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const RidersApplication = () => {
    const axiosPublic = useAxiosPublic()
    const { data: application, isLoading: applicationLoading } = useQuery({
        queryKey: ['application'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/riders-applications')
            return res.data
        }
    })
    console.log(application);
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Rider Application</h1>
            
        </div>
    );
};

export default RidersApplication;