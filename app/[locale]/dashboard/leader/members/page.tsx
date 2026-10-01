"use client";

import { useState } from "react";
import { MembersSection } from "@/components/dashboard/leader/MembersSection";
import { AddMemberModal } from "@/components/dashboard/leader/AddMemberModal";
import { TemporaryAccessModal } from "@/components/dashboard/leader/TemporaryAccessModal";
import { PointsModal } from "@/components/dashboard/leader/PointsModal";
import type { CommitteeMember } from "@/components/dashboard/leader/types";

export default function LeaderMembersPage() {
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [selectedMemberForAccess, setSelectedMemberForAccess] = useState<CommitteeMember | null>(null);

  const [pointsModalOpen, setPointsModalOpen] = useState(false);
  const [selectedMemberForPoints, setSelectedMemberForPoints] = useState<CommitteeMember | null>(null);

  const handleOpenTemporaryAccess = (member: CommitteeMember) => {
    setSelectedMemberForAccess(member);
    setAccessModalOpen(true);
  };

  const handleOpenUpdatePoints = (member: CommitteeMember) => {
    setSelectedMemberForPoints(member);
    setPointsModalOpen(true);
  };

  return (
    <div>
      <MembersSection
        onOpenAddMember={() => setAddMemberOpen(true)}
        onOpenTemporaryAccess={handleOpenTemporaryAccess}
        onOpenUpdatePoints={handleOpenUpdatePoints}
      />

      <AddMemberModal
        isOpen={addMemberOpen}
        onClose={() => setAddMemberOpen(false)}
      />

      <TemporaryAccessModal
        isOpen={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
        member={selectedMemberForAccess}
      />

      <PointsModal
        isOpen={pointsModalOpen}
        onClose={() => setPointsModalOpen(false)}
        member={selectedMemberForPoints}
      />
    </div>
  );
}
