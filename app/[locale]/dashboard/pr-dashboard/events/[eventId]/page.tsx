"use client";

import { useParams } from "next/navigation";
import { PREventRegistrations } from "@/components/dashboard/pr/PRRegistrationManagement";

export default function PREventRegistrationsPage() {
  const params = useParams<{ eventId: string }>();
  return <PREventRegistrations eventId={params.eventId} />;
}
