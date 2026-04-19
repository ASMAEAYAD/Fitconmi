// ═══════════════════════════════════════════════════════════════════
//  FitConMi — Workout Templates (8-week schedules per program)
//  Each program gets a full WeekPlan[] array for weeks 1–8.
//  Phase rotation: Foundation (1-2) → Progression (3-5) →
//                  Intensity (6-7) → Deload (8)
// ═══════════════════════════════════════════════════════════════════

import type { WorkoutTemplate, WeekPlan, WorkoutDay, WorkoutExercise } from "../types/fitness";

// ── Helper to determine phase from week number ─────────────────
function getPhase(week: number): "foundation" | "progression" | "intensity" | "deload" {
  if (week <= 2) return "foundation";
  if (week <= 5) return "progression";
  if (week <= 7) return "intensity";
  return "deload";
}

function getPhaseLabel(week: number): string {
  const p = getPhase(week);
  const labels: Record<string, string> = {
    foundation:  "Foundation — Learn the Movements",
    progression: "Progression — Add Load Each Session",
    intensity:   "Intensity — Peak Stimulus",
    deload:      "Deload — Recover & Consolidate",
  };
  return labels[p];
}

function getVolumeMultiplier(week: number): number {
  if (week <= 2) return 1.0;
  if (week <= 4) return 1.1;
  if (week <= 6) return 1.2;
  if (week === 7) return 1.25;
  return 0.5; // deload
}

function getIntensityNote(week: number): string {
  const notes: Record<number, string> = {
    1: "Focus on form. Leave 2 reps in reserve every set.",
    2: "Technique consistency. Add 2.5kg where you feel comfortable.",
    3: "Add 2.5kg to main lifts. RPE should be 7/10.",
    4: "Progression continues. Track your performance data.",
    5: "Intensity rising. Sets should feel challenging by rep 8.",
    6: "Push hard. Last 2 reps should require full effort.",
    7: "Peak week. Maximum effort. Rest fully between sets.",
    8: "Deload. 50% sets, same weight. Focus on recovery.",
  };
  return notes[week] ?? "Train hard, recover harder.";
}

// ── Exercise shorthand constructor ─────────────────────────────
function ex(
  exerciseId: string,
  sets: number,
  reps: string,
  restSeconds: number,
  notes?: string
): WorkoutExercise {
  return { exerciseId, sets, reps, restSeconds, notes };
}

// ── Build a REST day ───────────────────────────────────────────
function restDay(dayIndex: number): WorkoutDay {
  return {
    dayIndex,
    name: "Rest / Active Recovery",
    focus: "REST",
    isRest: true,
    exercises: [],
    estimatedDurationMinutes: 0,
    estimatedCalories: 0,
  };
}

// ── Build a workout day ────────────────────────────────────────
function workoutDay(
  dayIndex: number,
  name: string,
  focus: string,
  exercises: WorkoutExercise[],
  durationMinutes: number,
  calories: number
): WorkoutDay {
  return { dayIndex, name, focus, isRest: false, exercises, estimatedDurationMinutes: durationMinutes, estimatedCalories: calories };
}

// ════════════════════════════════════════════════════════════════
//  WOMEN'S FAT LOSS  (4 days/week, 8 weeks)
// ════════════════════════════════════════════════════════════════

