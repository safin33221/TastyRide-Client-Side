import { useState } from "react";
import { FaImage } from "react-icons/fa";

const RegisterForm = () => {
  const [imgPath, setImgPath] = useState('')


  return (
    <div>
      <form className="">
        {/* name */}
        <div className="mb-8">
          <label className=" uppercase">Name</label>

          <input
            type="text"
            name="name"
            required
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
          />
        </div>
        {/* email */}
        <div className="mb-8">
          <label className=" uppercase">Email</label>

          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
          />
        </div>
        {/* password */}
        <div className="mb-10">
          <label className=" uppercase">Password</label>

          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
          />
        </div>
        {/* image Upload */}
        <div className="mb-6">
          <label className=" uppercase">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImgPath(e.target.files[0])}
            />
            <div className="border-2 font-semibold flex bg-blue-100 justify-center items-center gap-3 border-dashed p-2 px-4 cursor-pointer">
              <span className="text-2xl">
                <FaImage />
              </span>{" "}
              Upload Image
            </div>
          </label>
        </div>
        {/* submit button */}
        <input
          type="submit"
          value={"Register"}
          className=" w-full font-semibold border rounded-md cursor-pointer uppercase py-2 px-6"
        />
      </form>
    </div>
  );
};

export default RegisterForm;
