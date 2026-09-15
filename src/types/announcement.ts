export interface Announcement {
  announcementId: number;
  announcementTitle: string;
  postDate: string; // e.g. "2026-09-15"
  description: string;
  parkName: string;
  parkId: number;
  image?: string;
}

export type AnnouncementCategory = "all" | "urgent" | "closure" | "general";
