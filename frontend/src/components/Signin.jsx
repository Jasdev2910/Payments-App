import React, { useState } from "react";
import { Heading } from "./Heading";
import { SubHeading } from "./SubHeading";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { BottomWarning } from "./BottomWarning";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { SIGNIN_URL } from "../constants";
import { PasswordInput } from "./PasswordInput";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = useUser();
  console.log(user);
  if (user.loading) {
    return "Loading....";
  }

  if (user.userDetails) {
    return <Navigate to="/body" />;
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <PasswordInput
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(SIGNIN_URL, {
                    username,
                    password,
                  });
                  setError("");
                  navigate("/body");
                  localStorage.setItem("token", response.data.token);
                  console.log(response);
                } catch (error) {
                  setError(error.response.data.message);
                  console.log(error);
                  console.log(error.response.data.message);
                }
              }}
              label={"Sign in"}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
