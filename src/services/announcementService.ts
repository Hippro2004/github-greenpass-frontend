import { Announcement } from "../types/announcement";
import { API_BASE_URL } from "./api";

// Fallback mock announcements in case backend is unreachable
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    announcementId: 21,
    announcementTitle: "ปฏิบัติการลาดตระเวนเชิงรุกและดูแลความปลอดภัยพื้นที่แนวชายแดน",
    postDate: "2026-09-15",
    description: "[🚨 ประกาศสำคัญ/ด่วน] เจ้าหน้าที่ชุดลาดตระเวนปฏิบัติภารกิจกวาดล้างและเฝ้าระวังพื้นที่ป่าตามแนวชายแดนไทย-พม่า โดยประสานงานร่วมกับหน่วยทหารเพื่อรักษาความปลอดภัยและความอุดมสมบูรณ์ของทรัพยากรป่าไม้",
    parkName: "อุทยานแห่งชาติแก่งกระจาน",
    parkId: 2,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    announcementId: 19,
    announcementTitle: "แจ้งปิดจุดท่องเที่ยวบริเวณน้ำตกเหวนรก ชั่วคราวเนื่องจากระดับน้ำสูง",
    postDate: "2026-09-15",
    description: "[⚠️ ปิดบริการชั่วคราว] เนื่องด้วยสถานการณ์ฝนตกหนักในพื้นที่ป่าต้นน้ำ ทำให้น้ำตกเหวนรก มีระดับน้ำเพิ่มสูงขึ้นอย่างรวดเร็วและกระแสน้ำเชี่ยวกราก เพื่อความปลอดภัยของนักท่องเที่ยวจึงขอปิดการเข้าชมบริเวณน้ำตกเป็นการชั่วคราว",
    parkName: "อุทยานแห่งชาติเขาใหญ่",
    parkId: 1,
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    announcementId: 18,
    announcementTitle: "แจ้งเตือนสภาพอากาศหนาวและหมอกหนาจัดบริเวณยอดดอยอินทนนท์",
    postDate: "2026-09-15",
    description: "[🚨 ประกาศสำคัญ/ด่วน] อุณหภูมิบนยอดดอยอินทนนท์ลดฮวบและมีหมอกลงหนาจัด ทัศนวิสัยในการขับขี่ต่ำ ขอให้ผู้ขับขี่ยานพาหนะใช้ความระมัดระวังสูงสุด และเตรียมเครื่องกันหนาวให้พร้อมก่อนขึ้นเขา",
    parkName: "อุทยานแห่งชาติดอยอินทนนท์",
    parkId: 5,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    announcementId: 17,
    announcementTitle: "ประกาศปรับปรุงเส้นทางศึกษาธรรมชาติน้ำตกเอราวัณ ชั้นที่ 5-7",
    postDate: "2026-09-02",
    description: "[⚠️ ปิดบริการชั่วคราว] เจ้าหน้าที่กำลังดำเนินการซ่อมแซมราวสะพานและบันไดทางเดินขึ้นชมน้ำตกชั้น 5-7 เพื่อความปลอดภัยของนักท่องเที่ยว เปิดให้เข้าชมเฉพาะชั้น 1-4 ตามปกติ",
    parkName: "อุทยานแห่งชาติเอราวัณ",
    parkId: 3,
    image: "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1200&q=80"
  }
];

/**
 * ดึงรายการประกาศทั้งหมด
 */
export async function getAllAnnouncements(): Promise<{ announcements: Announcement[]; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}announcement/all-announcement`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    // รับทั้งแบบ Array DTO หรือครอบ .result
    const list: Announcement[] = Array.isArray(data)
      ? data
      : (data as { result?: Announcement[] })?.result || [];

    return {
      announcements: list,
      isFallback: false,
    };
  } catch (err) {
    console.warn("Could not reach backend announcement API, using fallback data:", err);
    return {
      announcements: MOCK_ANNOUNCEMENTS,
      isFallback: true,
    };
  }
}

/**
 * ดึงรายละเอียดประกาศรายฉบับ
 */
export async function getAnnouncementDetails(announcementId: number): Promise<Announcement | null> {
  try {
    const res = await fetch(`${API_BASE_URL}announcement/announcement-details?announcementId=${announcementId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const item: Announcement | null = (data as { result?: Announcement })?.result || (data as Announcement) || null;
    return item;
  } catch (err) {
    console.warn("Could not reach announcement-details API:", err);
    return MOCK_ANNOUNCEMENTS.find((a) => a.announcementId === announcementId) || null;
  }
}
