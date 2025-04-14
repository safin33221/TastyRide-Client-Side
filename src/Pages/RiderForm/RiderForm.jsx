import { useForm } from "react-hook-form";

function RiderForm() {
  // const [vehicleType, setVehicleType] = useState("");
  // const [paymentMethod, setPaymentMethod] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      presentAddress: "",
      permanentAddress: "",
      profilePhoto: null,
      nationalId: "",
      nidPicture: null,
      vehicleType: "",
      vehicleNumberPlate: "",
      drivingLicense: "",
      drivingLicenseImage: null,
      preferredWorkArea: "",
      workAvailability: {
        days: [],
        startTime: "",
        endTime: "",
      },
      hasSmartphone: false,
      paymentMethod: "",
      bankAccountNumber: "",
      mobileWalletProvider: "",
      mobileWalletNumber: "",
    },
  });

  // Watch fields for conditional logic
  const vehicleType = watch("vehicleType");
  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    console.log(data);
    // Add backend API call here
  };

  const vehicleOptions = [
    { value: "bicycle", label: "Bicycle" },
    { value: "bike", label: "Bike" },
    { value: "scooter", label: "Scooter" },
  ];

  const areaOptions = [
    { value: "dhaka", label: "Dhaka" },
    { value: "chattogram", label: "Chattogram" },
    { value: "rajshahi", label: "Rajshahi" },
    { value: "khulna", label: "Khulna" },
    { value: "barishal", label: "Barishal" },
    { value: "sylhet", label: "Sylhet" },
    { value: "rangpur", label: "Rangpur" },
    { value: "mymensingh", label: "Mymensingh" },
  ];

  const walletOptions = [
    { value: "bkash", label: "bKash" },
    { value: "nagad", label: "Nagad" },
    { value: "rocket", label: "Rocket" },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-red-500">
          Rider Registration Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* full name */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Full Name (as per NID){" "}
                      <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                    className={`input input-bordered w-full ${
                      errors.fullName ? "input-error" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-error text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* date of birth */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Date of Birth <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth", {
                      required: "Date of Birth is required",
                    })}
                    className={`input input-bordered w-full ${
                      errors.dateOfBirth ? "input-error" : ""
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-error text-sm mt-1">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                {/* phone number */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Phone Number <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                    })}
                    className={`input input-bordered w-full ${
                      errors.phoneNumber ? "input-error" : ""
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-error text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* email address */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Email <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={`input input-bordered w-full ${
                      errors.email ? "input-error" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-error text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* present address */}
                  <div className="md:col-span-2">
                    <label className="label">
                      <span className="label-text">
                        Present Address <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("presentAddress", {
                        required: "Present Address is required",
                      })}
                      className={`input input-bordered w-full ${
                        errors.presentAddress ? "input-error" : ""
                      }`}
                    />
                    {errors.presentAddress && (
                      <p className="text-error text-sm mt-1">
                        {errors.presentAddress.message}
                      </p>
                    )}
                  </div>

                  {/* parmanent address */}
                  <div className="md:col-span-2">
                    <label className="label">
                      <span className="label-text">Permanent Address</span>
                    </label>
                    <input
                      type="text"
                      {...register("permanentAddress")}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                {/* profile photo */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Profile Photo <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="file"
                    {...register("profilePhoto", {
                      required: "Profile Photo is required",
                    })}
                    className={`file-input file-input-bordered w-full ${
                      errors.profilePhoto ? "file-input-error" : ""
                    }`}
                    accept="image/*"
                  />
                  {errors.profilePhoto && (
                    <p className="text-error text-sm mt-1">
                      {errors.profilePhoto.message}
                    </p>
                  )}
                </div>
                {/* national id no */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      National ID No <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("nationalId", {
                      required: "National ID is required",
                    })}
                    className={`input input-bordered w-full ${
                      errors.nationalId ? "input-error" : ""
                    }`}
                  />
                  {errors.nationalId && (
                    <p className="text-error text-sm mt-1">
                      {errors.nationalId.message}
                    </p>
                  )}
                </div>

                {/* Nid image */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      NID Picture <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="file"
                    {...register("nidPicture", {
                      required: "NID Picture is required",
                    })}
                    className={`file-input file-input-bordered w-full ${
                      errors.nidPicture ? "file-input-error" : ""
                    }`}
                    accept="image/*"
                  />
                  {errors.nidPicture && (
                    <p className="text-error text-sm mt-1">
                      {errors.nidPicture.message}
                    </p>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Other Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Other Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* vehicle type */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Vehicle Type <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    {...register("vehicleType", {
                      required: "Vehicle Type is required",
                    })}
                    className={`select select-bordered w-full ${
                      errors.vehicleType ? "select-error" : ""
                    }`}
                  >
                    {vehicleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.vehicleType && (
                    <p className="text-error text-sm mt-1">
                      {errors.vehicleType.message}
                    </p>
                  )}
                </div>


                {vehicleType !== "bicycle" && vehicleType && (
                  <>
                  {/* vehicle number plate */}
                    <div>
                      <label className="label">
                        <span className="label-text">
                          Vehicle Number Plate{" "}
                          <span className="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        {...register("vehicleNumberPlate", {
                          required:
                            vehicleType !== "bicycle"
                              ? "Vehicle Number Plate is required"
                              : false,
                        })}
                        className={`input input-bordered w-full ${
                          errors.vehicleNumberPlate ? "input-error" : ""
                        }`}
                      />
                      {errors.vehicleNumberPlate && (
                        <p className="text-error text-sm mt-1">
                          {errors.vehicleNumberPlate.message}
                        </p>
                      )}
                    </div>

                      {/* driving licence number */}
                    <div>
                      <label className="label">
                        <span className="label-text">
                          Driving License Number <span className="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        {...register("drivingLicense", {
                          required: "Driving License is required",
                        })}
                        className={`input input-bordered w-full ${
                          errors.drivingLicense ? "input-error" : ""
                        }`}
                      />
                      {errors.drivingLicense && (
                        <p className="text-error text-sm mt-1">
                          {errors.drivingLicense.message}
                        </p>
                      )}
                    </div>

                    {/* driving licence image */}
                    <div>
                      <label className="label">
                        <span className="label-text">
                          Driving License Image{" "}
                          <span className="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="file"
                        {...register("drivingLicenseImage", {
                          required: "Driving License Image is required",
                        })}
                        className={`file-input file-input-bordered w-full ${
                          errors.drivingLicenseImage ? "file-input-error" : ""
                        }`}
                        accept="image/*"
                      />
                      {errors.drivingLicenseImage && (
                        <p className="text-error text-sm mt-1">
                          {errors.drivingLicenseImage.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* preferred work area */}
                <div>
                  <label className="label">
                    <span className="label-text">Preferred Work Area</span>
                  </label>
                  <select
                    {...register("preferredWorkArea")}
                    className="select select-bordered w-full"
                  >
                    {areaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* work availability */}
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text">Work Availability</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <label key={day} className="cursor-pointer label">
                        <input
                          type="checkbox"
                          value={day}
                          {...register("workAvailability.days")}
                          className="checkbox"
                        />
                        <span className="label-text mr-2">{day}</span>
                      </label>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Start Time</span>
                      </label>
                      <input
                        type="time"
                        {...register("workAvailability.startTime")}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">End Time</span>
                      </label>
                      <input
                        type="time"
                        {...register("workAvailability.endTime")}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* have smartphone? */}
                <div>
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("hasSmartphone")}
                      className="checkbox"
                    />
                    <span className="label-text">Have Smartphone?</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Banking/Payment Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Banking/Payment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* payment methiod */}
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text">Payment Method</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="cursor-pointer label">
                      <input
                        type="radio"
                        value="bank"
                        {...register("paymentMethod")}
                        className="radio"
                      />
                      <span className="label-text mr-2">Bank Account</span>
                    </label>
                    <label className="cursor-pointer label">
                      <input
                        type="radio"
                        value="wallet"
                        {...register("paymentMethod")}
                        className="radio"
                      />
                      <span className="label-text mr-2">Mobile Wallet</span>
                    </label>
                  </div>
                </div>

                {paymentMethod === "bank" && (
                    // Bank Account Number
                  <div>
                    <label className="label">
                      <span className="label-text">Bank Account Number</span>
                    </label>
                    <input
                      type="text"
                      {...register("bankAccountNumber")}
                      className="input input-bordered w-full"
                    />
                  </div>
                )}
                {paymentMethod === "wallet" && (
                  <>
                  {/* mobile wallet provider */}
                    <div>
                      <label className="label">
                        <span className="label-text">
                          Mobile Wallet Provider
                        </span>
                      </label>
                      <select
                        {...register("mobileWalletProvider")}
                        className="select select-bordered w-full"
                      >
                        {walletOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="hover:bg-red-600 bg-white"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* mobile wallet number */}
                    <div>
                      <label className="label">
                        <span className="label-text">Mobile Wallet Number</span>
                      </label>
                      <input
                        type="text"
                        {...register("mobileWalletNumber")}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-wide text-center py-2 px-5 bg-red-500  text-white font-semibold cursor-pointer select-none hover:bg-red-600 border-2 border-red-500 hover:border-red-600 transition-all scale-100 active:scale-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RiderForm;
