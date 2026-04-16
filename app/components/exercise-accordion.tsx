"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Exercise, Program } from "../lib/programs-data";
import ExerciseModal from "./exercise-modal";

type Props = {
  programSlug: string;
  dayPlans: Program["dayPlans"];
};

export default function ExerciseAccordion({ programSlug, dayPlans }: Props) {
  const storageKey = `fitconmi-swaps-${programSlug}`;
  const doneKey   = `fitconmi-done-${programSlug}`;

  const [activeDay, setActiveDay]       = useState(0);
  const [openItem, setOpenItem]         = useState<number | null>(null);
  const [showAlts, setShowAlts]         = useState<Record<number, boolean>>({});
  const [swapMenuOpen, setSwapMenuOpen] = useState<number | null>(null);
  const [swapped, setSwapped]           = useState<Record<string, Exercise>>({});

  // ── Modal state ──────────────────────────────────────────────────────
  const [modalExercise, setModalExercise] = useState<Exercise | null>(null);
  const [modalOpen, setModalOpen]         = useState(false);

  // ── Done tracking (persisted per program) ────────────────────────────
  const [doneNames, setDoneNames] = useState<Set<string>>(new Set());

  // ── Hydrate from localStorage ────────────────────────────────────────
  useEffect(() => {
    // Swaps
    const rawSwaps = window.localStorage.getItem(storageKey);
    if (rawSwaps) {
      try {
        const parsed = JSON.parse(rawSwaps) as { activeDay: number; swapped: Record<string, Exercise> };
        setActiveDay(parsed.activeDay ?? 0);
        setSwapped(parsed.swapped ?? {});
      } catch {
        // ignore corrupted local storage values
      }
    }
    // Done state
    const rawDone = window.localStorage.getItem(doneKey);
    if (rawDone) {
      try {
        const parsed = JSON.parse(rawDone) as string[];
        setDoneNames(new Set(parsed));
      } catch {
        // ignore
      }
    }
  }, [storageKey, doneKey]);

  // ── Persist swaps ────────────────────────────────────────────────────
  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ activeDay, swapped }));
  }, [activeDay, storageKey, swapped]);

  // ── Persist done names ───────────────────────────────────────────────
  useEffect(() => {
    window.localStorage.setItem(doneKey, JSON.stringify([...doneNames]));
  }, [doneNames, doneKey]);

  const currentDayPlan = useMemo(() => dayPlans[activeDay], [activeDay, dayPlans]);

  // ── Modal handlers ───────────────────────────────────────────────────
  const openModal = useCallback((ex: Exercise) => {
    setModalExercise(ex);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    // Keep exercise data until animation completes
    setTimeout(() => setModalExercise(null), 350);
  }, []);

  const handleMarkDone = useCallback((name: string) => {
    setDoneNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);  // toggle off
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  // ── Day progress counter ─────────────────────────────────────────────
  const dayExercises = currentDayPlan?.exercises ?? [];
  const doneCount = dayExercises.filter((ex) => {
    const key = `${activeDay}-${dayExercises.indexOf(ex)}`;
    const active = swapped[key] ?? ex;
    return doneNames.has(active.name);
  }).length;

  return (
    <>
      {/* ── Day selector tabs ── */}
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

        {/* ── Selected day label + progress bar ── */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#9ca3af]">
              Selected day:{" "}
              <span className="text-[#a3e635]">{currentDayPlan?.day ?? "Day 1"}</span>
            </p>
            {doneCount > 0 && (
              <span className="rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 px-3 py-0.5 text-xs font-bold text-[#a3e635]">
                {doneCount}/{dayExercises.length} done
              </span>
            )}
          </div>
          {/* Progress bar */}
          {dayExercises.length > 0 && (
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#a3e635] transition-all duration-500"
                style={{ width: `${(doneCount / dayExercises.length) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* ── Exercise cards ── */}
        <div className="space-y-3">
          {currentDayPlan.exercises.map((exercise, idx) => {
            const key = `${activeDay}-${idx}`;
            const activeExercise = swapped[key] ?? exercise;
            const isOpen = openItem === idx;
            const altOpen = !!showAlts[idx];
            const replacementOpen = swapMenuOpen === idx;
            const isDone = doneNames.has(activeExercise.name);

            return (
              <article
                key={`day-${activeDay}-ex-${idx}-${activeExercise.name}`}
                className={`rounded-2xl border bg-[#111111] transition-all duration-300 hover:border-[#a3e635] ${
                  isDone ? "border-[#a3e635]/50 bg-[#a3e635]/[0.03]" : "border-white/10"
                }`}
              >
                {/* ── Card header — click to open modal ── */}
                <button
                  type="button"
                  id={`exercise-${programSlug}-${activeDay}-${idx}`}
                  onClick={() => openModal(activeExercise)}
                  className="w-full text-left p-5 flex items-center gap-4 rounded-2xl cursor-pointer"
                  aria-label={`View ${activeExercise.name} exercise detail`}
                >
                  {/* Exercise image thumbnail */}
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={activeExercise.imageUrl}
                      alt={`${activeExercise.name} thumbnail`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    {isDone && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="text-[#a3e635] text-lg font-bold">✓</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`text-xl leading-tight transition-colors duration-200 ${
                          isDone ? "text-[#a3e635]/80 line-through decoration-[#a3e635]/40" : "text-white"
                        }`}
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                      >
                        {activeExercise.name}
                      </h3>
                      {/* Sets × reps pill */}
                      <span className="flex-shrink-0 rounded-full bg-[#a3e635] px-2.5 py-0.5 text-xs font-bold text-[#0a0a0a] leading-5">
                        {activeExercise.setsReps}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#9ca3af] truncate">
                      <span className="text-[#a3e635]/80">{activeExercise.muscles.split("·")[0]?.split(",")[0]?.trim() ?? activeExercise.muscles}</span>
                      {" — "}
                      <span className="text-[#6b7280] italic">tap for full guide</span>
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 flex-shrink-0 text-[#4b5563]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* ── Expandable section (alternatives + swap) ── */}
                <div className="no-print px-5 pb-4 -mt-1 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAlts((prev) => ({ ...prev, [idx]: !altOpen }))}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#9ca3af] transition-colors hover:border-[#a3e635] hover:text-[#a3e635]"
                  >
                    {altOpen ? "Hide Alts" : "Alternatives"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSwapMenuOpen(replacementOpen ? null : idx)}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#9ca3af] transition-colors hover:border-[#a3e635] hover:text-[#a3e635]"
                  >
                    Swap Exercise
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMarkDone(activeExercise.name)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                      isDone
                        ? "border-[#a3e635]/40 bg-[#a3e635]/10 text-[#a3e635]"
                        : "border-white/15 text-[#9ca3af] hover:border-[#a3e635] hover:text-[#a3e635]"
                    }`}
                  >
                    {isDone ? "✓ Done" : "Mark Done"}
                  </button>
                </div>

                {/* Alternatives list */}
                {altOpen && (
                  <div className="px-5 pb-3">
                    <p className="text-xs text-[#9ca3af]">
                      {activeExercise.alternatives.map((a) => a.name).join(" · ")}
                    </p>
                  </div>
                )}

                {/* Swap menu */}
                {replacementOpen && (
                  <div className="no-print px-5 pb-4 flex flex-wrap gap-2">
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

                {/* ── Legacy inline expand (print-only, hidden on screen) ── */}
                <div className={`exercise-content hidden print:block px-5 pb-5`}>
                  <img
                    src={activeExercise.imageUrl}
                    alt={`${activeExercise.name} exercise demonstration`}
                    loading="lazy"
                    className="h-40 w-full rounded-xl object-cover"
                  />
                  <p className="mt-3 text-sm text-[#9ca3af]">
                    <span className="text-white">Benefit:</span> {activeExercise.benefit}
                  </p>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[#9ca3af]">
                    {activeExercise.instructions.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── Exercise modal (portal-style, rendered at bottom of tree) ── */}
      <ExerciseModal
        exercise={modalExercise}
        isOpen={modalOpen}
        onClose={closeModal}
        onMarkDone={handleMarkDone}
        doneNames={doneNames}
      />
    </>
  );
}
