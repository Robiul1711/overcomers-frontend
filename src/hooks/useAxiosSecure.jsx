import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, clearAuth } from "../redux/slices/authSlice";
import { useMemo } from "react";

const useAxiosSecure = () => {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 30000,
    });

    instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          dispatch(clearAuth());
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [token, dispatch]);

  return axiosSecure;
};

export default useAxiosSecure;
