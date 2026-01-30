"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getIsAuthed } from "@/lib/auth";

const PUBLIC_PATHS = ["/", "/privacy", "/terms", "/login", "/upgrade", "/contact"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("AuthGuard checking:", pathname, "isAuthed:", getIsAuthed());
    // If it's a public path, we don't need to check auth
    if (PUBLIC_PATHS.includes(pathname)) {
      console.log("Public path, skipping auth check");
      setIsChecking(false);
      return;
    }

    // Check authentication
    if (!getIsAuthed()) {
      console.log("Not authed, redirecting to login");
      router.push("/login");
      // Don't set isChecking to false here, wait for redirect
    } else {
      console.log("Authed");
      setIsChecking(false);
    }
  }, [pathname, router]);

  // Always render children for public paths to avoid flash or blocking
  if (PUBLIC_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  if (isChecking) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
