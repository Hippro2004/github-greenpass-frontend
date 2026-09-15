import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E3EBDD] bg-[#F6FAF4] text-[#6F756B] pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E3EBDD]">
          {/* Column 1: Brand & Bio (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F3E5] text-[#3F6848] shadow-2xs">
                <span className="text-lg">🍃</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none">
                  <span className="text-[#6B8E62]">Green</span>
                  <span className="text-[#3F6848]">Pass.</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-[#8A9488] uppercase">
                  National Parks of Thailand
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-[#6F756B] max-w-sm">
              แพลตฟอร์มอุทยานแห่งชาติดิจิทัล เพื่อส่งเสริมการท่องเที่ยวเชิงอนุรักษ์
              บันทึกความทรงจำผ่านแสตมป์ออนไลน์ และสนับสนุนการดูแลรักษาธรรมชาติอย่างยั่งยืน
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-[#5F7F58]">
              <span className="rounded-full bg-[#E8F3E5] px-3 py-1">Explore</span>
              <span className="rounded-full bg-[#E8F3E5] px-3 py-1">Discover</span>
              <span className="rounded-full bg-[#E8F3E5] px-3 py-1">Preserve</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3F6848]">
              บริการหลัก
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-[#3F6848] transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/park" className="hover:text-[#3F6848] transition-colors">
                  ค้นหาอุทยานแห่งชาติ
                </Link>
              </li>
              <li>
                <Link href="/announcement" className="hover:text-[#3F6848] transition-colors">
                  ข่าวสารและประกาศ
                </Link>
              </li>
              <li>
                <Link href="/reward" className="hover:text-[#3F6848] transition-colors">
                  ของรางวัลและของที่ระลึก
                </Link>
              </li>
              <li>
                <Link href="/stamp" className="hover:text-[#3F6848] transition-colors flex items-center gap-1.5">
                  <span>สะสมแสตมป์ดิจิทัล</span>
                  <span className="rounded-full bg-[#6B8E62] text-white px-1.5 py-0.2 text-[9px] font-bold">
                    Mobile App
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tourist Guidelines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3F6848]">
              สำหรับนักท่องเที่ยว
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <span className="text-[#6F756B]">ข้อควรปฏิบัติในอุทยาน</span>
              </li>
              <li>
                <span className="text-[#6F756B]">การเตรียมตัวเดินป่า</span>
              </li>
              <li>
                <span className="text-[#6F756B]">พาสปอร์ตอุทยานแห่งชาติ</span>
              </li>
              <li>
                <span className="text-[#6F756B]">สิทธิประโยชน์นักท่องเที่ยว</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hotline & Emergency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3F6848]">
              ติดต่อและสายด่วน
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="rounded-2xl bg-white p-3 border border-[#E3EBDD] shadow-2xs">
                <p className="text-[11px] font-semibold text-[#8A9488]">สายด่วนพิทักษ์ป่า</p>
                <p className="text-lg font-black text-[#B85450] tracking-wide">1362</p>
                <p className="text-[10px] text-[#8A9488]">ตลอด 24 ชั่วโมง (โทรฟรี)</p>
              </div>

              <p className="text-[11px] text-[#8A9488] leading-tight pt-1">
                กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช<br />
                กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A9488]">
          <p>© 2026 GreenPass. สงวนลิขสิทธิ์ทุกประการ</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#3F6848] transition-colors cursor-pointer">
              นโยบายความเป็นส่วนตัว
            </span>
            <span>•</span>
            <span className="hover:text-[#3F6848] transition-colors cursor-pointer">
              ข้อกำหนดการใช้งาน
            </span>
            <span>•</span>
            <span className="hover:text-[#3F6848] transition-colors cursor-pointer">
              การท่องเที่ยวอย่างรับผิดชอบ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}