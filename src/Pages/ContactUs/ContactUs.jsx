import React from 'react';
import SectionDivider from '../../Shared/SectionDivider';
import { Link } from 'react-router';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const ContactUs = () => {
    return (
        <div>
            {/* Banner Section */}
            <div
                className="relative h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('https://i.ibb.co.com/RkxYfTX3/tasty-pizza-near-ingredients-23-2147772080.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-5xl font-bold">CONTACT US</h1>
                    <p className="text-gray-200 text-xl mt-3">
                        Have any questions? We’d love to hear from you. Reach <br /> out to us via phone, email, or by filling out the form below.  via email phone .
                    </p>

                </div>
            </div>
            <div className='flex justify-start py-5 max-w-7xl mx-auto'>
                <nav>
                    <Link to="/" className="text-gray-500">Home</Link> <span> &gt; </span>
                    <span className="text-red-500">Contact Us</span>
                </nav>
            </div>

            {/* Contact Info Section */}
            <div className='bg-gray-100 py-16'>
                <div className='bg-white  max-w-7xl mx-auto p-8   '>
                   
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-10 mb-10">

                        {/* Phone Section */}
                        <div className="flex flex-col items-center space-y-2 border-r-2 border-gray-200 pr-4">
                            <FaPhoneSquareAlt className="text-4xl text-gray-600" />
                            <p className="text-gray-700 text-lg font-bold">PHONE</p>
                            <p className="text-gray-500">Phone 01: (0091) 8547 632521</p>
                            <p className="text-gray-500">Phone 02: (084) 965 4788</p>
                        </div>

                        {/* Address Section */}
                        <div className="flex flex-col items-center space-y-2 border-r-2 border-gray-200 pr-4">
                            <MdLocationOn className="text-4xl text-gray-600" />
                            <p className="text-gray-700 text-lg font-bold">ADDRESS</p>
                            <p className="text-gray-500 text-center">
                                5Th Floor, AH Building, 756 New St, Banasree, Dhaka,  Bangladesh.
                            </p>
                        </div>

                        {/* Email Section */}
                        <div className="flex flex-col items-center space-y-2">
                            <MdEmail className="text-4xl text-gray-600" />
                            <p className="text-gray-700 text-lg font-bold">EMAIL</p>
                            <p className="text-gray-500">support@testyride.com</p>
                            <p className="text-gray-500">hello@testyride.com</p>
                        </div>

                    </div>
                    <SectionDivider />

                    {/* Contact Form */}
                    <div className='max-w-5xl mx-auto mb-10'>
                        <h2 className="text-center text-3xl font-bold text-gray-700 mb-10">If You Got Any Questions, <br /> Please Do Not Hesitate to Send Us a Message.</h2>
                        <form >
                            <input type="text" placeholder="Your Name" className="w-full bg-gray-100 p-3  mb-4" />
                            <input type="email" placeholder="Your Email" className="w-full p-3 bg-gray-100 mb-4" />
                            <input type="text" placeholder="Subject" className="w-full p-3 bg-gray-100 mb-4" />
                            <textarea placeholder="Message" className="w-full p-3 bg-gray-100 h-48 mb-4"></textarea>
                            <div className='flex items-center justify-center'>
                                <button type="submit" className=" md:px-6  bg-black text-white py-4  hover:bg-red-500">SEND MESSAGE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;