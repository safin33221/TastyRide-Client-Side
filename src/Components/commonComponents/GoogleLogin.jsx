
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { SignInWithGoogle, UpdateUserProfile } = useAuth()
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
      }

      //Request for Stored User Data
      await axiosPublic.post(`/auth/register`, user)
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
        <span className="">Login With Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
