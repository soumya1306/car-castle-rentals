"use client";
// Next.js imports
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Local assets
import carCastleLogo from "@/assets/car castle.png";

// Components
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const currentRoute = usePathname();

  if (currentRoute.includes("login")) {
    return null; // Hide the navbar on the login page and subsequent pages
  }

  return (
    <nav className="flex items-center w-full border-b-1 border-primary/20">
      <div className="flex items-center lg:mx-18 justify-between w-full ">
        <Link href="/">
          <Image
            className="w-50 h-12 md:w-50 md:h-12 xl:w-65 xl:h-17 m-2"
            src={carCastleLogo}
            alt="Car Castle Logo"
          />
        </Link>
        <DesktopNavbar currentRoute={currentRoute} />
        <MobileNavbar />
      </div>
    </nav>
  );
}
