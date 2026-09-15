/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Announcement } from "../../types/announcement";
import { formatThaiDate, getAnnouncementMeta, resolveAnnouncementImage } from "./AnnouncementCard";

interface AnnouncementDetailModalProps {
  announcement: Announcement | null;
  onClose: () => void;
}

export default function AnnouncementDetailModal({ announcement, onClose }: AnnouncementDetailModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!announcement) return null;

  const meta = getAnnouncementMeta(announcement);
  const imageUrl = resolveAnnouncementImage(announcement.image, announcement.announcementId);
  const formattedDate = formatThaiDate(announcement.postDate);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-[#E3EBDD]">
        {/* Cover Header Image */}
        <div className="relative h-60 sm:h-68 w-full shrink-0 bg-[#3F6848]">
          <img
            src={imageUrl}
            alt={announcement.announcementTitle}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

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
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full backdrop-blur-md px-3 py-1 text-xs font-semibold shadow-md ${meta.badgeClass}`}>
              {meta.type === "urgent" && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
              {meta.label}
            </span>

            <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-medium text-[#3F6848] shadow-md">
              วันที่ {formattedDate}
            </span>
          </div>

          {/* Park Name on image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium mb-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{announcement.parkName || "อุทยานแห่งชาติ"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-md leading-snug">
              {announcement.announcementTitle}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Metadata Card */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F6FAF4] p-4 border border-[#E8F3E5]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F3E5] text-[#3F6848]">
                📢
              </div>
              <div>
                <p className="text-xs text-[#8A9488]">หน่วยงานที่ออกประกาศ</p>
                <p className="text-sm font-bold text-[#3F6848]">
                  {announcement.parkName || "กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช"}
                </p>
              </div>
            </div>

            <span className="text-xs font-mono text-[#8A9488]">
              ประกาศเลขที่ #{announcement.announcementId}
            </span>
          </div>

          {/* Full Content */}
          <div>
            <h4 className="text-base font-bold text-[#3F6848] mb-3">
              เนื้อหาประกาศ
            </h4>
            <div className="rounded-2xl border border-[#E3EBDD] bg-white p-5 text-sm leading-relaxed text-[#4F5F50] whitespace-pre-line space-y-3">
              {announcement.description}
            </div>
          </div>

          {/* Advice / Notice */}
          <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-200/80 text-amber-900 text-xs sm:text-sm">
            <p className="font-semibold mb-1 flex items-center gap-1.5">
              <span>⚠️</span> คำแนะนำสำหรับนักท่องเที่ยว
            </p>
            <p className="text-amber-800 leading-relaxed text-xs">
              กรุณาตรวจสอบสภาพอากาศและสถานะการเปิดให้บริการของอุทยานก่อนออกเดินทาง และปฏิบัติตามคำแนะนำของเจ้าหน้าที่พิทักษ์ป่าอย่างเคร่งครัด
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#E3EBDD] bg-[#FAFDF8] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs text-[#6F756B] hover:text-[#3F6848] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{copied ? "คัดลอกลิงก์แล้ว!" : "แชร์ / คัดลอกลิงก์"}</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href="/park"
              className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-[#6B8E62] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#5F7F58]"
            >
              <span>ดูข้อมูลอุทยานแห่งนี้</span>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

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
    </div>
  );
}
