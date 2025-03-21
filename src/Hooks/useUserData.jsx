import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query"


function useUserData() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: userData, isPending,refetch } = useQuery({
    queryKey: [user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/users/${user?.email}`);
      return res?.data
    }
  })
  return [userData, isPending,refetch]
}

export default useUserData