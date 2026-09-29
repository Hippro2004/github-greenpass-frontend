"use client";

import { useEffect, useMemo, useState } from "react";
import { Announcement } from "../../types/announcement";
import { getAllAnnouncements } from "../../services/announcementService";
import AnnouncementCard from "../../components/announcement/AnnouncementCard";
import AnnouncementDetailModal from "../../components/announcement/AnnouncementDetailModal";
import AnnouncementHeader from "../../components/announcement/AnnouncementHeader";

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  const [keyword, setKeyword] = useState<string>("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const fetchAnnouncements = () => {
    setLoading(true);
    setError(null);
    getAllAnnouncements()
      .then((res) => {
        setAnnouncements(res.announcements);
        setIsFallback(res.isFallback);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดประกาศ");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    getAllAnnouncements()
      .then((res) => {
        if (isMounted) {
          setAnnouncements(res.announcements);
          setIsFallback(res.isFallback);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดประกาศ");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAnnouncements = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return announcements;

    return announcements.filter((item) => {
      const titleMatch = item.announcementTitle?.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      const parkMatch = item.parkName?.toLowerCase().includes(q);
      return titleMatch || descMatch || parkMatch;
    });
  }, [announcements, keyword]);

  return (
    <div className="mx-auto max-w-7xl pb-16">
      <AnnouncementHeader
        keyword={keyword}
        onKeywordChange={setKeyword}
        totalResults={filteredAnnouncements.length}
        onReset={() => setKeyword("")}
        isFallback={isFallback}
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#D6EFE2] bg-white shadow-xs animate-pulse"
            >
              <div className="h-48 w-full bg-[#E8F7F0]" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded-md bg-[#E8F7F0]" />
                <div className="h-3.5 w-1/2 rounded-md bg-[#E8F7F0]" />
                <div className="h-12 w-full rounded-md bg-[#E8F7F0]/60" />
                <div className="h-8 w-full rounded-xl bg-[#E8F7F0]" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-rose-200 bg-rose-50/50 p-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-rose-900 mb-1">
            เกิดข้อผิดพลาดในการโหลดข่าวสาร
          </h3>
          <p className="text-sm text-rose-700 max-w-md mb-6 leading-relaxed">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchAnnouncements}
            className="rounded-xl bg-gradient-to-r from-[#064E3B] to-[#0F5A3E] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:from-[#043327] hover:to-[#0A3D2A] transition-all cursor-pointer"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#D6EFE2] bg-white/70 p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#D1FAE5] text-[#064E3B] text-2xl">
            📰
          </div>
          <h3 className="text-xl font-bold text-[#064E3B] mb-2">
            ไม่พบประกาศหรือข่าวสารที่ค้นหา
          </h3>
          <p className="text-sm text-[#64748B] max-w-md mb-6 leading-relaxed">
            {keyword
              ? `ไม่พบข้อมูลที่ตรงกับ "${keyword}" ลองค้นหาด้วยคำอื่น`
              : "ยังไม่มีข้อมูลประกาศในขณะนี้"}
          </p>

          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              className="rounded-xl bg-gradient-to-r from-[#064E3B] to-[#0F5A3E] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:from-[#043327] hover:to-[#0A3D2A] transition-all cursor-pointer"
            >
              ล้างการค้นหาและแสดงทั้งหมด
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAnnouncements.map((item) => (
            <AnnouncementCard
              key={item.announcementId}
              announcement={item}
              onSelect={setSelectedAnnouncement}
            />
          ))}
        </div>
      )}

      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  );
}
