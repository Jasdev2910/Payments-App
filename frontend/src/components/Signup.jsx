import React, { useState } from "react";
import { Heading } from "./Heading";
import { SubHeading } from "./SubHeading";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { BottomWarning } from "./BottomWarning";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { SIGNUP_URL } from "../constants";
import { PasswordInput } from "./PasswordInput";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

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
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
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
                  const response = await axios.post(SIGNUP_URL, {
                    firstName,
                    lastName,
                    username,
                    password,
                  });
                  setError("");
                  localStorage.setItem("token", response.data.token);
                  console.log(response);
                  navigate("/body");
                } catch (error) {
                  setError(error.response.data.message);
                  console.log(error);
                }
              }}
              label={"Sign up"}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
