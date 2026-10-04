import { userRegistrationsMock } from "@/data/user-registrations";
import type { UserRegistrationsResult } from "./types";

/**
 * Demo source for the registrations page. Replace with the authenticated API
 * once the backend publishes its list and confirmation contracts.
 */
export async function getCurrentUserRegistrations(): Promise<UserRegistrationsResult> {
  return {
    state: "ready",
    registrations: userRegistrationsMock,
  };
}
