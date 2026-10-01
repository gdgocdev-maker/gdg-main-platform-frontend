export type EventStatus = "Upcoming" | "Completed" | "Draft" | "Needs Update";
export type EventType = "Workshop" | "Conference" | "Talk" | "Panel" | "Hackathon";

export interface CommitteeEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // e.g. "Oct 14, 2026"
  time: string; // e.g. "4:00 PM"
  location: string;
  registered: number;
  capacity: number;
  status: EventStatus;
  created: string; // e.g. "Sep 18"
  updated: string; // e.g. "Today"
  description?: string;
  isDraft?: boolean;
}

export type MemberStatus = "Active" | "Away";
export type MemberRole =
  | "Leader"
  | "Database Co-Lead"
  | "Data Coordinator"
  | "Event Data Member"
  | "Database Member"
  | "Data Analyst"
  | "Research Member";

export interface CommitteeMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  isElevated: boolean;
  accessExpiresAt: number | null; // epoch timestamp in ms
  accessDurationMinutes?: number;
  initials: string;
  avatarBgColor: string;
  points: number;
  tasksCompleted: number;
  lastActivity: string;
}

export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "To Do" | "In Progress" | "Completed";

export interface CommitteeTask {
  id: string;
  title: string;
  description: string;
  assignedMemberId: string;
  assignedMemberName: string;
  createdBy: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface PointHistoryItem {
  id: string;
  memberId: string;
  memberName: string;
  pointsDelta: number;
  reason: string;
  timestamp: string;
}

export interface RecentActivityItem {
  id: string;
  type: "event_published" | "details_updated" | "points_awarded" | "update_requested";
  title: string;
  description: string;
  timeAgo: string;
}
