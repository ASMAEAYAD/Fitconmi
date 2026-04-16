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
  // Program-specific OG images (real athletes, matching the program type)
  const ogBySlug: Record<string, string> = {
    "weight-loss":
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&q=80&fit=crop&crop=faces",
    "muscle-building":
      "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=1200&q=80&fit=crop&crop=faces",
    "strength-training":
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80&fit=crop&crop=faces",
    endurance:
      "https://images.unsplash.com/photo-1556746834-1cb5b8fabd54?w=1200&q=80&fit=crop&crop=faces",
    flexibility:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80&fit=crop&crop=faces",
    "body-recomposition":
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80&fit=crop&crop=faces",
  };
  const ogImage = ogBySlug[slug] ?? ogBySlug["muscle-building"];
  const title = `${program.name} | FitConMi — Fitness Programs`;
  const desc = program.scientificDescription.length > 160
    ? program.scientificDescription.slice(0, 157) + "…"
    : program.scientificDescription;
  return {
    title,
    description: desc,
    alternates: { canonical: `https://fitconmi.com/programs/${slug}` },
    openGraph: {
      type: "website",
      url: `https://fitconmi.com/programs/${slug}`,
      title,
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${program.name} — FitConMi fitness program` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();
  // Hero image per program slug — real athletes matching the program type
  const heroBySlug: Record<string, { url: string; alt: string }> = {
    "weight-loss": {
      url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1800&q=80&fit=crop&crop=center",
      alt: "Athlete performing high-intensity training with battle ropes for fat-burning weight loss workout",
    },
    "muscle-building": {
      url: "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=1800&q=80&fit=crop&crop=center",
      alt: "Male bodybuilder performing weighted pull-ups with impressive muscle definition and strength",
    },
    "strength-training": {
      url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1800&q=80&fit=crop&crop=center",
      alt: "Powerlifter executing heavy barbell deadlift with chalk and intense focus in powerlifting gym",
    },
    endurance: {
      url: "https://images.unsplash.com/photo-1556746834-1cb5b8fabd54?w=1800&q=80&fit=crop&crop=center",
      alt: "Male runner sprinting along coastal road with dynamic stride and athletic endurance",
    },
    flexibility: {
      url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1800&q=80&fit=crop&crop=center",
      alt: "Athlete performing deep yoga stretch in calm studio with natural lighting for flexibility training",
    },
    "body-recomposition": {
      url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1800&q=80&fit=crop&crop=center",
      alt: "Athletic man performing kettlebell functional training for body recomposition workout",
    },
  };
  const hero = heroBySlug[program.slug] ?? {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80&fit=crop&crop=center",
    alt: `${program.name} — professional fitness training session`,
  };
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
            src={hero.url}
            alt={hero.alt}
            loading="eager"
            className="h-[280px] w-full object-cover sm:h-[360px]"
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
