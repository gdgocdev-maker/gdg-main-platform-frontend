"use client";

import { useState } from "react";
import { PointsSection } from "../PointsSection";
import { PointsModal } from "../PointsModal";
import type { CommitteeMember } from "../types";

export function CommitteePointsPage() {
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);

  return (
    <div>
      <PointsSection onOpenUpdatePoints={setSelectedMember} />
      <PointsModal
        isOpen={Boolean(selectedMember)}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </div>
  );
}
