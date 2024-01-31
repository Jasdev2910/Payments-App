import React from "react";
import { Heading } from "./Heading";
import { SubHeading } from "./SubHeading";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { BottomWarning } from "./BottomWarning";

export const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox placeholder="John" label={"First Name"} />
          <InputBox placeholder="Doe" label={"Last Name"} />
          <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
          <InputBox placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign up"} />
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
