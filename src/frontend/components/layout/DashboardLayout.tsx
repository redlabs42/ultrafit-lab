"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Chat } from "@/components/chat";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col mesh-gradient relative overflow-hidden">
        {/* Organic Background Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/20 via-warning/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />

        <div className="lg:hidden">
          <Header />
        </div>
        <div className="hidden lg:block">
          <DashboardTopBar />
        </div>
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 lg:ml-72 transition-all duration-300">
            <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Chat />
    </ProtectedRoute>
  );
}
