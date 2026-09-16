"use client";

import { useEffect } from "react";
import Link from "next/link";

interface AppPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppPromoModal({ isOpen, onClose }: AppPromoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-[#E3EBDD]">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#3F6848] via-[#2F5237] to-[#1E3623] p-6 sm:p-8 text-white">
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30"
            aria-label="ปิดหน้าต่าง"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-semibold text-emerald-200">
            <span>📱</span>
            <span>GreenPass Mobile Application</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            เช็คอินสะสมแสตมป์บนมือถือ
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-md">
            ระบบสแกน QR Code และบันทึกแสตมป์ดิจิทัลใช้งานผ่านแอปพลิเคชันมือถือ
            <strong> GreenPass (คนละแพลตฟอร์มกับเว็บไซต์)</strong> เพื่อยืนยันพิกัด GPS ณ อุทยานจริง
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3F6848]">
              ฟังก์ชันเฉพาะบนแอปพลิเคชันมือถือ
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 rounded-2xl bg-[#F6FAF4] p-3.5 border border-[#E8F3E5]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F3E5] text-[#3F6848] text-base">
                  📸
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#3F6848]">สแกน QR Code</h5>
                  <p className="text-[11px] text-[#6F756B] leading-tight mt-0.5">
                    สแกนเช็คอินทันที ณ จุดตรวจและศูนย์บริการ
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-[#F6FAF4] p-3.5 border border-[#E8F3E5]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F3E5] text-[#3F6848] text-base">
                  📍
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#3F6848]">GPS Geolocation</h5>
                  <p className="text-[11px] text-[#6F756B] leading-tight mt-0.5">
                    ยืนยันการไปเยือนอุทยานจริงด้วยพิกัดดาวเทียม
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-[#F6FAF4] p-3.5 border border-[#E8F3E5]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F3E5] text-[#3F6848] text-base">
                  📖
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#3F6848]">สมุดพาสปอร์ตพกพา</h5>
                  <p className="text-[11px] text-[#6F756B] leading-tight mt-0.5">
                    สะสมตราประทับครบ 155+ แห่งทั่วประเทศ
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-[#F6FAF4] p-3.5 border border-[#E8F3E5]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F3E5] text-[#3F6848] text-base">
                  📶
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#3F6848]">โหมดออฟไลน์</h5>
                  <p className="text-[11px] text-[#6F756B] leading-tight mt-0.5">
                    บันทึกข้อมูลได้แม้อยู่ในจุดที่ไม่มีสัญญาณเน็ต
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#D5E2CE] bg-white p-5 text-center">
            <h5 className="text-xs font-bold text-[#3F6848] mb-3">
              ดาวน์โหลด GreenPass Mobile App ได้ทั้งสองระบบ
            </h5>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-[#D5E2CE] bg-[#FAFDF8] px-4 py-2.5 text-left shadow-2xs hover:border-[#6B8E62] transition-colors cursor-pointer">
                <span className="text-2xl">🍏</span>
                <div>
                  <p className="text-[10px] text-[#8A9488] leading-none">Download on the</p>
                  <p className="text-xs font-bold text-[#3F6848] leading-tight">App Store (iOS)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#D5E2CE] bg-[#FAFDF8] px-4 py-2.5 text-left shadow-2xs hover:border-[#6B8E62] transition-colors cursor-pointer">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-[10px] text-[#8A9488] leading-none">GET IT ON</p>
                  <p className="text-xs font-bold text-[#3F6848] leading-tight">Google Play (Android)</p>
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-[#8A9488]">
              💡 รองรับทั้ง iPhone, iPad และสมาร์ตโฟน Android ทุกรุ่น
            </p>
          </div>
        </div>

        <div className="border-t border-[#E3EBDD] bg-[#FAFDF8] px-6 py-4 flex items-center justify-between gap-3">
          <Link
            href="/stamp"
            onClick={onClose}
            className="text-xs font-bold text-[#6B8E62] hover:text-[#3F6848] transition-colors flex items-center gap-1"
          >
            <span>ดูหน้าแนะนำแอปพลิเคชันแบบเต็ม</span>
            <span>→</span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#6B8E62] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#5F7F58] transition-all"
          >
            เข้าใจแล้ว
          </button>
        </div>
      </div>
    </div>
  );
}
