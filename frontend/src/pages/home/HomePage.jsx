//rafce
import React from "react";
import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";
import { useAuthStore } from "../../store/authUser";

const HomePage = () => {
  const { user } = useAuthStore();
  // if user login go to homescreen if not login authscreen
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
