import axios from "axios";

const axiosPublic = axios.create({
    baseURL: window.location.hostname === "localhost" ? 'http://localhost:8000' : "https://tasty-ride-server-side.vercel.app"
<<<<<<< HEAD
    // baseURL: window.location.pathname === "localhost" ? 'http://localhost:8000' : "http://localhost:8000"
=======
>>>>>>> 65d5b1d7aa3402f57e406f3eb7df4172b2dfde4d
});


const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;