const womensFatLossDays: WorkoutDay[] = [
  workoutDay(1, "Glute + Posterior Chain HIIT", "GLUTES", [
    ex("hip-thrust-barbell",     4, "10",  90, "Drive through heels. Squeeze glutes at the top."),
    ex("rdl-dumbbell",           4, "10",  75, "3-sec eccentric. Feel the hamstring stretch."),
    ex("jump-lunge",             4, "20",  60, "Land softly. Explode from the bottom."),
    ex("kettlebell-swing",       3, "20",  60, "Hip hinge — not a squat. Power from hips."),
    ex("mountain-climbers",      3, "30s", 45, "Keep hips level. Drive knees."),
    ex("dead-bug",               3, "10",  45, "Lower back must stay flat on the floor."),
  ], 55, 380),

  restDay(2),

  workoutDay(3, "Upper Body Metabolic Circuit", "UPPER", [
    ex("battle-rope-wave",       4, "40s", 60,  "Stay low. Drive through the shoulders."),
    ex("push-up",                4, "AMRAP", 60, "3-sec eccentric. Chest to floor."),
    ex("single-arm-db-row",      4, "12",   75, "Drive the elbow — not the hand."),
    ex("dumbbell-lateral-raise", 3, "15",   45, "Controlled 2-sec descent. No momentum."),
    ex("face-pull",              3, "15",   45, "External rotation at the top."),
    ex("plank",                  3, "45s",  45, "Squeeze glutes. Posterior pelvic tilt."),
  ], 50, 320),

  restDay(4),

  workoutDay(5, "Full-Body HIIT + Core", "HIIT", [
    ex("burpee",               4, "10",  60,  "Full ROM — chest to floor on every rep."),
    ex("jump-lunge",           3, "20",  60,  "Explode from the bottom. Soft landing."),
    ex("assault-bike-sprint",  5, "30s", 90,  "100% effort. Arms and legs."),
    ex("mountain-climbers",    3, "30s", 45,  "Keep hips level."),
    ex("ab-wheel-rollout",     3, "8",   60,  "Core tight before you roll out."),
    ex("dead-bug",             3, "10",  45,  "Slow and controlled."),
  ], 50, 420),

  workoutDay(6, "Conditioning + Mobility", "MOBILITY", [
    ex("kettlebell-swing",   3, "20",  60, "Light to moderate weight. Focus on power."),
    ex("jump-rope-double-under", 3, "1min", 90, "Singles are fine if doubles aren't there yet."),
    ex("box-jump",           3, "6",   90, "Maximal intent on every jump. Step down."),
    ex("hip-flexor-pnf",     3, "30s", 15, "Contract 6 seconds, relax, deepen."),
    ex("90-90-hip",          3, "60s", 15, "Both knees at 90°. Upright torso."),
    ex("worlds-greatest-stretch", 2, "5", 0, "Slow and deliberate. Breathe."),
  ], 45, 260),

  restDay(7),
];

function buildWeekPlan(
  week: number,
  days: WorkoutDay[],
  programId: string
): WeekPlan {
  const vm = getVolumeMultiplier(week);
  return {
    weekNumber: week,
    phase: getPhase(week),
    label: getPhaseLabel(week),
    volumeMultiplier: vm,
    intensityNote: getIntensityNote(week),
    days: days.map((d) => {
      if (d.isRest || vm === 1.0) return d;
      if (vm === 0.5) {
        // Deload: halve sets
        return {
          ...d,
          exercises: d.exercises.map((e) => ({ ...e, sets: Math.max(1, Math.floor(e.sets * 0.5)) })),
          estimatedDurationMinutes: Math.round(d.estimatedDurationMinutes * 0.55),
          estimatedCalories: Math.round(d.estimatedCalories * 0.55),
        };
      }
      return d;
    }),
  };
}

const womensFatLossWeeks: WeekPlan[] = Array.from({ length: 8 }, (_, i) =>
  buildWeekPlan(i + 1, womensFatLossDays, "womens-fat-loss")
);

// ════════════════════════════════════════════════════════════════
//  WOMEN'S MUSCLE BUILDING  (4 days/week, 8 weeks)
// ════════════════════════════════════════════════════════════════

