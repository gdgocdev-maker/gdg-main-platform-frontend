"use client";

import { Camera } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const MAX_SIZE_MB = 5;

type ImageUploadButtonProps = {
  onSelect: (file: File) => void;
  label: string;
  className?: string;
  iconClassName?: string;
  maxSizeMB?: number;
};

export function ImageUploadButton({
  onSelect,
  label,
  className = "",
  iconClassName = "size-4",
  maxSizeMB = MAX_SIZE_MB,
}: ImageUploadButtonProps) {
  const t = useTranslations("common.upload");
  const inputRef = useRef<HTMLInputElement>(null);
  // Holds a common.upload message key so the text follows language switches.
  const [error, setError] = useState<"notImage" | "tooLarge" | null>(null);

  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label={label}
        className="flex size-full items-center justify-center rounded-full bg-[var(--black)]/55 text-[var(--white)] backdrop-blur-sm transition-colors hover:bg-[var(--black)]/70"
      >
        <Camera className={iconClassName} />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;

          if (!file.type.startsWith("image/")) {
            setError("notImage");
            return;
          }
          if (file.size > maxSizeMB * 1024 * 1024) {
            setError("tooLarge");
            return;
          }
          setError(null);
          onSelect(file);
        }}
      />
      {error && (
        <span className="absolute end-0 top-full z-10 mt-2 w-max max-w-44 rounded-md bg-gdg-red px-2.5 py-1.5 text-center text-xs font-medium text-[var(--white)] shadow-lg">
          {t(error, { max: maxSizeMB })}
        </span>
      )}
    </div>
  );
}