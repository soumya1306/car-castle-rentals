import Image from "next/image";
import carCastleLogo from "@/assets/car castle.png";
import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="flex items-center w-full ">
      <div className="flex items-center mx-20 justify-between w-full">
        <Link href="/">
          <Image className="w-80 h-20 m-2" src={carCastleLogo} alt="Car Castle Logo" />
        </Link>
        <div id="links" className="flex gap-10 text-lg font-medium justify-end items-center mr-20">
          <Link href="/" className="text-primary hover:opacity-80">
            Home
          </Link>
          <Link href="/" className="text-primary hover:opacity-80">
            Regular Cars
          </Link>
          <Link href="/" className="text-primary mr-30 hover:opacity-80">
            Premium Cars
          </Link>
          <Button>Admin Login</Button>

        </div>
      </div>
    </nav>
  );
}