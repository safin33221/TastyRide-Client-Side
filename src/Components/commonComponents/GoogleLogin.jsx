
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  return (
    <div>
      <button className="flex cursor-pointer rounded-md border font-semibold justify-center items-center gap-2 p-2 w-full">
        <span className="text-2xl">
          <FcGoogle />
        </span>
        <span className="">Login With Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
