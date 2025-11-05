"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import logo from "@/assets/car castle.png";
import { LuMail, LuPhone } from "react-icons/lu";

const Footer = () => {
  const currentRoute = usePathname();

  if (currentRoute.includes("/login")) {
    return null; // Hide the footer on the login page and subsequent pages
  }
  return (
    <div className="text-black pt-8 px-6 md:px-16 lg:px-24 mt-20 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:justify-center lg:justify-items-center gap-12">
        {/* Logo and Description */}
        <div className="max-w-80 flex flex-col items-start ">
          <Image
            src={logo}
            alt="Car Castle Logo"
            width={250}
            height={60}
            className="mb-4"
          />
          <p className="text-sm">
            Car Castle Rentals offers reliable, budget-friendly, and premium cars for every journey. Enjoy hassle-free bookings, transparent pricing, and top-notch service—drive with confidence and comfort every time.

          </p>

        </div>

        {/* Company */}
        <div className="max-w-80 flex flex-col items-start lg:items-start mt-4  ">
          <p className="text-lg text-gray-800 font-bold">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-4 ">
            <li className="hover:underline max-sm:underline">
              <a href="#about">About</a>
            </li>
            <li className="hover:underline max-sm:underline">
              <a href="#featured">Featured Cars</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="max-w-80 flex flex-col items-start lg:items-center mt-4">
          <p className="text-xl text-gray-800 lg:-ml-18 font-bold">SUPPORT</p>
          <ul className="mt-3 lg:-ml-3 flex flex-col gap-4 ">
            <li className="hover:underline max-sm:underline">
              <a href="/help-center">Help Center</a>
            </li>
            <li className="hover:underline max-sm:underline">
              <a href="/help-center">Safety Information</a>
            </li>
            <li className="hover:underline max-sm:underline">
              <a href="/help-center">Cancellation Options</a>
            </li>
            <li className="hover:underline max-sm:underline">
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="max-w-80 flex flex-col items-start lg:items-start mt-4">
          <p className="text-lg text-gray-800 font-bold ">CONTACT</p>
            Address: Verem, Reis Magos<br /> Pin-403114, Goa, India<br />
          <div className="flex pt-4"> 
            <LuPhone size={16} className="mt-[5px] mr-2" />
            <ul>
              <li className="hover:underline max-sm:underline"><a href="tel:+918007837458">+91 8007837458</a></li>
              <li className="hover:underline max-sm:underline"><a href="tel:+917867286682">+91 7867286682</a></li>
            </ul>
          </div>

          <div className="flex pt-4"> 
            <LuMail size={16} className="mt-[5px] mr-2" />
            <ul>
              <li className="hover:underline"><a href="mailto:carcastle@gmail.com">carcastle@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>

      
      <hr className="border-gray-300 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="#">Car Castle</a>. All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
