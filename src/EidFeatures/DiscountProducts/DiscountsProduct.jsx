import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import FoodCard from './FoodCard';
import SectionTitle from '../../Shared/SectionTitle';

const DiscountsProduct = () => {
    const axiosPublic = useAxiosPublic()
    const { data: foods, isPending } = useQuery({
        queryKey: ['foods'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/foods`)
            return res.data.data

        }
    })

    return (
        <div className='mb-16'>
            <SectionTitle title={`Eid Feast Specials – Indulge in Festive Flavors!` } desc={`Savor the joy of Eid with exclusive discounts on your favorite festive dishes!`} />
            <div className='grid grid-cols-5 gap-5'>
                {
                    foods?.map((food) => <>
                        <FoodCard food={food} />
                    </>)
                }
            </div>
        </div>
    );
}
export default DiscountsProduct;