export type AttendanceCheckInResult = {
  state: "checked-in" | "already-checked-in" | "invalid-qr" | "service-unavailable";
  checkedInAt?: string;
};

/**
 * UI integration boundary only. No attendance endpoint is published yet, so
 * this does not validate tokens or record check-ins in the frontend.
 */
export async function checkInAttendance(_input: {
  eventId: string;
  token: string;
}): Promise<AttendanceCheckInResult> {
  return { state: "service-unavailable" };
}
