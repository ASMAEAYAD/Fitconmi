"use client";

import { useMemo, useState } from "react";
import { programs } from "../lib/programs-data";
import { SiteFooter, SiteNavbar } from "../components/site-chrome";

type QuizAnswers = {
  goal: string;
  level: string;
  days: string;
  injuries: string;
  style: string;
};

const quizQuestions = [
  {
    key: "goal",
    label: "Primary fitness goal",
    options: [
      "Lose fat",
      "Build muscle",
      "Get stronger",
      "Improve stamina",
      "Move better",
      "Recompose body",
    ],
  },
  {
    key: "level",
    label: "Current training level",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    key: "days",
    label: "Available days per week",
    options: ["2-3 days", "4 days", "5+ days"],
  },
  {
    key: "injuries",
    label: "Any injuries or pain right now?",
    options: ["No", "Minor manageable issue", "Yes, significant"],
  },
  {
    key: "style",
    label: "Preferred training style",
    options: ["Gym strength", "Cardio-focused", "Mixed approach", "Mobility-first"],
  },
] as const;

const defaultAnswers: QuizAnswers = {
  goal: "",
  level: "",
  days: "",
  injuries: "",
  style: "",
};

export default function ProgramsPage() {
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);

  const completed = Object.values(answers).filter(Boolean).length;
  const result = useMemo(() => {
    if (completed < quizQuestions.length) return null;

    if (answers.goal === "Lose fat") return programs.find((p) => p.slug === "weight-loss");
    if (answers.goal === "Build muscle")
      return programs.find((p) => p.slug === "muscle-building");
    if (answers.goal === "Get stronger")
      return programs.find((p) => p.slug === "strength-training");
    if (answers.goal === "Improve stamina") return programs.find((p) => p.slug === "endurance");
    if (answers.goal === "Move better")
      return programs.find((p) => p.slug === "flexibility-mobility");
    return programs.find((p) => p.slug === "body-recomposition");
  }, [answers, completed]);

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
            <article
              key={program.slug}
              className="rounded-2xl border border-white/10 bg-[#111111] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#a3e635] hover:shadow-[0_0_24px_rgba(163,230,53,0.2)]"
            >
              <h2 className="text-4xl">{program.name}</h2>
              <p className="mt-2 text-sm text-[#a3e635]">
                {program.difficulty} · {program.duration}
              </p>
              <p className="mt-3 text-sm text-[#9ca3af]">{program.goal}</p>

              <div className="mt-5 space-y-3 text-sm">
                <p>
                  <span className="text-white">Science:</span>{" "}
                  <span className="text-[#9ca3af]">{program.scientificDescription}</span>
                </p>
                <p>
                  <span className="text-white">Who it&apos;s for:</span>{" "}
                  <span className="text-[#9ca3af]">{program.whoItsFor}</span>
                </p>
                <p>
                  <span className="text-white">Benefits:</span>{" "}
                  <span className="text-[#9ca3af]">{program.benefits.join(", ")}</span>
                </p>
                <p>
                  <span className="text-white">Avoid if:</span>{" "}
                  <span className="text-[#9ca3af]">{program.avoidIf}</span>
                </p>
              </div>

              <a
                href={`/programs/${program.slug}`}
                className="mt-6 inline-flex rounded-full bg-[#a3e635] px-5 py-2 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]"
              >
                View Program Details
              </a>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8">
          <h2 className="text-5xl sm:text-6xl">Program Finder Quiz</h2>
          <p className="mt-3 text-[#9ca3af]">
            Answer 5 questions and get your best-fit plan instantly.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {quizQuestions.map((q) => (
              <div key={q.key}>
                <p className="mb-3 text-sm text-white">{q.label}</p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [q.key]: option } as QuizAnswers))
                      }
                      className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-200 ${
                        answers[q.key as keyof QuizAnswers] === option
                          ? "border-[#a3e635] bg-[#a3e635]/20 text-[#a3e635]"
                          : "border-white/20 text-[#9ca3af] hover:border-[#a3e635]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {result && (
            <article className="mt-8 rounded-xl border border-[#a3e635]/40 bg-[#0f0f0f] p-6">
              <p className="text-sm uppercase tracking-wider text-[#a3e635]">Recommended Program</p>
              <h3 className="mt-2 text-4xl">{result.name}</h3>
              <p className="mt-3 text-[#9ca3af]">
                Based on your goal and training profile, this program gives the best balance of
                progression, recovery, and long-term adherence.
              </p>
              <a
                href={`/programs/${result.slug}`}
                className="mt-5 inline-flex rounded-full bg-[#a3e635] px-5 py-2 text-sm font-semibold text-[#0a0a0a]"
              >
                Open {result.name}
              </a>
            </article>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
