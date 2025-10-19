import React from "react";

import Image from "next/image";
import logoImg from "@/assets/car castle.png";
import Link from "next/link";

const AdminNavbar = () => {
  return (
    <nav className="flex items-center w-full border-b-1 border-primary/20">
      <div className="flex items-center lg:mx-18 justify-between w-full ">
        <Link href="/">
          <Image
            className="w-50 h-12 md:w-50 md:h-12 xl:w-65 xl:h-17 m-2"
            src={logoImg}
            alt="Car Castle Logo"
          />
        </Link>
        <h1>Hi! Admin</h1>
      </div>
    </nav>
  );
};

export default AdminNavbar;
