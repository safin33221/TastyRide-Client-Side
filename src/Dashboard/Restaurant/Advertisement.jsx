import React from "react";
import PrimaryButton from "../../Shared/PrimaryButton";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Advertisement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: ads = [], refetch, isLoading } = useQuery({
    queryKey: ["ads", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/ad/${user?.email}`);
      console.log(res.data.data);
      return res.data.data;
    },
  });

  // delete ad 
  const handleDeleteAd = async(id) => {
    try {
      const res = await axiosPublic.delete(`/api/ad/${id}`)
      console.log(res.data)
      if(res.data.success){
        refetch()
      }
    } catch (error) {
      console.log("Error in delete ad", error)
    }
  }
  return (
    <div className="lg:m-10 p-10 bg-white rounded-xl">
      <div
        onClick={() => navigate("/dashboard/ad/post")}
        className="mb-5 inline-flex"
      >
        <PrimaryButton text={"Post Advertisement"} />
      </div>

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
                    <button onClick={() => handleDeleteAd(ad._id)} className="btn btn-ghost btn-xs bg-error text-white">
                      Delete
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

export default Advertisement;
