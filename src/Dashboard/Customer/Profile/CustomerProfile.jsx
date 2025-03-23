import { useState } from "react";
import { FaCog, FaEdit, FaHistory, FaMapMarkerAlt } from "react-icons/fa";


function CustomerProfile() {
    const [user, setUser] = useState({
        name: "Khairun Nahar",
        email: "khairun@example.com",
        phone: "+880123456789",
        address: "Cumilla, Bangladesh",
        profilePic: "https://i.pravatar.cc/150?img=3",
      });
    
      return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
          <div className="card w-96 bg-white shadow-xl p-5 rounded-lg">
            <div className="flex flex-col items-center">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-primary"
              />
              <h2 className="text-xl font-bold mt-3">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
    
            <div className="divider"></div>
    
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-lg">
                <FaMapMarkerAlt className="text-primary" />
                <span>{user.address}</span>
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