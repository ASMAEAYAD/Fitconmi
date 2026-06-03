import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../../components/print-button";
import { SiteFooter, SiteNavbar } from "../../components/site-chrome";
import { programBySlug, programs } from "../../lib/data/programs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) return {};
  const title = `${program.title} | FitConMi — Fitness Programs`;
  const desc =
    program.description.length > 160
      ? program.description.slice(0, 157) + "…"
      : program.description;
  return {
    title,
    description: desc,
    alternates: { canonical: `https://fitconmi.com/programs/${slug}` },
    openGraph: {
      type: "website",
      url: `https://fitconmi.com/programs/${slug}`,
      title,
      description: desc,
      images: [
        {
          url: program.imageUrl,
          width: 1200,
          height: 630,
          alt: program.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [program.imageUrl],
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();

  // Difficulty label
  const difficultyLabels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="no-print mb-6">
          <Link
            href="/programs"
            className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-[#d1d5db] transition-colors hover:border-[#a3e635] hover:text-[#a3e635]"
          >
            ← Back
          </Link>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10">
          <img
            src={program.imageUrl}
            alt={program.imageAlt}
            loading="eager"
            className="h-[280px] w-full object-cover sm:h-[360px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/40" />
          <div className="absolute inset-0 p-8">
            <p className="text-sm uppercase tracking-wider text-[#a3e635]">
              {difficultyLabels[program.level] ?? program.level} ·{" "}
              {program.durationWeeks} weeks · {program.daysPerWeek}×/week
            </p>
            <h1 className="mt-2 text-5xl sm:text-6xl">{program.title}</h1>
            <p className="mt-4 max-w-4xl text-[#d1d5db]">{program.description}</p>
          </div>
        </section>

        {/* Who it's for + Benefits */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-[#111111] p-6">
            <h2 className="text-4xl">Who It&apos;s For</h2>
            <p className="mt-3 text-[#9ca3af]">{program.whoItsFor}</p>
            <h3 className="mt-6 text-3xl">Who Should Avoid It</h3>
            <p className="mt-3 text-[#9ca3af]">{program.avoidIf}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#111111] p-6">
            <h2 className="text-4xl">Key Benefits</h2>
            <ul className="mt-4 space-y-2 text-[#9ca3af]">
              {program.benefits.map((benefit) => (
                <li key={benefit}>— {benefit}</li>
              ))}
            </ul>
          </article>
        </section>

        {/* Program Phases */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-[#111111] p-6">
          <h2 className="text-5xl">Program Phases</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {program.phases.map((phase) => (
              <div
                key={phase.name}
                className="rounded-xl border border-white/10 bg-[#0f0f0f] p-4"
              >
                <p className="text-xs uppercase tracking-wider text-[#a3e635]">
                  Week {phase.weekRange[0]}–{phase.weekRange[1]}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">
                  {phase.name}
                </h3>
                <p className="mt-2 text-sm text-[#9ca3af]">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-[#111111] p-6">
          <h2 className="text-5xl">Weekly Training Schedule</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {program.weeklySchedule.map((day) => (
              <article
                key={day.day}
                className={`rounded-xl border p-4 transition-all duration-300 hover:border-[#a3e635] ${
                  day.isRest
                    ? "border-white/5 bg-[#0d0d0d] opacity-60"
                    : "border-white/10 bg-[#0f0f0f]"
                }`}
              >
                <p className="text-sm uppercase tracking-wider text-[#a3e635]">
                  {day.day}
                </p>
                <p className="mt-2 text-[#9ca3af]">{day.focus}</p>
                {day.isRest && (
                  <span className="mt-1 inline-block rounded-full border border-white/10 px-2 py-0.5 text-xs text-[#4b5563]">
                    Rest
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Science Block */}
        <section className="mt-10 rounded-2xl border border-[#a3e635]/20 bg-[#111111] p-6">
          <h2 className="text-4xl">The Science Behind This Program</h2>
          <p className="mt-2 text-xs uppercase tracking-wider text-[#a3e635]">
            Principle: {program.science.principle}
          </p>
          <p className="mt-4 text-[#d1d5db]">{program.science.explanation}</p>
          <div className="mt-6 rounded-xl border border-[#a3e635]/30 bg-[#a3e635]/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#a3e635]">
              Key Metric: {program.science.keyMetric}
            </p>
            <p className="mt-2 text-sm text-[#d1d5db]">
              {program.science.keyMetricValue}
            </p>
          </div>
        </section>

        {/* Nutrition */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-[#111111] p-6">
          <h2 className="text-5xl">Nutrition Strategy</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {program.nutrition.map((tip) => (
              <div
                key={tip.label}
                className="rounded-xl border border-white/10 bg-[#0f0f0f] p-4"
              >
                <span className="text-2xl">{tip.icon}</span>
                <h3 className="mt-2 text-lg font-bold text-[#a3e635]">
                  {tip.label}
                </h3>
                <p className="mt-2 text-sm text-[#9ca3af]">{tip.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Print button */}
        <section className="no-print mt-12 flex justify-center">
          <PrintButton />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
