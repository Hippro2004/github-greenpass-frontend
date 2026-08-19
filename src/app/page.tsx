import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center pt-[12vh]">
      <div className="mb-4 rounded-full bg-[#E8F3E5] px-4 py-2 text-sm font-medium text-[#5F7F58]">
        Explore • Discover • Preserve
      </div>

      <h1 className="mb-5 text-5xl font-bold tracking-tight text-[#3F6848] md:text-6xl">
        Explore the Nature.
      </h1>

      <p className="mx-auto mb-10 max-w-xl text-lg font-normal leading-relaxed text-[#6F756B]">
        ออกเดินทางสำรวจอุทยานแห่งชาติ สะสมแสตมป์ออนไลน์
        และค้นพบประสบการณ์ใหม่ ๆ จากธรรมชาติได้ง่าย ๆ ผ่าน GreenPass
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/park"
          className="rounded-full bg-[#6B8E62] px-8 py-3 font-medium text-white transition-all hover:bg-[#5F7F58] hover:-translate-y-0.5"
        >
          ค้นหาอุทยาน
        </Link>

        <Link
          href="/reward"
          className="rounded-full border border-[#B8CCB0] bg-white px-8 py-3 font-medium text-[#5F7F58] transition-all hover:bg-[#F3F8F1]"
        >
          ดูของรางวัล
        </Link>
      </div>
    </div>
  );
}