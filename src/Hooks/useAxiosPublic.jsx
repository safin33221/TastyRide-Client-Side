import axios from 'axios';

const axiosPublic = axios.create({
<<<<<<< HEAD
  baseURL:
    window.location.hostname === 'localhost'
      ? 'http://localhost:8000'
      : 'https://tasty-ride-server-side.vercel.app',
=======
    baseURL: window.location.hostname === "localhost" ? 'http://localhost:8000' : "https://tasty-ride-server-side.vercel.app"
>>>>>>> c222cd29f68ff773716fd80ea83928e255ee3ea4
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
