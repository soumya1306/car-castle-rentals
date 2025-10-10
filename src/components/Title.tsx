import React from "react";

interface TitleProps {
  title: string;
  subtitle: string;
  align?: "left" | "center" | "right";
}

const Title = ({ title, subtitle, align }: TitleProps) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center ${
        align === "left" && " items-start text-left"
      } ${align === "right" && "items-end text-right"} lg:px-24 xl:px-32 2xl:px-32`}
    >
      <h1 className="text-4xl font-semibold md:text-[40px]">{title}</h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">{subtitle}</p>
    </div>
  );
};

export default Title;
