"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";
import { useRouter } from "@/i18n/navigation";

export default function JoinCommunity() {
  const t = useTranslations("home.joinCommunity");
  const dir = useTextDirection();
  const router = useRouter();

  return (
    <section className="mt-5 px-6 py-16 lg:px-10 lg:py-20">
      <div
        className="relative mx-auto flex min-h-[310px] max-w-[1100px] items-center overflow-visible rounded-2xl px-8 py-10 lg:px-12"
        style={{
          background:
            "linear-gradient(to right, var(--join-blue), var(--join-orange), var(--join-green))",
        }}
      >
        <div className="max-w-[650px]">
          <h3
            dir={dir}
            className="text-2xl font-semibold leading-snug text-[var(--white)]"
          >
            {t("title")}
          </h3>

          <h4
            dir={dir}
            className="mt-5 max-w-[600px] text-lg font-normal leading-normal text-[var(--white)]"
          >
            {t("description")}
          </h4>

          <motion.button
            type="button"
            onClick={() => router.push("/login")}
            className="relative mt-8 flex h-[50px] w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-full border text-base font-bold text-[var(--white)] backdrop-blur-md lg:h-[56px] lg:w-[250px] lg:text-xl"
            style={{
              borderColor: "var(--glass-border)",
              backgroundColor: "var(--glass-background)",
              boxShadow:
                "inset 0 2px 8px var(--glass-highlight), inset 0 -4px 10px var(--glass-bottom), 0 4px 15px var(--glass-shadow)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10" dir={dir}>
              {t("cta")}
            </span>

            <span
              className="absolute inset-x-4 top-1 h-[12px] rounded-full blur-md"
              style={{
                backgroundColor: "var(--glass-shine)",
              }}
            />
          </motion.button>
        </div>

        <div className="absolute -end-4 -top-30 hidden w-[280px] lg:block">
          <img
            src="/images/phone-image.png"
            alt={t("phoneAlt")}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
