"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getIsAuthed } from "@/lib/auth";

const PUBLIC_PATHS = ["/", "/privacy", "/terms", "/login"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // If it's a public path, we don't need to check auth
    if (PUBLIC_PATHS.includes(pathname)) {
      setIsChecking(false);
      return;
    }

    // Check authentication
    if (!getIsAuthed()) {
      router.push("/login");
      // Keep isChecking true to prevent rendering children before redirect
    } else {
      setIsChecking(false);
    }
  }, [pathname, router]);

  // If it's a public path, render immediately
  if (PUBLIC_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  // If checking or redirecting, render nothing (or a loading spinner)
  if (isChecking) {
    return null; 
  }

  // If authorized, render children
  return <>{children}</>;
}
