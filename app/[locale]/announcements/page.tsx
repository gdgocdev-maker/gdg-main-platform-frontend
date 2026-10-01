import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnnouncementsExplorer } from "@/components/announcements/AnnouncementsExplorer";
import { AnnouncementsHero } from "@/components/announcements/AnnouncementsHero";
import { announcementsContainer } from "@/components/announcements/styles";
import { getAnnouncements } from "@/lib/announcements/provider";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/announcements">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "announcements.meta" });

  return { title: t("title"), description: t("description") };
}

export default async function AnnouncementsPage({ params }: PageProps<"/[locale]/announcements">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const announcements = await getAnnouncements();

  return (
    <>
      <AnnouncementsHero />
      <div className={announcementsContainer}>
        <AnnouncementsExplorer announcements={announcements} />
      </div>
    </>
  );
}
