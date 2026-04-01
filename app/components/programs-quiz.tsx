"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { programs } from "../lib/programs-data";

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

export default function ProgramsQuiz() {
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);
  const completed = Object.values(answers).filter(Boolean).length;
  const result = useMemo(() => {
    if (completed < quizQuestions.length) return null;
    if (answers.goal === "Lose fat") return programs.find((p) => p.slug === "weight-loss");
    if (answers.goal === "Build muscle") return programs.find((p) => p.slug === "muscle-building");
    if (answers.goal === "Get stronger") return programs.find((p) => p.slug === "strength-training");
    if (answers.goal === "Improve stamina") return programs.find((p) => p.slug === "endurance");
    if (answers.goal === "Move better") return programs.find((p) => p.slug === "flexibility");
    return programs.find((p) => p.slug === "body-recomposition");
  }, [answers, completed]);

  return (
    <section
      id="program-finder"
      className="mt-16 rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8"
    >
      <h2 className="text-5xl sm:text-6xl">Program Finder Quiz</h2>
      <p className="mt-3 text-[#9ca3af]">Answer 5 questions and get your best-fit plan instantly.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {quizQuestions.map((q) => (
          <div key={q.key}>
            <p className="mb-3 text-sm text-white">{q.label}</p>
            <div className="flex flex-wrap gap-2">
              {q.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: option } as QuizAnswers))}
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
            Based on your answers, your best fit is <span className="text-white">{result.name}</span>.
            {` `}
            {result.scientificDescription}
          </p>
          <Link
            href={`/programs/${result.slug}`}
            className="mt-5 inline-flex rounded-full bg-[#a3e635] px-5 py-2 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]"
          >
            View My Program
          </Link>
        </article>
      )}
    </section>
  );
}