const womensMuscleBuildinDays: WorkoutDay[] = [
  workoutDay(1, "Glutes + Legs (Primary Hypertrophy)", "GLUTES", [
    ex("hip-thrust-barbell",     4, "10",  90, "2-1-2 tempo. Peak squeeze at the top."),
    ex("bulgarian-split-squat",  4, "10",  90, "Front heel drives. Rear foot passive."),
    ex("rdl-dumbbell",           4, "10",  75, "3-sec eccentric. Full stretch."),
    ex("leg-press",              3, "12",  90, "High foot. 4-sec eccentric."),
    ex("cable-kickback",         3, "15",  45, "Full hip extension. Don't swing."),
    ex("plank",                  3, "45s", 45, "Full-body tension. Hold."),
  ], 65, 320),

  workoutDay(2, "Back + Biceps (Width & Thickness)", "BACK", [
    ex("lat-pulldown",           4, "12",  75, "Wide grip. Full stretch at the top."),
    ex("single-arm-db-row",      4, "12",  75, "Let shoulder protract at the bottom."),
    ex("seated-cable-row",       3, "12",  75, "2-sec peak hold. Squeeze shoulder blades."),
    ex("face-pull",              3, "15",  45, "External rotation at the top."),
    ex("preacher-curl",          3, "10",  60, "Full extension at the bottom."),
    ex("incline-dumbbell-curl",  3, "12",  60, "Pre-stretch is where the magic happens."),
  ], 60, 280),

  restDay(3),

  workoutDay(4, "Chest + Shoulders + Triceps", "PUSH", [
    ex("incline-dumbbell-press", 4, "10",  90, "2-sec eccentric. Full stretch."),
    ex("overhead-press",         4, "8",   120, "Strict — no leg drive."),
    ex("cable-chest-fly",        3, "12",   60, "Constant tension throughout."),
    ex("dumbbell-lateral-raise", 4, "15",   45, "Pinky up slightly. 2-sec descent."),
    ex("skull-crusher",          3, "12",   75, "Keep elbows stationary. Slow positive."),
    ex("cable-tricep-pushdown",  3, "15",   45, "Flare rope ends at the bottom."),
  ], 60, 270),

  workoutDay(5, "Glutes + Legs (Secondary Volume)", "LEGS", [
    ex("goblet-squat",           3, "15",  60, "Elbows inside knees. Deep squat."),
    ex("hip-thrust-barbell",     4, "12",  90, "Slightly higher reps. Metabolic stress."),
    ex("walking-lunge",          3, "12",  75, "Big stride — glute bias."),
    ex("curtsy-lunge",           3, "12",  60, "Step far enough to engage glute medius."),
    ex("cable-pull-through",     3, "15",  60, "Push hips back far. Full hip extension."),
    ex("side-plank",             3, "30s", 30, "Hip elevated for extra glute medius work."),
  ], 55, 290),

  restDay(6),
  restDay(7),
];

const womensMuscleWeeks: WeekPlan[] = Array.from({ length: 8 }, (_, i) =>
  buildWeekPlan(i + 1, womensMuscleBuildinDays, "womens-muscle-building")
);

// ════════════════════════════════════════════════════════════════
//  WOMEN'S STRENGTH  (5 days/week, 8 weeks)
// ════════════════════════════════════════════════════════════════

