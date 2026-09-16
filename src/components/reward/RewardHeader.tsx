"use client";

interface RewardHeaderProps {
  keyword: string;
  onKeywordChange: (val: string) => void;
  totalResults: number;
  onReset: () => void;
  isFallback?: boolean;
}

export default function RewardHeader({
  keyword,
  onKeywordChange,
  totalResults,
  onReset,
  isFallback,
}: RewardHeaderProps) {
  return (
    <section className="mb-8 flex flex-col items-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E8F3E5] px-4 py-1.5 text-xs font-semibold text-[#5F7F58]">
        <span>🎁</span>
        <span>ของรางวัลและสิทธิพิเศษ • GreenPass Exclusive Rewards</span>
      </div>

      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#3F6848] md:text-5xl text-center">
        ของรางวัลและของที่ระลึก
      </h1>
      <p className="mb-8 max-w-2xl text-center text-sm md:text-base text-[#6F756B] leading-relaxed">
        ออกเดินทางท่องเที่ยวอุทยานแห่งชาติ สะสมแสตมป์ดิจิทัลผ่าน GreenPass เพื่อแลกรับของที่ระลึกสุดเอ็กซ์คลูซีฟและสิทธิประโยชน์มากมาย
      </p>

      {isFallback && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2 text-xs text-amber-800 border border-amber-200">
          <svg className="h-4 w-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>กำลังแสดงข้อมูลจำลอง (ระบบไม่สามารถเชื่อมต่อเซิร์ฟเวอร์หลังบ้านได้ในขณะนี้)</span>
        </div>
      )}

      <div className="w-full max-w-2xl">
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4.5 text-[#6B8E62]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="ค้นหาของรางวัล เช่น เข็มกลัด, กระเป๋า, หมวก..."
            className="w-full rounded-2xl border border-[#D5E2CE] bg-white py-4 pr-12 pl-12 text-sm md:text-base text-[#3F6848] shadow-sm transition-all placeholder:text-[#9DA79B] focus:border-[#6B8E62] focus:bg-white focus:shadow-md focus:shadow-[#6B8E62]/10 focus:outline-none"
          />

          {keyword && (
            <button
              type="button"
              onClick={() => onKeywordChange("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#8A9488] hover:text-[#3F6848] transition-colors"
              aria-label="ล้างการค้นหา"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between px-1 text-xs text-[#8A9488]">
          <span>
            พบของรางวัลทั้งหมด <strong className="text-[#3F6848] font-bold">{totalResults}</strong> รายการ
          </span>
          {keyword && (
            <button
              type="button"
              onClick={onReset}
              className="text-[#B85450] hover:underline"
            >
              ล้างการค้นหา
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
