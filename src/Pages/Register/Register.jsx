import { Link } from 'react-router';
import loginBanner from '../../assets/images/login.webp'
import GoogleLogin from '../../Components/commonComponents/GoogleLogin';
import RegisterForm from './RegisterForm';
import OrDivider from '../../Components/commonComponents/OrDivider';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../../Shared/PrimaryButton';

const Register = () => {
  const { t } = useTranslation();
  return (
    <div className=" ">
      <div className="flex flex-col lg:flex-row gap-4  mx-auto rounded-lg  p-6 md:p-12 ">
        {/* img */}
        <div className="relative md:w-1/2 w-full px-4 m-auto">
          <img src={loginBanner} alt="" className=" md:w-10/12 w-full mx-auto " />
          <Link to={`/`} className=" absolute top-0 md:left-[60px]">
            <PrimaryButton  text={`Back Home`} />
          </Link>
        </div>

        {/* form */}
        <div className="lg:w-1/2 p-3 lg:border-l md:p-10">
          <h1 className=" font-semibold text-2xl md:text-4xl mb-6">Register </h1>
          {/* login Form */}
         <RegisterForm></RegisterForm>
          {/* divider */}
          <OrDivider></OrDivider>
          {/* Google Login */}
          <div className="">
            <GoogleLogin></GoogleLogin>
          </div>
          <p className="mt-6 text-center font-semibold">
            <span className="">{t('register.Have an Account?')} </span>
            <Link to="/login">
              <span className="text-blue-600  hover:underline cursor-pointer">
              {t('register.Login Now')}
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
