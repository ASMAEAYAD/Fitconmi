import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ExerciseAccordion from "../../components/exercise-accordion";
import PrintButton from "../../components/print-button";
import { SiteFooter, SiteNavbar } from "../../components/site-chrome";
import { programBySlug, programs } from "../../lib/programs-data";

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
  const ogBySlug: Record<string, string> = {
    "weight-loss":
      "https://images.unsplash.com/photo-1549570652-97324981a6fd?w=1200&q=80",
    "muscle-building":
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&q=80",
    "strength-training":
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80",
    endurance:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
    flexibility:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
    "body-recomposition":
      "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=1200&q=80",
  };
  return {
    title: `${program.name} | FitConMi Programs`,
    description: program.scientificDescription,
    openGraph: {
      title: `${program.name} | FitConMi Programs`,
      description: program.scientificDescription,
      images: [ogBySlug[slug]],
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="no-print mb-6">
          <Link
            href="/programs"
            className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-[#d1d5db] transition-colors hover:border-[#a3e635] hover:text-[#a3e635]"
          >
            ← Back
          </Link>
        </div>
        <section className="relative overflow-hidden rounded-2xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&q=80"
            alt={`${program.name} hero fitness training`}
            loading="lazy"
            className="h-[280px] w-full object-cover sm:h-[340px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/40" />
          <div className="absolute inset-0 p-8">
            <p className="text-sm uppercase tracking-wider text-[#a3e635]">
              {program.difficulty} · {program.duration}
            </p>
            <h1 className="mt-2 text-5xl sm:text-6xl">{program.name}</h1>
            <p className="mt-4 max-w-4xl text-[#d1d5db]">{program.scientificDescription}</p>
          </div>
        </section>

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
                <li key={benefit}>- {benefit}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-[#111111] p-6">
          <h2 className="text-5xl">Weekly Training Schedule</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {program.weeklySchedule.map((day) => (
              <article
                key={day.day}
                className="rounded-xl border border-white/10 bg-[#0f0f0f] p-4 transition-all duration-300 hover:border-[#a3e635]"
              >
                <p className="text-sm uppercase tracking-wider text-[#a3e635]">{day.day}</p>
                <p className="mt-2 text-[#9ca3af]">{day.focus}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-5xl">Exercise List</h2>
          <ExerciseAccordion programSlug={program.slug} dayPlans={program.dayPlans} />
        </section>

        <section className="no-print mt-12 flex justify-center">
          <PrintButton />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
