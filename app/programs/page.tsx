import type { Metadata } from "next";
import Link from "next/link";
import ProgramsQuiz from "../components/programs-quiz";
import { programs } from "../lib/programs-data";
import { SiteFooter, SiteNavbar } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Programs | FitConMi Science-Based Training",
  description:
    "Explore weight loss, muscle building, strength, endurance, mobility, and body recomposition programs with science-based guidance.",
  openGraph: {
    title: "Programs | FitConMi Science-Based Training",
    description:
      "Find your ideal fitness plan with FitConMi's evidence-based programs and interactive program finder quiz.",
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"],
  },
};

export default function ProgramsPage() {
  const programImages: Record<string, string> = {
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <h1 className="text-5xl sm:text-6xl">Programs</h1>
          <p className="mt-4 max-w-3xl text-[#9ca3af]">
            Explore science-based training systems built for different goals, experience levels,
            and recovery capacities.
          </p>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group relative block min-h-[420px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#a3e635] hover:shadow-[0_0_24px_rgba(163,230,53,0.2)]"
            >
              <img
                src={programImages[program.slug]}
                alt={`${program.name} fitness training program`}
                loading="lazy"
                className="h-full min-h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35" />
              <div className="absolute inset-0 p-6">
                <h2 className="text-4xl">{program.name}</h2>
                <p className="mt-2 text-sm text-[#a3e635]">
                  {program.difficulty} · {program.duration}
                </p>
                <p className="mt-3 text-sm text-[#d1d5db]">{program.goal}</p>

                <div className="mt-5 space-y-3 text-sm">
                  <p>
                    <span className="text-white">Science:</span>{" "}
                    <span className="text-[#d1d5db]">{program.scientificDescription}</span>
                  </p>
                  <p>
                    <span className="text-white">Who it&apos;s for:</span>{" "}
                    <span className="text-[#d1d5db]">{program.whoItsFor}</span>
                  </p>
                  <p>
                    <span className="text-white">Benefits:</span>{" "}
                    <span className="text-[#d1d5db]">{program.benefits.join(", ")}</span>
                  </p>
                  <p>
                    <span className="text-white">Avoid if:</span>{" "}
                    <span className="text-[#d1d5db]">{program.avoidIf}</span>
                  </p>
                </div>

                <span className="mt-6 inline-flex rounded-full bg-[#a3e635] px-5 py-2 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                  View Program Details
                </span>
              </div>
            </Link>
          ))}
        </section>

        <ProgramsQuiz />
      </main>
      <SiteFooter />
    </div>
  );
}
