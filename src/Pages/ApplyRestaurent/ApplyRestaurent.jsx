import React, { useState } from 'react';

const ApplyRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    type: '',
    description: '',
    address: '',
    pickup: false,
    mapPin: '',
    openDays: [],
    openTime: '',
    closeTime: '',
  });
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleDay = dayIndex => {
    setFormData(prev => {
      const newDays = [...prev.openDays];
      if (newDays.includes(dayIndex)) {
        return { ...prev, openDays: newDays.filter(d => d !== dayIndex) };
      } else {
        return { ...prev, openDays: [...newDays, dayIndex].sort() };
      }
    });
  };

  return (
    <div className=" container mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 border border-gray-100">
      <h1 className="text-2xl m-5 font-bold text-center underline text-gray-800 mb-6 ">
        Register Your Restaurant
      </h1>

      {/* Section 1: Basic Information */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Legal Name*
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant Type*
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select type</option>
              <option value="fast-food">Fast Food</option>
              <option value="buffet">Buffet</option>
              <option value="fine-dining">Fine Dining</option>
              <option value="cafe">Cafe</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Available
            </label>
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                name="pickup"
                checked={formData.pickup}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">
                Yes, we offer pickup service
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Media Uploads */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">
          Restaurant Images
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo (1:1 ratio)*
            </label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer">
                <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  {logo ? 'Change Logo' : 'Upload Logo'}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setLogo(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {logo && (
                <span className="ml-3 text-sm text-gray-600">{logo.name}</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Image (16:9 ratio)
            </label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer">
                <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  {banner ? 'Change Banner' : 'Upload Banner'}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setBanner(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {banner && (
                <span className="ml-3 text-sm text-gray-600">
                  {banner.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Description */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">
          Description
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tell us about your restaurant*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What makes your restaurant special? What cuisine do you serve?"
            required
          />
        </div>
      </div>

      {/* Section 4: Location */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">
          Location
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address*
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Maps Pin URL
            </label>
            <input
              type="text"
              name="mapPin"
              value={formData.mapPin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste your Google Maps link here"
            />
          </div>
        </div>
      </div>

      {/* Section 5: Business Hours */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">
          Business Hours
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Open Days*
          </label>
          <div className="flex gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
              (day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(index)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                    formData.openDays.includes(index)
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opening Time*
            </label>
            <input
              type="time"
              name="openTime"
              value={formData.openTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Closing Time*
            </label>
            <input
              type="time"
              name="closeTime"
              value={formData.closeTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="button"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md transition-all"
        >
          Submit Application
        </button>
        <p className="mt-2 text-center text-sm text-gray-500">
          By submitting, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default ApplyRestaurant;
