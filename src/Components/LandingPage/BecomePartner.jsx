

const BecomePartner = () => {
    return (
        <div className="py-10 px-4 md:px-2 md:flex justify-center md:space-x-auto lg:space-x-44 overflow-x-auto">
            <div className="relative w-full h-90 rounded-lg mb-8 md:mb-0 overflow-hidden shadow-lg">
                <img
                    src="https://i.ibb.co.com/9Hp34f7j/handshake-businessmen-1098-742.jpg"
                    alt="Become a Partner"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h2 className="text-white text-2xl ">List Your Restaurant on TestyRide</h2>
                    
                    <button
                        type="button"
                        onClick={() => alert("Button Clicked!")}
                        className=" bg-red-500 mt-6 text-white py-2 px-4 text-xl text-bold hover:bg-red-600 md:w-48"
                    >
                        Become a Partner
                    </button>
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
                   
                    <button
                        type="button"
                        link="restaurant-register-form"
                        className=" bg-red-500 text-white mt-6 py-2 px-4 text-xl text-bold hover:bg-red-600 md:w-44"
                    >
                        Become a Hero
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BecomePartner;
