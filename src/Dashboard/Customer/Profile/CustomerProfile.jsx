import { useState } from "react";
import { FaCog, FaEdit, FaHistory, FaMapMarkerAlt } from "react-icons/fa";
import useUserData from "../../../Hooks/useUserData";
import { IoIosReverseCamera } from "react-icons/io";
import { imageUpload } from "../../../Utils/Utils";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import SectionDivider from "../../../Shared/SectionDivider";
import { useQuery } from "@tanstack/react-query";
import { FaVoicemail } from "react-icons/fa6";
import { MdCall, MdEmail, MdOutlineEmail } from "react-icons/md";

function CustomerProfile() {
  const { UpdateUserProfile, user } = useAuth();
  const [userData, isPending, refetch] = useUserData();
  const axiosPublic = useAxiosPublic();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(userData?.username);
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(userData?.phone);
  const [updatedAddress, setUpdatedAddress] = useState(userData?.address);
  const [updatedProfilePic, setUpdatedProfilePic] = useState(userData?.photo);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  //   profile photo change functionality start --------------------------------------
  const handleFileInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleProfileSelcet = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePhotoFile(file);
    }
  };

  //   profile photo change functionality end --------------------------------------

  //   updating user data start ----------------------------------------------------

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleUpdateUserData = async () => {
    setIsEditing(false);
    let profilePhoto = userData?.photo;
    if (profilePhotoFile) {
      profilePhoto = await imageUpload(profilePhotoFile);
    }
    const updatedUser = {
      ...userData,
      username: updatedName,
      photo: profilePhoto,
      phone: updatedPhoneNumber,
      address: updatedAddress,
    };

    try {
      // update username and image in firebase
      await UpdateUserProfile(updatedName, profilePhoto);

      // update user data in database
      await axiosPublic.patch(`/api/users/${userData?.email}`, updatedUser);

      refetch();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User Profile changed successfully",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  //   updating user data end ------------------------------------------------------

  

  const {
    data: followedRestaurants = [],
    refetch: reload
  } = useQuery({
    queryKey: ["restaurants", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/users/following-restaurants/${user?.email}`);
      console.log(res.data);

      return res?.data;
    },
    enabled: !!user?.email 
  });

  // hamdle unfollow
  const handleUnfollow = async (restaurantEmail) => {
    const res = await axiosPublic.patch(`/api/restaurant/follow`, { userEmail: user?.email, restaurantEmail });
    if(!res?.data?.isFollowing){
      await Swal.fire({
                title: "Unfollow!",
                text: "You unfollowed the restarunt successfully!",
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#ef4444",
                timer: 3000,
                timerProgressBar: true,
              });
    }
    reload();
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <div className="container mx-auto px-4 my-6">

        {/* user profile */}
        <div className="card bg-gray-100 py-10 shadow-xl p-5  mt-8 md:mt-10 lg:mt-12">
          <div className="flex flex-col md:flex-row justify-center items-center ">
            {/* user profile image */}
            <div className="w-full md:w-1/2 flex flex-col justify-center  items-center">
              <div className="relative">
                <img
                  src={updatedProfilePic || userData?.photo}
                  alt="Profile"
                  className="w-64 h-64 m-auto  rounded-full border-4 border-red-500"
                />
                {isEditing && (
                  <label className="absolute bottom-6 -right-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileSelcet}
                      id="fileInput"
                    />
                    <button>
                      <IoIosReverseCamera
                        onClick={handleFileInputClick}
                        className="text-5xl bg-white border rounded-full cursor-pointer"
                      />
                    </button>
                  </label>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2">
              {/* user informations */}
              <div className="flex flex-col items-center md:items-start space-y-2">
                {/* ------------------------ user name start ------------------------ */}
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={userData?.username}
                    placeholder="Write Your Name"
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold border-b-2 outline-none focus:border-red-500 flex items-center gap-2 "
                  />
                ) : (
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    {updatedName || userData?.username}
                  </h2>
                )}
                {/* ------------------------ user name end ------------------------ */}

                {/* ------------------------ user email start ------------------------ */}
                <p className="flex items-center gap-2  text-2xl w-full">
                  <MdEmail className="text-red-500" /> {userData?.email}
                </p>
                {/* ------------------------ user email end ------------------------ */}

                {/* ------------------------ user phone number start ------------------------ */}

                {isEditing ? (
                  <div className="flex items-center gap-2  text-2xl w-full">
                    <MdCall className="text-red-500 " />
                    <input
                      type="text"
                      defaultValue={userData?.phone}
                      placeholder="Write Your Phone Number"
                      onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                      className="text-xl md:text-2xl mt-2 border-b-2 outline-none focus:border-red-500"
                    /></div>
                ) : (
                  <p className="text-gray-600 text-xl md:text-2xl flex items-center gap-2 w-full ">
                    <MdCall className="text-red-500 " />{updatedPhoneNumber || userData?.phone || "+8801 *********"}
                  </p>
                )}
              </div>
              {/* ------------------------ user phone number end ------------------------ */}


              {/* ------------------------ user address start ------------------------ */}
              <div className="flex items-center gap-3 text-lg mt-2">
                {isEditing ? (
                  <div className="flex items-center gap-2 text-2xl w-full">
                    <FaMapMarkerAlt className="text-red-500" />
                    <input
                      type="text"
                      defaultValue={userData?.address}
                      placeholder="Write Your Address"
                      onChange={(e) => setUpdatedAddress(e.target.value)}
                      className="text-xl md:text-2xl border-b-2 outline-none focus:border-red-500 "
                    />
                  </div>
                ) : (
                  <span className="text-gray-600 text-xl md:text-2xl flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    {updatedAddress ||
                      userData?.address ||
                      "Add your address"}
                  </span>
                )}

                {/* ------------------------ user address end ------------------------ */}
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end ">
            {isEditing ? (
              <div className="flex gap-2 w-full md:w-1/2 items-end justify-end text-right">

                <button
                  onClick={() => {setIsEditing(false)}}
                  className="btn bg-red-600 hover:text-white w-1/2 "
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUserData}
                  className="btn bg-green-600 hover:text-white w-1/2 "
                >
                  Save Profile Update
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="w-full md:w-1/2 text-center py-2 px-5 bg-red-500  text-white font-semibold cursor-pointer select-none hover:bg-red-600 border-2 border-red-500 hover:border-red-600 transition-all scale-100 active:scale-90"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <SectionDivider />

        {/* Followed Restaurants */}
        <div className="w-full mt-8 md:mt-10  lg:mt-12">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
            Followed Restaurants
          </h3>
          {followedRestaurants?.isFollowing ? (
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {followedRestaurants?.restaurants.map((restaurant) => (
                <div className="p-4 border border-base-300 hover:border-red-500/20 transition min-h-full flex flex-col justify-between">
                  <div
                    key={restaurant._id}
                    className="restaurant-item flex items-center gap-6 lg:gap-3 justify-center mb-4"
                  >
                    {/* restaurant profile image */}
                    <div className="flex items-center">
                      <div className="avatar">
                        <div className="w-20 h-20 rounded-full border-2 border-red-500">
                          <img src={restaurant?.logo} alt={restaurant?.businessName} />
                        </div>
                      </div>

                    </div>
                    <div className="flex flex-col">
                      {/* restaurant name */}
                      <span className="font-medium">{restaurant?.businessName}</span>
                      {/* unfollow button */}
                      <button
                        onClick={() => handleUnfollow(restaurant?.email)}
                        className="btn btn-sm btn-outline mt-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
                      >
                        Unfollow
                      </button>
                    </div>
                  </div>
                  {/* go to restaurant button */}
                  <Link to={`/restaurantProfile/${restaurant?.email}`}>
                    <button className="w-full text-center py-2 px-5 bg-red-500  text-white font-semibold cursor-pointer select-none 
                    hover:bg-red-600 border-2 border-red-500 hover:border-red-600 transition-all ">
                      Go To Restaurant
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              You are not following any restaurant.
            </p>
          )}
        </div>

        {/* Additional Links */}
        <div className="w-full mt-8 md:mt-10  lg:mt-12 space-y-2">
          <div className="flex items-center gap-3 text-lg hover:text-red-600 cursor-pointer">
            <FaHistory />
            <span>Order History</span>
          </div>
          <div className="flex items-center gap-3 text-lg hover:text-red-600 cursor-pointer">
            <FaCog />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
