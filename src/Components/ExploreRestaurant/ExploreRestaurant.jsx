import React from 'react';
import SectionTitle from '../../Shared/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link } from 'react-router';

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
    // console.log(restaurant);
    return (
        <div className='pb-10'>
            <SectionTitle
                title={`SavorSphere: Discover Culinary Treasures`}
                desc={` Where Every Bite Tells a Story – Explore Hidden Gems, Local Flavors & Global Delights`}
            />


            <div className='grid gird-col-1 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 gap-2'>

                {

                    (
                        restaurant?.map(data => (
                            data.restaurantDetails != null && (

                                <Link key={data._id} to={`/restaurantProfile/${data.email}`}>
                                    <div className=" bg-gray-100 hover:shadow-2xl hover:cursor-pointer rounded-xl shadow-md overflow-hidden border border-gray-200 mx-2 md:mx-0 ">
                                        <img className="w-full h-48 object-cover" src={data.restaurantDetails.coverPhoto} alt="Best Indian Biryani" />
                                        <div class="p-4 space-y-2">
                                            <div className='flex items-center gap-2'>
                                                <img className='w-8 rounded-full ' src={data.restaurantDetails.profilePhoto} alt="" />
                                                <h3 className="text-lg font-semibold text-gray-800">{data.restaurantDetails.restaurantName}</h3>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500 gap-2">
                                                <span>৳৳</span>
                                                <span>•</span>
                                                <span>Fast Food</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-500 text-base">★</span>
                                                    <span>3.4</span>
                                                    <span className="text-gray-400">(100+)</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span>⏱️ 45–70 min</span>
                                                    <span className="text-pink-500 font-medium">• Free</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            )
                        ))
                    )
                }

            </div>


        </div>
    );
};

export default ExploreRestaurant;