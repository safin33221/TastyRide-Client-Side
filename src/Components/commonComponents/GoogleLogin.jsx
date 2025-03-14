
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

const GoogleLogin = () => {
  const { SignInWithGoogle, UpdateUserProfile } = useAuth()
  const navigate = useNavigate()


  const handleSignInWithGoogle = ()=>{
     SignInWithGoogle()
     .then(result => {
      // console.log(result.user.displayName, result.user.photoURL);
      UpdateUserProfile(result.user.displayName, result.user.photoURL)
      .then(()=>{
        navigate('/');
      })
      .catch((error)=>{
        console.log(error.message);
        
      })
     }).catch((error)=>{
      console.log(error.message);
     })
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
