import { redirect } from "next/navigation";

export default async function CreateEventRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/dashboard/data-dashboard/events`);
}
