import type { LeaderCommittee } from "@/components/dashboard/shared/types";

interface CommitteeDashboardMock {
  name: string;
  description: string;
  headerSubtitle: string;
  leaderDisplayName: string;
  coLeaderDisplayName: string;
  leaderRoleDescription: string;
  coLeaderRoleDescription: string;
  settings: {
    notifyOnSubmission: boolean;
    autoApproveMembers: boolean;
  };
}

export const leaderDashboardMockData: Record<LeaderCommittee, CommitteeDashboardMock> = {
  "data-analysis": {
    name: "Data Analysis Committee",
    description:
      "Focuses on data science, AI workflows, predictive models, database administration, and analytics for GDG on Campus UJ activities.",
    headerSubtitle: "Leader · UJ",
    leaderDisplayName: "Shahad",
    coLeaderDisplayName: "Lina Saleh",
    leaderRoleDescription: "Primary Committee Leader",
    coLeaderRoleDescription: "Co-Leader & Database Administrator",
    settings: {
      notifyOnSubmission: true,
      autoApproveMembers: false,
    },
  },
  pr: {
    name: "Public Relations Committee",
    description: "Coordinates event registrations and supports the GDG UJ community.",
    headerSubtitle: "Public Relations · UJ",
    leaderDisplayName: "Committee Leader",
    coLeaderDisplayName: "Committee Co-Leader",
    leaderRoleDescription: "Primary committee administrator",
    coLeaderRoleDescription: "Secondary committee administrator",
    settings: {
      notifyOnSubmission: true,
      autoApproveMembers: false,
    },
  },
};

export const defaultNewTaskDueDate = "Oct 20, 2026";