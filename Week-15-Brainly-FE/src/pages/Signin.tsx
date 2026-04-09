/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<any>();
  const passwordRef = useRef<any>();
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    console.log(usernameRef.current?.value);
    const password = passwordRef.current?.value;
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });
    console.log(response);
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
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
      </div>
    </div>
  );
}
