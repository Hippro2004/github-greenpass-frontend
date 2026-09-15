/* eslint-disable @next/next/no-img-element */
"use client";

import { Announcement } from "../../types/announcement";

interface AnnouncementCardProps {
  announcement: Announcement;
  onSelect: (announcement: Announcement) => void;
}

// แปลงวันที่เป็นฟอร์แมตภาษาไทย
export function formatThaiDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear() + 543; // พ.ศ.
    return `${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}

// ตรวจสอบระดับความสำคัญและประเภทของประกาศ
export function getAnnouncementMeta(announcement: Announcement): {
  type: "urgent" | "closure" | "general";
  label: string;
  badgeClass: string;
} {
  const text = `${announcement.announcementTitle} ${announcement.description}`;
  if (text.includes("🚨") || text.includes("ด่วน") || text.includes("สำคัญ")) {
    return {
      type: "urgent",
      label: "ประกาศด่วน / สำคัญ",
      badgeClass: "bg-rose-500/90 text-white",
    };
  }
  if (text.includes("⚠️") || text.includes("ปิด") || text.includes("ปรับปรุง")) {
    return {
      type: "closure",
      label: "แจ้งปิดจุดท่องเที่ยว",
      badgeClass: "bg-amber-500/90 text-white",
    };
  }
  return {
    type: "general",
    label: "ข่าวประชาสัมพันธ์",
    badgeClass: "bg-[#3F6848]/90 text-white",
  };
}

// รูปภาพธรรมชาติสำรองตาม ID เพื่อความสวยงามไม่ซ้ำกัน
export function resolveAnnouncementImage(imageUrl?: string, id: number = 0): string {
  if (imageUrl && (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
    return imageUrl;
  }
  const fallbackImages = [
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  ];
  return fallbackImages[Math.abs(id) % fallbackImages.length];
}

export default function AnnouncementCard({ announcement, onSelect }: AnnouncementCardProps) {
  const meta = getAnnouncementMeta(announcement);
  const imageUrl = resolveAnnouncementImage(announcement.image, announcement.announcementId);
  const formattedDate = formatThaiDate(announcement.postDate);

  return (
    <div
      onClick={() => onSelect(announcement)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#E3EBDD] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#6B8E62]/40 hover:shadow-lg hover:shadow-[#6B8E62]/10 cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[#EEF4EB]">
        <img
          src={imageUrl}
          alt={announcement.announcementTitle}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

        {/* Badge ประเภทประกาศ (มุมซ้ายบน) */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full backdrop-blur-md px-3 py-1 text-xs font-semibold shadow-xs ${meta.badgeClass}`}>
            {meta.type === "urgent" && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
            {meta.label}
          </span>
        </div>

        {/* Badge วันที่ (มุมขวาบน) */}
        <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-[#3F6848] shadow-xs">
          {formattedDate}
        </div>

        {/* อุทยานที่เกี่ยวข้อง (มุมล่างซ้าย) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs text-white/95 drop-shadow-sm font-medium">
          <svg className="h-4 w-4 shrink-0 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{announcement.parkName || "อุทยานแห่งชาติ"}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-base font-bold text-[#3F6848] line-clamp-2 leading-snug mb-2 group-hover:text-[#5F7F58] transition-colors">
            {announcement.announcementTitle}
          </h3>

          <p className="text-sm text-[#6F756B] line-clamp-3 leading-relaxed mb-4">
            {announcement.description}
          </p>
        </div>

        {/* Card Action */}
        <div className="pt-2 border-t border-[#F0F5ED] flex items-center justify-between">
          <span className="text-xs text-[#8A9488]">
            รหัสประกาศ #{announcement.announcementId}
          </span>

          <span className="flex items-center gap-1 text-xs font-semibold text-[#6B8E62] group-hover:text-[#3F6848] transition-colors">
            อ่านรายละเอียด
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
