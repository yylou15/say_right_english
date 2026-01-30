import AuthGuard from "@/components/AuthGuard";

export default function Template({ children }: { children: React.ReactNode }) {
  // Pass children directly, letting AuthGuard handle the logic (which now includes public paths check)
  return <AuthGuard>{children}</AuthGuard>;
}