const womensStrengthDays: WorkoutDay[] = [
  workoutDay(1, "Heavy Squat Day", "SQUAT", [
    ex("barbell-back-squat",     5, "5",   240, "Hip crease below knee. Drive the floor apart."),
    ex("pause-squat",            3, "3",   240, "3-sec true pause. Brace hard."),
    ex("bulgarian-split-squat",  3, "8",   120, "Accessory unilateral volume."),
    ex("leg-press",              3, "10",  90,  "Controlled eccentric accessory."),
    ex("plank",                  3, "60s", 60,  "Maximal irradiation — full-body tight."),
  ], 75, 340),

  workoutDay(2, "Heavy Bench + Upper Back", "BENCH", [
    ex("barbell-bench-press",   5, "5",   240, "Competition grip. Full ROM."),
    ex("close-grip-bench",      3, "6",    180, "Overload the triceps for lockout."),
    ex("barbell-row",           4, "6",    180, "Explosive pull. Bar to lower sternum."),
    ex("face-pull",             3, "15",   60,  "Non-negotiable rotator cuff health."),
    ex("skull-crusher",         3, "8",    90,  "Long head focus. 3-sec eccentric."),
  ], 70, 310),

  restDay(3),

  workoutDay(4, "Heavy Deadlift Day", "DEADLIFT", [
    ex("conventional-deadlift", 4, "4",   300, "Max brace. Bar over mid-foot. Push the floor."),
    ex("sumo-deadlift",         3, "3",   240, "Wide stance accessory variation."),
    ex("rdl-dumbbell",          4, "8",   120, "Eccentric overload accessory."),
    ex("farmer-carry",          4, "30m", 120, "Heavy. Shoulders back and down."),
    ex("hanging-knee-raise",    3, "10",   60, "Controlled posterior pelvic tilt."),
  ], 75, 380),

  workoutDay(5, "Volume Bench + Pull Accessories", "VOLUME", [
    ex("barbell-bench-press",   5, "8",   120, "70% 1RM volume day. Speed reps."),
    ex("incline-dumbbell-press",3, "10",  90,  "Upper chest accessory volume."),
    ex("lat-pulldown",          4, "10",  90,  "Wide grip. Full lat stretch."),
    ex("seated-cable-row",      3, "12",  75,  "2-sec hold. Mid-back thickness."),
    ex("cable-tricep-pushdown", 3, "15",  45,  "High-rep finisher. Pump."),
  ], 65, 300),

  workoutDay(6, "Conditioning + Weak Points", "CONDITIONING", [
    ex("kettlebell-swing",      4, "20",  75, "Power — not endurance. Explosive."),
    ex("box-jump",              4, "5",   120, "Max height. Reset before each rep."),
    ex("battle-rope-wave",      4, "40s", 75, "Full power. Athletic stance."),
    ex("hip-flexor-pnf",        3, "30s", 15, "PNF for strength-specific mobility."),
    ex("thoracic-extension-foam",3,"8",   20, "Every session. Overhead position."),
  ], 55, 290),

  restDay(7),
];

const womensStrengthWeeks: WeekPlan[] = Array.from({ length: 8 }, (_, i) =>
  buildWeekPlan(i + 1, womensStrengthDays, "womens-strength")
);

// ════════════════════════════════════════════════════════════════
//  MEN'S HYPERTROPHY — PPL (6 days/week, 8 weeks)
// ════════════════════════════════════════════════════════════════

