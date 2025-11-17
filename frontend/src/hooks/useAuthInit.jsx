import { useEffect } from "react";
// import axios from "axios";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/auth/authSlice";

export default function useAuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/check-auth", {
          withCredentials: true,
        });

        dispatch(loginSuccess({ ...res.data.data, role: res.data.role }));
      } catch (err) {
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);
}
