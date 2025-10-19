// Next.js imports
import Link from "next/link";

// Components
import Button from "../Button";

interface DesktopNavbarProps {
  currentRoute: string;
}

export default function DesktopNavbar({ currentRoute }: DesktopNavbarProps) {
  return (
    <div
      id="links"
      className="flex gap-10 justify-end items-center lg:mr-6 xl:mr-10 2xl:mr-14  max-sm:hidden"
    >
      <Link href="/" className="text-primary 2xl:text-[18px] 2xl:text- opacity-80 hover:opacity-100">
        Home
      </Link>
      <Link href="/reg-cars" className="text-primary 2xl:text-[18px] opacity-80 hover:opacity-100">
        Regular Cars
      </Link>
      <Link href="/prem-cars" className="text-primary 2xl:text-[18px] opacity-80 2xl:mr-20 hover:opacity-80">
        Premium Cars
      </Link>
      <Button>Admin Login</Button>
    </div>
  );
}
