import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#D6EFE2] bg-[#E8F7F0]/60 text-[#64748B] pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D6EFE2]">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D1FAE5] text-[#064E3B] shadow-2xs border border-[#D6EFE2]">
                <span className="text-xl">🍃</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none">
                  <span className="text-[#00A86B]">Green</span>
                  <span className="text-[#064E3B]">Pass.</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-[#64748B] uppercase mt-0.5">
                  National Parks of Thailand
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-[#64748B] max-w-sm">
              แพลตฟอร์มอุทยานแห่งชาติดิจิทัล เพื่อส่งเสริมการท่องเที่ยวเชิงอนุรักษ์
              บันทึกความทรงจำผ่านแสตมป์ออนไลน์ และสนับสนุนการดูแลรักษาธรรมชาติอย่างยั่งยืน
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-[#065F46]">
              <span className="rounded-full bg-[#D1FAE5] px-3 py-1">Explore</span>
              <span className="rounded-full bg-[#D1FAE5] px-3 py-1">Discover</span>
              <span className="rounded-full bg-[#D1FAE5] px-3 py-1">Preserve</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
              บริการหลัก
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-[#064E3B] transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/park" className="hover:text-[#064E3B] transition-colors">
                  ค้นหาอุทยานแห่งชาติ
                </Link>
              </li>
              <li>
                <Link href="/announcement" className="hover:text-[#064E3B] transition-colors">
                  ข่าวสารและประกาศ
                </Link>
              </li>
              <li>
                <Link href="/reward" className="hover:text-[#064E3B] transition-colors">
                  ของรางวัลและของที่ระลึก
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
              สำหรับนักท่องเที่ยว
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <span className="text-[#64748B]">ข้อควรปฏิบัติในอุทยาน</span>
              </li>
              <li>
                <span className="text-[#64748B]">การเตรียมตัวเดินป่า</span>
              </li>
              <li>
                <span className="text-[#64748B]">พาสปอร์ตอุทยานแห่งชาติ</span>
              </li>
              <li>
                <span className="text-[#64748B]">สิทธิประโยชน์นักท่องเที่ยว</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
              ติดต่อและสายด่วน
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="rounded-2xl bg-white p-4 border border-[#D6EFE2] shadow-2xs">
                <p className="text-[11px] font-semibold text-[#64748B]">สายด่วนพิทักษ์ป่า</p>
                <p className="text-xl font-black text-[#D94C5F] tracking-wide">1362</p>
                <p className="text-[10px] text-[#64748B]">ตลอด 24 ชั่วโมง (โทรฟรี)</p>
              </div>

              <p className="text-[11px] text-[#64748B] leading-tight pt-1">
                กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช<br />
                กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© 2026 GreenPass. สงวนลิขสิทธิ์ทุกประการ</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#064E3B] transition-colors cursor-pointer">
              นโยบายความเป็นส่วนตัว
            </span>
            <span>•</span>
            <span className="hover:text-[#064E3B] transition-colors cursor-pointer">
              ข้อกำหนดการใช้งาน
            </span>
            <span>•</span>
            <span className="hover:text-[#064E3B] transition-colors cursor-pointer">
              การท่องเที่ยวอย่างรับผิดชอบ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}