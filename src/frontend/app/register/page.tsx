"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    <div className="flex min-h-screen items-center justify-center mesh-gradient p-4 relative">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 md:top-8 md:left-8 hover:bg-white/10 text-foreground"
      >
        <Link href="/">
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Voltar para Home</span>
        </Link>
      </Button>
      <div className="w-full max-w-md fade-in">
        <RegisterForm />
      </div>
    </div>
  );
}
