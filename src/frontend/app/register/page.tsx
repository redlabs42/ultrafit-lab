"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Only redirect if already authenticated (e.g., user manually navigated to /register)
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Don't show register form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center mesh-gradient p-4">
      <div className="w-full max-w-md fade-in">
        <RegisterForm />
      </div>
    </div>
  );
}
