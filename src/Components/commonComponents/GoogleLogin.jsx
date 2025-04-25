
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useTranslation } from "react-i18next";

const GoogleLogin = () => {
  const { SignInWithGoogle, UpdateUserProfile } = useAuth()
  const { t } = useTranslation();
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()


  const handleSignInWithGoogle = async () => {

    try {

      //Sign in User via Google
      const result = await SignInWithGoogle()

      //Update User Profile
      await UpdateUserProfile(result.user.displayName, result.user.photoURL)

      //User Data in object
      const user = {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role: 'customer',
        password: 'Google Sign'
      }

      //Request for Stored User Data
      await axiosPublic.post(`/api/register`, user)
      navigate('/')


    } catch (error) {
      console.log(error);
    }



  }
  return (
    <div>
      <button onClick={handleSignInWithGoogle} className="flex cursor-pointer rounded-md border font-semibold justify-center items-center gap-2 p-2 w-full">
        <span className="text-2xl">
          <FcGoogle />
        </span>
        <span className="">{t('login.Login With Google')}</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
