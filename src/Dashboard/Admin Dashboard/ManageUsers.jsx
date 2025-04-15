
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPublic.get("/api/users");
        console.log("Fetched users:", response.data);
        setUsers(response.data); // Ensure this is an array
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire("Error!", "Failed to fetch users", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); // Empty dependency array is fine for initial fetch


const handleRoleChange = async (id, newRole) => {
    console.log("Changing role for user ID:", id, "New role:", newRole);
  
    const previousUsers = [...users];
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      )
    );
  
    try {
      setLoading(true);
      const res = await axiosPublic.put(`/api/users/${id}`, { role: newRole });
      console.log("Role change response:", res);
  
      Swal.fire("Success!", "User role updated successfully", "success");
      // No need to check modifiedCount; assume success if no error
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire("Error!", "Failed to update role", "error");
      setUsers(previousUsers); // Roll back on error
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveUser = (id) => {
    console.log("Removing user ID:", id);
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await axiosPublic.delete(`/api/users/${id}`);
          console.log("Delete user response:", res);

          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "User has been removed.", "success");
            // Update state optimistically to reflect deletion immediately
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          } else {
            Swal.fire("Info", "User not found or already deleted", "info");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "Failed to remove user", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="spinner-border animate-spin"></span>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto overflow-x-scroll w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Photo</th>
              <th className="border border-gray-300 p-2">Joined</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-300 p-2">{user.username}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={user.photo}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(user.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border rounded p-1"
                    >
                      <option value="admin">Admin</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="customer">Customer</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleRemoveUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;