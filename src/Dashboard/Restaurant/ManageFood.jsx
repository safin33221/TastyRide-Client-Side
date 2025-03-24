import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ManageFood = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [editFood, setEditFood] = useState(null);

  // Fetch food items by email using useQuery
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["foods", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/food/by-email/${user?.email}`);
      if (response?.data?.success) {
        return response?.data?.data;
      }
      throw new Error("Failed to fetch food items");
    },
  });

  // Mutation for deleting a food item
  const deleteFoodMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosPublic.delete(`/api/foods/${id}`);
      if (!response?.data?.success) {
        throw new Error("Failed to delete food item");
      }
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(["foods", user?.email]); // Refetch after delete
      Swal.fire("Deleted!", "Your food item has been deleted.", "success");
    },
    onError: (error) => {
      console.error("Error deleting food:", error);
      Swal.fire("Error", "Failed to delete food item.", "error");
    },
  });

  // Mutation for updating a food item
  const updateFoodMutation = useMutation({
    mutationFn: async (updatedFood) => {
      const response = await axiosPublic.put(`/api/foods/${updatedFood._id}`, updatedFood);
      if (!response.data.success) {
        throw new Error("Failed to update food item");
      }
      return response.data.data;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["foods", user.email], (oldData) =>
        oldData.map((food) => (food._id === updatedData._id ? updatedData : food))
      );
      setEditFood(null); // Close edit form
      Swal.fire("Updated!", "Your food item has been updated.", "success");
    },
    onError: (error) => {
      console.error("Error updating food:", error);
      Swal.fire("Error", "Failed to update food item.", "error");
    },
  });

  // Handle Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteFoodMutation.mutate(id);
    }
  };

  // Handle Edit (Open form)
  const handleEdit = (food) => {
    setEditFood({ ...food, ingredients: food.ingredients.join(", ") });
  };

  // Handle Update Submit
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedFood = {
      _id: editFood._id,
      foodName: editFood.foodName,
      description: editFood.description,
      category: editFood.category,
      price: Number(editFood.price),
      ingredients: editFood.ingredients.split(",").map((item) => item.trim()),
      availability: editFood.availability,
      tags: editFood.tags,
      image: editFood.image,
    };

    updateFoodMutation.mutate(updatedFood);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Manage Your Food Items</h1>

        {/* Edit Form */}
        {editFood && (
          <div className="mb-6 p-4 border rounded-md bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">Edit Food Item</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Food Name</label>
                <input
                  type="text"
                  value={editFood.foodName}
                  onChange={(e) => setEditFood({ ...editFood, foodName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={editFood.description}
                  onChange={(e) => setEditFood({ ...editFood, description: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  value={editFood.category}
                  onChange={(e) => setEditFood({ ...editFood, category: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Beverages">Beverages</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  value={editFood.price}
                  onChange={(e) => setEditFood({ ...editFood, price: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Ingredients</label>
                <input
                  type="text"
                  value={editFood.ingredients}
                  onChange={(e) => setEditFood({ ...editFood, ingredients: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  placeholder="Comma-separated"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Availability</label>
                <input
                  type="checkbox"
                  checked={editFood.availability}
                  onChange={(e) => setEditFood({ ...editFood, availability: e.target.checked })}
                  className="h-4 w-4"
                />
                <span className="ml-2">Available</span>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={updateFoodMutation.isLoading}
                >
                  {updateFoodMutation.isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditFood(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Food Table */}

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>


              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {foods.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 text-center">
                    No food items found.
                  </td>
                </tr>
              ) : (
                foods.map((food,idx) => (
                  <tr key={food._id} className="hover:bg-gray-100">
                    <td>{idx+1}</td>
                    <td>
                      <img src={food.image} alt={food.foodName} className="h-12 w-12 object-cover" />
                    </td>
                    <td>{food.foodName}</td>
                    <td>${food.price}</td>
                    <td>
                      {food.availability ? "Yes" : "No"}
                    </td>
                    <td>{food.category}</td>
                    <td >
                      <button
                        onClick={() => handleEdit(food)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        disabled={deleteFoodMutation.isLoading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="px-3 py-1 mx-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        disabled={deleteFoodMutation.isLoading}
                      >
                        {deleteFoodMutation.isLoading && deleteFoodMutation.variables === food._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
              

            </tbody>
          </table>
        </div>
        {/* <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Name</th>
                <th

 className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Availability</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 text-center">
                    No food items found.
                  </td>
                </tr>
              ) : (
                foods.map((food) => (
                  <tr key={food._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">
                      <img src={food.image} alt={food.foodName} className="h-12 w-12 object-cover" />
                    </td>
                    <td className="py-2 px-4 border">{food.foodName}</td>
                    <td className="py-2 px-4 border">{food.category}</td>
                    <td className="py-2 px-4 border">${food.price}</td>
                    <td className="py-2 px-4 border">
                      {food.availability ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-4 border space-x-2">
                      <button
                        onClick={() => handleEdit(food)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        disabled={deleteFoodMutation.isLoading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                        disabled={deleteFoodMutation.isLoading}
                      >
                        {deleteFoodMutation.isLoading && deleteFoodMutation.variables === food._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default ManageFood;