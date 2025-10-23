import { useState } from "react";

export type UIBookmark = {
  tag: boolean,
  bookmarked: string
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  function isBookmarked(name: string) {
    return bookmarks.includes(name)
  }
  return {bookmarks, isBookmarked}
}

export const useWeatherDisplay = () => {
  const [weatherDisplays, setWeatherDisplays] = useState<string[]>([]);
}