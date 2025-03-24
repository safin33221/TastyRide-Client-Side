import React from "react";
import PrimaryButton from "../../Shared/PrimaryButton";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const ManageAdvertisements = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: ads = [], refetch } = useQuery({
    queryKey: ["ads", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/ad");
      console.log(res.data.data);
      return res.data.data;
    },
  });

  // status update of ad 
  const handleUpdate = async(id, status) => {
    try {
      const res = await axiosPublic.patch(`/api/ad/${id}`, {status:status})
      if(res.data.success){
        refetch()
        toast.success("Status Changed")
      }
    } catch (error) {
      console.log("Error in update status", error)
    }
  }
  
  return (
    <div className="lg:m-10 p-10 bg-white rounded-xl">
      <h1 className="font-semibold text-2xl mb-5">Manage All Ads</h1>
      {/* all ads section  */}
      <section>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Index</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {ads?.map((ad, index) => (
                <tr>
                  <td className="font-semibold">1</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={ad.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{ad.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{ad.description}</td>
                  <th>
                    {ad?.status === "pending" ? (
                      <button className="btn btn-ghost btn-xs bg-warning text-white">
                        Pending
                      </button>
                    ) : (
                      <button className="btn btn-ghost btn-xs bg-success text-white">
                        Accepted
                      </button>
                    )}
                  </th>
                  <th>
                    <button disabled={ad.status === "accepted"} onClick={() => handleUpdate(ad._id, "accepted")} className="btn btn-xs bg-success text-white">
                      Accept
                    </button>
                    <button disabled={ad.status === "pending"} onClick={() => handleUpdate(ad._id, "pending")} className="btn btn-xs bg-error text-white ml-3">
                      Reject
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ManageAdvertisements;
