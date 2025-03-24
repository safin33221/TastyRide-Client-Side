import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import PrimaryButton from "../../Shared/PrimaryButton";

const PostAdvertisement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const [ad, setAd] = useState({
    title: "",
    description: "",
    image: null, // Image should be a File object, not a string
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (files.length > 0) {
        setAd({ ...ad, image: files[0] }); // Store the file object
        Swal.fire({
          icon: "success",
          title: "Image Selected!",
          text: "Your Ad image has been successfully selected.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } else {
      setAd({ ...ad, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!ad.image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload an image!",
      });
      return;
    }

    try {
      // 1️⃣ Upload image to ImgBB
      const imgData = new FormData();
      imgData.append("image", ad.image);

      const image_hosting_key = import.meta.env.VITE_IMGBB_API;

      const imgBBRes = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        imgData
      );

      if (imgBBRes.data.success) {
        const imageUrl = imgBBRes.data.data.url;

        // 2️⃣ Send data to backend
        const newAd = {
          title: ad.title,
          description: ad.description,
          image: imageUrl, // Store the uploaded image URL
          addedBy: user.email,
        };

        const response = await axiosPublic.post("/api/ad", newAd);

        if (response.data.success) {
          // SweetAlert2: Ad posted success
          await Swal.fire({
            icon: "success",
            title: "Ad Posted. Wait for admin response!",
            text: "Your Ad has been successfully Posted.",
            confirmButtonText: "Go to Advertisement Page",
          });
          navigate("/dashboard/ad");
        } else {
          throw new Error(
            response.data.message || "Backend did not return success"
          );
        }
      } else {
        throw new Error("Image upload to ImgBB failed");
      }
    } catch (error) {
      console.error("Error adding ad:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add ad item. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Post New Advertisement
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={ad.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter ad title"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={ad.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Enter description"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ad Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full text-sm text-gray-500"
                />
              </div>
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full">
            {loading ? (
              <PrimaryButton text={"Posting..."} />
            ) : (
              <PrimaryButton text={"Post Ad"} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAdvertisement;
