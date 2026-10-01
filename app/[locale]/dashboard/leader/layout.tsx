import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LeaderLayoutClient } from "./LeaderLayoutClient";

export const metadata: Metadata = {
  title: "Leader Dashboard | Data Analysis Committee | GDG on Campus UJ",
  description: "Leader workspace for Data Analysis Committee management, events, tasks, and points.",
};

export default function LeaderLayout({ children }: { children: ReactNode }) {
  return <LeaderLayoutClient>{children}</LeaderLayoutClient>;
}
