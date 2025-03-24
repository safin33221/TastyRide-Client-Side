import { Link } from 'react-router';
import loginBanner from '../../assets/images/login.webp'
import GoogleLogin from '../../Components/commonComponents/GoogleLogin';
import RegisterForm from './RegisterForm';
import OrDivider from '../../Components/commonComponents/OrDivider';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  return (
    <div className=" py-12">
      <div className="flex flex-col lg:flex-row gap-4 lg:max-w-[1300px] mx-auto rounded-lg  p-6 md:p-10 ">
        {/* img */}
        <div className="lg:w-1/2 px-8">
          <img src={loginBanner} alt="" className="rounded-md w-full h-full" />
        </div>

        {/* form */}
        <div className="lg:w-1/2 p-6 lg:border-l md:p-10">
          <h1 className=" font-semibold text-2xl md:text-4xl mb-6">Signup</h1>
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
