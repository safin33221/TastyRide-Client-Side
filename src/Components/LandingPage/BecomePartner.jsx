import { Link } from "react-router";
import SectionTitle from "../../Shared/SectionTitle";


const BecomePartner = () => {
    return (
        <section className="px-4 md:px-6  lg:px-2">
            <SectionTitle
                title="Join the TestyRide Family"
                desc="Whether you're a restaurant owner or a delivery hero, partner with us today!"
            />
            <div className="  md:flex justify-center space-x-4 md:space-x-auto lg:space-x-16 overflow-x-auto">
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
        </section>

    );
};

export default BecomePartner;
