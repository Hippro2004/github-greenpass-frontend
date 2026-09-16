export interface Announcement {
  announcementId: number;
  announcementTitle: string;
  postDate: string;
  description: string;
  parkName: string;
  parkId: number;
  image?: string;
}

export type AnnouncementCategory = "all" | "urgent" | "closure" | "general";
