/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Park } from "../../types/park";
import { resolveImageUrl } from "../../lib/imageHelper";
import { extractProvince, formatTime, isCurrentlyOpen } from "./ParkCard";
import AppPromoModal from "../common/AppPromoModal";

interface ParkDetailModalProps {
  park: Park | null;
  onClose: () => void;
}

export default function ParkDetailModal({ park, onClose }: ParkDetailModalProps) {
  const [showAppPromo, setShowAppPromo] = useState(false);
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
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-[#D6EFE2]">
        <div className="relative h-64 sm:h-72 w-full shrink-0 bg-[#064E3B]">
          <img
            src={resolveImageUrl(park.image, "parks") || park.image || "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1200&q=80"}
            alt={park.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1200&q=80";
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
              <svg className="h-3.5 w-3.5 text-[#00A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{province}</span>
            </span>

            {park.isTemporaryClosed ? (
              <span className="rounded-full bg-rose-600/90 backdrop-blur-md px-3 py-1 text-xs font-medium text-white shadow-md">
                ปิดบริการชั่วคราว
              </span>
            ) : park.isSeasonalPark ? (
              <span className="rounded-full bg-amber-600/90 backdrop-blur-md px-3 py-1 text-xs font-medium text-white shadow-md">
                เปิดตามฤดูกาล
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-[#064E3B]/90 backdrop-blur-md px-3 py-1 text-xs font-medium text-white shadow-md">
                <span className={`h-2 w-2 rounded-full ${openNow ? "bg-emerald-400" : "bg-zinc-300"}`} />
                <span>{openNow ? "เปิดทำการตอนนี้" : "นอกเวลาทำการ"}</span>
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              NATIONAL PARK • THAILAND
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md leading-snug">
              {park.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-[#E8F7F0]/60 p-4 border border-[#D6EFE2]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D1FAE5] text-[#064E3B]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">เวลาเปิด-ปิดทำการ</p>
                <p className="text-sm font-bold text-[#064E3B]">
                  {formatTime(park.openTime)} - {formatTime(park.closeTime)} น.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-[#E8F7F0]/60 p-4 border border-[#D6EFE2]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D1FAE5] text-[#064E3B]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">สถานะการท่องเที่ยว</p>
                <p className="text-sm font-bold text-[#064E3B]">
                  {park.status || (openNow ? "เปิดตามปกติ" : "นอกเวลาทำการ")}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-[#064E3B] mb-2.5">
              ข้อมูลอุทยานแห่งชาติ
            </h4>
            <div className="rounded-2xl border border-[#D6EFE2] bg-white p-5 text-sm leading-relaxed text-[#0F172A] whitespace-pre-line space-y-3 shadow-2xs">
              {park.description || "ยังไม่มีข้อมูลคำอธิบายสำหรับอุทยานแห่งชาตินี้"}
            </div>
          </div>

          {park.eventNote && (
            <div className="rounded-2xl bg-[#E8F7F0] p-4 border border-[#D6EFE2] text-[#065F46] text-xs sm:text-sm">
              <p className="font-semibold mb-1 flex items-center gap-1.5">
                <span>📢</span> หมายเหตุ / ประกาศเฉพาะจุด
              </p>
              <p className="text-[#064E3B] leading-relaxed text-xs">{park.eventNote}</p>
            </div>
          )}

          {park.address && (
            <div>
              <h4 className="text-base font-bold text-[#064E3B] mb-2">
                ที่ตั้งและการติดต่อ
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed rounded-2xl border border-[#D6EFE2] bg-[#F3F7F5] p-4">
                📍 {park.address}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-[#D6EFE2] bg-[#F3F7F5] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {park.location ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#00A86B] hover:text-[#064E3B] transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>เปิดแผนที่นำทาง (Google Maps)</span>
            </a>
          ) : (
            <span className="text-xs text-[#94A3B8]">ไม่มีข้อมูลพิกัด GPS</span>
          )}

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowAppPromo(true)}
              className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#0F5A3E] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:from-[#043327] hover:to-[#0A3D2A] cursor-pointer"
            >
              <span>📱 สะสมแสตมป์ที่นี่</span>
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
