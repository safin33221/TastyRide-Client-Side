import { Link } from "react-router";
import loginBanner from "../../assets/images/login.webp";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "../../Components/commonComponents/GoogleLogin";
import LoginForm from "./LoginForm";
import OrDivider from "../../Components/commonComponents/OrDivider";
const Login = () => {
  return (
    <div className=" py-12">
      <div className="flex flex-col lg:flex-row gap-4 lg:max-w-[1300px] mx-auto rounded-lg  p-6 md:p-10 ">
        {/* img */}
        <div className="lg:w-1/2 px-8">
          <img src={loginBanner} alt="" className="rounded-md w-full h-full" />
        </div>

        {/* form */}
        <div className="lg:w-1/2 p-6 lg:border-l md:p-10">
          <h1 className=" font-semibold text-2xl md:text-4xl mb-6">Login</h1>
          {/* login Form */}
          <LoginForm></LoginForm>
          {/* divider */}
          <OrDivider></OrDivider>
          {/* Google Login */}
          <div className="">
            <GoogleLogin></GoogleLogin>
          </div>
          <p className="mt-6 text-center">
            <span className="">Don't Have Account? </span>
            <Link to="/register">
              <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                Register Now
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
