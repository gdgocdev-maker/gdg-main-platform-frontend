import Footer from "@/components/Footer";
import { TopNav } from "@/components/dashboard/TopNav";
import { UserRegistrationsPage } from "@/components/user-registrations/UserRegistrationsPage";
import { getCurrentUserRegistrations } from "@/lib/user-registrations/repository";
import { setRequestLocale } from "next-intl/server";

export default async function RegistrationsPage({
  params,
}: PageProps<"/[locale]/registrations">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const result = await getCurrentUserRegistrations();

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <TopNav />
      <UserRegistrationsPage result={result} />
      <Footer />
    </div>
  );
}
