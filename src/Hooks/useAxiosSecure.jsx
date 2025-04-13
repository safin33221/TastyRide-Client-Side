import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: window.location.hostname === 'localhost' ? 'http://localhost:8000' : "https://tasty-ride-server-side.vercel.app"
})
const useAxiosSecure = () => {
    

    return axiosSecure
}

export default useAxiosSecure;