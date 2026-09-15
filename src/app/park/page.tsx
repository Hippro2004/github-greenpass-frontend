"use client";

import { useEffect, useMemo, useState } from "react";
import { Park } from "../../types/park";
import { searchParks } from "../../services/parkService";
import ParkCard, { extractProvince, isCurrentlyOpen } from "../../components/park/ParkCard";
import ParkDetailModal from "../../components/park/ParkDetailModal";
import ParkSearchHeader from "../../components/park/ParkSearchHeader";

export default function ParkSearchPage() {
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  // Filters
  const [keyword, setKeyword] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "seasonal" | "closed">("all");
  const [provinceFilter, setProvinceFilter] = useState<string>("all");

  // Selected park for modal
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);

  // Fetch parks on search keyword change (with debounce)
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);
      searchParks(keyword)
        .then((res) => {
          if (isMounted) {
            setParks(res.parks);
            setIsFallback(res.isFallback);
          }
        })
        .catch((err: unknown) => {
          if (isMounted) {
            setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล");
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [keyword]);

  const handleManualRefresh = () => {
    setLoading(true);
    setError(null);
    searchParks(keyword)
      .then((res) => {
        setParks(res.parks);
        setIsFallback(res.isFallback);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // List of available provinces
  const availableProvinces = useMemo(() => {
    const set = new Set<string>();
    parks.forEach((p) => {
      const prov = extractProvince(p.address);
      if (prov && prov !== "อุทยานแห่งชาติ" && prov !== "ประเทศไทย") {
        set.add(prov);
      }
    });
    return Array.from(set).sort();
  }, [parks]);

  // Filtered parks
  const filteredParks = useMemo(() => {
    return parks.filter((park) => {
      // Province filter
      if (provinceFilter !== "all") {
        const prov = extractProvince(park.address);
        if (prov !== provinceFilter) return false;
      }

      // Status filter
      if (statusFilter === "open") {
        return isCurrentlyOpen(park.openTime, park.closeTime, park.isTemporaryClosed);
      }
      if (statusFilter === "seasonal") {
        return Boolean(park.isSeasonalPark);
      }
      if (statusFilter === "closed") {
        return Boolean(park.isTemporaryClosed);
      }

      return true;
    });
  }, [parks, provinceFilter, statusFilter]);

  const handleResetFilters = () => {
    setKeyword("");
    setStatusFilter("all");
    setProvinceFilter("all");
  };

  return (
    <div className="mx-auto max-w-7xl pb-16">
      {/* Search Header and Filter Bar */}
      <ParkSearchHeader
        keyword={keyword}
        onKeywordChange={setKeyword}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        provinceFilter={provinceFilter}
        onProvinceFilterChange={setProvinceFilter}
        availableProvinces={availableProvinces}
        totalResults={filteredParks.length}
        onReset={handleResetFilters}
        isFallback={isFallback}
      />

      {/* Main Content Area */}
      {loading ? (
        // Loading Skeleton Grid
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#E3EBDD] bg-white shadow-xs animate-pulse"
            >
              <div className="h-52 w-full bg-[#EBF2E8]" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded-md bg-[#EBF2E8]" />
                <div className="h-3.5 w-1/2 rounded-md bg-[#EBF2E8]" />
                <div className="h-14 w-full rounded-md bg-[#F2F7F0]" />
                <div className="h-9 w-full rounded-xl bg-[#EBF2E8]" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        // Error State
        <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-rose-200 bg-rose-50/50 p-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-rose-900 mb-1">
            เกิดข้อผิดพลาดในการโหลดข้อมูล
          </h3>
          <p className="text-sm text-rose-700 max-w-md mb-6 leading-relaxed">
            {error}
          </p>
          <button
            type="button"
            onClick={handleManualRefresh}
            className="rounded-xl bg-[#6B8E62] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#5F7F58] transition-all"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      ) : filteredParks.length === 0 ? (
        // Empty Search Results State
        <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#D5E2CE] bg-white/70 p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3E5] text-[#5F7F58] text-2xl">
            🏞️
          </div>
          <h3 className="text-xl font-bold text-[#3F6848] mb-2">
            ไม่พบอุทยานแห่งชาติที่ค้นหา
          </h3>
          <p className="text-sm text-[#6F756B] max-w-md mb-6 leading-relaxed">
            {keyword
              ? `ไม่พบข้อมูลที่ตรงกับ "${keyword}" ลองค้นหาด้วยคำอื่น หรือเลือกดูจากทุกจังหวัด`
              : "ไม่พบอุทยานที่ตรงตามเงื่อนไขตัวกรองที่คุณเลือก"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="text-xs text-[#8A9488]">คำค้นหายอดนิยม:</span>
            {["เขาใหญ่", "ดอยอินทนนท์", "เอราวัณ", "แก่งกระจาน"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setKeyword(tag)}
                className="rounded-full bg-[#F3F8F1] px-3 py-1 text-xs text-[#5F7F58] border border-[#E3EBDD] hover:bg-[#E8F3E5] hover:text-[#3F6848] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="rounded-xl bg-[#6B8E62] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#5F7F58] transition-all"
          >
            ล้างการค้นหาและแสดงทั้งหมด
          </button>
        </div>
      ) : (
        // Park Cards Grid
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredParks.map((park) => (
            <ParkCard
              key={park.id || park.parkId}
              park={park}
              onSelect={setSelectedPark}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <ParkDetailModal
        park={selectedPark}
        onClose={() => setSelectedPark(null)}
      />
    </div>
  );
}
