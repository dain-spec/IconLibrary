"use client";

import { useEffect, useState } from "react";

export function useLottieData(src: string) {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    setData(null);
    fetch(src)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setData(json);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  return data;
}
