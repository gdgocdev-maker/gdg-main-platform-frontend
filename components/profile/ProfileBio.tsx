type ProfileBioProps = {
  bio: string;
  placeholder: string;
  isEditing: boolean;
  onChange: (value: string) => void;
};

export function ProfileBio({
  bio,
  placeholder,
  isEditing,
  onChange,
}: ProfileBioProps) {
  return (
    <div className="w-full rounded-card border border-gray-400 bg-white px-4 py-4 sm:px-6">
      <p className="mb-1 text-xs font-semibold text-gray-500 sm:text-sm">
        Short Bio
      </p>
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={3}
          maxLength={500}
          className="w-full resize-none text-sm leading-relaxed text-foreground outline-none placeholder:text-gray-300 sm:text-base md:text-lg"
        />
      ) : (
        <p
          className={`text-sm leading-relaxed sm:text-base md:text-lg ${
            bio ? "text-foreground" : "text-gray-300"
          }`}
        >
          {bio || placeholder}
        </p>
      )}
    </div>
  );
}
