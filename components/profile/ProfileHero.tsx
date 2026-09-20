"use client";

import { motion } from "framer-motion";
import { SquarePen } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ImageUploadButton } from "@/components/ui/ImageUploadButton";

type ProfileHeroProps = {
  initials: string;
  name: string;
  email: string;
  memberSince: string;
  avatarUrl: string | null;
  headerImageUrl: string | null;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onAvatarSelect: (file: File) => void;
  onHeaderImageSelect: (file: File) => void;
};

export function ProfileHero({
  initials,
  name,
  email,
  memberSince,
  avatarUrl,
  headerImageUrl,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onAvatarSelect,
  onHeaderImageSelect,
}: ProfileHeroProps) {
  const editControls = isEditing ? (
    <div className="flex shrink-0 items-center gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground sm:text-base"
      >
        Cancel
      </button>
      <Button variant="solid" onClick={onSave}>
        Save changes
      </Button>
    </div>
  ) : (
    <Button icon={<SquarePen className="size-4 sm:size-5" />} onClick={onEdit}>
      Edit profile
    </Button>
  );

  const avatarWithUpload = (
    <div className="relative shrink-0">
      <Avatar initials={initials} imageUrl={avatarUrl} size="lg" />
      {isEditing && (
        <ImageUploadButton
          onSelect={onAvatarSelect}
          label="Change profile photo"
          className="absolute bottom-1 right-1 size-9 sm:size-10"
          iconClassName="size-4 sm:size-5"
        />
      )}
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div
        className="relative h-24 bg-cream bg-cover bg-center sm:h-32 md:h-40 lg:h-[189px]"
        style={headerImageUrl ? { backgroundImage: `url(${headerImageUrl})` } : undefined}
      >
        {isEditing && (
          <ImageUploadButton
            onSelect={onHeaderImageSelect}
            label="Change cover photo"
            className="absolute right-4 top-4 size-10 sm:right-6 sm:top-6"
            iconClassName="size-5"
          />
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="-mt-16 sm:-mt-20 md:-mt-24">
          {/* Mobile: centered, stacked */}
          <div className="flex flex-col items-center gap-3 text-center md:hidden">
            {avatarWithUpload}
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold sm:text-3xl">
                {name}
              </h1>
              <p className="text-base text-foreground/80 sm:text-lg">
                {email} · Member since {memberSince}
              </p>
            </div>
            {editControls}
          </div>

          {/* Desktop: avatar + button share a row, name/meta left-aligned below */}
          <div className="hidden md:flex md:flex-col md:gap-4">
            <div className="flex items-end justify-between">
              {avatarWithUpload}
              {editControls}
            </div>
            <div className="flex flex-col items-start gap-1 text-left">
              <h1 className="font-[family-name:var(--font-heading)] text-4xl font-semibold">
                {name}
              </h1>
              <p className="text-xl text-foreground/80">
                {email} · Member since {memberSince}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-4 sm:h-5 md:h-6" />
    </motion.section>
  );
}
