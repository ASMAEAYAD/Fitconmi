import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
  return {
    title: `${program.name} | FitConMi Programs`,
    description: program.scientificDescription,
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
        <section className="rounded-2xl border border-white/10 bg-[#111111] p-8">
          <p className="text-sm uppercase tracking-wider text-[#a3e635]">
            {program.difficulty} · {program.duration}
          </p>
          <h1 className="mt-2 text-5xl sm:text-6xl">{program.name}</h1>
          <p className="mt-4 max-w-4xl text-[#9ca3af]">{program.scientificDescription}</p>
          <div className="mt-6">
            <PrintButton />
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
          <div className="mt-6 space-y-6">
            {program.exercises.map((exercise) => (
              <article
                key={exercise.name}
                className="rounded-2xl border border-white/10 bg-[#111111] p-6 transition-all duration-300 hover:border-[#a3e635]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-4xl">{exercise.name}</h3>
                    <p className="mt-1 text-sm text-[#a3e635]">{exercise.setsReps}</p>
                  </div>
                  <span className="rounded-full border border-[#a3e635]/40 bg-[#a3e635]/10 px-3 py-1 text-xs text-[#a3e635]">
                    {exercise.muscles}
                  </span>
                </div>
                <p className="mt-4 text-[#9ca3af]">
                  <span className="text-white">Scientific benefit:</span> {exercise.benefit}
                </p>
                <div className="mt-4 rounded-xl border border-dashed border-white/20 bg-[#0f0f0f] p-4 text-sm text-[#9ca3af]">
                  {exercise.mediaPlaceholder}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-white">Step-by-step instructions</p>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-[#9ca3af]">
                    {exercise.instructions.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-white">Alternatives</p>
                  <p className="mt-2 text-[#9ca3af]">{exercise.alternatives.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
