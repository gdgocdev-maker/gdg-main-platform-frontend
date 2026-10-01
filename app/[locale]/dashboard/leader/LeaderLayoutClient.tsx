"use client";

import { useState, type ReactNode } from "react";
import { LeaderDashboardProvider } from "@/components/dashboard/leader/LeaderDashboardContext";
import { TopNav } from "@/components/dashboard/TopNav";
import Footer from "@/components/Footer";
import { LeaderSidebar } from "@/components/dashboard/leader/LeaderSidebar";
import { LeaderHeader } from "@/components/dashboard/leader/LeaderHeader";
import { TaskModal } from "@/components/dashboard/leader/TaskModal";
import { AddMemberModal } from "@/components/dashboard/leader/AddMemberModal";

function LeaderLayoutShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal states for header quick-actions
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-surface text-foreground">
      {/* Universal TopNav reused from Member Dashboard */}
      <TopNav />

      {/* Main Layout Row with Sidebar */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Sidebar */}
        <LeaderSidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Section Header */}
          <LeaderHeader
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />

          {/* Content Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Shared Platform Footer */}
      <Footer />

      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
      />

      <AddMemberModal
        isOpen={addMemberModalOpen}
        onClose={() => setAddMemberModalOpen(false)}
      />
    </div>
  );
}

export function LeaderLayoutClient({ children }: { children: ReactNode }) {
  return (
    <LeaderDashboardProvider>
      <LeaderLayoutShell>{children}</LeaderLayoutShell>
    </LeaderDashboardProvider>
  );
}
