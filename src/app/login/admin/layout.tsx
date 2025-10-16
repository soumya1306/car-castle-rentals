import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Navbar</div>
      {children}
    </>
  );
};

export default AdminLayout;
