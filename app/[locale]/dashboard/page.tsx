import { redirect } from "next/navigation";

export default async function DashboardEntry({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/dashboard/members-dashboard`);
}
