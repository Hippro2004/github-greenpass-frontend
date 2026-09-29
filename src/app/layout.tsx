import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Narbar";
import Footer from "../components/layout/Footer";

const promptFont = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GreenPass - แพลตฟอร์มอุทยานแห่งชาติดิจิทัล",
  description: "ระบบค้นหาอุทยานแห่งชาติ ข่าวสาร ประกาศเตือนภัย และของรางวัลสะสมแสตมป์ GreenPass",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={promptFont.variable}>
      <body className={`${promptFont.className} min-h-screen bg-[#F3F7F5] text-[#0F172A] antialiased flex flex-col font-sans`}>
        <Navbar />

        <main className="min-h-[calc(100vh-80px)] flex-1 px-4 py-8 sm:px-6 md:px-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}