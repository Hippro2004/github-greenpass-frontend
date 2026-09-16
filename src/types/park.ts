export interface Park {
  id: number;
  parkId: number;
  name: string;
  image: string;
  address: string;
  location: string;
  description: string;
  openTime: string;
  closeTime: string;
  isSeasonalPark: boolean;
  seasonOpenDate: string | null;
  seasonCloseDate: string | null;
  isTemporaryClosed: boolean;
  eventNote: string | null;
  status: string;
}
