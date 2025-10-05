"use client";

// React/Next.js imports
import Link from "next/link";
import { useState } from "react";
// External libraries
import { FiMenu, FiX } from "react-icons/fi";

// Local imports
import { NAVBAR_MENU_ELEMENTS } from "@/data/menu";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sm:hidden"  >
      <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <FiX className="w-6 h-6"></FiX>
        ) : (
          <FiMenu className="w-6 h-6"></FiMenu>
        )}
      </button>

        <div
          id="links"
          className={`flex fixed right-0 top-20 w-60 flex-col items-end bg-primary/20 z-50 transition-all h-full duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAVBAR_MENU_ELEMENTS.map((element) => (
            <div className="p-4" key={element.name}>
              <Link
                href={element.href}
                className="text-primary hover:opacity-80"
              >
                {element.name}
              </Link>
            </div>
          ))}
        </div>
    </div>
  );
}