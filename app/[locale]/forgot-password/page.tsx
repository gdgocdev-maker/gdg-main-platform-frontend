import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { use } from "react"
import { Link } from "@/i18n/navigation"
import AuthVisualPanel from "@/app/components/auth/AuthVisualPanel"
import AuthCard from "@/app/components/auth/AuthCard"
import ForgotPasswordForm from "./ForgotPasswordForm"

export async function generateMetadata({
  params
}: PageProps<"/[locale]/forgot-password">): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "auth.forgotPassword" })

  return { title: t("metaTitle") }
}

export default function ForgotPassword({ params }: PageProps<"/[locale]/forgot-password">) {
  // Tells next-intl the locale so this page can still be pre-rendered as static HTML.
  setRequestLocale(use(params).locale)
  const t = useTranslations("auth.forgotPassword")

  return (
    <main className="flex min-h-screen min-w-0 flex-col bg-background text-foreground lg:h-screen lg:min-h-0 lg:flex-row">
      <AuthVisualPanel side="start" />

      <section className="flex h-auto flex-1 items-center justify-center bg-background lg:h-full">
        <AuthCard
          size="sm"
          title={t("title")}
          description={t("description")}
        >
          <ForgotPasswordForm />

          <Link
            href="/login"
            className="mt-auto pb-8 pt-6 text-center text-sm font-medium text-blue hover:text-blue/90 active:text-blue/80"
          >
            {t("backToSignIn")}
          </Link>
        </AuthCard>
      </section>
    </main>
  );
}