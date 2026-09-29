"use client";

interface ParkSearchHeaderProps {
  keyword: string;
  onKeywordChange: (val: string) => void;
  statusFilter: "all" | "open" | "seasonal" | "closed";
  onStatusFilterChange: (val: "all" | "open" | "seasonal" | "closed") => void;
  provinceFilter: string;
  onProvinceFilterChange: (val: string) => void;
  availableProvinces: string[];
  totalResults: number;
  onReset: () => void;
  isFallback?: boolean;
}

export default function ParkSearchHeader({
  keyword,
  onKeywordChange,
  statusFilter,
  onStatusFilterChange,
  provinceFilter,
  onProvinceFilterChange,
  availableProvinces,
  totalResults,
  onReset,
  isFallback,
}: ParkSearchHeaderProps) {
  const hasActiveFilters = Boolean(keyword || statusFilter !== "all" || provinceFilter !== "all");

  return (
    <section className="mb-8 flex flex-col items-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#D1FAE5] border border-[#D6EFE2] px-4 py-1.5 text-xs font-semibold text-[#064E3B]">
        <span>🌲</span>
        <span>สำรวจอุทยานแห่งชาติ • National Parks of Thailand</span>
      </div>

      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#064E3B] md:text-5xl text-center">
        ค้นหาอุทยานแห่งชาติ
      </h1>
      <p className="mb-8 max-w-2xl text-center text-sm md:text-base text-[#64748B] leading-relaxed">
        ค้นพบความงดงามของธรรมชาติ ผืนป่า และน้ำตกทั่วประเทศไทย เช็คเวลาเปิดทำการ พิกัดแผนที่ และเตรียมพร้อมสะสมแสตมป์ GreenPass
      </p>

      {isFallback && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2 text-xs text-amber-800 border border-amber-200">
          <svg className="h-4 w-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>กำลังแสดงข้อมูลจำลอง (ระบบไม่สามารถเชื่อมต่อเซิร์ฟเวอร์หลังบ้านได้ในขณะนี้)</span>
        </div>
      )}

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
            placeholder="ค้นหาชื่ออุทยาน, จังหวัด, หรือคำสำคัญ..."
            className="w-full rounded-2xl border border-[#D6EFE2] bg-white py-4 pr-12 pl-12 text-sm md:text-base text-[#0F172A] shadow-sm transition-all placeholder:text-[#94A3B8] focus:border-[#00A86B] focus:bg-white focus:shadow-md focus:shadow-[#00A86B]/10 focus:outline-none"
          />

          {keyword && (
            <button
              type="button"
              onClick={() => onKeywordChange("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#94A3B8] hover:text-[#064E3B] transition-colors"
              aria-label="ล้างการค้นหา"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => onStatusFilterChange("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-[#064E3B] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#D6EFE2] hover:bg-[#E8F7F0] hover:text-[#064E3B]"
              }`}
            >
              ทั้งหมด
            </button>

            <button
              type="button"
              onClick={() => onStatusFilterChange("open")}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === "open"
                  ? "bg-[#00A86B] text-white shadow-xs"
                  : "bg-white text-[#065F46] border border-[#D6EFE2] hover:bg-[#E8F7F0]"
              }`}
            >
              <span>🟢</span>
              <span>เปิดตามปกติ</span>
            </button>

            <button
              type="button"
              onClick={() => onStatusFilterChange("seasonal")}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === "seasonal"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              <span>🗓️</span>
              <span>เปิดตามฤดูกาล</span>
            </button>

            <button
              type="button"
              onClick={() => onStatusFilterChange("closed")}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === "closed"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-white text-rose-700 border border-rose-200 hover:bg-rose-50"
              }`}
            >
              <span>🔴</span>
              <span>ปิดบริการชั่วคราว</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="province-filter" className="text-xs text-[#64748B] whitespace-nowrap">
              จังหวัด:
            </label>
            <select
              id="province-filter"
              value={provinceFilter}
              onChange={(e) => onProvinceFilterChange(e.target.value)}
              className="rounded-xl border border-[#D6EFE2] bg-white px-3 py-1.5 text-xs font-medium text-[#0F172A] shadow-2xs focus:border-[#00A86B] focus:outline-none cursor-pointer"
            >
              <option value="all">ทุกจังหวัด</option>
              {availableProvinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-[#64748B] px-1">
          <span>
            พบอุทยานทั้งหมด <strong className="text-[#064E3B]">{totalResults}</strong> แห่ง
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="text-[#00A86B] hover:text-[#064E3B] hover:underline font-semibold transition-colors"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
