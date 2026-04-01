"use client";

import { useEffect, useMemo, useState } from "react";
import type { Exercise, Program } from "../lib/programs-data";

type Props = {
  programSlug: string;
  dayPlans: Program["dayPlans"];
};

export default function ExerciseAccordion({ programSlug, dayPlans }: Props) {
  const storageKey = `fitconmi-swaps-${programSlug}`;
  const [activeDay, setActiveDay] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [showAlts, setShowAlts] = useState<Record<number, boolean>>({});
  const [swapMenuOpen, setSwapMenuOpen] = useState<number | null>(null);
  const [swapped, setSwapped] = useState<Record<string, Exercise>>({});

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { activeDay: number; swapped: Record<string, Exercise> };
      setActiveDay(parsed.activeDay ?? 0);
      setSwapped(parsed.swapped ?? {});
    } catch {
      // ignore corrupted local storage values
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ activeDay, swapped }));
  }, [activeDay, storageKey, swapped]);

  const currentDayPlan = useMemo(() => dayPlans[activeDay], [activeDay, dayPlans]);

  return (
    <div className="mt-6">
      <div className="no-print mb-5 flex flex-wrap gap-2">
        {dayPlans.map((day, idx) => (
          <button
            key={day.day}
            type="button"
            onClick={() => {
              setActiveDay(idx);
              setOpenItem(null);
              setSwapMenuOpen(null);
            }}
            className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-200 ${
              idx === activeDay
                ? "border-[#a3e635] bg-[#a3e635]/20 text-[#a3e635]"
                : "border-white/20 text-[#9ca3af] hover:border-[#a3e635]"
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-[#9ca3af]">
        Selected day: <span className="text-[#a3e635]">{currentDayPlan?.day ?? "Day 1"}</span>
      </p>

      <div className="space-y-4">
      {currentDayPlan.exercises.map((exercise, idx) => {
        const key = `${activeDay}-${idx}`;
        const activeExercise = swapped[key] ?? exercise;
        const isOpen = openItem === idx;
        const altOpen = !!showAlts[idx];
        const replacementOpen = swapMenuOpen === idx;
        return (
          <article
            key={`day-${activeDay}-ex-${idx}-${activeExercise.name}`}
            className="rounded-2xl border border-white/10 bg-[#111111] p-5 transition-all duration-300 hover:border-[#a3e635]"
          >
            <button
              type="button"
              onClick={() => setOpenItem(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <div>
                <h3 className="text-3xl">{activeExercise.name}</h3>
                <p className="mt-1 text-sm text-[#a3e635]">
                  {activeExercise.setsReps} · {activeExercise.muscles}
                </p>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-[#9ca3af]">
                {isOpen ? "Collapse" : "Expand"}
              </span>
            </button>

            <div
              className={`exercise-content grid transition-all duration-300 ${
                isOpen ? "mt-4 max-h-[2000px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
              }`}
            >
              <img
                src={activeExercise.imageUrl}
                alt={`${activeExercise.name} exercise demonstration`}
                loading="lazy"
                className="h-56 w-full rounded-xl object-cover"
              />
              <p className="mt-4 text-[#9ca3af]">
                <span className="text-white">Scientific benefit:</span> {activeExercise.benefit}
              </p>
              <div className="mt-3">
                <p className="text-sm text-white">Step-by-step instructions</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-[#9ca3af]">
                  {activeExercise.instructions.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setShowAlts((prev) => ({ ...prev, [idx]: !altOpen }))}
                  className="rounded-full border border-[#a3e635]/40 bg-[#a3e635]/10 px-3 py-1 text-xs text-[#a3e635]"
                >
                  {altOpen ? "Hide Alternatives" : "Show Alternatives"}
                </button>
                {altOpen && (
                  <p className="mt-2 text-sm text-[#9ca3af]">
                    {activeExercise.alternatives.map((a) => a.name).join(" · ")}
                  </p>
                )}
              </div>
              <div className="no-print mt-3">
                <button
                  type="button"
                  onClick={() => setSwapMenuOpen(replacementOpen ? null : idx)}
                  className="rounded-full border border-[#a3e635]/40 bg-[#a3e635]/10 px-3 py-1 text-xs text-[#a3e635]"
                >
                  Replace Exercise
                </button>
                {replacementOpen && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeExercise.alternatives.map((alternative) => (
                      <button
                        key={alternative.name}
                        type="button"
                        onClick={() => {
                          setSwapped((prev) => ({
                            ...prev,
                            [key]: {
                              ...alternative,
                              alternatives: activeExercise.alternatives.filter(
                                (a) => a.name !== alternative.name
                              ),
                            },
                          }));
                          setSwapMenuOpen(null);
                        }}
                        className="rounded-full border border-white/20 px-3 py-1 text-xs text-[#d1d5db] transition-colors hover:border-[#a3e635] hover:text-[#a3e635]"
                      >
                        {alternative.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
      </div>
    </div>
  );
}
