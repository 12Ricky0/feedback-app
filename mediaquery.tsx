"use client";
import { useEffect, useState } from "react";

export default function useMediaQuery(query: string): boolean {
  const [match, setMatch] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const queryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatch(queryList.matches);
    queryList.addEventListener("change", documentChangeHandler);

    return () => {
      queryList.removeEventListener("change", documentChangeHandler);
    };
  }, [query]);

  return match;
}
