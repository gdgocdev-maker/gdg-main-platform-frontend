"use client";

import { useState } from "react";
import { PointsSection } from "@/components/dashboard/leader/PointsSection";
import { PointsModal } from "@/components/dashboard/leader/PointsModal";
import type { CommitteeMember } from "@/components/dashboard/leader/types";

export default function LeaderPointsPage() {
  const [pointsModalOpen, setPointsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);

  const handleOpenUpdatePoints = (member: CommitteeMember) => {
    setSelectedMember(member);
    setPointsModalOpen(true);
  };

  return (
    <div>
      <PointsSection onOpenUpdatePoints={handleOpenUpdatePoints} />

      <PointsModal
        isOpen={pointsModalOpen}
        onClose={() => setPointsModalOpen(false)}
        member={selectedMember}
      />
    </div>
  );
}
