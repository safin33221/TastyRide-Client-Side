import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const RestaurantApplication = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  // Fetch applications with proper typing and error handling
  const {
    data: applications = [],
    isLoading: applicationsLoading,
    refetch,
  } = useQuery({
    queryKey: ['restaurant-applications'],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get('/api/restaurants-applications');
        return res.data;
      } catch (error) {
        console.error('Error fetching applications:', error);
        throw new Error('Failed to fetch applications');
      }
    },
  });

  const handleStatusUpdate = async (email, status) => {
    try {
      // Validate input

      const result = await Swal.fire({
        title: `Confirm ${status} application`,
        text: `You are about to ${status} this restaurant application. This action cannot be undone.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Confirm ${status}`,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      });

      if (!result.isConfirmed) return;

      // Show loading state
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we update the application',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axiosPublic.patch('/api/update-status', {
        email, // Using applicationId instead of email
        status,
        updatedBy: user?.email, // Track who made the change
      });

      if (response.data.success) {
        await refetch(); // Refresh data

        // Close loading dialog
        Swal.close();

        // Show success notification
        await Swal.fire({
          title: 'Success!',
          text: `Application has been ${status} successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Optional: Trigger any post-update actions
        if (status === 'approved') {
          // Maybe notify the restaurant owner
        }
      } else {
        throw new Error(response.data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);

      // Close any open dialogs
      Swal.close();

      // Show error notification
      await Swal.fire({
        title: 'Update Failed',
        text:
          error.response?.data?.message ||
          error.message ||
          'Failed to update application status',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (applicationsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Restaurant Applications</h1>

      {applications.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">No pending applications found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map(application => (
            <div
              key={application._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {application.businessName}
                    </h2>
                    <p className="text-gray-600">{application.name}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        application.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : application.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                  {application.logo && (
                    <img
                      src={application.logo}
                      alt="Restaurant logo"
                      className="w-16 h-16 object-cover rounded-full border"
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 mb-2">
                    {application.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-24">Type:</span>
                      <span className="ml-2 capitalize">
                        {application.type}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-24">Address:</span>
                      <span className="ml-2">{application.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-24">City:</span>
                      <span className="ml-2">{application.city}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-24">District:</span>
                      <span className="ml-2">{application.district}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-24">Pickup:</span>
                      <span className="ml-2">
                        {application.pickup ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-24">Map Pin:</span>
                      <span className="ml-2 truncate">
                        {application.mapPin}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="mb-2">
                    <p className="font-medium text-sm mb-1">Open Days:</p>
                    <div className="flex flex-wrap gap-1">
                      {application.openDays.map((day, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Opens: {application.openTime}</span>
                    <span>Closes: {application.closeTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 flex justify-end gap-3 border-t">
                {application.status === 'pending' ? (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(application?.email, 'approved')
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(application?.email, 'rejected')
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    className={`px-4 py-2 rounded cursor-default ${
                      application.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                    disabled
                  >
                    {application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantApplication;
