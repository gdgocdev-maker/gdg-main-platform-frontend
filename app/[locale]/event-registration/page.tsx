import {
  EventInfo,
} from "@/components/event-registration/EventInfo";
import { RegistrationForm } from "@/components/event-registration/RegistrationForm";
import { eventRegistrationMock } from "@/data/event-registration";

export default function EventRegistrationPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[44%_56%]">
        <EventInfo event={eventRegistrationMock} />
        <RegistrationForm />
      </div>
    </main>
  );
}