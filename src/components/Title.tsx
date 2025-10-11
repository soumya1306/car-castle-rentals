import React from "react";

interface TitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  color?: "default" | "white";
}

const Title = ({ title, subtitle, align, color }: TitleProps) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center ${
        align === "left" && " items-start text-left"
      } ${
        align === "right" && "items-end text-right"
      } lg:px-24 xl:px-32 2xl:px-32`}
    >
      <h1
        className={`text-4xl font-semibold md:text-[40px] ${
          color === "white" ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h1>
      <p
        className={`text-sm md:text-base ${
          color === "white" ? "text-white" : "text-gray-500/90"
        } mt-2 max-w-156`}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default Title;
