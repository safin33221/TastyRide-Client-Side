import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { imageUpload } from '../../Utils/Utils';
import { useQuery } from '@tanstack/react-query';

const ApplyRestaurant = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { data: applications = [] } = useQuery({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const toggleDay = dayIndex => {
    setSelectedDays(prev => {
      if (prev.includes(dayIndex)) {
        return prev.filter(d => d !== dayIndex);
      } else {
        return [...prev, dayIndex].sort();
      }
    });
  };

<<<<<<< HEAD
  const onSubmit = async data => {
    if (selectedDays.length === 0) {
      Swal.fire('Error', 'Please select at least one open day', 'error');
      return;
    }

    if (!image) {
      Swal.fire('Error', 'Please upload a logo', 'error');
      return;
    }

    setLoading(true);
    try {
      // Upload image first
      const imageData = await imageUpload(image);
      const logo = imageData;
      // Prepare days array
      const daysMap = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const openDays = selectedDays.map(dayIndex => daysMap[dayIndex]);

      // Prepare restaurant data
      const restaurantData = {
        name: data.name,
        businessName: data.businessName,
        type: data.type,
        description: data.description,
        address: data.address,
        pickup: data.pickup || false,
        mapPin: data.mapPin,
        openDays,
        openTime: data.openTime,
        closeTime: data.closeTime,
        logo: logo,
        email: user?.email,
      };

      console.log(restaurantData);
      // Submit to backend
      const res = await axiosPublic.post(
        `api/restaurants/application/${user?.email}`,
        restaurantData
      );

      if (res.data.success) {
        Swal.fire('Success', 'Application submitted successfully!', 'success');
        reset();
        setSelectedDays([]);
        setImage(null);
      }
    } catch (error) {
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Something went wrong',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 bg-white rounded-xl shadow-lg mt-10 border border-gray-100"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Register Your Restaurant
        </h1>

=======
  return (
    <div className=" container mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 border border-gray-100">
      <h1 className="text-2xl m-5 font-bold text-center underline text-gray-800 mb-6 ">
        Register Your Restaurant
      </h1>
      <form>
>>>>>>> fb99265e3fec16b0c1797dc8b8df60a196deceff
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label>Your Name*</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label>Business Name*</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('businessName', {
                required: 'Business name is required',
              })}
            />
            {errors.businessName && (
              <p className="text-red-500 mt-1">{errors.businessName.message}</p>
            )}
          </div>

          <div>
            <label>Restaurant Type*</label>
            <select
              className="input input-bordered w-full"
              {...register('type', { required: 'Type is required' })}
            >
              <option value="">Select type</option>
              <option value="fast-food">Fast Food</option>
              <option value="buffet">Buffet</option>
              <option value="fine-dining">Fine Dining</option>
              <option value="cafe">Cafe</option>
              <option value="other">Other</option>
            </select>
            {errors.type && (
              <p className="text-red-500 mt-1">{errors.type.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              className="checkbox"
              {...register('pickup')}
            />
            <span>Pickup Available</span>
          </div>
        </div>

        <div className="mt-6">
          <label>Restaurant Description*</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            {...register('description', {
              required: 'Description is required',
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label>Address*</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && (
              <p className="text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>
          <div>
            <label>Google Map Pin</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('mapPin', { required: 'Map pin is required' })}
            />
            {errors.mapPin && (
              <p className="text-red-500 mt-1">{errors.mapPin.message}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label>Logo Upload*</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className="mt-6">
          <label>Open Days*</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
              (day, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => toggleDay(index)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedDays.includes(index)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label>Open Time*</label>
            <input
              type="time"
              className="input input-bordered w-full"
              {...register('openTime', { required: 'Open time is required' })}
            />
            {errors.openTime && (
              <p className="text-red-500 mt-1">{errors.openTime.message}</p>
            )}
          </div>
          <div>
            <label>Close Time*</label>
            <input
              type="time"
              className="input input-bordered w-full"
              {...register('closeTime', { required: 'Close time is required' })}
            />
            {errors.closeTime && (
              <p className="text-red-500 mt-1">{errors.closeTime.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> fb99265e3fec16b0c1797dc8b8df60a196deceff
  );
};

export default ApplyRestaurant;
