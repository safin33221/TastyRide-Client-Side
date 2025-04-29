import { Link } from "react-router";


const BecomePartner = () => {
    return (
        <div className=" px-4 md:px-0 md:flex justify-center md:space-x-auto lg:space-x-44 overflow-x-auto">
            <div className="relative w-full h-90 rounded-lg mb-8 md:mb-0 overflow-hidden shadow-lg">
                <img
                    src="https://i.ibb.co.com/9Hp34f7j/handshake-businessmen-1098-742.jpg"
                    alt="Become a Partner"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h2 className="text-white text-2xl ">List Your Restaurant on TestyRide</h2>
                    
                   <Link to="/restaurant-register-form"> 
                   <button
                        type="button"
                        className=" bg-red-500 mt-6 text-white cursor-pointer py-2 px-4 text-xl  hover:bg-red-600 md:w-48"
                    >
                        Become a Partner
                    </button>
                   </Link>
                </div>
            </div>
            <div className="relative w-full h-90 rounded-lg overflow-hidden shadow-lg">
                <img
                    src="https://i.ibb.co.com/jvBKQ1jv/a-man-riding-down-the-street-on-a-vespa-free-photo.jpg"
                    alt="Become a Partner"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0  flex flex-col justify-end p-4">
                    <h2 className="text-white text-2xl ">Become A TestyRide Hero</h2>
                   
                    <Link to="/rider-register-form">
                    <button
                        type="button"
                        link="restaurant-register-form"
                        className=" bg-red-500 cursor-pointer text-white mt-6 py-2 px-4 text-xl  hover:bg-red-600 md:w-44"
                    >
                        Become a Hero
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BecomePartner;
