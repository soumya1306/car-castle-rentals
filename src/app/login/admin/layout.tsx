import AdminNavbar from "@/components/Admin/AdminNavbar";
import Sidebar from "@/components/Admin/Sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
