import React from "react";

const LoginForm = () => {
  return (
    <div>
      <form className="">
        <div className="mb-8">
          <label className=" uppercase">Email</label>

          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
          />
        </div>
        <div className="mb-10">
          <label className=" uppercase">Password</label>

          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
          />
        </div>
        <input
          type="submit"
          value={"Login"}
          className=" w-full font-semibold border rounded-md cursor-pointer uppercase py-2 px-6"
        />
      </form>
    </div>
  );
};

export default LoginForm;