const mensHypertrophyDays: WorkoutDay[] = [
  workoutDay(1, "Push — Chest, Shoulders, Triceps", "PUSH", [
    ex("barbell-bench-press",    4, "8",   120, "2-1-2 tempo. Arch + leg drive."),
    ex("incline-dumbbell-press", 4, "10",  90,  "30°. Full stretch at the bottom."),
    ex("overhead-press",         4, "8",   120, "Strict. Brace hard."),
    ex("cable-chest-fly",        3, "12",   60, "Constant tension. Full squeeze."),
    ex("dumbbell-lateral-raise", 4, "15",   45, "2-sec eccentric. No momentum."),
    ex("cable-tricep-pushdown",  3, "15",   45, "Flare at the bottom for lateral head."),
  ], 65, 310),

  workoutDay(2, "Pull — Back, Biceps", "PULL", [
    ex("pull-up",                4, "AMRAP", 120, "Dead hang start. Slow eccentric."),
    ex("barbell-row",            4, "8",     120, "45° torso. Bar to lower sternum."),
    ex("lat-pulldown",           3, "12",     75, "Wide grip. Full lat stretch."),
    ex("seated-cable-row",       3, "12",     75, "Neutral grip. 2-sec hold."),
    ex("incline-dumbbell-curl",  3, "12",     60, "Pre-stretch the long head."),
    ex("hammer-curl",            3, "12",     45, "Target the brachialis."),
  ], 60, 300),

  workoutDay(3, "Legs — Quads, Hamstrings, Glutes", "LEGS", [
    ex("barbell-back-squat",     4, "8",   180, "High bar. Hip crease below parallel."),
    ex("romanian-deadlift",      4, "10",   90, "3-sec eccentric. Full hamstring stretch."),
    ex("leg-press",              3, "12",   90, "High foot. 4-sec negative."),
    ex("walking-lunge",          3, "12",   75, "Loaded. Big stride."),
    ex("seated-leg-curl",        3, "12",   75, "1-sec peak hold."),
    ex("plank",                  3, "60s",  45, "Full-body tension."),
  ], 65, 350),

  workoutDay(4, "Push — Chest, Shoulders, Triceps (Variation)", "PUSH2", [
    ex("incline-dumbbell-press", 4, "10",  90,  "Different angle from Day 1."),
    ex("barbell-bench-press",    3, "10",  90,  "Slightly lighter. Same technique."),
    ex("dumbbell-lateral-raise", 4, "15",  45,  "High-rep isolation volume."),
    ex("overhead-press",         3, "8",   120, "Maintain strict form."),
    ex("skull-crusher",          3, "12",   75, "Long head. 3-sec eccentric."),
    ex("close-grip-bench",       3, "10",   90, "Tricep overload."),
  ], 65, 295),

  workoutDay(5, "Pull — Back, Biceps (Variation)", "PULL2", [
    ex("barbell-row",             4, "8",   120, "Heavier than Day 2 if possible."),
    ex("pull-up",                 4, "AMRAP",120,"Use additional weight if >10 reps."),
    ex("single-arm-db-row",       3, "12",   75, "Full scapular protraction."),
    ex("face-pull",               3, "15",   45, "Non-negotiable shoulder health."),
    ex("preacher-curl",           3, "10",   60, "Slow positive. Full extension."),
    ex("cable-tricep-pushdown",   2, "20",   30, "Pump finisher. High rep."),
  ], 60, 290),

  workoutDay(6, "Legs — Variation + Calves", "LEGS2", [
    ex("barbell-back-squat",    3, "10",  150, "Volume day. Slightly lighter."),
    ex("bulgarian-split-squat", 4, "10",  90,  "Posterior chain focus."),
    ex("hip-thrust-barbell",    4, "10",  90,  "Glute hypertrophy accessory."),
    ex("rdl-dumbbell",          3, "12",  75,  "Hamstring eccentrics."),
    ex("walking-lunge",         3, "12",  75,  "Unilateral finisher."),
    ex("ab-wheel-rollout",      3, "8",   60,  "Anti-extension core work."),
  ], 65, 340),

  restDay(7),
];

// Alias for cleaner access in the lookup
const rdl_ex: WorkoutExercise = ex("rdl-dumbbell", 4, "10", 90, "3-sec eccentric. Full hamstring stretch.");
const romanian_deadlift = rdl_ex;

const mensHypertrophyWeeks: WeekPlan[] = Array.from({ length: 8 }, (_, i) =>
  buildWeekPlan(i + 1, mensHypertrophyDays, "mens-hypertrophy")
);

// ════════════════════════════════════════════════════════════════
//  MEN'S STRENGTH — POWERLIFTING (5 days/week, 8 weeks)
// ════════════════════════════════════════════════════════════════

