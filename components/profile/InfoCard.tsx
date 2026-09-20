import { Select } from "@/components/ui/Select";
import type { InfoCardData } from "@/lib/constants/profile";
import { SAUDI_UNIVERSITIES } from "@/lib/constants/universities";

type InfoCardProps = {
  data: InfoCardData;
  isEditing: boolean;
  values: Record<string, string>;
  errors: Record<string, string | null>;
  onChange: (key: string, value: string) => void;
};

function formatPhone(digits: string) {
  return digits.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1 $2 $3").trim();
}

export function InfoCard({
  data,
  isEditing,
  values,
  errors,
  onChange,
}: InfoCardProps) {
  return (
    <div className="flex-1 rounded-card border border-gray-350 bg-white p-6 sm:p-8">
      <h3 className="mb-5 text-lg font-semibold text-gray-500 sm:text-xl">
        {data.heading}
      </h3>
      <dl className="flex flex-col gap-4">
        {data.rows.map((row) => {
          const error = errors[row.key];
          const isPhone = row.key === "phone";
          const isUniversity = row.key === "university";

          return (
            <div
              key={row.key}
              className={`flex gap-4 ${
                isEditing
                  ? "flex-col sm:flex-row sm:items-center sm:justify-between"
                  : "items-baseline justify-between"
              }`}
            >
              <dt className="shrink-0 text-sm text-gray-500 sm:text-base">
                {row.label}
              </dt>
              {isEditing ? (
                <div className="flex min-w-0 flex-1 flex-col sm:items-end">
                  {isUniversity ? (
                    <Select
                      value={values[row.key] ?? ""}
                      options={SAUDI_UNIVERSITIES}
                      onChange={(value) => onChange(row.key, value)}
                      placeholder="Select a university"
                      error={Boolean(error)}
                    />
                  ) : (
                    <div
                      className={`flex min-w-0 items-baseline gap-1.5 border-0 border-b border-dashed py-0.5 ${
                        error ? "border-brand-red" : "border-gray-350"
                      }`}
                    >
                      {isPhone && (
                        <span className="shrink-0 text-sm font-semibold text-gray-500 sm:text-base">
                          +966
                        </span>
                      )}
                      <input
                        type="text"
                        inputMode={isPhone ? "numeric" : "text"}
                        value={values[row.key] ?? ""}
                        onChange={(event) => {
                          const raw = isPhone
                            ? event.target.value.replace(/\D/g, "").slice(0, 9)
                            : event.target.value;
                          onChange(row.key, raw);
                        }}
                        aria-invalid={Boolean(error)}
                        className="min-w-0 border-0 bg-transparent text-left text-sm font-semibold text-foreground outline-none sm:text-right sm:text-base"
                      />
                    </div>
                  )}
                  {error && (
                    <span className="mt-1 text-xs text-brand-red">{error}</span>
                  )}
                </div>
              ) : (
                <dd className="text-right text-sm font-semibold text-foreground sm:text-base">
                  {isPhone ? `+966 ${formatPhone(row.value)}` : row.value}
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </div>
  );
}
