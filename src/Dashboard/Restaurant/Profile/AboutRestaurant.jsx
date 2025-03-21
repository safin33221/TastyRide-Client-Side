import React, { useState } from 'react';

const AboutRestaurant = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [description, setDescription] = useState('adipisicing elit. Officiis non, est perferendis odio corrupti laudantium perspiciatis repellat sint sunt, similique omnis et totam iste? Neque nihil error ducimus dolorem itaque, fugit, culpa minima quasi dignissimos harum voluptatum! Eius ullam excepturi iusto laudantium quos. Odit ipsum voluptate, hic neque excepturi a.')


    const handleEditClick = () => {
        setIsEditing(true)
    }
    const handleSaveClick = () => {
        setIsEditing(false)

        console.log(description);
    }
    return (
        <div>
            <div className='border-b  min-h-32 p-10 relative'>
                {
                    isEditing ?
                        <>
                            <textarea
                                onChange={(e)=>setDescription(e.target.value)}
                                cols={100}
                                rows={5}
                                type="text"
                                className='text-xl font-medium p-4'
                                defaultValue={description}
                                placeholder='Description'
                            />
                            <button
                                onClick={handleSaveClick}
                                className='btn m-5'> Save</button>
                        </>
                        :
                        <>
                            <p className='text-xl font-medium'>{description} </p>
                            <button onClick={handleEditClick}
                                className='btn btn-outline absolute top-1 right-3  '>Edit Bio</button>
                        </>
                }
            </div>
            <div className='  min-h-52 w-11/12 mx-auto'>
                <h1 className='text-3xl font-bold '>Owner information</h1>
                <h2 className='text-2xl font-bold'>Name: <span className='text-gray-500 font-normal'>N/A</span></h2>
                <h2 className='text-2xl font-bold'>Email: <span className='text-gray-500 font-normal'>N/A</span></h2>
                <h2 className='text-2xl font-bold'>Phone: <span className='text-gray-500 font-normal'>N/A</span></h2>
                <h2 className='text-2xl font-bold'>Address: <span className='text-gray-500 font-normal'>N/A</span></h2>
                
            </div>
        </div>
    );
};

export default AboutRestaurant;