// Next.js imports
import Link from "next/link";

// Components
import Button from "../Button";

export default function DesktopNavbar() {
  return (
    <div
      id="links"
      className="flex gap-10 justify-end items-center mr-20 max-sm:hidden"
    >
      <Link href="/" className="text-primary opacity-80 hover:opacity-100">
        Home
      </Link>
      <Link href="/reg-cars" className="text-primary opacity-80 hover:opacity-100">
        Regular Cars
      </Link>
      <Link href="/prem-cars" className="text-primary opacity-80  mr-30 hover:opacity-80">
        Premium Cars
      </Link>
      <Button>Admin Login</Button>
    </div>
  );
}
