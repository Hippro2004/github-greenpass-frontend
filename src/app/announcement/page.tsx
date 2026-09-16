"use client";

import { useEffect, useMemo, useState } from "react";
import { Announcement, AnnouncementCategory } from "../../types/announcement";
import { getAllAnnouncements } from "../../services/announcementService";
import AnnouncementCard, { getAnnouncementMeta, formatThaiDate } from "../../components/announcement/AnnouncementCard";
import AnnouncementDetailModal from "../../components/announcement/AnnouncementDetailModal";
import AnnouncementHeader from "../../components/announcement/AnnouncementHeader";

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<AnnouncementCategory>("all");
  const [parkFilter, setParkFilter] = useState<string>("all");

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

  const availableParks = useMemo(() => {
    const set = new Set<string>();
    announcements.forEach((a) => {
      if (a.parkName) set.add(a.parkName);
    });
    return Array.from(set).sort();
  }, [announcements]);

  const filteredAnnouncements = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return announcements.filter((item) => {
      if (parkFilter !== "all" && item.parkName !== parkFilter) {
        return false;
      }

      if (category !== "all") {
        const meta = getAnnouncementMeta(item);
        if (meta.type !== category) return false;
      }

      if (q) {
        const titleMatch = item.announcementTitle?.toLowerCase().includes(q);
        const descMatch = item.description?.toLowerCase().includes(q);
        const parkMatch = item.parkName?.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !parkMatch) return false;
      }

      return true;
    });
  }, [announcements, keyword, category, parkFilter]);

  const latestUrgent = useMemo(() => {
    return announcements.find((a) => getAnnouncementMeta(a).type === "urgent");
  }, [announcements]);

  const handleResetFilters = () => {
    setKeyword("");
    setCategory("all");
    setParkFilter("all");
  };

  return (
    <div className="mx-auto max-w-7xl pb-16">
      <AnnouncementHeader
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
        parkFilter={parkFilter}
        onParkFilterChange={setParkFilter}
        availableParks={availableParks}
        totalResults={filteredAnnouncements.length}
        onReset={handleResetFilters}
        isFallback={isFallback}
      />

      {!loading && !error && latestUrgent && category === "all" && !keyword && (
        <div
          onClick={() => setSelectedAnnouncement(latestUrgent)}
          className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-3xl border border-rose-200 bg-gradient-to-r from-rose-50 via-rose-50/70 to-amber-50/50 p-6 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-rose-300"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500 text-white text-xl shadow-xs animate-bounce">
              🚨
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                  ประกาศด่วนล่าสุด
                </span>
                <span className="text-xs text-[#8A9488]">
                  {latestUrgent.parkName} • {formatThaiDate(latestUrgent.postDate)}
                </span>
              </div>
              <h3 className="text-base font-bold text-rose-950 line-clamp-1">
                {latestUrgent.announcementTitle}
              </h3>
              <p className="text-xs sm:text-sm text-rose-800/90 line-clamp-1 mt-0.5">
                {latestUrgent.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAnnouncement(latestUrgent);
            }}
            className="shrink-0 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 transition-colors"
          >
            อ่านประกาศด่วน
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#E3EBDD] bg-white shadow-xs animate-pulse"
            >
              <div className="h-48 w-full bg-[#EBF2E8]" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded-md bg-[#EBF2E8]" />
                <div className="h-3.5 w-1/2 rounded-md bg-[#EBF2E8]" />
                <div className="h-12 w-full rounded-md bg-[#F2F7F0]" />
                <div className="h-8 w-full rounded-xl bg-[#EBF2E8]" />
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
            className="rounded-xl bg-[#6B8E62] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#5F7F58] transition-all"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#D5E2CE] bg-white/70 p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3E5] text-[#5F7F58] text-2xl">
            📰
          </div>
          <h3 className="text-xl font-bold text-[#3F6848] mb-2">
            ไม่พบประกาศหรือข่าวสารที่ค้นหา
          </h3>
          <p className="text-sm text-[#6F756B] max-w-md mb-6 leading-relaxed">
            {keyword
              ? `ไม่พบข้อมูลที่ตรงกับ "${keyword}" ลองค้นหาด้วยคำอื่น หรือเลือกดูจากทุกประเภท`
              : "ไม่พบข่าวสารที่ตรงตามเงื่อนไขตัวกรองที่คุณเลือก"}
          </p>

          <button
            type="button"
            onClick={handleResetFilters}
            className="rounded-xl bg-[#6B8E62] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#5F7F58] transition-all"
          >
            ล้างการค้นหาและแสดงทั้งหมด
          </button>
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