const mensStrengthDays: WorkoutDay[] = [
  workoutDay(1, "Heavy Squat Day", "SQUAT", [
    ex("barbell-back-squat",  5, "5",   300, "75-95% 1RM. Bar speed is the metric."),
    ex("pause-squat",         3, "3",   240, "3-sec pause. Eliminate the bounce."),
    ex("bulgarian-split-squat",3,"8",   120, "Accessory unilateral volume."),
    ex("ab-wheel-rollout",    3, "10",   75, "Anti-extension core for heavy squats."),
    ex("farmer-carry",        3, "30m", 120, "Grip and bracing accessory."),
  ], 80, 360),

  workoutDay(2, "Heavy Bench + Upper Back", "BENCH", [
    ex("barbell-bench-press", 5, "5",   300, "Competition grip. Leg drive. Full arch."),
    ex("close-grip-bench",    4, "6",   180, "Tricep lockout strength."),
    ex("barbell-row",         4, "5",   180, "Heavy. Explosive pull."),
    ex("face-pull",           3, "15",   60, "Shoulder health — mandatory."),
    ex("skull-crusher",       3, "8",    90, "Long head overload."),
  ], 75, 320),

  restDay(3),

  workoutDay(4, "Heavy Deadlift Day", "DEADLIFT", [
    ex("conventional-deadlift", 4, "4", 360, "90% 1RM. Maximum brace. Lat tension."),
    ex("sumo-deadlift",         3, "3", 240, "Alternative pull. Address weak stances."),
    ex("rdl-dumbbell",          4, "8", 120, "Eccentric hamstring overload."),
    ex("farmer-carry",          4, "30m",120,"Heavy. All the grip strength."),
    ex("hanging-knee-raise",    3, "10", 60, "Core stability accessory."),
  ], 80, 400),

  workoutDay(5, "Volume Bench + Accessories", "VOLUME", [
    ex("barbell-bench-press",  5, "8",  120, "70% 1RM volume. Speed-focus."),
    ex("incline-dumbbell-press",3,"10", 90,  "Upper chest accessory."),
    ex("barbell-row",          4, "8",  120, "Pull volume. Back health."),
    ex("lat-pulldown",         3, "10",  75, "Vertical pull variety."),
    ex("cable-tricep-pushdown",3, "15",  45, "Accessory arm volume."),
  ], 65, 300),

  workoutDay(6, "Conditioning + Weak Points", "CONDITIONING", [
    ex("kettlebell-swing",    4, "20",  75, "Hip power. Explosive extension."),
    ex("box-jump",            4, "5",   120, "Plyometric power development."),
    ex("battle-rope-wave",    4, "40s", 75, "Cardiovascular conditioning."),
    ex("hip-flexor-pnf",      3, "30s", 15, "Mobility for squat depth."),
    ex("thoracic-extension-foam",3,"8", 20, "Overhead position maintenance."),
    ex("hamstring-pnf",       3, "45s", 15, "Prevent hamstring restriction."),
  ], 55, 280),

  restDay(7),
];

const mensStrengthWeeks: WeekPlan[] = Array.from({ length: 8 }, (_, i) =>
  buildWeekPlan(i + 1, mensStrengthDays, "mens-strength")
);

// ════════════════════════════════════════════════════════════════
//  MEN'S BODY RECOMPOSITION (5 days/week, 8 weeks)
// ════════════════════════════════════════════════════════════════

