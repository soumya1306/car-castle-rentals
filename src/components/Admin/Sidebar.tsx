"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LuCar, LuLayoutDashboard, LuSquarePlus } from "react-icons/lu";
import { usePathname } from "next/dist/client/components/navigation";

const Sidebar = () => {
  // Replace with actual logic to get profileImage if needed
  const profileImage = "";
  const currentPath = usePathname();

  const isActive = (path: string, exact = true) => {
    if (exact) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-primary/20">
      <div className="group relative items-center flex flex-col">
        <label htmlFor="profileImage">
          <Image
            src={profileImage || "/default-profile.png"}
            alt="Profile Image"
            width={120}
            height={120}
            className="rounded-full border-2 border-gray-300"
          />
        </label>
        <h2 className="mt-2">Hi! Admin</h2>
      </div>
      <div className="mt-10 w-full ">
        <div className="flex w-full flex-col items-start">
          <Link
            href="/login/admin/dashboard"
            className={`w-full flex p-2 ${
              isActive("/login/admin/dashboard")
                ? "text-primary bg-primary/10"
                : "text-gray-600"
            }`}
          >
            <LuLayoutDashboard className="m-2 mr-2" />
            <span className="text-left m-1">Dashboard</span>
            <div
              className={`${
                isActive("/login/admin/dashboard") && "bg-primary"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </Link>

          <Link
            href="/login/admin/add-car"
            className={`w-full flex p-2 ${
              isActive("/login/admin/add-car")
                ? "text-primary bg-primary/10"
                : "text-gray-600"
            }`}
          >
            <LuSquarePlus className="m-2 mr-2" />
            <span className="text-left mt-1">Add Car</span>
            <div
              className={`${
                isActive("/login/admin/add-car") && "bg-primary"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </Link>

          <Link
            href="/login/admin/manage-cars"
            className={`w-full flex p-2 ${
              isActive("/login/admin/manage-cars")
                ? "text-primary bg-primary/10"
                : "text-gray-600"
            }`}
          >
            <LuCar className="m-2 mr-2" />
            <span className="text-left mt-1">Manage Cars</span>
            <div
              className={`${
                isActive("/login/admin/manage-cars") && "bg-primary"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
