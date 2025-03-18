import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query"


function useRole() {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();

    const {data:role, isPending} = useQuery({
    queryKey: [user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
        const res = await axiosPublic.get(`/users/${user?.email}`);
        return res?.data?.role
    }
    })
  return [role, isPending]
}

export default useRole