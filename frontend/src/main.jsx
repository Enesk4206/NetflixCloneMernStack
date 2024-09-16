import React from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ReactDOM from "react-dom/client";

//herşey burada başlar App ismindeki sayfa ana menümüz

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
