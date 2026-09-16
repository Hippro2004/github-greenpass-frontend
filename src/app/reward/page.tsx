"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Reward } from "../../types/reward";
import { getAllRewards } from "../../services/rewardService";
import RewardCard from "../../components/reward/RewardCard";
import RewardDetailModal from "../../components/reward/RewardDetailModal";
import RewardHeader from "../../components/reward/RewardHeader";

export default function RewardPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  const [keyword, setKeyword] = useState<string>("");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const fetchRewards = () => {
    setLoading(true);
    setError(null);
    getAllRewards()
      .then((res) => {
        setRewards(res.rewards);
        setIsFallback(res.isFallback);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดของรางวัล");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    getAllRewards()
      .then((res) => {
        if (isMounted) {
          setRewards(res.rewards);
          setIsFallback(res.isFallback);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดของรางวัล");
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

  const filteredRewards = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return rewards;
    return rewards.filter(
      (r) =>
        r.rewardTitle?.toLowerCase().includes(q) ||
        r.rewardDetails?.toLowerCase().includes(q)
    );
  }, [rewards, keyword]);

  return (
    <div className="mx-auto max-w-7xl pb-16">
      <RewardHeader
        keyword={keyword}
        onKeywordChange={setKeyword}
        totalResults={filteredRewards.length}
        onReset={() => setKeyword("")}
        isFallback={isFallback}
      />

      <div className="mb-10 rounded-3xl border border-[#E3EBDD] bg-gradient-to-r from-[#F6FAF4] to-[#FAFDF8] p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#E8F3E5] px-3 py-1 text-xs font-semibold text-[#5F7F58]">
              <span>🍃</span>
              <span>ร่วมโครงการ GreenPass</span>
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#3F6848] mb-2">
              เที่ยวง่าย สะสมแสตมป์ แลกรับของรางวัล
            </h2>
            <p className="text-sm text-[#6F756B] leading-relaxed">
              เพียงเดินทางท่องเที่ยวอุทยานแห่งชาติที่ร่วมรายการทั่วประเทศ สแกนเช็คอินสะสมแสตมป์ดิจิทัล และนำมาแสดงต่อเจ้าหน้าที่เพื่อรับของที่ระลึก
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              href="/park"
              className="flex-1 md:flex-initial rounded-xl bg-[#6B8E62] px-6 py-3 text-center text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#5F7F58]"
            >
              ค้นหาอุทยานเพื่อเริ่มสะสม
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#E3EBDD] bg-white shadow-xs animate-pulse"
            >
              <div className="h-52 w-full bg-[#EBF2E8]" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded-md bg-[#EBF2E8]" />
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
            เกิดข้อผิดพลาดในการโหลดของรางวัล
          </h3>
          <p className="text-sm text-rose-700 max-w-md mb-6 leading-relaxed">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchRewards}
            className="rounded-xl bg-[#6B8E62] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#5F7F58] transition-all"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      ) : filteredRewards.length === 0 ? (
        <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#D5E2CE] bg-white/70 p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3E5] text-[#5F7F58] text-2xl">
            🎁
          </div>
          <h3 className="text-xl font-bold text-[#3F6848] mb-2">
            ไม่พบของรางวัลที่ค้นหา
          </h3>
          <p className="text-sm text-[#6F756B] max-w-md mb-6 leading-relaxed">
            {keyword
              ? `ไม่พบข้อมูลที่ตรงกับ "${keyword}" ลองค้นหาด้วยคำอื่น`
              : "ยังไม่มีรายการของรางวัลในขณะนี้"}
          </p>

          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              className="rounded-xl bg-[#6B8E62] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#5F7F58] transition-all"
            >
              ล้างการค้นหาและแสดงทั้งหมด
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRewards.map((reward) => (
            <RewardCard
              key={reward.rewardId}
              reward={reward}
              onSelect={setSelectedReward}
            />
          ))}
        </div>
      )}

      <RewardDetailModal
        reward={selectedReward}
        onClose={() => setSelectedReward(null)}
      />
    </div>
  );
}