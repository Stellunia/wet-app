import { useState } from "react";

export type UIBookmark = {
  tag: "bookmarked" | "notBookmarked",
  bookmarked: string
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
}

export const useWeatherDisplay = () => {
  const [weatherDisplays, setWeatherDisplays] = useState<string[]>([]);
}