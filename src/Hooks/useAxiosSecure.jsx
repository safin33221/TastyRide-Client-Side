import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: window.location.hostname === 'localhost' ? 'http://localhost:8000' : "https://tasty-ride-server-side.vercel.app"
})
const useAxiosSecure = () => {
    const { LogoutUser } = useAuth()
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    

    return axiosSecure
}

export default useAxiosSecure;