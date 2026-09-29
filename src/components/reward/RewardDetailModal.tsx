/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Reward } from "../../types/reward";
import { formatRewardDate, resolveRewardImage } from "./RewardCard";
import AppPromoModal from "../common/AppPromoModal";

interface RewardDetailModalProps {
  reward: Reward | null;
  onClose: () => void;
}

export default function RewardDetailModal({ reward, onClose }: RewardDetailModalProps) {
  const [showAppPromo, setShowAppPromo] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!reward) return null;

  const imageUrl = resolveRewardImage(reward.image, reward.rewardTitle, reward.rewardId);
  const formattedDate = formatRewardDate(reward.rewardAnnouncementDate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-[#D6EFE2]">
        <div className="relative h-64 sm:h-72 w-full shrink-0 bg-[#064E3B]">
          <img
            src={imageUrl}
            alt={reward.rewardTitle}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/70 cursor-pointer"
            aria-label="ปิดหน้าต่าง"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#064E3B] shadow-md">
              <span>🎁</span>
              <span>ของรางวัล GreenPass</span>
            </span>

            {formattedDate && (
              <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-medium text-white shadow-md">
                วันที่ประกาศ: {formattedDate}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              OFFICIAL REWARD • GREENPASS
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md leading-snug">
              {reward.rewardTitle}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-base font-bold text-[#064E3B] mb-2.5">
              รายละเอียดและเงื่อนไข
            </h4>
            <div className="rounded-2xl border border-[#D6EFE2] bg-[#F3F7F5] p-5 text-sm leading-relaxed text-[#0F172A] whitespace-pre-line space-y-3">
              {reward.rewardDetails || "แลกรับของที่ระลึกพิเศษได้เมื่อเดินทางท่องเที่ยวและสะสมแสตมป์อุทยานแห่งชาติ"}
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-[#064E3B] mb-3">
              ขั้นตอนการแลกรับของรางวัล
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#E8F7F0]/60 p-4 border border-[#D6EFE2]">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D1FAE5] text-[#064E3B] font-bold text-xs mb-2">
                  1
                </div>
                <h5 className="text-xs font-bold text-[#064E3B] mb-1">เที่ยวอุทยาน</h5>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  ออกเดินทางสำรวจอุทยานแห่งชาติทั่วประเทศไทย
                </p>
              </div>

              <div className="rounded-2xl bg-[#E8F7F0]/60 p-4 border border-[#D6EFE2]">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D1FAE5] text-[#064E3B] font-bold text-xs mb-2">
                  2
                </div>
                <h5 className="text-xs font-bold text-[#064E3B] mb-1">สะสมแสตมป์บนแอป</h5>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  สแกนเช็คอินผ่าน GreenPass Mobile App บนมือถือ
                </p>
              </div>

              <div className="rounded-2xl bg-[#E8F7F0]/60 p-4 border border-[#D6EFE2]">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D1FAE5] text-[#064E3B] font-bold text-xs mb-2">
                  3
                </div>
                <h5 className="text-xs font-bold text-[#064E3B] mb-1">รับของรางวัล</h5>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  แสดงหลักฐานที่ศูนย์บริการนักท่องเที่ยวเพื่อรับของรางวัล
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D6EFE2] bg-[#F3F7F5] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/park"
            className="flex items-center gap-2 text-xs font-semibold text-[#00A86B] hover:text-[#064E3B] transition-colors"
          >
            <span>🌲</span>
            <span>ค้นหาอุทยานเพื่อสะสมแสตมป์</span>
          </Link>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowAppPromo(true)}
              className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#0F5A3E] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:from-[#043327] hover:to-[#0A3D2A] cursor-pointer"
            >
              <span>📱 สะสมแสตมป์บนแอป</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#D6EFE2] bg-white px-5 py-2.5 text-xs font-semibold text-[#64748B] transition-all hover:bg-[#E8F7F0] hover:text-[#064E3B] cursor-pointer"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>

      <AppPromoModal isOpen={showAppPromo} onClose={() => setShowAppPromo(false)} />
    </div>
  );
}
