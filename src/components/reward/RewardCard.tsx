/* eslint-disable @next/next/no-img-element */
"use client";

import { Reward } from "../../types/reward";

interface RewardCardProps {
  reward: Reward;
  onSelect: (reward: Reward) => void;
}

// ฟังก์ชันแปลงวันที่ประกาศเป็นภาษาไทย
export function formatRewardDate(dateStr?: string): string {
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
    const year = d.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}

// ตรวจสอบและเลือกรูปภาพประกอบที่สวยงาม
export function resolveRewardImage(imageUrl?: string, title: string = "", id: number = 0): string {
  if (imageUrl && (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("data:image"))) {
    return imageUrl;
  }
  const lower = title.toLowerCase();
  if (lower.includes("เข็มกลัด") || lower.includes("pin")) {
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("กระเป๋า") || lower.includes("bag")) {
    return "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("หมวก") || lower.includes("hat")) {
    return "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("กระบอก") || lower.includes("tumbler") || lower.includes("ขวด")) {
    return "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80";
  }

  const fallbacks = [
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
  ];
  return fallbacks[Math.abs(id) % fallbacks.length];
}

export default function RewardCard({ reward, onSelect }: RewardCardProps) {
  const imageUrl = resolveRewardImage(reward.image, reward.rewardTitle, reward.rewardId);
  const formattedDate = formatRewardDate(reward.rewardAnnouncementDate);

  return (
    <div
      onClick={() => onSelect(reward)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#E3EBDD] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#6B8E62]/40 hover:shadow-lg hover:shadow-[#6B8E62]/10 cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative h-52 w-full overflow-hidden bg-[#EEF4EB]">
        <img
          src={imageUrl}
          alt={reward.rewardTitle}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

        {/* Badge ประเภทรางวัล (มุมบนซ้าย) */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#3F6848] shadow-xs">
            <span>🎁</span>
            <span>ของที่ระลึกทางการ</span>
          </span>
        </div>

        {/* Badge วันที่ (มุมบนขวา) */}
        {formattedDate && (
          <div className="absolute top-3 right-3 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white shadow-xs">
            {formattedDate}
          </div>
        )}

        {/* Title บนภาพ */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-xs font-medium text-emerald-200 uppercase tracking-wider">GREENPASS REWARD</p>
          <h3 className="text-lg font-bold leading-snug line-clamp-1 drop-shadow-sm">
            {reward.rewardTitle}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* ข้อมูลสรุป */}
          <p className="text-sm text-[#6F756B] line-clamp-2 leading-relaxed mb-4">
            {reward.rewardDetails || "แลกรับของรางวัลและของที่ระลึกสุดพิเศษจากโครงการ GreenPass เมื่อสะสมแสตมป์ครบตามเงื่อนไข"}
          </p>

          {/* จุดแลกรับ */}
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#F6FAF4] p-2.5 text-xs text-[#5F7F58] border border-[#E8F3E5]">
            <svg className="h-4 w-4 shrink-0 text-[#6B8E62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">แลกรับได้ที่ศูนย์บริการนักท่องเที่ยวทุกอุทยาน</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(reward);
            }}
            className="flex-1 rounded-xl bg-[#E8F3E5] py-2.5 text-center text-xs font-semibold text-[#3F6848] transition-all hover:bg-[#6B8E62] hover:text-white"
          >
            ดูเงื่อนไขและวิธีแลกรับ
          </button>
        </div>
      </div>
    </div>
  );
}