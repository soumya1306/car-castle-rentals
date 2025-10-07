// React/Next.js imports
import { type ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-white bg-primary rounded hover:bg-primary/90"
    >
      {children}
    </button>
  );
}
