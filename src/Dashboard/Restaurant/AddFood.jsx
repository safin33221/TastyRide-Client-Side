
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { imageUpload } from "../../Utils/Utils";

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [selectPhoto, setSelectedPhoto] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)



  const [food, setFood] = useState({
    foodName: "",
    description: "",
    category: "",
    price: "",
    ingredients: "",
    availability: false,
    tags: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;


    if (type === "file") {
      setFood({ ...food, image: files[0] });
      Swal.fire({
        icon: "success",
        title: "Image Added!",
        text: "Your food image has been successfully selected.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (type === "checkbox" && name === "tags") {
      setFood({
        ...food,
        tags: checked ? [...food.tags, value] : food.tags.filter((tag) => tag !== value),
      });
    } else if (type === "checkbox" && name === "availability") {
      setFood({ ...food, availability: checked });
    } else {
      setFood({ ...food, [name]: value });
    }

    const photo = files[0]
    if (photo) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedPhoto(reader.result)
      }
      reader.readAsDataURL(photo)
    }
    setPhotoFile(photo)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!food.image) {
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
      imgData.append("image", food.image);

      const imageUrl = await imageUpload(photoFile)

      if (imageUrl) {
        

        // 2️⃣ Send data to backend
        const newFood = {
          foodName: food.foodName,
          description: food.description,
          category: food.category,
          price: Number(food.price),
          ingredients: food.ingredients.split(",").map((item) => item.trim()),
          availability: food.availability,
          tags: food.tags,
          image: imageUrl,
          addedBy: user.email,
        };

        const response = await axiosPublic.post("/api/foods", newFood);
        console.log("Backend Response:", response.data); // Log the response for debugging

        if (response.data.success) {
          // SweetAlert2: Food added success
          await Swal.fire({
            icon: "success",
            title: "Food Added!",
            text: "Your food item has been successfully added.",
            confirmButtonText: "Go to Dashboard",
          });
          navigate("/dashboard"); // Navigation happens after SweetAlert2
        } else {
          throw new Error(response.data.message || "Backend did not return success");
        }
      } else {
        throw new Error("Image upload to ImgBB failed");
      }
    } catch (error) {
      console.error("Error adding food:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add food item. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Food Item</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={food.foodName}
                  onChange={handleChange}
                  required
                  placeholder="Enter food name"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={food.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Enter description"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="md:flex w-full gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 ">Category</label>
                  <select
                    name="category"
                    value={food.category}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={food.price}
                    onChange={handleChange}
                    required
                    placeholder="Enter price"
                    className="mt-1 block w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">


              {
                selectPhoto ?
                  <div className="flex flex-row-reverse ">
                    <img src={selectPhoto} className="w-42 border border-dashed h-28 mx-auto" alt="" />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Food Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                        className="  mt-1 input file-input border-none focus:outline-none block w-full text-sm text-gray-500"
                      />
                    </div>

                  </div>
                  :
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Food Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                        className="mt-1 file-input block w-full text-sm text-gray-500"
                      />
                    </div>
                  </>
              }

              <div>
                <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                <input
                  type="text"
                  name="ingredients"
                  value={food.ingredients}
                  onChange={handleChange}
                  placeholder="List ingredients (comma-separated)"
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <input
                  type="checkbox"
                  name="availability"
                  checked={food.availability}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span className="ml-2">Available</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Special Tags</label>
                <div className="mt-1 space-x-2">
                  {["Spicy", "Vegan", "Gluten-Free"].map((tag) => (
                    <label key={tag} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="tags"
                        value={tag}
                        onChange={handleChange}
                        checked={food.tags.includes(tag)}
                        className="h-4 w-4"
                      />
                      <span className="ml-2">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Food Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;