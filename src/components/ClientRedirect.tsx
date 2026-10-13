"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// next/navigation's redirect() can't run in a static export, so the GitHub Pages
// build redirects from the browser instead (the router adds the basePath).
export function ClientRedirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [router, to]);
  return null;
}
