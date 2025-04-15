import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const RidersApplication = () => {
    const axiosPublic = useAxiosPublic()
    const { data: application = [], isLoading: applicationLoading } = useQuery({
        queryKey: ['application'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/riders-applications')
            return res.data
        }
    })
    console.log(application);
    const handleStatus = async (userId, status) => {
        const res = await axiosPublic.patch(`/api/update-applications-status`, { userId, status })
        console.log(res);
    }
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Rider Application</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Photo</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Phone</th>
                            <th className="border border-gray-300 p-2">NID</th>
                            <th className="border border-gray-300 p-2">License</th>
                            <th className="border border-gray-300 p-2">Vehicle</th>
                            <th className="border border-gray-300 p-2">Availability</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {application?.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center p-4">No applications found.</td>
                            </tr>
                        ) : (
                            application.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 p-2">
                                        <img
                                            src={user.profilePhoto}
                                            alt="User"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">{user.fullName}</td>
                                    <td className="border border-gray-300 p-2">{user.email}</td>
                                    <td className="border border-gray-300 p-2">{user.phoneNumber}</td>
                                    <td className="border border-gray-300 p-2">{user.nationalId}</td>
                                    <td className="border border-gray-300 p-2">{user.drivingLicense}</td>
                                    <td className="border border-gray-300 p-2">
                                        <div className="text-sm">
                                            <p>{user.vehicleType}</p>
                                            <p className="text-gray-500">{user.vehicleNumberPlate}</p>
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <div className="text-sm">
                                            <p>{user.preferredWorkArea}</p>
                                            <p className="text-gray-500">
                                                {user.workAvailability?.days?.join(', ')}<br />
                                                {user.workAvailability?.startTime} - {user.workAvailability?.endTime}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 p-2 space-y-2">
                                        {
                                            user?.status === 'pending' ?
                                                <>


                                                    <button
                                                        onClick={() => handleStatus(user.userId, 'approved')}
                                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 block w-full"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatus(user.userId, 'rejected')}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 block w-full"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                                : (
                                                    <button
                                                        onClick={() => handleStatus(user.userId, 'rejected')}
                                                        className=" text-black px-3 py-1 rounded btn  block w-full"
                                                        disabled
                                                    >
                                                        {user?.status}
                                                    </button>
                                                )
                                        }
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

export default RidersApplication;