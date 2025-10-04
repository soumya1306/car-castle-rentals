export default function Button({ children }: { children?: React.ReactNode }) {
  return (
    <button className="px-4 py-2 text-white bg-primary rounded hover:bg-primary/90">
      {children}
    </button>
  );
}
