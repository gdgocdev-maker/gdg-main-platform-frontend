import { useTranslations } from "next-intl"

type SignupProgressProps = {
  step: 1 | 2
}

export default function SignupProgress({ step }: SignupProgressProps) {
  const t = useTranslations("auth.signup.progress")

  return (
    <div className="mt-8 flex w-full items-start justify-center gap-2.75 text-center text-sm font-medium md:px-8">
      <div className="flex flex-1 flex-col items-center gap-2">
        <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-blue text-xs font-normal text-white">
          1
        </span>
        <span className="whitespace-nowrap">{t("personal")}</span>
      </div>
      <span
        className={`mt-3 h-px flex-1 ${step === 2 ? "bg-blue" : "bg-black/20"}`}
      />
      <div className="flex flex-1 flex-col items-center gap-2">
        <span
          className={`flex h-6.5 w-6.5 items-center justify-center rounded-full text-xs font-normal text-white ${step === 2 ? "bg-blue" : "bg-black/10"}`}
          >
          2
        </span>
        <span className="whitespace-nowrap">{t("academic")}</span>
      </div>
    </div>
  )
}
