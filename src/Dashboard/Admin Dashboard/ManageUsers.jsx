



const ManageUsers = () => {


  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Photo</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
           
              <tr >
                <td className="border border-gray-300 p-2">A</td>
                <td className="border border-gray-300 p-2">shafiq@gmail.com</td>
                <td className="border border-gray-300 p-2">
                  <img src="" alt="User" className="w-10 h-10 rounded-full" />
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    value=""
                    
                    className="border rounded p-1"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Buyer">Restaurant</option>
                    <option value="Worker">Customer</option>
                  </select>
                </td>
               
                <td className="border border-gray-300 p-2">
                  <button

                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
        
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
