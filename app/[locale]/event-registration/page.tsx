import {
  EventInfo,
  type EventInfoData,
} from "@/components/event-registration/EventInfo";
import { RegistrationForm } from "@/components/event-registration/RegistrationForm";

const event: EventInfoData = {
  name: "كيف تدار البنية التحتية خلف الأنظمة التي تعتمد عليها كل يوم؟",
  description:
    "في هذه الورشة ستتعرف على ما هو NOC والفرق بينه وبين SOC، وأساليب نظام Nagios وإدارة الحوادث، وقراءة لوحة التحكم (Dashboard)، مع محاكاة وتطبيق عملي.",
  date: "Saturday , Sep12",
  time: "5:00 PM - 8:00 PM",
  location: "Wadi Jeddah",
  imageSrc: "/images/event-image.png",
  imageAlt: "Inside NOC event",
  speaker: {
    name: "د. فواز الحزيمي",
    title: "أستاذ مشارك بجامعة جدة",
    bio: "يمتلك خبرة تتجاوز 10 سنوات في مراكز البيانات والبنية التحتية للشبكات، وله أكثر من 50 بحث علمي.",
    imageSrc: "/images/speaker-image.png",
  },
};

export default function EventRegistrationPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[44%_56%]">
        <EventInfo event={event} />
        <RegistrationForm />
      </div>
    </main>
  );
}