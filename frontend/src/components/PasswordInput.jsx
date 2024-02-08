import React from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

export function PasswordInput({ label, placeholder, onChange, value }) {
  const location = useLocation();
  const path = location.pathname;

  const inputRef = useRef();

  const togglePasswordVisibility = () => {
    const input = inputRef.current;
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        ref={inputRef}
        type="password"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
      {path === "/body/update" && (
        <div className="pt-2">
          <label className="text-sm outline-none">
            <input
              className="mr-3"
              type="checkbox"
              onClick={togglePasswordVisibility}
            />
            Show Password
          </label>
        </div>
      )}
    </div>
  );
}
