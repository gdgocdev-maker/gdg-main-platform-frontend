import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "#", label: "About Us" },
  { href: "#", label: "Projects" },
  { href: "#", label: "Events" },
  { href: "#", label: "Community" },
];

export function Header() {
  return (
    <header className="flex min-h-[64px] items-center justify-between bg-charcoal px-4 py-3 sm:px-6 md:min-h-[95px] md:px-10 lg:px-16">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="flex flex-wrap justify-end gap-4 sm:gap-6 md:gap-8">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm font-semibold text-white transition-colors hover:text-white/80 sm:text-base"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
