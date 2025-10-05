// Next.js imports
import Image from "next/image";
import Link from "next/link";

// Local assets
import carCastleLogo from "@/assets/car castle.png";

// Components
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {

  return (
    <nav className="flex items-center w-full border-b-1 border-primary/20">
      <div className="flex items-center sm:mx-20 justify-between w-full ">
        <Link href="/">
          <Image
            className="w-65 h-16 m-2"
            src={carCastleLogo}
            alt="Car Castle Logo"
          />
        </Link>
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </nav>
  );
}
