import { useState } from "react";
import { FaCog, FaEdit, FaHistory, FaMapMarkerAlt } from "react-icons/fa";
import useUserData from "../../../Hooks/useUserData";
import { IoIosReverseCamera } from "react-icons/io";
import { imageUpload } from "../../../Utils/Utils";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import PrimaryButton from "../../../Shared/PrimaryButton";

function CustomerProfile() {
  const [userData, isPending, refetch] = useUserData();
  const axiosPublic = useAxiosPublic();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(userData?.username);
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
    };

    try {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-white shadow-xl p-5 rounded-lg">
        {/* user profile image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={updatedProfilePic || userData?.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-red-500"
            />
            {isEditing && (
              <label className="absolute -bottom-4 -right-2">
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
        {/* user informations */}
        <div className="flex flex-col items-center mt-4">
          {isEditing ? (
            <input
              type="text"
              defaultValue={userData?.username}
              placeholder="Write Your Name"
              onChange={(e) => setUpdatedName(e.target.value)}
              className="text-xl font-bold border-b-2 outline-none focus:border-blue-500"
            />
          ) : (
            <h2 className="text-xl font-bold">
              {updatedName || userData?.username}
            </h2>
          )}

          <p className="text-gray-600">{userData?.email}</p>
          <p className="text-gray-600">
            {userData?.phone ? userData?.phone : "+8801 *********"}
          </p>
        </div>

        <div className="divider"></div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-lg">
            <FaMapMarkerAlt className="text-red-500" />
            <span>
              {userData?.address ? userData?.address : "Add your address"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <FaHistory className="text-red-500" />
            <span>Order History</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <FaCog className="text-red-500" />
            <span>Settings</span>
          </div>
        </div>

        <div className="mt-5">
          {isEditing ? (
            <button
              onClick={handleUpdateUserData}
              className="btn btn-red-500 w-full"
            >
              Save Profile Update
            </button>
          ) : (
            <PrimaryButton text="Edit Profile" onClick={handleEditClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
