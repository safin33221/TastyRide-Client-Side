import { Link } from "react-router";
import loginBanner from "../../assets/images/login.webp";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "../../Components/commonComponents/GoogleLogin";
import LoginForm from "./LoginForm";
import OrDivider from "../../Components/commonComponents/OrDivider";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../Shared/PrimaryButton";
const Login = () => {
  const { t } = useTranslation();
  return (
    <div className=" md:py-12">
      <div className="flex flex-col lg:flex-row gap-4  mx-auto rounded-lg  md:p-6  ">
        {/* img */}
        <div className="lg:w-1/2 md:px-8 relative">
          <img src={loginBanner} alt="" className="   lg:w-10/12 w-full mx-auto h-full lg:h-[500px]" />
          <Link to={`/`} className=" absolute top-0 md:left-[70px]">
            <PrimaryButton  text={`Back Home`} />
          </Link>
        </div>

        {/* form */}
        <div className="lg:w-1/2 p-3 lg:border-l md:p-10">
          <h1 className=" font-semibold text-2xl md:text-4xl mb-6">{t('userMenu.Login')}</h1>
          {/* login Form */}
          <LoginForm></LoginForm>
          {/* divider */}
          <OrDivider></OrDivider>
          {/* Google Login */}
          <div className="">
            <GoogleLogin></GoogleLogin>
          </div>
          <p className="mt-6 text-center">
            <span className="">{t("login.Don't Have Account?")} </span>
            <Link to="/register">
              <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                {t('login.Register Now')}
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
