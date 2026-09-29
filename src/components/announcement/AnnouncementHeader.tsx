"use client";

interface AnnouncementHeaderProps {
  keyword: string;
  onKeywordChange: (val: string) => void;
  totalResults: number;
  onReset: () => void;
  isFallback?: boolean;
}

export default function AnnouncementHeader({
  keyword,
  onKeywordChange,
  totalResults,
  onReset,
  isFallback,
}: AnnouncementHeaderProps) {
  return (
    <section className="mb-8 flex flex-col items-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#D1FAE5] border border-[#D6EFE2] px-4 py-1.5 text-xs font-semibold text-[#064E3B]">
        <span>📢</span>
        <span>ข่าวสารและประกาศ • Official Announcements</span>
      </div>

      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#064E3B] md:text-5xl text-center">
        ประกาศและข่าวสารอุทยาน
      </h1>
      <p className="mb-8 max-w-2xl text-center text-sm md:text-base text-[#64748B] leading-relaxed">
        ค้นหาและติดตามข่าวสาร ประกาศสภาพอากาศ และข้อมูลสำคัญจากอุทยานแห่งชาติทั่วประเทศ
      </p>

      {isFallback && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2 text-xs text-amber-800 border border-amber-200">
          <svg className="h-4 w-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>กำลังแสดงข้อมูลจำลอง (ระบบไม่สามารถเชื่อมต่อเซิร์ฟเวอร์หลังบ้านได้ในขณะนี้)</span>
        </div>
      )}

      {/* ช่องกรอกค้นหา */}
      <div className="w-full max-w-3xl">
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4.5 text-[#00A86B]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="ค้นหาตามหัวข้อประกาศ, อุทยาน, หรือรายละเอียดข่าวสาร..."
            className="w-full rounded-2xl border border-[#D6EFE2] bg-white py-4 pr-12 pl-12 text-sm md:text-base text-[#0F172A] shadow-sm transition-all placeholder:text-[#94A3B8] focus:border-[#00A86B] focus:bg-white focus:shadow-md focus:shadow-[#00A86B]/10 focus:outline-none"
          />

          {keyword && (
            <button
              type="button"
              onClick={() => onKeywordChange("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#94A3B8] hover:text-[#064E3B] transition-colors cursor-pointer"
              aria-label="ล้างการค้นหา"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-[#64748B] px-1">
          <span>
            พบทั้งหมด <strong className="text-[#064E3B]">{totalResults}</strong> รายการ
          </span>

          {keyword && (
            <button
              type="button"
              onClick={onReset}
              className="text-[#00A86B] hover:text-[#064E3B] hover:underline font-semibold transition-colors cursor-pointer"
            >
              ล้างการค้นหา
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
