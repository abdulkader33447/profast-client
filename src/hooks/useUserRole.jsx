import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth(); // 🔹 useAuth থেকে authentication user ও loading নিচ্ছি
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading: roleLoading, // 🔹 role-fetch এর loading কে আলাদা নাম দেওয়া হলো
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading, // 🔹 auth loading শেষ না হলে fetch করবে না
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role?email=${user.email}`);
      return res.data.role || "user";
    },
  });

  return { role, roleLoading, isError };
};

export default useUserRole;
