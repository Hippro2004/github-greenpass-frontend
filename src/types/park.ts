export interface Park {
  id: number;
  parkId: number;
  name: string;
  image: string;
  address: string;
  location: string;
  description: string;
  openTime: string; // e.g. "06:00:00"
  closeTime: string; // e.g. "18:00:00"
  isSeasonalPark: boolean;
  seasonOpenDate: string | null;
  seasonCloseDate: string | null;
  isTemporaryClosed: boolean;
  eventNote: string | null;
  status: string; // e.g. "เปิดตามปกติ"
}
