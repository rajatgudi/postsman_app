"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { useAppSelector } from "@/state/store";
import AuthWrapper from "@/wrapper/AuthWrapper";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const { isDarkMode } = useAppSelector((state) => state.global);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  const handleLogout = () => {
    logout?.();

    setTheme("light");
    router.push("/login");
  };
  return (
    <>
      {isAuthenticated ? (
        <AuthWrapper>
          <div>
            Dashboard: {isDarkMode ? "Darkmode" : "Lightmode"}
            <div>{isAuthenticated ? "isAuthenticated" : "NO"}</div>
            <div>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </AuthWrapper>
      ) : (
        <>...</>
      )}
    </>
  );
}
