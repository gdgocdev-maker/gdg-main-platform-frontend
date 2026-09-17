import Image from "next/image";
import logo from "@/public/logo.png";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="Google Developer Group on Campus, University of Jeddah"
      className={`h-8 w-auto sm:h-10 md:h-11 ${className}`}
      priority
    />
  );
}
