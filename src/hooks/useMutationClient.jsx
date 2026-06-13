import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";
import { toast } from "react-toastify";

const useMutationClient = ({
  url,
  method = "post",
  invalidateKeys = [],
  successMessage = "Success",
  redirectTo,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const client = useAxiosSecure();

  return useMutation({
    mutationFn: async (variables = {}) => {
      let data = variables?.data;
      let config = variables?.config;
      let id = variables?.id;

      if (variables !== null && typeof variables !== "object") {
        id = variables;
      } else if (variables && !("data" in variables) && !("config" in variables) && !("id" in variables)) {
        data = variables;
      }

      const finalUrl = typeof url === "function" ? url(id) : url;
      if (method === "delete") return await client.delete(finalUrl, config);
      return await client[method](finalUrl, data, config);
    },

    onSuccess: (res) => {
      const data = res?.data || res;
      toast.success(data?.message || successMessage);

      // ♻️ Invalidate related queries
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      if (redirectTo) navigate(redirectTo);
    },

    onError: (error) => {
      const msg = error?.response?.data?.message || error.message || "Something went wrong";
      toast.error(msg);
    },
  });
};

export default useMutationClient;


// const { mutate } = useMutationClient({
//   url: "/auth/login",
//   redirectTo: "/dashboard"
// });

// const handleLogin = (formData) => {
//   mutate({ data: formData }, {
//     onSuccess: (res) => {
//       // Handle your Redux logic here if needed
//       dispatch(setToken(res.data.token));
//     },
//     onError: (err) => {
//       // Handle specific field errors here
//       const serverErrors = err?.response?.data?.errors;
//       setMyLocalErrorState(serverErrors);
//     }
//   });
// };