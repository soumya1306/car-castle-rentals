// React/Next.js imports
import { type ReactNode } from "react";

export default function Button({ children }: { children?: ReactNode }) {
  return (
    <button className="px-3 py-1.5 text-white bg-primary rounded hover:bg-primary/90">
      {children}
    </button>
  );
}
