//rafce
import React from "react";
import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";

const HomePage = () => {
  const user = false;
  // if user login go to homescreen if not login authscreen
  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};

export default HomePage;
