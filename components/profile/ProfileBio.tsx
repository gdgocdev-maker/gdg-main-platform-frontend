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
    <div className="w-full rounded-card border border-gray-400 bg-white px-5 py-6 sm:px-8">
      <p className="mb-2 text-sm font-semibold text-gray-500 sm:text-base">
        Short Bio
      </p>
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={3}
          maxLength={500}
          className="w-full resize-none text-base leading-relaxed text-foreground outline-none placeholder:text-gray-300 sm:text-lg md:text-xl"
        />
      ) : (
        <p
          className={`text-base leading-relaxed sm:text-lg md:text-xl ${
            bio ? "text-foreground" : "text-gray-300"
          }`}
        >
          {bio || placeholder}
        </p>
      )}
    </div>
  );
}
