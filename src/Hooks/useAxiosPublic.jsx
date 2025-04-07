import axios from "axios";

const axiosPublic = axios.create({
    baseURL: window.location.hostname === "localhost" ? 'http://localhost:8000' : "https://tasty-ride-server-side.vercel.app"
});

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;
