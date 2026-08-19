import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-[#E3EBDD] bg-[#FAFDF8]/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
                <Link
                    href="/"
                    className="text-2xl font-semibold tracking-tight"
                >
                    <span className="text-[#6B8E62]">Green</span>
                    <span className="text-[#4F5F50]">Pass.</span>
                </Link>

                <nav className="flex items-center gap-7">
                    <Link
                        href="/"
                        className="text-sm font-medium text-[#6F756B] transition-colors hover:text-[#5F7F58]"
                    >
                        หน้าแรก
                    </Link>

                    <Link
                        href="/reward"
                        className="text-sm font-medium text-[#6F756B] transition-colors hover:text-[#5F7F58]"
                    >
                        ของรางวัล
                    </Link>

                    <Link
                        href="/stamp"
                        className="text-sm font-medium text-[#6F756B] transition-colors hover:text-[#5F7F58]"
                    >
                        สะสมแสตมป์
                    </Link>
                </nav>
            </div>
        </header>
    );
}