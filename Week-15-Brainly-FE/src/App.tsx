import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Shared from "./pages/Shared";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function App() {
  const localToken = localStorage.getItem("token");

  const [token, setToken] = useState(localToken || "");

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route
          path="/signup"
          element={
            !token ? (
              <Signup setToken={setToken} token={token} />
            ) : (
              <Navigate to={"/dashboard"} />
            )
          }
        />
        <Route
          path="/signin"
          element={
            !token ? (
              <Signin setToken={setToken} token={token} />
            ) : (
              <Navigate to={"/dashboard"} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard setToken={setToken} token={token} />
            ) : (
              <Navigate to={"/signin"} />
            )
          }
        />
        <Route
          path="/"
          element={
            token ? <Navigate to={"/dashboard"} /> : <Navigate to={"/signin"} />
          }
        />
        <Route path="/share/:shareId" element={<Shared />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
