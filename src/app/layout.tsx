import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Narbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "GreenPass",
  description: "ระบบจัดการอุทยานแห่งชาติ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-[#FAFDF8] text-[#4F5F50] antialiased">
        <Navbar />

        <main className="min-h-[calc(100vh-80px)] flex-1 px-6 py-8 md:px-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}