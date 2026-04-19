// ═══════════════════════════════════════════════════════════════════
//  FitConMi — Program Logic Utilities
//  All helper functions used across the app.
// ═══════════════════════════════════════════════════════════════════

import type {
  RecommendationInput,
  ProgressiveLoad,
  CalorieBurn,
  Phase,
  WorkoutDay,
  WorkoutExercise,
} from "../types/fitness";

import { programs } from "../data/programs";
import { exercises, exerciseById } from "../data/exercises";
import { getWorkoutForDay, getWeekPlan, getWorkoutTemplate } from "../data/workouts";

// ════════════════════════════════════════════════════════════════
//  PHASE LOGIC
// ════════════════════════════════════════════════════════════════

export function getPhaseForWeek(weekNumber: number): Phase {
  if (weekNumber <= 2) return "foundation";
  if (weekNumber <= 5) return "progression";
  if (weekNumber <= 7) return "intensity";
  return "deload";
}

export const PHASE_META: Record<Phase, {
  label: string;
  emoji: string;
  color: string;
  shortLabel: string;
}> = {
  foundation:  { label: "Foundation Phase",  emoji: "🌱", color: "#9ca3af", shortLabel: "Foundation" },
  progression: { label: "Progression Phase", emoji: "⚡", color: "#facc15", shortLabel: "Progression" },
  intensity:   { label: "Intensity Phase",   emoji: "🔥", color: "#f97316", shortLabel: "Intensity" },
  deload:      { label: "Deload Phase",      emoji: "🔁", color: "#60a5fa", shortLabel: "Deload" },
};

// ════════════════════════════════════════════════════════════════
//  PROGRESSIVE OVERLOAD CALCULATOR
//  Returns the adjusted sets/reps for a given week.
// ════════════════════════════════════════════════════════════════

/**
 * Calculate the progressive load for an exercise on a specific week.
 *
 * Logic:
 * - Foundation (1-2): base sets × base reps
 * - Progression (3-5): +5% intensity per week (modeled as -1 rest second per week)
 * - Intensity (6-7): peak load
 * - Deload (8): 50% sets
 */
export function getProgressiveLoad(
  exerciseId: string,
  weekNumber: number
): ProgressiveLoad {
  const exercise = exerciseById(exerciseId);
  if (!exercise) {
    return {
      exerciseId,
      weekNumber,
      sets: 3,
      reps: "10",
      restSeconds: 90,
    };
  }

  const phase = getPhaseForWeek(weekNumber);
  let sets = exercise.defaultSets;
  let reps = exercise.defaultReps;
  let restSeconds = exercise.defaultRestSeconds;
  let percentOfMax: number | undefined;

  switch (phase) {
    case "foundation":
      // Base load — learn the movement
      percentOfMax = 65;
      break;

    case "progression":
      // +5% per week beyond week 2
      sets = Math.min(sets + 1, exercise.defaultSets + 1);
      restSeconds = Math.max(restSeconds - 10 * (weekNumber - 2), 45);
      percentOfMax = 70 + (weekNumber - 2) * 5;
      break;

    case "intensity":
      // Peak load
      sets = exercise.defaultSets + 1;
      restSeconds = Math.max(exercise.defaultRestSeconds - 15, 45);
      percentOfMax = 80 + (weekNumber - 5) * 5;
      break;

    case "deload":
      // Half volume, same weight
      sets = Math.max(Math.floor(exercise.defaultSets * 0.5), 1);
      percentOfMax = 60;
      break;
  }

  return {
    exerciseId,
    weekNumber,
    sets,
    reps,
    restSeconds,
    percentOfMax,
  };
}

// ════════════════════════════════════════════════════════════════
//  CALORIE ESTIMATION
// ════════════════════════════════════════════════════════════════

/**
 * Estimate total calories burned for a full workout day.
 *
 * Uses per-exercise estimates multiplied by sets, with a 15% overhead
 * for warm-up, rest, and cooldown metabolic activity.
 */
