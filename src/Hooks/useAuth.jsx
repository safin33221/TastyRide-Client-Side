import { useContext } from "react";
import { authContext } from "../Provider/AuthProvider";


const useAuth = () => {
    return useContext(authContext)
};

export default useAuth;