const mensFatLossDays: WorkoutDay[] = [
  workoutDay(1, "Upper Strength + Steps Target", "UPPER-STR", [
    ex("barbell-bench-press",   4, "8",   120, "Strength focus. Full ROM."),
    ex("barbell-row",           4, "8",   120, "Horizontal pull balance."),
    ex("overhead-press",        3, "8",   120, "Strict. Core braced."),
    ex("pull-up",               3, "AMRAP",90, "Add weight if >10 reps."),
    ex("face-pull",             3, "15",   45, "Shoulder health every session."),
  ], 60, 300),

  workoutDay(2, "Lower Hypertrophy + Core", "LOWER-HYP", [
    ex("barbell-back-squat",  4, "10",  120, "Hypertrophy range. Controlled descent."),
    ex("rdl-dumbbell",        4, "10",   90, "3-sec eccentric. Posterior chain."),
    ex("walking-lunge",       3, "12",   75, "Loaded. Unilateral volume."),
    ex("leg-press",           3, "12",   90, "Metabolic leg volume."),
    ex("ab-wheel-rollout",    3, "8",    75, "Anti-extension core."),
    ex("plank",               3, "60s",  45, "Maximum bracing."),
  ], 65, 330),

  workoutDay(3, "Low-Intensity Cardio + Mobility", "CARDIO", [
    ex("zone2-run",            1, "30min", 0,  "Conversational pace. Zone 2."),
    ex("hip-flexor-pnf",       3, "30s",  15, "Hip flexor extensibility."),
    ex("thoracic-extension-foam",3,"8",   20, "Upper back mobility."),
    ex("worlds-greatest-stretch",2,"5",    0, "Multi-joint mobility."),
    ex("cat-cow",              2, "12",    0, "Spinal articulation."),
  ], 55, 220),

  workoutDay(4, "Upper Hypertrophy", "UPPER-HYP", [
    ex("incline-dumbbell-press",4, "10",  90,  "Upper chest emphasis."),
    ex("single-arm-db-row",     4, "12",  75,  "Full scapular movement."),
    ex("dumbbell-lateral-raise",4, "15",  45,  "Medial delt — shoulder width."),
    ex("preacher-curl",         3, "10",  60,  "Strict arm isolation."),
    ex("skull-crusher",         3, "12",  75,  "Long head focus."),
    ex("cable-chest-fly",       3, "12",  60,  "Constant tension finisher."),
  ], 60, 270),

  workoutDay(5, "Lower Strength + HIIT Intervals", "LOWER-STR+HIIT", [
    ex("barbell-back-squat",   4, "5",   240, "Strength focus lower body."),
    ex("conventional-deadlift",3, "5",   240, "Full-body strength accessory."),
    ex("assault-bike-sprint",  6, "30s", 90,  "Max effort. Intervals."),
    ex("kettlebell-swing",     3, "20",  60,  "Hip power + metabolic."),
    ex("jump-lunge",           3, "20",  60,  "Plyometric finisher."),
  ], 65, 420),

  restDay(6),
  restDay(7),
];

const mensFatLossWeeks: WeekPlan[] = Array.from({ length: 8 }, (_, i) =>
  buildWeekPlan(i + 1, mensFatLossDays, "mens-fat-loss")
);

// ════════════════════════════════════════════════════════════════
//  EXPORTED WORKOUT TEMPLATES
// ════════════════════════════════════════════════════════════════

export const workoutTemplates: WorkoutTemplate[] = [
  { programId: "womens-fat-loss",      gender: "women", weeks: womensFatLossWeeks },
  { programId: "womens-muscle-building",gender:"women", weeks: womensMuscleWeeks },
  { programId: "womens-strength",      gender: "women", weeks: womensStrengthWeeks },
  { programId: "mens-hypertrophy",     gender: "men",   weeks: mensHypertrophyWeeks },
  { programId: "mens-strength",        gender: "men",   weeks: mensStrengthWeeks },
  { programId: "mens-fat-loss",        gender: "men",   weeks: mensFatLossWeeks },
];

// ── Lookup helpers ─────────────────────────────────────────────

export const getWorkoutTemplate = (programId: string): WorkoutTemplate | undefined =>
  workoutTemplates.find((t) => t.programId === programId);

export const getWeekPlan = (programId: string, weekNumber: number): WeekPlan | undefined => {
  const template = getWorkoutTemplate(programId);
  return template?.weeks.find((w) => w.weekNumber === weekNumber);
};

export const getWorkoutForDay = (
  programId: string,
  weekNumber: number,
  dayIndex: number  // 1-based
): WorkoutDay | undefined => {
  const week = getWeekPlan(programId, weekNumber);
  return week?.days.find((d) => d.dayIndex === dayIndex);
};