export function calculateEstimatedCalories(workout: WorkoutDay): CalorieBurn {
  const perExercise = workout.exercises.map((workEx: WorkoutExercise) => {
    const exercise = exerciseById(workEx.exerciseId);
    const kcalPerSet = exercise?.caloriesBurnedPerSet ?? 10;
    return {
      exerciseId: workEx.exerciseId,
      name: exercise?.name ?? workEx.exerciseId,
      kcal: kcalPerSet * workEx.sets,
    };
  });

  const exerciseTotal = perExercise.reduce((sum, e) => sum + e.kcal, 0);
  const total = Math.round(exerciseTotal * 1.15); // 15% overhead

  return { total, perExercise };
}

// ════════════════════════════════════════════════════════════════
//  PROGRAM RECOMMENDATION ENGINE
// ════════════════════════════════════════════════════════════════

/**
 * Returns the best matching program(s) for a user's profile.
 *
 * Scoring: exact goal match = 3pts, level match = 2pts, days match = 1pt.
 * Returns programs sorted by match score descending.
 */
export function getRecommendedProgram(input: RecommendationInput) {
  const scored = programs.map((program) => {
    let score = 0;

    // Gender match
    if (program.gender === input.gender || program.gender === "both") {
      score += 1;
    } else {
      return { program, score: -1 };
    }

    // Goal match — direct maps and approximations
    const goalMap: Record<string, string[]> = {
      "weight-loss":       ["weight-loss", "body-recomposition"],
      "muscle-gain":       ["muscle-gain", "toning"],
      "endurance":         ["endurance"],
      "toning":            ["toning", "weight-loss", "body-recomposition"],
      "strength":          ["strength", "muscle-gain"],
      "flexibility":       ["flexibility"],
      "body-recomposition":["body-recomposition", "weight-loss", "muscle-gain"],
    };
    const matchGoals = goalMap[input.goal] ?? [input.goal];
    if (matchGoals.includes(program.goal)) score += 3;

    // Level match
    const levelDistance: Record<string, Record<string, number>> = {
      beginner:     { beginner: 2, intermediate: 1, advanced: 0 },
      intermediate: { beginner: 1, intermediate: 2, advanced: 1 },
      advanced:     { beginner: 0, intermediate: 1, advanced: 2 },
    };
    score += levelDistance[input.level]?.[program.level] ?? 0;

    // Days available match
    if (input.daysAvailable !== undefined) {
      const diff = Math.abs(input.daysAvailable - program.daysPerWeek);
      if (diff === 0) score += 2;
      else if (diff <= 1) score += 1;
    }

    return { program, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.program);
}

// ════════════════════════════════════════════════════════════════
//  WORKOUT ACCESSOR (wraps workouts.ts for convenience)
// ════════════════════════════════════════════════════════════════

/**
 * Get the workout for a specific program, week, and day.
 *
 * @param programId   e.g. "womens-fat-loss"
 * @param weekNumber  1–8 (or however many weeks the program has)
 * @param dayIndex    1-based day index within the week
 */
export { getWorkoutForDay, getWeekPlan, getWorkoutTemplate };

// ════════════════════════════════════════════════════════════════
//  WEEK STATUS HELPERS
// ════════════════════════════════════════════════════════════════

/** Returns the 4-label milestone descriptions for a program */
export function getProgramMilestones(gender: "men" | "women"): string[] {
  if (gender === "women") {
    return [
      "💪 You'll feel stronger and more energised. First workouts are hardest — you're building the habit.",
      "🔥 Real changes are visible. Strength is climbing, energy is up, clothes fit differently.",
      "✨ Visible transformation. An unshakeable routine and results that speak for themselves.",
      "👑 Elite level. Strength, discipline, and confidence that extends far beyond the gym.",
    ];
  }
  return [
    "⚡ Neuromuscular adaptation begins. Nervous system calibrating for heavier loads.",
    "📈 Measurable strength increases weekly. Body composition shifts noticeably.",
    "🏆 Significant physique transformation. Strength numbers confirm what the mirror shows.",
    "🔱 Elite performance. The discipline and body of a serious athlete.",
  ];
}

/** Returns a human-readable week label (e.g., "Week 3 — Progression") */
export function getWeekLabel(weekNumber: number): string {
  const phase = getPhaseForWeek(weekNumber);
  const meta = PHASE_META[phase];
  return `Week ${weekNumber} — ${meta.shortLabel}`;
}

/** Returns estimated total program duration in sessions */
export function getTotalSessions(daysPerWeek: number, durationWeeks: number): number {
  return daysPerWeek * durationWeeks;
}
