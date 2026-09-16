"use client";

import { AnnouncementCategory } from "../../types/announcement";

interface AnnouncementHeaderProps {
  keyword: string;
  onKeywordChange: (val: string) => void;
  category: AnnouncementCategory;
  onCategoryChange: (cat: AnnouncementCategory) => void;
  parkFilter: string;
  onParkFilterChange: (park: string) => void;
  availableParks: string[];
  totalResults: number;
  onReset: () => void;
  isFallback?: boolean;
}

export default function AnnouncementHeader({
  keyword,
  onKeywordChange,
  category,
  onCategoryChange,
  parkFilter,
  onParkFilterChange,
  availableParks,
  totalResults,
  onReset,
  isFallback,
}: AnnouncementHeaderProps) {
  const hasActiveFilters = Boolean(keyword || category !== "all" || parkFilter !== "all");

  return (
    <section className="mb-8 flex flex-col items-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E8F3E5] px-4 py-1.5 text-xs font-semibold text-[#5F7F58]">
        <span>📢</span>
        <span>ข่าวสารและประกาศสำคัญ • Official Parks Announcements</span>
      </div>

      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#3F6848] md:text-5xl text-center">
        ประกาศและข่าวสารอุทยาน
      </h1>
      <p className="mb-8 max-w-2xl text-center text-sm md:text-base text-[#6F756B] leading-relaxed">
        ติดตามอัปเดตสภาพอากาศ คำเตือนภัยธรรมชาติ การปิด-เปิดจุดท่องเที่ยว และข่าวสารกิจกรรมล่าสุดจากอุทยานแห่งชาติทั่วประเทศ
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
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4.5 text-[#6B8E62]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="ค้นหาตามหัวข้อประกาศ, อุทยาน, หรือรายละเอียดข่าวสาร..."
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

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                category === "all"
                  ? "bg-[#6B8E62] text-white shadow-xs"
                  : "bg-white text-[#6F756B] border border-[#E3EBDD] hover:bg-[#F3F8F1] hover:text-[#3F6848]"
              }`}
            >
              ทั้งหมด
            </button>

            <button
              type="button"
              onClick={() => onCategoryChange("urgent")}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                category === "urgent"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-white text-rose-700 border border-rose-200 hover:bg-rose-50"
              }`}
            >
              <span>🚨</span>
              <span>ประกาศด่วน</span>
            </button>

            <button
              type="button"
              onClick={() => onCategoryChange("closure")}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                category === "closure"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              <span>⚠️</span>
              <span>ปิดบริการชั่วคราว</span>
            </button>

            <button
              type="button"
              onClick={() => onCategoryChange("general")}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                category === "general"
                  ? "bg-[#3F6848] text-white shadow-xs"
                  : "bg-white text-[#5F7F58] border border-[#E3EBDD] hover:bg-[#F3F8F1]"
              }`}
            >
              <span>🌿</span>
              <span>ข่าวประชาสัมพันธ์</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={parkFilter}
                onChange={(e) => onParkFilterChange(e.target.value)}
                className="appearance-none rounded-full border border-[#E3EBDD] bg-white py-1.5 pr-8 pl-3.5 text-xs font-medium text-[#5F7F58] shadow-2xs hover:border-[#6B8E62] focus:outline-none focus:border-[#6B8E62] cursor-pointer"
              >
                <option value="all">ทุกอุทยาน ({availableParks.length})</option>
                {availableParks.map((pName) => (
                  <option key={pName} value={pName}>
                    {pName}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#6B8E62]">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onReset}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-[#B85450] hover:bg-rose-50 transition-colors"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-1 text-xs text-[#8A9488]">
          <span>
            แสดงข่าวสารทั้งหมด <strong className="text-[#3F6848] font-bold">{totalResults}</strong> รายการ
          </span>
          {keyword && (
            <span>
              ค้นหาด้วยคำว่า: &quot;<span className="text-[#3F6848] font-semibold">{keyword}</span>&quot;
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
