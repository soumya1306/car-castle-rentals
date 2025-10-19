import React from "react";

const AdminTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="flex flex-col text-primary py-4">
      <h1 className="text-4xl">{title}</h1>
      {subtitle && <p className="text-[14px] mt-2 opacity-50">{subtitle}</p>}
    </div>
  );
};

export default AdminTitle;
