import { Badge } from "@/components/ui/Badge";

type ProfileChipsProps = {
  chips: string[];
};

export function ProfileChips({ chips }: ProfileChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
      {chips.map((chip) => (
        <Badge key={chip} label={chip} />
      ))}
    </div>
  );
}
