/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Park } from "../../types/park";
import { extractProvince, formatTime, isCurrentlyOpen } from "./ParkCard";
import AppPromoModal from "../common/AppPromoModal";

interface ParkDetailModalProps {
  park: Park | null;
  onClose: () => void;
}

export default function ParkDetailModal({ park, onClose }: ParkDetailModalProps) {
  const [showAppPromo, setShowAppPromo] = useState(false);
  // กด ESC เพื่อปิด Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!park) return null;

  const province = extractProvince(park.address);
  const openNow = isCurrentlyOpen(park.openTime, park.closeTime, park.isTemporaryClosed);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-[#E3EBDD]">
        {/* Header with Image */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 bg-[#3F6848]">
          <img
            src={park.image || "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1200&q=80"}
            alt={park.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/70"
            aria-label="ปิดหน้าต่าง"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#3F6848] shadow-md">
              <svg className="h-3.5 w-3.5 text-[#6B8E62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {province}
            </span>

            {park.isSeasonalPark && (
              <span className="rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-md">
                อุทยานตามฤดูกาล
              </span>
            )}
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              National Park • Thailand
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md">
              {park.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#F6FAF4] p-3.5 border border-[#E8F3E5]">
              <div className="flex items-center gap-1.5 text-xs text-[#6F756B] mb-1">
                <svg className="h-4 w-4 text-[#6B8E62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>เวลาเปิด-ปิด</span>
              </div>
              <p className="text-sm font-bold text-[#3F6848]">
                {formatTime(park.openTime)} - {formatTime(park.closeTime)} น.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F6FAF4] p-3.5 border border-[#E8F3E5]">
              <div className="flex items-center gap-1.5 text-xs text-[#6F756B] mb-1">
                <span className={`h-2 w-2 rounded-full ${openNow ? "bg-emerald-500" : "bg-zinc-400"}`} />
                <span>สถานะทำการ</span>
              </div>
              <p className="text-sm font-bold text-[#3F6848]">
                {park.isTemporaryClosed ? "ปิดชั่วคราว" : openNow ? "เปิดทำการตอนนี้" : "นอกเวลาทำการ"}
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#F6FAF4] p-3.5 border border-[#E8F3E5]">
              <div className="flex items-center gap-1.5 text-xs text-[#6F756B] mb-1">
                <svg className="h-4 w-4 text-[#6B8E62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>การเข้าชม</span>
              </div>
              <p className="text-sm font-bold text-[#3F6848]">
                {park.status || "เปิดตามปกติ"}
              </p>
            </div>
          </div>

          {/* ด่านตรวจ / หมายเหตุพิเศษ */}
          {park.eventNote && (
            <div className="rounded-2xl bg-amber-50/80 p-4 border border-amber-200/80 text-amber-900">
              <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                <svg className="h-5 w-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>จุดตรวจ & ประกาศสำคัญ</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                {park.eventNote}
              </p>
            </div>
          )}

          {/* ข้อมูลอุทยานโดยละเอียด */}
          <div>
            <h4 className="text-base font-bold text-[#3F6848] mb-2.5">
              เกี่ยวกับอุทยาน
            </h4>
            <div className="text-sm leading-relaxed text-[#5F7F58] whitespace-pre-line space-y-3">
              {park.description}
            </div>
          </div>

          {/* ที่อยู่และพิกัด */}
          <div className="rounded-2xl border border-[#E3EBDD] bg-[#FAFDF8] p-4">
            <h4 className="text-sm font-bold text-[#3F6848] mb-2 flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#6B8E62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              ที่อยู่และการเดินทาง
            </h4>
            <p className="text-xs sm:text-sm text-[#6F756B] mb-2">
              {park.address}
            </p>
            {park.location && (
              <p className="text-xs text-[#8A9488] font-mono">
                พิกัด GPS: {park.location}
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#E3EBDD] bg-[#FAFDF8] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowAppPromo(true)}
            className="flex items-center gap-2 text-xs font-semibold text-[#5F7F58] hover:text-[#3F6848] transition-colors text-left cursor-pointer"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F3E5] text-base">
              📱
            </span>
            <div>
              <span className="block font-bold text-[#3F6848]">เช็คอินสะสมแสตมป์อุทยานนี้</span>
              <span className="text-[10px] text-[#8A9488]">ใช้งานผ่าน GreenPass Mobile App</span>
            </div>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {park.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-[#6B8E62] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#5F7F58]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>เปิดแผนที่นำทาง</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#D5E2CE] bg-white px-5 py-2.5 text-xs font-semibold text-[#6F756B] transition-all hover:bg-[#F3F8F1] hover:text-[#3F6848]"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>

      {/* Mobile App Promotion Modal */}
      <AppPromoModal isOpen={showAppPromo} onClose={() => setShowAppPromo(false)} />
    </div>
  );
}
