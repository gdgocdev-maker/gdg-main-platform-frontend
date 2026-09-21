import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const links = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Projects", href: "#projects" },
  { label: "Community", href: "#committees" },
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
          <p className="text-sm font-normal leading-normal text-[#9AA0A6]">
            Connect. Learn. Build. Grow. — a student
            developer community at the University of
            Jeddah.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold leading-normal">Links</h3>

          <div className="mt-2 h-[3px] w-[76px] rounded-full bg-white" />

<nav className="mt-3 flex flex-col gap-3">
  {links.map((link) => (
    <a
      key={link.label}
      href={link.href}
      className="w-fit cursor-pointer text-sm font-medium leading-none hover:underline"
    >
      {link.label}
    </a>
  ))}
</nav>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold leading-normal">Contact Us</h3>

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
        <p className="text-sm font-normal leading-normal">
          &copy; 2026 GDG on Campus — University of Jeddah
        </p>
      </div>
    </footer>
  );
}