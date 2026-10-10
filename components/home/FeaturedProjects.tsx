"use client";

import { projects } from "@/data/home";
import { useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import ProjectCard, { MAX_SIDE, PERSPECTIVE } from "./ProjectCard";

export default function FeaturedProjects() {
  const t = useTranslations("home.projects");
  const dir = useTextDirection();

  /*
   * offset: عدّاد غير محدود (يزيد وينقص بدون حد).
   * نستخدمه عشان كل كرت يحتفظ بنفس الـ key وهو يتحرك،
   * وهذا اللي يخلي الحركة سلسة بدل ما الكرت يختفي ويظهر.
   */
  const [offset, setOffset] = useState(0);

  const total = projects.length; // عدد المشاريع (ديناميكي بالكامل)
  if (total === 0) return null; // ما في مشاريع = ما نعرض شي

  // دالة تحوّل أي رقم (حتى السالب) إلى رقم صحيح داخل نطاق المشاريع
  const mod = (n: number) => ((n % total) + total) % total;

  // رقم المشروع النشط حاليًا
  const activeIndex = mod(offset);

  /*
   * عدد الكروت في كل جهة يعتمد على عدد المشاريع:
   * مشروع واحد  = كرت واحد فقط
   * مشروعان     = كرت على كل جهة
   * ثلاثة فأكثر = الحد الأقصى (MAX_SIDE)
   */
  const maxSide = total === 1 ? 0 : total === 2 ? 1 : MAX_SIDE;

  // قائمة المواقع مثلًا: [-3,-2,-1,0,1,2,3]
  const positions = Array.from(
    { length: maxSide * 2 + 1 },
    (_, i) => i - maxSide,
  );

  const handleNext = () => setOffset((p) => p + 1);
  const handlePrevious = () => setOffset((p) => p - 1);

  // نجهّز بيانات الكروت اللي بتظهر (تتكرر الكروت لو المشاريع قليلة)
  const visible = positions.map((position) => ({
    key: offset + position,
    position,
    index: mod(offset + position),
    project: projects[mod(offset + position)],
  }));

  // الأزرار تتعطل إذا في مشروع واحد فقط
  const canNavigate = total > 1;

  // عدّاد الصفحات (01 / 05) – نفس الشكل للجوال والكمبيوتر
  const counter = (
    <div dir="ltr" className="min-w-[64px] text-center text-sm font-medium text-foreground">
      <span className="font-semibold text-foreground">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <span className="mx-1.5 text-foreground/25">/</span>
      <span className="text-foreground/45">{String(total).padStart(2, "0")}</span>
    </div>
  );

  return (
<section
  id="projects"
  className="relative isolate overflow-hidden bg-background px-8 py-20 lg:px-10 lg:py-28"
>
  {/* ===== الخلفية ===== */}
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    {/* شبكة نقاط */}
    {/* <div className="absolute inset-0 text-foreground/25 [background-image:radial-gradient(currentColor_1.2px,transparent_1.2px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_50%,black_30%,transparent)]" /> */}

    {/* توهّج ألوان Google */}
    <div className="absolute -top-32 start-[-6%] h-[380px] w-[380px] rounded-full bg-gdg-blue/30 blur-[110px]" />
    {/* <div className="absolute -top-20 end-[-4%] h-[320px] w-[320px] rounded-full bg-gdg-red/25 blur-[110px]" /> */}
    {/* <div className="absolute bottom-[-120px] start-[18%] h-[340px] w-[340px] rounded-full bg-gdg-green/25 blur-[110px]" /> */}
    <div className="absolute bottom-[-100px] end-[16%] h-[320px] w-[320px] rounded-full bg-gdg-blue/25 blur-[110px]" />

    {/* خط علوي بألوان Google */}
    {/* <div className="absolute inset-x-0 top-0 flex h-[3px] opacity-80">
      <span className="flex-1 bg-gdg-blue" />
      <span className="flex-1 bg-gdg-red" />
      <span className="flex-1 bg-gdg-yellow" />
      <span className="flex-1 bg-gdg-green" />
    </div> */}
  </div>

  {/* ===== العنوان (على اليسار) ===== */}
  <div className="max-w-2xl">
    <motion.div
      dir={dir}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-start"
    >
      <h2 className="text-4xl font-bold leading-snug text-foreground md:text-5xl">
        {t("titleStart")}{" "}
        <span className="bg-gradient-to-r from-gdg-blue to-gdg-red bg-clip-text pe-1 italic text-transparent rtl:not-italic">
          {t("titleHighlight")}
        </span>
      </h2>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/60 md:text-lg">
        {t("subtitle")}
      </p>
    </motion.div>
  </div>

      {/* ===== المعرض ثلاثي الأبعاد (شاشات الكمبيوتر) ===== */}
      <div className="mx-auto mt-14 hidden w-full max-w-[1400px] lg:block">
        {/*
          perspective: العمق ثلاثي الأبعاد (نفس القيمة المستخدمة في حساب المسافات).
          perspectiveOrigin 100%: نقطة نظر العين عند قاع الكروت،
          عشان قواعد الكروت كلها تبقى على خط واحد.
        */}
        <div
          className="relative mx-auto h-[420px] w-full"
          style={{ perspective: PERSPECTIVE, perspectiveOrigin: "50% 100%" }}
        >
          {visible.map(({ key, project, index, position }) => (
            <ProjectCard
              key={key}
              project={project}
              position={position}
              index={index}
              isActive={position === 0}
              // الضغط على كرت جانبي ينقلك له مباشرة
              onSelect={() => setOffset((p) => p + position)}
            />
          ))}
        </div>

        {/* أزرار التنقل (تحت الانعكاس) */}
        <div className="mt-24 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label={t("previous")}
            onClick={handlePrevious}
            disabled={!canNavigate}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all duration-300 hover:-translate-x-1 hover:bg-surface-muted hover:shadow-md disabled:opacity-40"
          >
            <FiArrowLeft className="text-lg rtl:-scale-x-100" />
          </button>

          {counter}

          <button
            type="button"
            aria-label={t("next")}
            onClick={handleNext}
            disabled={!canNavigate}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-all duration-300 hover:translate-x-1 hover:shadow-lg disabled:opacity-40"
          >
            <FiArrowRight className="text-lg rtl:-scale-x-100" />
          </button>
        </div>
      </div>

      {/* ===== نسخة الجوال والتابلت: كرت واحد فقط ===== */}
      <div className="mt-10 lg:hidden">
        <motion.div
          key={projects[activeIndex].id}
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative mx-auto h-[420px] w-[280px] max-w-full"
        >
          <ProjectCard
            project={projects[activeIndex]}
            position={0}
            index={activeIndex}
            isActive
          />
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label={t("previous")}
            onClick={handlePrevious}
            disabled={!canNavigate}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-foreground disabled:opacity-40"
          >
            <FiArrowLeft className="rtl:-scale-x-100" />
          </button>

          {counter}

          <button
            type="button"
            aria-label={t("next")}
            onClick={handleNext}
            disabled={!canNavigate}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-foreground text-background disabled:opacity-40"
          >
            <FiArrowRight className="rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </section>
  );
}