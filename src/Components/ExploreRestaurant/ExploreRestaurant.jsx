import React from 'react';
import SectionTitle from '../../Shared/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const ExploreRestaurant = () => {
    const axiosPublic = useAxiosPublic()

    const { data: restaurant = [], isPending, } = useQuery({
        queryKey: 'restaurant',
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/allRestaurants`)
            return res.data
        }
    })
    if (isPending) return <p>loading</p>
    console.log(restaurant);
    return (
        <div className='pb-10'>
            <SectionTitle
                title={`SavorSphere: Discover Culinary Treasures`}
                desc={` Where Every Bite Tells a Story – Explore Hidden Gems, Local Flavors & Global Delights`}
            />


            


        </div>
    );
};

export default ExploreRestaurant;