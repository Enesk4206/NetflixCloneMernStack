import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

/* create a hook and visit all of code and pages */
/* for example if we have a signup.jsx page and want to use backend signup we going to the that page and implement these codes  const{signup ,logout etc.....} = useAuthStore like that*/

export const useAuthStore = create((set) => ({
  user: null,
  isSigninUp: false,
  isCheckingAuth: false,
  isLoginOut: false,
  isLoginIn: false,
  signup: async (creadentials) => {
    set({ isSigninUp: true });
    try {
      /*http://localhost:5000/api/v1/auth/signup want to abbreviation code go to the vite.config.js */
      const response = await axios.post("/api/v1/auth/signup", creadentials);
      set({ user: response.data.user, isSigninUp: false });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      set({ isSigninUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoginIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoginIn: false  });
    } catch (error) {
      set({isLoginIn: false , user: null})
      toast.error(error.response.data.message || "An error occurred")
    }
  },
  logout: async () => {
    set({ isLoginOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoginOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoginOut: false });
      toast.error(error.response.data.message || "Logout Failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
