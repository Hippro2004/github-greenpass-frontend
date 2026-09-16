import { Park } from "../types/park";
import { API_BASE_URL } from "./api";

const MOCK_PARKS: Park[] = [
  {
    id: 1,
    parkId: 1,
    name: "อุทยานแห่งชาติเขาใหญ่",
    image: "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1200&q=80",
    address: "ศูนย์บริการนักท่องเที่ยว ตู้ปณ. 9 ตำบลหมูสี อำเภอปากช่อง จังหวัดนครราชสีมา 30130",
    location: "14.3109229, 101.5304415",
    description: "อุทยานแห่งชาติเขาใหญ่ เป็นอุทยานแห่งชาติแห่งแรกของประเทศไทย ตั้งขึ้นเมื่อปี พ.ศ. 2505 และได้รับการยกย่องเป็นมรดกโลกทางธรรมชาติจากองค์การยูเนสโก (UNESCO) ในชื่อ 'ผืนป่าดงพญาเย็น-เขาใหญ่' มีเนื้อที่กว้างใหญ่กว่า 2,168 ตารางกิโลเมตร ครอบคลุมพื้นที่ 4 จังหวัด ได้แก่ นครราชสีมา ปราจีนบุรี นครนายก และสระบุรี",
    openTime: "06:00:00",
    closeTime: "18:00:00",
    isSeasonalPark: false,
    seasonOpenDate: null,
    seasonCloseDate: null,
    isTemporaryClosed: false,
    eventNote: "ด่านศาลเจ้าพ่อเขาใหญ่ (กม.23) & ด่านเนินหอม (กม.41)",
    status: "เปิดตามปกติ"
  },
  {
    id: 2,
    parkId: 2,
    name: "อุทยานแห่งชาติแก่งกระจาน",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    address: "ต.แก่งกระจาน อ.แก่งกระจาน จ.เพชรบุรี 76170",
    location: "12.8797, 99.6384",
    description: "อุทยานแห่งชาติแก่งกระจาน เป็นอุทยานแห่งชาติที่มีพื้นที่ขนาดใหญ่ที่สุดในประเทศไทย และได้รับการขึ้นทะเบียนเป็นแหล่งมรดกโลกทางธรรมชาติจาก UNESCO โดดเด่นด้วยทะเลหมอกตลอดทั้งปีที่พะเนินทุ่ง และเป็นแหล่งดูนกและผีเสื้อที่สำคัญของเอเชีย",
    openTime: "06:00:00",
    closeTime: "18:00:00",
    isSeasonalPark: false,
    seasonOpenDate: null,
    seasonCloseDate: null,
    isTemporaryClosed: false,
    eventNote: "เปิดให้ขึ้นเขาพะเนินทุ่งตามรอบเวลา 05:30 - 07:30 น.",
    status: "เปิดตามปกติ"
  },
  {
    id: 3,
    parkId: 3,
    name: "อุทยานแห่งชาติเอราวัณ",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
    address: "ต.ท่ากระดาน อ.ศรีสวัสดิ์ จ.กาญจนบุรี 71250",
    location: "14.3686, 99.1437",
    description: "อุทยานแห่งชาติเอราวัณ มีชื่อเสียงจากน้ำตกเอราวัณที่มีน้ำสีเขียวมรกตใสสะอาด แบ่งออกเป็น 7 ชั้น โดยเฉพาะชั้นที่ 7 ที่มีลักษณะคล้ายหัวช้างเอราวัณสามเศียร เหมาะแก่การพักผ่อนและลงเล่นน้ำอย่างยิ่ง",
    openTime: "08:00:00",
    closeTime: "16:30:00",
    isSeasonalPark: false,
    seasonOpenDate: null,
    seasonCloseDate: null,
    isTemporaryClosed: false,
    eventNote: "จำกัดการลงเล่นน้ำบริเวณชั้น 5-7 ตามข้อกำหนดความปลอดภัย",
    status: "เปิดตามปกติ"
  },
  {
    id: 4,
    parkId: 4,
    name: "อุทยานแห่งชาติดอยสุเทพ-ปุย",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    address: "ถนนศรีวิชัย ตำบลสุเทพ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50200",
    location: "18.8048, 98.9216",
    description: "อุทยานแห่งชาติดอยสุเทพ-ปุย เป็นที่ตั้งของวัดพระธาตุดอยสุเทพราชวรวิหาร และพระตำหนักภูพิงคราชนิเวศน์ อุดมด้วยป่าเขาธรรมชาติและอากาศเย็นสบายตลอดปี มีจุดชมวิวมุมสูงที่มองเห็นตัวเมืองเชียงใหม่ได้อย่างงดงาม",
    openTime: "06:00:00",
    closeTime: "18:00:00",
    isSeasonalPark: false,
    seasonOpenDate: null,
    seasonCloseDate: null,
    isTemporaryClosed: false,
    eventNote: "ด่านตรวจห้วยแก้ว (กม.1) & ด่านตรวจดอยปุย (กม.22)",
    status: "เปิดตามปกติ"
  },
  {
    id: 5,
    parkId: 5,
    name: "อุทยานแห่งชาติดอยอินทนนท์",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    address: "119 หมู่ 7 ตำบลบ้านหลวง อำเภอจอมทอง จังหวัดเชียงใหม่ 50160",
    location: "18.5356313, 98.519549",
    description: "อุทยานแห่งชาติดอยอินทนนท์ ได้รับขนานนามว่าเป็น 'หลังคาแห่งประเทศไทย' เป็นยอดเขาที่สูงที่สุดในประเทศ 2,565 เมตรจากระดับน้ำทะเล สภาพอากาศหนาวเย็นตลอดทั้งปี มีเส้นทางศึกษาธรรมชาติกิ่วแม่ปาน และพระมหาธาตุนภเมทนีดลและนภพลภูมิสิริ",
    openTime: "05:00:00",
    closeTime: "18:00:00",
    isSeasonalPark: false,
    seasonOpenDate: null,
    seasonCloseDate: null,
    isTemporaryClosed: false,
    eventNote: "ด่านตรวจที่ 1 (กม.8) & ด่านตรวจที่ 2 (กม.38)",
    status: "เปิดตามปกติ"
  }
];

export async function searchParks(keyword: string = ""): Promise<{ parks: Park[]; isFallback: boolean }> {
  try {
    const encoded = encodeURIComponent(keyword.trim());
    const res = await fetch(`${API_BASE_URL}park/search?keyword=${encoded}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const parks: Park[] = Array.isArray(data)
      ? data
      : (data as { result?: Park[] })?.result || [];

    return {
      parks,
      isFallback: false,
    };
  } catch (err) {
    console.warn("Could not reach backend park search API, using fallback data:", err);
    const q = keyword.trim().toLowerCase();
    const filtered = q
      ? MOCK_PARKS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      : MOCK_PARKS;

    return {
      parks: filtered,
      isFallback: true,
    };
  }
}

export async function getParkById(parkId: number): Promise<Park | null> {
  try {
    const res = await fetch(`${API_BASE_URL}park/get?parkId=${parkId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const park: Park | null = (data as { result?: Park })?.result || (data as Park) || null;
    return park;
  } catch (err) {
    console.warn("Could not fetch park by ID from backend:", err);
    return MOCK_PARKS.find((p) => p.id === parkId || p.parkId === parkId) || null;
  }
}
