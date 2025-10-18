import { useState } from "react";

export const SearchBar = ({ onAddBookmark }: {onAddBookmark: (city: string) => void }) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
}