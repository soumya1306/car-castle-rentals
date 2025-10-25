import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Car Castle",
  description: "Car Rental Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
