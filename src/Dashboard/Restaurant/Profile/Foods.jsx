import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const Foods = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic(


    )
    const { data: menus = [] } = useQuery({
        queryKey: ['menus', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/food/by-email/${user?.email}`)
            return res.data.data

        }

    })

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
                {menus.map((menu) => (
                    <div
                        key={menu._id}
                        className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                    >
                        <figure>
                            <img
                                src={menu.image}
                                alt={menu.foodName}
                                className="w-full h-72  object-contain rounded-t-lg"
                            />
                        </figure>
                        <div className="card-body">
                            <h4 className="card-title text-lg font-semibold text-neutral">
                                {menu.foodName}
                            </h4>
                            <p className="text-sm text-gray-600">{menu.description}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-red-500 font-bold">
                                    ${menu.price.toFixed(2)}
                                </span>
                                <Link to={`/all-food/${menu._id}`}>
                                    <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white">
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Foods;