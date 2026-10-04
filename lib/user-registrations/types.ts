export type UserRegistrationKind = "event" | "trip";

export type UserRegistrationStatus =
  | "pending"
  | "need-confirmation"
  | "approved"
  | "declined"
  | "attended"
  | "not-attended";

/** UI-facing record that can be mapped from the backend contract when it exists. */
export interface UserRegistration {
  id: string;
  kind: UserRegistrationKind;
  title: string;
  startsAt: string;
  location: string;
  status: UserRegistrationStatus;
  confirmationDeadline?: string;
}

export type UserRegistrationsResult =
  | { state: "ready"; registrations: UserRegistration[] }
  | { state: "not-configured" };
