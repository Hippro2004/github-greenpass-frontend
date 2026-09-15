/* eslint-disable @next/next/no-img-element */
"use client";

import { Park } from "../../types/park";

interface ParkCardProps {
  park: Park;
  onSelect: (park: Park) => void;
}

// ฟังก์ชันช่วยดึงชื่อจังหวัดจากที่อยู่
export function extractProvince(address: string): string {
  if (!address) return "ประเทศไทย";
  const match = address.match(/(?:จังหวัด|จ\.)\s*([ก-๙]+)/);
  if (match && match[1]) {
    return match[1];
  }
  if (address.includes("เชียงใหม่")) return "เชียงใหม่";
  if (address.includes("นครราชสีมา")) return "นครราชสีมา";
  if (address.includes("กาญจนบุรี")) return "กาญจนบุรี";
  if (address.includes("เพชรบุรี")) return "เพชรบุรี";
  return "อุทยานแห่งชาติ";
}

// ฟังก์ชันตัดเวลาให้กระชับ เช่น "06:00:00" -> "06:00"
export function formatTime(timeStr?: string | null): string {
  if (!timeStr) return "--:--";
  const parts = timeStr.split(":");
  if (parts.length >= 2) {
    return `${parts[0]}:${parts[1]}`;
  }
  return timeStr;
}

// เช็คสถานะเวลาเปิด ณ ขณะนี้
export function isCurrentlyOpen(openTime?: string, closeTime?: string, isClosed?: boolean): boolean {
  if (isClosed) return false;
  if (!openTime || !closeTime) return true;

  try {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [openH, openM] = openTime.split(":").map(Number);
    const [closeH, closeM] = closeTime.split(":").map(Number);

    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  } catch {
    return true;
  }
}

export default function ParkCard({ park, onSelect }: ParkCardProps) {
  const province = extractProvince(park.address);
  const openNow = isCurrentlyOpen(park.openTime, park.closeTime, park.isTemporaryClosed);

  return (
    <div
      onClick={() => onSelect(park)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#E3EBDD] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#6B8E62]/40 hover:shadow-lg hover:shadow-[#6B8E62]/10 cursor-pointer"
    >
      {/* ภาพปกอุทยาน */}
      <div className="relative h-52 w-full overflow-hidden bg-[#EEF4EB]">
        {park.image ? (
          <img
            src={park.image}
            alt={park.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // fallback ภาพธรรมชาติถ้า url เสีย
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#E8F3E5] text-[#5F7F58]">
            <svg className="h-14 w-14 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Badge จังหวัด (มุมบนซ้าย) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#3F6848] shadow-xs">
          <svg className="h-3.5 w-3.5 text-[#6B8E62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{province}</span>
        </div>

        {/* Badge สถานะ (มุมบนขวา) */}
        <div className="absolute top-3 right-3">
          {park.isTemporaryClosed ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/90 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              ปิดชั่วคราว
            </span>
          ) : park.isSeasonalPark ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white shadow-xs">
              เปิดตามฤดูกาล
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3F6848]/85 backdrop-blur-md px-3 py-1 text-xs font-medium text-white shadow-xs">
              <span className={`h-2 w-2 rounded-full ${openNow ? "bg-emerald-400" : "bg-zinc-300"}`} />
              {openNow ? "เปิดทำการตอนนี้" : "นอกเวลาทำการ"}
            </span>
          )}
        </div>

        {/* ชื่ออุทยานบนภาพสำหรับ mobile/preview */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-xs font-light text-emerald-100 tracking-wide">NATIONAL PARK</p>
          <h3 className="text-lg font-bold leading-tight line-clamp-1 drop-shadow-sm">
            {park.name}
          </h3>
        </div>
      </div>

      {/* เนื้อหาการ์ด */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* ข้อมูลเวลาเปิด-ปิด และสถานะ */}
          <div className="flex items-center justify-between text-xs text-[#6F756B] mb-3 pb-3 border-b border-[#F0F5ED]">
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#6B8E62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatTime(park.openTime)} - {formatTime(park.closeTime)} น.</span>
            </div>

            <div className="flex items-center gap-1 text-[#5F7F58] font-medium">
              <span>{park.status || "เปิดตามปกติ"}</span>
            </div>
          </div>

          {/* รายละเอียดสรุปย่อ */}
          <p className="text-sm text-[#6F756B] line-clamp-2 leading-relaxed mb-4">
            {park.description || "อุทยานแห่งชาติที่อุดมสมบูรณ์ไปด้วยผืนป่า พรรณไม้ และสัตว์ป่านานาชนิด"}
          </p>

          {/* หมายเหตุด่านตรวจ / ประกาศ (ถ้ามี) */}
          {park.eventNote && (
            <div className="mb-4 flex items-start gap-2 rounded-xl bg-[#F6FAF4] p-2.5 text-xs text-[#5F7F58] border border-[#E8F3E5]">
              <svg className="h-4 w-4 shrink-0 text-[#6B8E62] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="line-clamp-1">{park.eventNote}</span>
            </div>
          )}
        </div>

        {/* ปุ่มด้านล่างการ์ด */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(park);
            }}
            className="flex-1 rounded-xl bg-[#E8F3E5] py-2.5 text-center text-xs font-semibold text-[#3F6848] transition-all hover:bg-[#6B8E62] hover:text-white"
          >
            ดูรายละเอียด
          </button>

          {park.location && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="เปิดแผนที่นำทางใน Google Maps"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E3EBDD] bg-white text-[#5F7F58] transition-all hover:border-[#6B8E62] hover:bg-[#FAFDF8] hover:text-[#3F6848]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
