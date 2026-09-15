import { Reward } from "../types/reward";
import { API_BASE_URL } from "./api";

// Fallback mock rewards in case backend is offline
const MOCK_REWARDS: Reward[] = [
  {
    rewardId: 4,
    rewardTitle: "เข็มกลัดที่ระลึก GreenPass Explorer",
    rewardDetails: "แจ้งรับเข็มกลัดที่ระลึกเคลือบทองเหลืองลวดลายอุทยานแห่งชาติ ได้ทุกศูนย์บริการนักท่องเที่ยวทั่วประเทศไทย เพียงสะสมแสตมป์ครบ 3 อุทยาน",
    rewardAnnouncementDate: "2026-09-16",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    rewardId: 1,
    rewardTitle: "กระเป๋าผ้าแคนวาสรักษ์โลก GreenPass Eco Tote Bag",
    rewardDetails: "กระเป๋าผ้าแคนวาสเนื้อหนาพิเศษ ทนทาน สกรีนลายพรรณไม้และสัตว์ป่าสงวนไทย สำหรับผู้สะสมแสตมป์ครบ 5 อุทยาน",
    rewardAnnouncementDate: "2026-09-10",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
  },
  {
    rewardId: 2,
    rewardTitle: "หมวกเดินป่า GreenPass Trail Bucket Hat",
    rewardDetails: "หมวกปีกกว้างกันรังสียูวี น้ำหนักเบา ระบายอากาศได้ดีเยี่ยม เหมาะกับการเดินป่าและกิจกรรมกลางแจ้ง แลกรับได้เมื่อสะสมแสตมป์ครบ 8 อุทยาน",
    rewardAnnouncementDate: "2026-09-01",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80"
  },
  {
    rewardId: 3,
    rewardTitle: "กระบอกน้ำเก็บอุณหภูมิ GreenPass Thermal Tumbler",
    rewardDetails: "กระบอกน้ำสแตนเลสสตีลเกรดพรีเมียม เก็บความเย็นได้ 24 ชั่วโมง ความร้อน 12 ชั่วโมง ช่วยลดการใช้ขวดพลาสติกแบบใช้ครั้งเดียวทิ้ง",
    rewardAnnouncementDate: "2026-08-25",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
  }
];

/**
 * ดึงรายการของรางวัลทั้งหมด
 */
export async function getAllRewards(): Promise<{ rewards: Reward[]; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}reward/reward-all`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const list: Reward[] = Array.isArray(data)
      ? data
      : (data as { result?: Reward[] })?.result || [];

    return {
      rewards: list,
      isFallback: false,
    };
  } catch (err) {
    console.warn("Could not reach backend reward API, using fallback data:", err);
    return {
      rewards: MOCK_REWARDS,
      isFallback: true,
    };
  }
}

/**
 * ดึงรายละเอียดของรางวัลตาม ID
 */
export async function getRewardById(rewardId: number): Promise<Reward | null> {
  try {
    const res = await fetch(`${API_BASE_URL}reward/${rewardId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const item: Reward | null = (data as { result?: Reward })?.result || (data as Reward) || null;
    return item;
  } catch (err) {
    console.warn("Could not reach reward detail API:", err);
    return MOCK_REWARDS.find((r) => r.rewardId === rewardId) || null;
  }
}
