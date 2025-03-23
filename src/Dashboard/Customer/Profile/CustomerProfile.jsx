import { useState } from "react";
import { FaCog, FaEdit, FaHistory, FaMapMarkerAlt } from "react-icons/fa";
import useUserData from "../../../Hooks/useUserData";


function CustomerProfile() {
    const [userData] = useUserData();
    console.log(userData);
    
    
      return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
          <div className="card w-96 bg-white shadow-xl p-5 rounded-lg">
            <div className="flex flex-col items-center">
              <img
                src={userData?.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-primary"
              />
              <h2 className="text-xl font-bold mt-3">{userData?.username}</h2>
              <p className="text-gray-600">{userData?.email}</p>
              <p className="text-gray-600">{userData?.phone ? userData?.phone : "+8801 *********"}</p>
            </div>
    
            <div className="divider"></div>
    
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-lg">
                <FaMapMarkerAlt className="text-primary" />
                <span>{userData?.address ? userData?.address : "Add your address"}</span>
                <FaEdit className="text-gray-500 cursor-pointer" />
              </div>
    
              <div className="flex items-center gap-3 text-lg">
                <FaHistory className="text-primary" />
                <span>Order History</span>
              </div>
    
              <div className="flex items-center gap-3 text-lg">
                <FaCog className="text-primary" />
                <span>Settings</span>
              </div>
            </div>
    
            <div className="mt-5">
              <button className="btn btn-primary w-full">Edit Profile</button>
            </div>
          </div>
        </div>
      );
}

export default CustomerProfile