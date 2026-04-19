// ═══════════════════════════════════════════════════════════════════
//  FitConMi — Unified TypeScript type definitions
//  All pages and components must import types from this file.
// ═══════════════════════════════════════════════════════════════════

// ── Primitive enums ──────────────────────────────────────────────

export type Gender = "men" | "women" | "both";

export type Goal =
  | "weight-loss"
  | "muscle-gain"
  | "endurance"
  | "toning"
  | "strength"
  | "flexibility"
  | "body-recomposition";

export type Level = "beginner" | "intermediate" | "advanced";

export type EquipmentType =
  | "bodyweight"
  | "dumbbell"
  | "barbell"
  | "machine"
  | "cable"
  | "resistance-band"
  | "kettlebell"
  | "cardio-machine"
  | "other";

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "forearms"
  | "core"
  | "quadriceps"
  | "hamstrings"
  | "glutes"
  | "calves"
  | "hip-flexors"
  | "adductors"
  | "full-body"
  | "cardio";

export type Phase = "foundation" | "progression" | "intensity" | "deload";

// ── Exercise ─────────────────────────────────────────────────────

export interface MuscleTarget {
  primary: MuscleGroup;
  secondary: MuscleGroup[];
}

export interface ProgressionWeek {
  week: number;
  sets: number;
  reps: string;          // e.g. "8-10" | "45s" | "AMRAP"
  restSeconds: number;
  notes?: string;        // e.g. "+2.5kg from last week"
}

export interface Exercise {
  id: string;
  name: string;
  slug: string;
  muscleGroup: MuscleTarget;
  equipment: EquipmentType[];
  difficulty: Level;
  defaultSets: number;
  defaultReps: string;
  defaultRestSeconds: number;
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  scientificBenefit: string;      // gender-neutral or male default
  scientificBenefitW?: string;    // female-specific if applicable
  videoKeyword: string;
  caloriesBurnedPerSet: number;   // estimated kcal
  imageUrl: string;
  tags: string[];
}

// ── Workout ──────────────────────────────────────────────────────

export interface WorkoutExercise {
  exerciseId: string;    // references Exercise.id
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;        // phase-specific coaching note
  supersetWith?: string; // exerciseId to superset with
}

export interface WorkoutDay {
  dayIndex: number;      // 1-based
  name: string;          // e.g. "Push — Chest, Shoulders, Triceps"
  focus: string;         // short focus label for nav
  isRest: boolean;
  exercises: WorkoutExercise[];
  estimatedDurationMinutes: number;
  estimatedCalories: number;
}

export interface WeekPlan {
  weekNumber: number;
  phase: Phase;
  label: string;         // e.g. "Foundation — Learn the Movements"
  volumeMultiplier: number;  // 1.0 normal, 0.5 deload
  intensityNote: string;
  days: WorkoutDay[];
}

export interface WorkoutTemplate {
  programId: string;
  gender: Gender;
  weeks: WeekPlan[];
}

// ── Program ──────────────────────────────────────────────────────

export interface ProgramPhase {
  name: string;          // "Foundation" | "Progression" | "Peak"
  weekRange: [number, number];
  description: string;
  keyFocus: string[];
}

export interface WeeklyScheduleEntry {
  day: string;           // "Monday" etc.
  focus: string;
  isRest: boolean;
}

export interface ScienceBlock {
  principle: string;     // e.g. "Progressive Overload"
  explanation: string;
  keyMetric: string;     // e.g. "EPOC Effect"
  keyMetricValue: string;
}

export interface NutritionTip {
  icon: string;
  label: string;
  detail: string;
}

export interface Program {
  id: string;
  title: string;
  slug: string;          // URL-safe: "mens-muscle-gain"
  gender: Gender;
  goal: Goal;
  level: Level;
  durationWeeks: number;
  daysPerWeek: number;
  description: string;
  shortDesc: string;
  whoItsFor: string;
  benefits: string[];
  avoidIf: string;
  phases: ProgramPhase[];
  weeklySchedule: WeeklyScheduleEntry[];
  science: ScienceBlock;
  nutrition: NutritionTip[];
  imageUrl: string;
  imageAlt: string;
  cardImageUrl: string;
  tags: string[];
  featured: boolean;
}

// ── Helper types ─────────────────────────────────────────────────

export interface RecommendationInput {
  goal: Goal;
  level: Level;
  gender: Gender;
  daysAvailable?: number;
}

export interface ProgressiveLoad {
  exerciseId: string;
  weekNumber: number;
  sets: number;
  reps: string;
  restSeconds: number;
  percentOfMax?: number;
  estimatedKg?: number;
}

export interface CalorieBurn {
  total: number;
  perExercise: { exerciseId: string; name: string; kcal: number }[];
}
