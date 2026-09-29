import { API_BASE_URL } from "../services/api";

/**
 * Resolves a given image path/filename to a valid absolute or relative URL.
 * Handles:
 * 1. Full URLs (http://, https://) or Base64 (data:image)
 * 2. Backend upload paths stored in DB:
 *    - "/uploads/announcements/filename.jpg"
 *    - "uploads/rewards/filename.jpg"
 *    - Single filename like "1790067292028_caa4608d.jpg"
 * 3. Windows-style backslashes
 */
export function resolveImageUrl(
  imagePath?: string | null,
  category: "announcements" | "rewards" | "parks" | "reports" | "general" = "general"
): string {
  if (!imagePath) return "";
  const trimmed = imagePath.trim();
  if (!trimmed || trimmed === "null" || trimmed === "-" || trimmed.toLowerCase() === "default.jpg") {
    return "";
  }

  // Already a full URL or data URI
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:image")
  ) {
    return trimmed;
  }

  // Base API URL without trailing slash (e.g. "http://localhost:8081/api/v1")
  const apiBase = API_BASE_URL.replace(/\/+$/, "");

  // Normalize Windows slashes
  let cleanPath = trimmed.replace(/\\/g, "/");
  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  // Prevent duplicate "/api/v1" if path already starts with it
  if (apiBase.endsWith("/api/v1") && cleanPath.startsWith("/api/v1/")) {
    cleanPath = cleanPath.substring("/api/v1".length);
  }

  // Ensure "/uploads/" prefix exists
  if (!cleanPath.startsWith("/uploads/")) {
    if (
      cleanPath.startsWith("/announcements/") ||
      cleanPath.startsWith("/rewards/") ||
      cleanPath.startsWith("/reports/") ||
      cleanPath.startsWith("/signatures/") ||
      cleanPath.startsWith("/users/") ||
      cleanPath.startsWith(`/${category}/`)
    ) {
      cleanPath = `/uploads${cleanPath}`;
    } else {
      cleanPath = `/uploads/${category}${cleanPath}`;
    }
  }

  return `${apiBase}${cleanPath}`;
}
