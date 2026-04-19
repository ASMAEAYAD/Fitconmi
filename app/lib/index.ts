// ═══════════════════════════════════════════════════════════════════
//  FitConMi — Library Barrel Exports
//  Import everything from "@/app/lib" or "../../lib"
// ═══════════════════════════════════════════════════════════════════

// Types
export type {
  Gender,
  Goal,
  Level,
  EquipmentType,
  MuscleGroup,
  Phase,
  MuscleTarget,
  ProgressionWeek,
  Exercise,
  WorkoutExercise,
  WorkoutDay,
  WeekPlan,
  WorkoutTemplate,
  ProgramPhase,
  WeeklyScheduleEntry,
  ScienceBlock,
  NutritionTip,
  Program,
  RecommendationInput,
  ProgressiveLoad,
  CalorieBurn,
} from "./types/fitness";

// Data
export { exercises, exerciseById, exerciseBySlug, exercisesByMuscle, exercisesByEquipment, exercisesByTag } from "./data/exercises";
export { programs, programById, programBySlug, programsByGender, programsByGoal, programsByLevel, featuredPrograms } from "./data/programs";
export { workoutTemplates, getWorkoutTemplate, getWeekPlan, getWorkoutForDay } from "./data/workouts";

// Utils
export {
  getPhaseForWeek,
  PHASE_META,
  getProgressiveLoad,
  calculateEstimatedCalories,
  getRecommendedProgram,
  getProgramMilestones,
  getWeekLabel,
  getTotalSessions,
} from "./utils/programLogic";
