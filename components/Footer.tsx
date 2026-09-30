"use client";

import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";
import { Link } from "@/i18n/navigation";
import { useHomeSectionHref } from "@/components/layout/useHomeSectionHref";

export default function Footer() {
  const t = useTranslations("common");
  const dir = useTextDirection();
  const sectionHref = useHomeSectionHref();
  // `route` links are real pages (locale-aware Link); the rest are homepage sections.
  const links = [
    { label: t("nav.home"), href: sectionHref("#home") },
    { label: t("nav.about"), href: sectionHref("#about") },
    { label: t("nav.events"), href: sectionHref("#events") },
    { label: t("nav.announcements"), href: "/announcements", route: true },
    { label: t("nav.projects"), href: sectionHref("#projects") },
    { label: t("nav.community"), href: sectionHref("#committees") },
  ];

  return (
    <footer className="bg-[var(--gdg-dark)] px-3 py-3 text-[var(--white)] lg:px-5 lg:py-5">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-3">
        {/* Logo */}
        <div className="flex flex-col gap-4">
          <img
            src="/images/gdg-logo.png"
            alt="Google Developer Group on Campus - University of Jeddah"
            className="w-[300px]"
          />
          <p
            dir={dir}
            className="text-sm font-normal leading-normal text-footer-muted"
          >
            {t("footer.tagline")}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3
            dir={dir}
            className="text-xl font-semibold leading-normal"
          >
            {t("footer.linksTitle")}
          </h3>

          <div className="mt-2 h-[3px] w-[76px] rounded-full bg-[var(--white)]" />

          <nav className="mt-3 flex flex-col gap-3">
            {links.map((link) => {
              const className =
                "w-fit cursor-pointer text-sm font-medium leading-none hover:underline";

              return link.route ? (
                <Link key={link.label} href={link.href} dir={dir} className={className}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} dir={dir} className={className}>
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3
            dir={dir}
            className="text-xl font-semibold leading-normal"
          >
            {t("footer.contactTitle")}
          </h3>

          <div className="mt-2 h-[3px] w-[145px] rounded-full bg-[var(--white)]" />

          <div className="mt-4 flex gap-4">
            <a
              href="https://www.linkedin.com/company/google-developer-student-club-uj/"
              aria-label="LinkedIn"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-linkedin-blue"
            >
              <FaLinkedinIn className="text-xl" />
            </a>

            <a
              href="https://x.com/gdguoj?s=11"
              aria-label="X"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-[var(--black)]"
            >
              <FaXTwitter className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center">
        <p
          dir={dir}
          className="text-sm font-normal leading-normal"
        >
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}