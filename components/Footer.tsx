"use client";

import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";

export default function Footer() {
  const t = useTranslations("common");
  const dir = useTextDirection();
  const links = [
  { label: t("nav.home"), href: "#home" },
  { label: t("nav.about"), href: "#about" },
  { label: t("nav.events"), href: "#events" },
  { label: t("nav.projects"), href: "#projects" },
  { label: t("nav.community"), href: "#committees" },
];

  return (
    <footer className="bg-[#363636] px-3 py-3 text-white lg:px-5 lg:py-5">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-3">
        {/* Logo */}
        <div className="flex flex-col gap-4">
          <img
            src="/images/gdg-logo.png"
            alt="Google Developer Group on Campus - University of Jeddah"
            className="w-[300px]"
          />
          <p dir={dir} className="text-sm font-normal leading-normal text-[#9AA0A6]">
            {t("footer.tagline")}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 dir={dir} className="text-xl font-semibold leading-normal">{t("footer.linksTitle")}</h3>

          <div className="mt-2 h-[3px] w-[76px] rounded-full bg-white" />

<nav className="mt-3 flex flex-col gap-3">
  {links.map((link) => (
    <a
      key={link.label}
      href={link.href}
      dir={dir}
      className="w-fit cursor-pointer text-sm font-medium leading-none hover:underline"
    >
      {link.label}
    </a>
  ))}
</nav>
        </div>

        {/* Contact */}
        <div>
          <h3 dir={dir} className="text-xl font-semibold leading-normal">{t("footer.contactTitle")}</h3>

          <div className="mt-2 h-[3px] w-[145px] rounded-full bg-white" />

          <div className="mt-4 flex gap-4">
            <a
              href="https://www.linkedin.com/company/google-developer-student-club-uj/"
              aria-label="LinkedIn"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-[#2867B2]"
            >
              <FaLinkedinIn className="text-xl" />
            </a>

            <a
              href="https://x.com/gdguoj?s=11"
              aria-label="X"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-black"
            >
              <FaXTwitter className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center">
        <p dir={dir} className="text-sm font-normal leading-normal">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}