/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export function Signin({ setToken, token }) {
  const usernameRef = useRef<any>();
  const passwordRef = useRef<any>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function signin() {
    try {
      const username = usernameRef.current?.value;
      console.log(usernameRef.current?.value);
      const password = passwordRef.current?.value;
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });
      console.log(response);
      const jwt = response.data.token;
      setToken(jwt);
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (error) {
      const msg = error?.response?.data?.msg || "Signup failed";
      setError(msg);
    }
  }
  return (
    <div>
      <Sidebar setToken={setToken} token={token} />
      <div className="h-screen w-screen  bg-[#cecbff] flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8  text-center ">
          <h1 className="text-xl font-semibold ">Sign in</h1>
          <div>
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} type="password" placeholder="Password" />
          </div>
          <div className="flex justify-center pt-4">
            <Button
              variant="primary"
              loading={false}
              text="Signin"
              onClick={signin}
              className=" hover: w-full"
              size="md"
            />
          </div>
          <div>
            {error && <p className="text-red-500  text-sm mt-1">{error}</p>}
          </div>
          <div className="p-1">
            <h1>Don't have an account?</h1>
            <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}
