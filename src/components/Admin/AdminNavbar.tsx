"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuLogOut, LuLoader } from "react-icons/lu";
import { useAuth } from "@/contexts/AuthContext";
import logoImg from "@/assets/car castle.png";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="flex items-center w-full border-b-1 border-primary/20 shadow-sm">
      <div className="flex items-center lg:mx-18 justify-between w-full px-4">
        <Link href="/">
          <Image
            className="w-50 h-12 md:w-50 md:h-12 xl:w-65 xl:h-17 m-2"
            src={logoImg}
            alt="Car Castle Logo"
          />
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <span className="hidden md:block">
              Hi! {user?.email || 'Admin'}
            </span>
            <span className="md:hidden">
              Admin
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600/10 text-red-600 hover:text-red-600 hover:bg-red-600/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Logout"
          >
            {isLoggingOut ? (
              <LuLoader className="w-4 h-4 animate-spin" />
            ) : (
              <LuLogOut className="w-4 h-4" />
            )}
            <span className="hidden sm:block">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
