export type Exercise = {
  name: string;
  setsReps: string;
  muscles: string;
  benefit: string;
  instructions: string[];
  mediaPlaceholder: string;
  alternatives: string[];
};

export type Program = {
  slug: string;
  name: string;
  goal: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  scientificDescription: string;
  whoItsFor: string;
  benefits: string[];
  avoidIf: string;
  weeklySchedule: { day: string; focus: string }[];
  exercises: Exercise[];
};

export const programs: Program[] = [
  {
    slug: "weight-loss",
    name: "Weight Loss",
    goal: "Reduce body fat while preserving lean mass",
    difficulty: "Beginner",
    duration: "12-16 weeks",
    scientificDescription:
      "Combines progressive resistance training with moderate cardio and a sustainable calorie deficit to maximize fat loss while retaining muscle.",
    whoItsFor: "People starting a fat-loss journey or returning after a long break.",
    benefits: ["Improved body composition", "Better metabolic health", "Higher energy levels"],
    avoidIf: "You are underweight or currently recovering from severe energy deficiency.",
    weeklySchedule: [
      { day: "Monday", focus: "Full Body Strength + 20 min incline walk" },
      { day: "Tuesday", focus: "Low-impact cardio + mobility" },
      { day: "Wednesday", focus: "Lower Body Strength + core" },
      { day: "Thursday", focus: "Active recovery" },
      { day: "Friday", focus: "Upper Body Strength + intervals" },
      { day: "Saturday", focus: "Steady-state cardio" },
      { day: "Sunday", focus: "Rest" },
    ],
    exercises: [
      {
        name: "Goblet Squat",
        setsReps: "3 x 10-12",
        muscles: "Quads, glutes, core",
        benefit: "Builds lower-body strength and increases training calorie expenditure.",
        instructions: [
          "Hold a dumbbell close to your chest.",
          "Sit down while keeping your chest tall.",
          "Push through your feet to stand back up.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: goblet-squat-demo",
        alternatives: ["Bodyweight Squat", "Leg Press", "Split Squat"],
      },
      {
        name: "Romanian Deadlift",
        setsReps: "3 x 8-10",
        muscles: "Hamstrings, glutes, lower back",
        benefit: "Improves posterior chain strength and posture during fat-loss phases.",
        instructions: [
          "Hold dumbbells in front of thighs.",
          "Hinge at hips while keeping a neutral spine.",
          "Lower to mid-shin and return by driving hips forward.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: rdl-demo",
        alternatives: ["Hip Hinge with Kettlebell", "Good Morning", "Cable Pull-Through"],
      },
    ],
  },
  {
    slug: "muscle-building",
    name: "Muscle Building",
    goal: "Increase muscle size and shape",
    difficulty: "Intermediate",
    duration: "16-20 weeks",
    scientificDescription:
      "Uses hypertrophy-focused volume, progressive overload, and adequate recovery windows to stimulate muscle protein synthesis.",
    whoItsFor: "Lifters with basic movement experience wanting visible muscle growth.",
    benefits: ["Greater lean mass", "Improved physique symmetry", "Higher resting metabolism"],
    avoidIf: "You cannot currently recover from 4-5 training sessions per week.",
    weeklySchedule: [
      { day: "Monday", focus: "Push (chest, shoulders, triceps)" },
      { day: "Tuesday", focus: "Pull (back, biceps)" },
      { day: "Wednesday", focus: "Lower body hypertrophy" },
      { day: "Thursday", focus: "Rest / mobility" },
      { day: "Friday", focus: "Upper hypertrophy" },
      { day: "Saturday", focus: "Lower body + accessories" },
      { day: "Sunday", focus: "Rest" },
    ],
    exercises: [
      {
        name: "Barbell Bench Press",
        setsReps: "4 x 6-10",
        muscles: "Chest, shoulders, triceps",
        benefit: "High mechanical tension for upper-body hypertrophy.",
        instructions: [
          "Set shoulder blades down and back on bench.",
          "Lower bar to lower chest with control.",
          "Press up while keeping feet planted.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: bench-press-demo",
        alternatives: ["Dumbbell Bench Press", "Push-Up", "Machine Chest Press"],
      },
      {
        name: "Lat Pulldown",
        setsReps: "3 x 10-12",
        muscles: "Lats, biceps, upper back",
        benefit: "Builds back width and improves pulling strength.",
        instructions: [
          "Grip bar just outside shoulder width.",
          "Pull bar to upper chest while driving elbows down.",
          "Return slowly to full stretch.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: lat-pulldown-demo",
        alternatives: ["Assisted Pull-Up", "Band Pulldown", "Chest-Supported Row"],
      },
    ],
  },
  {
    slug: "strength-training",
    name: "Strength Training",
    goal: "Increase maximal force production",
    difficulty: "Advanced",
    duration: "12-16 weeks",
    scientificDescription:
      "Applies low-to-moderate rep ranges, higher intensity loads, and structured periodization to optimize neural adaptations and force output.",
    whoItsFor: "Athletes and experienced trainees targeting performance milestones.",
    benefits: ["Higher 1RM potential", "Improved neural efficiency", "More resilient movement patterns"],
    avoidIf: "You have unresolved joint pain under heavy loading.",
    weeklySchedule: [
      { day: "Monday", focus: "Heavy squat + accessory" },
      { day: "Tuesday", focus: "Heavy press + upper back" },
      { day: "Wednesday", focus: "Recovery + mobility" },
      { day: "Thursday", focus: "Heavy deadlift + posterior chain" },
      { day: "Friday", focus: "Volume bench + pull variations" },
      { day: "Saturday", focus: "Conditioning / weak-point work" },
      { day: "Sunday", focus: "Rest" },
    ],
    exercises: [
      {
        name: "Back Squat",
        setsReps: "5 x 3-5",
        muscles: "Quads, glutes, core",
        benefit: "Improves lower-body force production and bracing capacity.",
        instructions: [
          "Set bar across upper traps and brace core.",
          "Descend to depth while keeping knees tracking toes.",
          "Drive up explosively through mid-foot.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: back-squat-demo",
        alternatives: ["Front Squat", "Safety Bar Squat", "Leg Press"],
      },
      {
        name: "Deadlift",
        setsReps: "4 x 3-5",
        muscles: "Posterior chain, grip, core",
        benefit: "Builds full-body strength and posterior-chain power.",
        instructions: [
          "Start with bar over mid-foot and neutral spine.",
          "Push floor away while keeping bar close.",
          "Lock out hips and knees together.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: deadlift-demo",
        alternatives: ["Trap Bar Deadlift", "Rack Pull", "Romanian Deadlift"],
      },
    ],
  },
  {
    slug: "endurance",
    name: "Endurance",
    goal: "Improve cardiovascular capacity and fatigue resistance",
    difficulty: "Intermediate",
    duration: "10-14 weeks",
    scientificDescription:
      "Combines aerobic base work with threshold intervals to improve oxygen utilization and sustained work output.",
    whoItsFor: "Runners, cyclists, and general trainees who want better stamina.",
    benefits: ["Better VO2 efficiency", "Lower resting heart rate", "Improved recovery between efforts"],
    avoidIf: "You are currently overtrained or have unresolved cardiac concerns.",
    weeklySchedule: [
      { day: "Monday", focus: "Zone 2 base cardio" },
      { day: "Tuesday", focus: "Lower body strength maintenance" },
      { day: "Wednesday", focus: "Tempo intervals" },
      { day: "Thursday", focus: "Mobility and breathing work" },
      { day: "Friday", focus: "Long easy session" },
      { day: "Saturday", focus: "Upper body + core" },
      { day: "Sunday", focus: "Rest" },
    ],
    exercises: [
      {
        name: "Tempo Run",
        setsReps: "20-30 minutes steady",
        muscles: "Lower body, cardiorespiratory system",
        benefit: "Improves lactate threshold and sustainable speed.",
        instructions: [
          "Warm up for 10 minutes easy pace.",
          "Run at comfortably hard pace.",
          "Cool down with easy jog and walking.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: tempo-run-demo",
        alternatives: ["Bike Tempo", "Rowing Tempo", "Elliptical Tempo"],
      },
      {
        name: "Assault Bike Intervals",
        setsReps: "8 x 30s hard / 90s easy",
        muscles: "Full body, cardiovascular system",
        benefit: "Increases high-intensity work capacity.",
        instructions: [
          "Start each round with explosive effort.",
          "Maintain consistent output through intervals.",
          "Recover actively during easy windows.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: bike-interval-demo",
        alternatives: ["Row Intervals", "Hill Sprints", "Sled Push Intervals"],
      },
    ],
  },
  {
    slug: "flexibility-mobility",
    name: "Flexibility & Mobility",
    goal: "Improve joint range of motion and movement quality",
    difficulty: "Beginner",
    duration: "8-12 weeks",
    scientificDescription:
      "Targets mobility restrictions through controlled end-range work, active flexibility drills, and tissue tolerance progressions.",
    whoItsFor: "People with stiffness, desk-heavy lifestyle, or movement limitations.",
    benefits: ["Reduced stiffness", "Better technique in lifts", "Lower injury risk over time"],
    avoidIf: "You are in acute pain and need medical clearance first.",
    weeklySchedule: [
      { day: "Monday", focus: "Hips + ankles mobility flow" },
      { day: "Tuesday", focus: "Upper body mobility + breathing" },
      { day: "Wednesday", focus: "Full-body movement circuit" },
      { day: "Thursday", focus: "Recovery walk + stretch" },
      { day: "Friday", focus: "Thoracic spine + shoulders" },
      { day: "Saturday", focus: "Active flexibility session" },
      { day: "Sunday", focus: "Rest" },
    ],
    exercises: [
      {
        name: "World's Greatest Stretch",
        setsReps: "2-3 rounds each side",
        muscles: "Hips, thoracic spine, hamstrings",
        benefit: "Improves multi-joint mobility in one sequence.",
        instructions: [
          "Step into lunge and place both hands down.",
          "Rotate chest upward with one arm.",
          "Switch sides with control.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: worlds-greatest-stretch-demo",
        alternatives: ["Lunge with Rotation", "Hip Flexor Stretch", "Spiderman Stretch"],
      },
      {
        name: "90/90 Hip Switch",
        setsReps: "3 x 8-10 transitions",
        muscles: "Hip rotators, glutes",
        benefit: "Builds active hip internal/external rotation.",
        instructions: [
          "Sit in 90/90 setup with upright torso.",
          "Switch knees side to side without hands if possible.",
          "Move slowly and control end ranges.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: 90-90-demo",
        alternatives: ["Pigeon Stretch", "Seated Hip Rotation", "Cossack Squat"],
      },
    ],
  },
  {
    slug: "body-recomposition",
    name: "Body Recomposition",
    goal: "Lose fat while gaining/maintaining muscle",
    difficulty: "Intermediate",
    duration: "16-24 weeks",
    scientificDescription:
      "Integrates strength progression, high-protein nutrition, and energy balance cycling to improve lean-to-fat mass ratio.",
    whoItsFor: "People who want visible shape changes without aggressive bulking/cutting.",
    benefits: ["Simultaneous fat loss and muscle gain potential", "Sustainable nutrition habits", "Better long-term adherence"],
    avoidIf: "You need rapid short-term weight changes for competition.",
    weeklySchedule: [
      { day: "Monday", focus: "Upper strength + steps target" },
      { day: "Tuesday", focus: "Lower hypertrophy + core" },
      { day: "Wednesday", focus: "Low-intensity cardio + mobility" },
      { day: "Thursday", focus: "Upper hypertrophy" },
      { day: "Friday", focus: "Lower strength + intervals" },
      { day: "Saturday", focus: "Active recovery" },
      { day: "Sunday", focus: "Rest" },
    ],
    exercises: [
      {
        name: "Incline Dumbbell Press",
        setsReps: "4 x 8-12",
        muscles: "Upper chest, shoulders, triceps",
        benefit: "Supports upper-body hypertrophy while preserving strength.",
        instructions: [
          "Set bench to 30-45 degrees.",
          "Lower dumbbells with control.",
          "Press up while keeping elbows slightly tucked.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: incline-press-demo",
        alternatives: ["Machine Incline Press", "Push-Up", "Flat Dumbbell Press"],
      },
      {
        name: "Walking Lunge",
        setsReps: "3 x 10 each leg",
        muscles: "Quads, glutes, core",
        benefit: "High unilateral demand for leg development and conditioning.",
        instructions: [
          "Step forward into controlled lunge.",
          "Keep torso tall and knee aligned.",
          "Drive through front foot and continue walking.",
        ],
        mediaPlaceholder: "GIF/Image placeholder: walking-lunge-demo",
        alternatives: ["Static Split Squat", "Reverse Lunge", "Step-Up"],
      },
    ],
  },
];

export const programBySlug = (slug: string) =>
  programs.find((program) => program.slug === slug);
