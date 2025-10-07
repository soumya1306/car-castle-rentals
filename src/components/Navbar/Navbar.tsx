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
      <div className="flex items-center sm:mx-20 justify-between w-full 2xl:my-2">
        <Link href="/">
          <Image
            className="xl:w-65 xl:h-16 2xl:w-70 2xl:h-18 m-2"
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
