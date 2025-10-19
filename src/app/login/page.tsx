"use client";

import React from "react";
import { LuLock, LuMail } from "react-icons/lu";

const LoginPage = () => {
  const handleSubmit = (formData: FormData) => {};
  return (
    <div className="flex items-center text-sm text-gray-600 bg-background min-h-screen justify-center px-4">
      <form
        action={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-primary text-3xl mt-10 font-medium">Admin Login</h1>
        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <LuMail className="text-gray-700" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0"
            required
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <LuLock className="text-gray-700" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-10 mb-10 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
