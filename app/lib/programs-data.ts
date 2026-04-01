export type AlternativeExercise = {
  name: string;
  setsReps: string;
  muscles: string;
  benefit: string;
  instructions: string[];
  imageUrl: string;
};

export type Exercise = AlternativeExercise & {
  alternatives: AlternativeExercise[];
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
  dayPlans: { day: string; exercises: Exercise[] }[];
};

const alt = (
  name: string,
  setsReps: string,
  muscles: string,
  benefit: string,
  imageUrl: string
): AlternativeExercise => ({
  name,
  setsReps,
  muscles,
  benefit,
  imageUrl,
  instructions: [
    "Set your starting position with control.",
    "Perform each rep through full, pain-free range.",
    "Maintain stable posture and controlled tempo.",
    "Finish each set 1-2 reps before form breakdown.",
  ],
});

const exercise = (
  name: string,
  setsReps: string,
  muscles: string,
  benefit: string,
  imageUrl: string,
  alternatives: AlternativeExercise[]
): Exercise => ({
  name,
  setsReps,
  muscles,
  benefit,
  imageUrl,
  alternatives,
  instructions: [
    "Brace your core and align your posture before each set.",
    "Move through the target range with a controlled eccentric phase.",
    "Drive through the concentric phase while keeping joint alignment.",
    "Rest 60-120 seconds based on intensity and repeat prescribed reps.",
  ],
});

/** Real Unsplash URLs — rotate by index for variety */
const IMG = [
  "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
  "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=800&q=80",
  "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  "https://images.unsplash.com/photo-1594737625785-c7f12f6f89e8?w=800&q=80",
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
  "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=800&q=80",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
  "https://images.unsplash.com/photo-1584863231364-2edc166de576?w=800&q=80",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
  "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80",
  "https://images.unsplash.com/photo-1598971639058-a69a2d0f7af1?w=800&q=80",
  "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
  "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&q=80",
  "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80",
  "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=800&q=80",
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
];

let imgCursor = 0;
const nextImg = () => IMG[imgCursor++ % IMG.length];

type Row = { name: string; setsReps: string; muscles: string; benefit: string };

const exFromRow = (row: Row): Exercise => {
  const primary = nextImg();
  const a1 = nextImg();
  const a2 = nextImg();
  return exercise(row.name, row.setsReps, row.muscles, row.benefit, primary, [
    alt(`${row.name} — Alt A`, row.setsReps, row.muscles, "Same adaptation goal with different loading pattern.", a1),
    alt(`${row.name} — Alt B`, row.setsReps, row.muscles, "Same adaptation goal with different equipment.", a2),
  ]);
};

const buildDayPlans = (
  weeklySchedule: { day: string; focus: string }[],
  perDayRows: Row[][]
): { day: string; exercises: Exercise[] }[] => {
  if (weeklySchedule.length !== perDayRows.length) {
    throw new Error("weeklySchedule and perDayRows must have the same length");
  }
  return weeklySchedule.map((day, i) => ({
    day: day.day,
    exercises: perDayRows[i].map((row) => exFromRow(row)),
  }));
};

/* --- Per-program day rows: 7 days × 5 exercises each (unique names per day) --- */

const wlRows: Row[][] = [
  [
    { name: "Goblet Squat", setsReps: "4 x 10", muscles: "Quads, glutes, core", benefit: "Builds leg strength and calorie burn in a fat-loss phase." },
    { name: "Romanian Deadlift", setsReps: "4 x 8", muscles: "Hamstrings, glutes", benefit: "Preserves posterior-chain muscle during a deficit." },
    { name: "Push-Up", setsReps: "3 x 12-15", muscles: "Chest, triceps, core", benefit: "Upper-body volume without heavy joint stress." },
    { name: "Cable Row", setsReps: "3 x 12", muscles: "Mid-back, lats", benefit: "Balances pressing volume and posture." },
    { name: "Farmer Carry", setsReps: "4 x 30m", muscles: "Grip, core, traps", benefit: "Increases total-body work capacity and core stiffness." },
  ],
  [
    { name: "Incline Walk", setsReps: "30 minutes", muscles: "Cardiovascular system", benefit: "Low-impact aerobic work to support fat oxidation." },
    { name: "Bike Intervals", setsReps: "10 x 30s / 90s", muscles: "Legs, cardio", benefit: "Raises EPOC and improves metabolic conditioning." },
    { name: "Kettlebell Swing", setsReps: "4 x 15", muscles: "Glutes, hamstrings", benefit: "Hip power with minimal joint pounding." },
    { name: "Dead Bug", setsReps: "3 x 10", muscles: "Deep core", benefit: "Improves trunk control for safer compound lifts." },
    { name: "Foam Rolling", setsReps: "10 minutes", muscles: "Tissue quality", benefit: "Supports recovery between higher-volume days." },
  ],
  [
    { name: "Leg Press", setsReps: "4 x 12", muscles: "Quads, glutes", benefit: "High quad stimulus with stable loading." },
    { name: "Bulgarian Split Squat", setsReps: "3 x 10/leg", muscles: "Quads, glutes", benefit: "Unilateral strength to correct asymmetries." },
    { name: "Hip Thrust", setsReps: "4 x 10", muscles: "Glutes", benefit: "Glute-focused volume for metabolic demand." },
    { name: "Pallof Press", setsReps: "3 x 12/side", muscles: "Obliques, core", benefit: "Anti-rotation strength supports compound lifts." },
    { name: "Side Plank", setsReps: "3 x 30s/side", muscles: "Obliques", benefit: "Lateral core endurance for stability." },
  ],
  [
    { name: "Easy Row", setsReps: "25 minutes", muscles: "Cardio, back", benefit: "Active recovery with low joint stress." },
    { name: "Mobility Flow", setsReps: "15 minutes", muscles: "Hips, thoracic spine", benefit: "Maintains range of motion during higher stress weeks." },
    { name: "Cat-Cow", setsReps: "2 x 12", muscles: "Spine mobility", benefit: "Improves spinal segmentation and comfort." },
    { name: "Band Pull-Apart", setsReps: "3 x 15", muscles: "Rear delts, upper back", benefit: "Counters forward shoulder posture." },
    { name: "Walking", setsReps: "20 minutes", muscles: "Low-intensity cardio", benefit: "Supports steps target without fatigue." },
  ],
  [
    { name: "Dumbbell Bench Press", setsReps: "4 x 10", muscles: "Chest, triceps", benefit: "Upper-body strength maintenance while dieting." },
    { name: "Lat Pulldown", setsReps: "3 x 12", muscles: "Lats, biceps", benefit: "Vertical pull volume for back retention." },
    { name: "Assault Bike Sprint", setsReps: "8 x 15s / 75s", muscles: "Full body, cardio", benefit: "Short intervals for metabolic stimulus." },
    { name: "Face Pull", setsReps: "3 x 15", muscles: "Rear delts, rotator cuff", benefit: "Shoulder health under pressing volume." },
    { name: "Hanging Knee Raise", setsReps: "3 x 12", muscles: "Abs, hip flexors", benefit: "Core strength with minimal loading." },
  ],
  [
    { name: "Steady-State Jog", setsReps: "35 minutes", muscles: "Cardiovascular system", benefit: "Aerobic base work to support recovery and adherence." },
    { name: "Elliptical", setsReps: "30 minutes", muscles: "Cardio", benefit: "Low-impact option for weekly energy expenditure." },
    { name: "Calf Raises", setsReps: "3 x 15", muscles: "Calves", benefit: "Adds lower-leg volume without CNS fatigue." },
    { name: "Stretching Routine", setsReps: "15 minutes", muscles: "Full body", benefit: "Improves perceived recovery between sessions." },
    { name: "Breathing Drill", setsReps: "5 minutes", muscles: "Diaphragm", benefit: "Down-regulates stress to support sleep and recovery." },
  ],
  [
    { name: "Light Yoga Walk", setsReps: "25 minutes", muscles: "Active recovery", benefit: "Low-stress movement on a rest-focused day." },
    { name: "Hamstring Stretch", setsReps: "3 x 30s", muscles: "Hamstrings", benefit: "Maintains posterior-chain extensibility." },
    { name: "Hip Flexor Stretch", setsReps: "3 x 30s/side", muscles: "Hip flexors", benefit: "Reduces anterior hip tightness from sitting." },
    { name: "Neck Mobility", setsReps: "5 minutes", muscles: "Neck, upper back", benefit: "Reduces tension from desk posture." },
    { name: "Sleep Prep Routine", setsReps: "10 minutes", muscles: "Recovery", benefit: "Supports circadian rhythm for better recovery." },
  ],
];

const mbRows: Row[][] = [
  [
    { name: "Barbell Bench Press", setsReps: "4 x 8", muscles: "Chest, triceps", benefit: "Primary horizontal press for hypertrophy tension." },
    { name: "Overhead Press", setsReps: "4 x 8", muscles: "Shoulders, triceps", benefit: "Vertical pressing volume for delt development." },
    { name: "Lateral Raise", setsReps: "4 x 12", muscles: "Lateral delts", benefit: "Isolation volume for shoulder width." },
    { name: "Triceps Pushdown", setsReps: "3 x 12", muscles: "Triceps", benefit: "Elbow extension volume with stable shoulders." },
    { name: "Cable Fly", setsReps: "3 x 12", muscles: "Chest", benefit: "Constant tension for pec hypertrophy." },
  ],
  [
    { name: "Pull-Up", setsReps: "4 x AMRAP", muscles: "Lats, biceps", benefit: "Bodyweight vertical pull for back width." },
    { name: "Barbell Row", setsReps: "4 x 8", muscles: "Upper back, lats", benefit: "Heavy horizontal pull for thickness." },
    { name: "Face Pull", setsReps: "3 x 15", muscles: "Rear delts", benefit: "Shoulder balance under high pulling volume." },
    { name: "EZ-Bar Curl", setsReps: "3 x 10", muscles: "Biceps", benefit: "Arm hypertrophy with stable wrists." },
    { name: "Hammer Curl", setsReps: "3 x 12", muscles: "Brachialis, biceps", benefit: "Adds arm volume with neutral grip." },
  ],
  [
    { name: "Back Squat", setsReps: "4 x 8", muscles: "Quads, glutes", benefit: "Primary leg hypertrophy stimulus." },
    { name: "Leg Curl", setsReps: "3 x 12", muscles: "Hamstrings", benefit: "Knee flexion volume for hamstring balance." },
    { name: "Leg Extension", setsReps: "3 x 15", muscles: "Quads", benefit: "Isolation volume for quad sweep." },
    { name: "Standing Calf Raise", setsReps: "4 x 15", muscles: "Calves", benefit: "Adds lower-leg hypertrophy." },
    { name: "Ab Wheel Rollout", setsReps: "3 x 10", muscles: "Core", benefit: "Anti-extension core strength." },
  ],
  [
    { name: "Yoga Sun Salutation", setsReps: "15 minutes", muscles: "Mobility", benefit: "Recovery day movement to maintain range." },
    { name: "Thoracic Extension", setsReps: "3 x 8", muscles: "Mid-back", benefit: "Improves overhead positioning for pressing." },
    { name: "Hip CARs", setsReps: "2 x 5/hip", muscles: "Hips", benefit: "Maintains hip control between hard sessions." },
    { name: "Breathing Walk", setsReps: "20 minutes", muscles: "Recovery", benefit: "Low-stress activity for blood flow." },
    { name: "Light Stretching", setsReps: "10 minutes", muscles: "Full body", benefit: "Reduces perceived soreness." },
  ],
  [
    { name: "Incline Dumbbell Press", setsReps: "4 x 10", muscles: "Upper chest", benefit: "Hypertrophy emphasis on upper pecs." },
    { name: "Machine Dip", setsReps: "3 x 10", muscles: "Chest, triceps", benefit: "Stable pressing volume for triceps growth." },
    { name: "Cable Lateral Raise", setsReps: "3 x 15", muscles: "Delts", benefit: "Constant tension for side delts." },
    { name: "Skull Crusher", setsReps: "3 x 10", muscles: "Triceps", benefit: "Elbow extension overload for arm size." },
    { name: "Pec Deck", setsReps: "3 x 12", muscles: "Chest", benefit: "Isolation fly pattern for pec volume." },
  ],
  [
    { name: "Romanian Deadlift", setsReps: "4 x 8", muscles: "Hamstrings, glutes", benefit: "Posterior-chain hypertrophy with hinge pattern." },
    { name: "Walking Lunge", setsReps: "3 x 12/leg", muscles: "Quads, glutes", benefit: "Unilateral volume for leg development." },
    { name: "Hip Adduction Machine", setsReps: "3 x 15", muscles: "Adductors", benefit: "Balances hip strength for knee health." },
    { name: "Seated Leg Curl", setsReps: "3 x 12", muscles: "Hamstrings", benefit: "Isolation hamstring volume." },
    { name: "Cable Crunch", setsReps: "3 x 12", muscles: "Abs", benefit: "Spinal flexion volume for core thickness." },
  ],
  [
    { name: "Light Full-Body Circuit", setsReps: "25 minutes", muscles: "Full body", benefit: "Low-intensity pump work without heavy fatigue." },
    { name: "Band Stretching", setsReps: "15 minutes", muscles: "Mobility", benefit: "Maintains flexibility between training blocks." },
    { name: "Foam Rolling", setsReps: "10 minutes", muscles: "Recovery", benefit: "Supports tissue tolerance for next week." },
    { name: "Nasal Breathing Walk", setsReps: "15 minutes", muscles: "Recovery", benefit: "Parasympathetic recovery emphasis." },
    { name: "Journal + Steps", setsReps: "8k steps", muscles: "Lifestyle", benefit: "Adherence tracking for weekly consistency." },
  ],
];

const stRows: Row[][] = [
  [
    { name: "Back Squat", setsReps: "5 x 5", muscles: "Quads, glutes, core", benefit: "Primary strength lift for lower-body force." },
    { name: "Pause Squat", setsReps: "4 x 3", muscles: "Quads, glutes", benefit: "Builds strength out of the hole." },
    { name: "Leg Press", setsReps: "3 x 8", muscles: "Quads", benefit: "Accessory volume after heavy squats." },
    { name: "Core Brace Drill", setsReps: "3 x 20s", muscles: "Core", benefit: "Improves intra-abdominal pressure for heavy loads." },
    { name: "Calf Raise", setsReps: "4 x 12", muscles: "Calves", benefit: "Adds lower-leg strength without CNS fatigue." },
  ],
  [
    { name: "Bench Press", setsReps: "5 x 5", muscles: "Chest, triceps", benefit: "Primary horizontal press strength development." },
    { name: "Close-Grip Bench", setsReps: "4 x 6", muscles: "Triceps, chest", benefit: "Overload triceps for lockout strength." },
    { name: "Pendlay Row", setsReps: "4 x 5", muscles: "Upper back", benefit: "Explosive pull strength for posterior chain balance." },
    { name: "Paused Bench", setsReps: "3 x 3", muscles: "Chest, triceps", benefit: "Builds strength off the chest." },
    { name: "Band Face Pull", setsReps: "3 x 15", muscles: "Rear delts", benefit: "Shoulder health under heavy pressing." },
  ],
  [
    { name: "Light Squat", setsReps: "3 x 5 @ 60%", muscles: "Legs", benefit: "Technique practice with reduced fatigue." },
    { name: "Mobility Squat", setsReps: "3 x 5", muscles: "Hips, ankles", benefit: "Maintains depth and comfort under load." },
    { name: "Bird Dog", setsReps: "3 x 8/side", muscles: "Core", benefit: "Anti-extension control for spine safety." },
    { name: "Breathing Wall Sit", setsReps: "3 x 30s", muscles: "Quads, core", benefit: "Isometric endurance without heavy loading." },
    { name: "Stretch Series", setsReps: "15 minutes", muscles: "Full body", benefit: "Recovery between maximal effort sessions." },
  ],
  [
    { name: "Deadlift", setsReps: "4 x 4", muscles: "Posterior chain", benefit: "Maximal hip extension strength." },
    { name: "Deficit Deadlift", setsReps: "3 x 3", muscles: "Hamstrings, glutes", benefit: "Strength off the floor for conventional pull." },
    { name: "Barbell Hip Thrust", setsReps: "4 x 6", muscles: "Glutes", benefit: "Glute strength for lockout power." },
    { name: "Barbell Shrug", setsReps: "4 x 8", muscles: "Traps", benefit: "Grip and upper-back strength for heavy pulls." },
    { name: "Loaded Carry", setsReps: "4 x 25m", muscles: "Grip, core", benefit: "Carry strength transfers to deadlift stability." },
  ],
  [
    { name: "Bench Volume", setsReps: "5 x 8 @ 70%", muscles: "Chest, triceps", benefit: "Volume day for pressing strength endurance." },
    { name: "Incline Bench", setsReps: "4 x 8", muscles: "Upper chest", benefit: "Varied pressing angle for strength balance." },
    { name: "Chest-Supported Row", setsReps: "4 x 8", muscles: "Mid-back", benefit: "Stable pulling volume for upper back strength." },
    { name: "Lat Pulldown", setsReps: "3 x 10", muscles: "Lats", benefit: "Vertical pull accessory for shoulder balance." },
    { name: "Triceps Press", setsReps: "3 x 12", muscles: "Triceps", benefit: "Accessory pressing muscles for lockout." },
  ],
  [
    { name: "Sled Push", setsReps: "6 x 20m", muscles: "Legs, conditioning", benefit: "Power-endurance without barbell fatigue." },
    { name: "Med Ball Slam", setsReps: "4 x 10", muscles: "Full body", benefit: "Explosive hip extension for athletic strength." },
    { name: "Battle Rope", setsReps: "6 x 20s", muscles: "Arms, core, cardio", benefit: "Conditioning with minimal joint load." },
    { name: "Jump Rope", setsReps: "10 minutes", muscles: "Calves, coordination", benefit: "Footwork and conditioning for repeat efforts." },
    { name: "Core Anti-Rotation", setsReps: "3 x 10/side", muscles: "Obliques", benefit: "Stability for heavy compound lifts." },
  ],
  [
    { name: "Deload Walk", setsReps: "30 minutes", muscles: "Recovery", benefit: "Active recovery after a heavy training week." },
    { name: "Mobility Circuit", setsReps: "20 minutes", muscles: "Hips, T-spine", benefit: "Maintains positions needed for heavy lifts." },
    { name: "Light Core", setsReps: "3 x 12", muscles: "Core", benefit: "Low-load core maintenance." },
    { name: "Stretch + Breathe", setsReps: "15 minutes", muscles: "Recovery", benefit: "Down-regulation for nervous system recovery." },
    { name: "Sleep Focus", setsReps: "Habit", muscles: "Recovery", benefit: "Prioritizes sleep as a strength variable." },
  ],
];

const enRows: Row[][] = [
  [
    { name: "Zone 2 Run", setsReps: "40 minutes", muscles: "Cardio", benefit: "Builds aerobic base and fat oxidation capacity." },
    { name: "Easy Bike", setsReps: "35 minutes", muscles: "Cardio", benefit: "Low-impact aerobic development." },
    { name: "Nasal Breathing Jog", setsReps: "20 minutes", muscles: "Cardio", benefit: "Improves breathing efficiency at low intensity." },
    { name: "Heart Rate Walk", setsReps: "25 minutes", muscles: "Cardio", benefit: "Keeps intensity in target zone for adaptation." },
    { name: "Cooldown Stretch", setsReps: "10 minutes", muscles: "Mobility", benefit: "Supports recovery after aerobic volume." },
  ],
  [
    { name: "Tempo Squat", setsReps: "4 x 8", muscles: "Quads, glutes", benefit: "Strength maintenance for running economy." },
    { name: "Romanian Deadlift", setsReps: "3 x 8", muscles: "Hamstrings", benefit: "Posterior-chain strength for stride power." },
    { name: "Step-Up", setsReps: "3 x 10/leg", muscles: "Quads, glutes", benefit: "Unilateral strength for uphill efforts." },
    { name: "Calf Raise", setsReps: "3 x 15", muscles: "Calves", benefit: "Lower-leg resilience for mileage." },
    { name: "Plank", setsReps: "3 x 45s", muscles: "Core", benefit: "Trunk stiffness for running posture." },
  ],
  [
    { name: "Tempo Run", setsReps: "25 minutes", muscles: "Cardio, legs", benefit: "Raises lactate threshold for sustained pace." },
    { name: "800m Repeats", setsReps: "6 x 800m", muscles: "Cardio", benefit: "Improves pace at threshold intensity." },
    { name: "Strides", setsReps: "8 x 100m", muscles: "Leg speed", benefit: "Neuromuscular speed without full sprint fatigue." },
    { name: "Hill Repeats", setsReps: "8 x 30s", muscles: "Legs, cardio", benefit: "Power-endurance for climbing." },
    { name: "Cooldown Jog", setsReps: "10 minutes", muscles: "Recovery", benefit: "Facilitates recovery after hard intervals." },
  ],
  [
    { name: "Mobility Flow", setsReps: "20 minutes", muscles: "Hips, T-spine", benefit: "Improves movement economy and comfort." },
    { name: "Diaphragmatic Breathing", setsReps: "10 minutes", muscles: "Breathing", benefit: "Improves oxygen delivery efficiency." },
    { name: "Foam Roll", setsReps: "10 minutes", muscles: "Recovery", benefit: "Supports tissue tolerance for training volume." },
    { name: "Easy Swim or Walk", setsReps: "25 minutes", muscles: "Active recovery", benefit: "Blood flow without added joint stress." },
    { name: "Sleep Routine", setsReps: "Habit", muscles: "Recovery", benefit: "Sleep is the primary endurance adaptation lever." },
  ],
  [
    { name: "Long Slow Distance", setsReps: "60-75 minutes", muscles: "Cardio", benefit: "Expands aerobic capacity for long events." },
    { name: "Progressive Long Run", setsReps: "50 minutes", muscles: "Cardio, legs", benefit: "Builds durability for longer efforts." },
    { name: "Fuel Practice", setsReps: "During run", muscles: "Fuel strategy", benefit: "Trains gut tolerance for race nutrition." },
    { name: "Hydration Check", setsReps: "Habit", muscles: "Hydration", benefit: "Supports performance in longer sessions." },
    { name: "Cooldown + Fuel", setsReps: "Post-run", muscles: "Recovery", benefit: "Replenishes glycogen for adaptation." },
  ],
  [
    { name: "Push-Up", setsReps: "4 x 15", muscles: "Chest, triceps", benefit: "Upper-body strength maintenance for posture." },
    { name: "Inverted Row", setsReps: "4 x 10", muscles: "Upper back", benefit: "Pulling balance for shoulder health." },
    { name: "Pallof Press", setsReps: "3 x 12", muscles: "Core", benefit: "Anti-rotation strength for running stability." },
    { name: "Side Plank", setsReps: "3 x 30s", muscles: "Obliques", benefit: "Lateral trunk endurance." },
    { name: "Dead Bug", setsReps: "3 x 10", muscles: "Deep core", benefit: "Low-load core control." },
  ],
  [
    { name: "Complete Rest Walk", setsReps: "20 minutes", muscles: "Recovery", benefit: "Minimal stress movement on a rest day." },
    { name: "Gentle Stretching", setsReps: "15 minutes", muscles: "Mobility", benefit: "Maintains range without fatigue." },
    { name: "Hydration Focus", setsReps: "Habit", muscles: "Recovery", benefit: "Supports next week’s training quality." },
    { name: "Sleep Extension", setsReps: "Habit", muscles: "Recovery", benefit: "Maximizes adaptation between hard weeks." },
    { name: "Plan Review", setsReps: "10 minutes", muscles: "Adherence", benefit: "Improves consistency for long-term endurance gains." },
  ],
];

const flexRows: Row[][] = [
  [
    { name: "Hip 90/90 Flow", setsReps: "3 x 5/side", muscles: "Hip rotation", benefit: "Improves hip internal/external rotation control." },
    { name: "Ankle Dorsiflexion Drill", setsReps: "3 x 12", muscles: "Ankles", benefit: "Improves squat depth mechanics." },
    { name: "Calf Stretch", setsReps: "3 x 30s", muscles: "Calves", benefit: "Improves ankle range for gait and squatting." },
    { name: "Deep Squat Hold", setsReps: "3 x 30s", muscles: "Hips, ankles", benefit: "Builds comfort in end-range hip flexion." },
    { name: "Toe Yoga", setsReps: "3 x 10", muscles: "Feet", benefit: "Improves foot stability for lower-body training." },
  ],
  [
    { name: "Thoracic Open Book", setsReps: "3 x 8/side", muscles: "T-spine", benefit: "Improves rotation for overhead positions." },
    { name: "Wall Slides", setsReps: "3 x 12", muscles: "Shoulders", benefit: "Improves scapular upward rotation." },
    { name: "Band Dislocates", setsReps: "3 x 12", muscles: "Shoulders", benefit: "Improves overhead mobility safely." },
    { name: "Neck Nods", setsReps: "2 x 10", muscles: "Neck", benefit: "Reduces forward-head tension." },
    { name: "Breathing Drill", setsReps: "5 minutes", muscles: "Diaphragm", benefit: "Improves rib cage expansion for posture." },
  ],
  [
    { name: "World's Greatest Stretch", setsReps: "3 rounds", muscles: "Hips, T-spine", benefit: "Multi-planar mobility in one sequence." },
    { name: "Inchworm", setsReps: "3 x 6", muscles: "Hamstrings, core", benefit: "Dynamic hamstring mobility with core control." },
    { name: "Bear Crawl", setsReps: "3 x 15m", muscles: "Shoulders, core", benefit: "Shoulder stability with spine control." },
    { name: "Lunge with Rotation", setsReps: "3 x 8/side", muscles: "Hips, spine", benefit: "Combines hip flexion with thoracic rotation." },
    { name: "Spiderman Stretch", setsReps: "3 x 6/side", muscles: "Hips", benefit: "Hip flexor and groin mobility." },
  ],
  [
    { name: "Recovery Walk", setsReps: "25 minutes", muscles: "Active recovery", benefit: "Low-stress circulation for tissue recovery." },
    { name: "Long Hold Hamstring", setsReps: "3 x 45s", muscles: "Hamstrings", benefit: "Improves posterior-chain extensibility." },
    { name: "Figure-4 Stretch", setsReps: "3 x 30s/side", muscles: "Glutes", benefit: "Glute and hip external rotation mobility." },
    { name: "Child's Pose Breathing", setsReps: "5 minutes", muscles: "Back, breathing", benefit: "Down-regulates stress and improves comfort." },
    { name: "Easy Foam Roll", setsReps: "10 minutes", muscles: "Tissue tolerance", benefit: "Supports recovery between mobility blocks." },
  ],
  [
    { name: "T-Spine Extension", setsReps: "3 x 8", muscles: "Mid-back", benefit: "Improves extension for overhead movement." },
    { name: "Serratus Wall Slide", setsReps: "3 x 12", muscles: "Serratus", benefit: "Improves scapular mechanics for pressing." },
    { name: "Prone Y Raise", setsReps: "3 x 12", muscles: "Rear delts", benefit: "Strengthens overhead shoulder stability." },
    { name: "Cross-Body Stretch", setsReps: "3 x 30s", muscles: "Posterior shoulder", benefit: "Improves shoulder internal rotation range." },
    { name: "Band External Rotation", setsReps: "3 x 15", muscles: "Rotator cuff", benefit: "Shoulder health for lifting longevity." },
  ],
  [
    { name: "Active Leg Swings", setsReps: "3 x 10", muscles: "Hips", benefit: "Dynamic hip mobility for training readiness." },
    { name: "Cossack Squat", setsReps: "3 x 6/side", muscles: "Adductors", benefit: "Frontal-plane hip mobility and strength." },
    { name: "Pigeon Stretch", setsReps: "3 x 45s/side", muscles: "Glutes", benefit: "Deep hip external rotation stretch." },
    { name: "Quadruped Rocking", setsReps: "3 x 10", muscles: "Hips, ankles", benefit: "Improves squat depth patterning." },
    { name: "Jefferson Curl (light)", setsReps: "3 x 8", muscles: "Spinal mobility", benefit: "Controlled spinal flexion range (light load)." },
  ],
  [
    { name: "Restorative Breathing", setsReps: "10 minutes", muscles: "Recovery", benefit: "Supports nervous system recovery." },
    { name: "Gentle Neck Circles", setsReps: "5 minutes", muscles: "Neck", benefit: "Reduces tension from desk posture." },
    { name: "Easy Walking", setsReps: "20 minutes", muscles: "Recovery", benefit: "Maintains steps without stress." },
    { name: "Light Stretching", setsReps: "15 minutes", muscles: "Full body", benefit: "Maintains range between training weeks." },
    { name: "Sleep Consistency", setsReps: "Habit", muscles: "Recovery", benefit: "Mobility adaptations consolidate with sleep." },
  ],
];

const brRows: Row[][] = [
  [
    { name: "Bench Press", setsReps: "5 x 5", muscles: "Chest, triceps", benefit: "Heavy pressing for strength retention while leaning out." },
    { name: "Pull-Up", setsReps: "4 x AMRAP", muscles: "Lats, biceps", benefit: "Vertical pull volume for back retention." },
    { name: "Row Erg", setsReps: "15 minutes", muscles: "Cardio, back", benefit: "Aerobic work to support fat loss." },
    { name: "Face Pull", setsReps: "3 x 15", muscles: "Rear delts", benefit: "Shoulder balance under pressing volume." },
    { name: "Farmer Carry", setsReps: "4 x 30m", muscles: "Grip, core", benefit: "Total-body work capacity without excessive fatigue." },
  ],
  [
    { name: "Leg Press", setsReps: "4 x 10", muscles: "Quads, glutes", benefit: "High volume leg stimulus for hypertrophy." },
    { name: "Bulgarian Split Squat", setsReps: "3 x 10/leg", muscles: "Quads, glutes", benefit: "Unilateral strength for balanced development." },
    { name: "Leg Curl", setsReps: "3 x 12", muscles: "Hamstrings", benefit: "Knee flexion volume for hamstring balance." },
    { name: "Hip Thrust", setsReps: "4 x 8", muscles: "Glutes", benefit: "Glute-focused hypertrophy for shape." },
    { name: "Cable Crunch", setsReps: "3 x 12", muscles: "Abs", benefit: "Core volume for definition and stability." },
  ],
  [
    { name: "Incline Walk", setsReps: "35 minutes", muscles: "Cardio", benefit: "Sustainable fat-loss support with low impact." },
    { name: "Mobility Circuit", setsReps: "20 minutes", muscles: "Hips, T-spine", benefit: "Maintains range for heavy training quality." },
    { name: "Dead Bug", setsReps: "3 x 10", muscles: "Core", benefit: "Low-load core control for spine safety." },
    { name: "Band Pull-Apart", setsReps: "3 x 15", muscles: "Upper back", benefit: "Posture support for desk athletes." },
    { name: "Breathing Walk", setsReps: "15 minutes", muscles: "Recovery", benefit: "Low-stress movement on a recovery-focused day." },
  ],
  [
    { name: "Incline Dumbbell Press", setsReps: "4 x 10", muscles: "Upper chest", benefit: "Hypertrophy emphasis for upper chest shape." },
    { name: "Cable Row", setsReps: "4 x 10", muscles: "Mid-back", benefit: "Horizontal pull volume for back thickness." },
    { name: "Lateral Raise", setsReps: "4 x 12", muscles: "Delts", benefit: "Shoulder width for aesthetic balance." },
    { name: "Triceps Rope Pushdown", setsReps: "3 x 12", muscles: "Triceps", benefit: "Arm definition without heavy elbow stress." },
    { name: "Hammer Curl", setsReps: "3 x 12", muscles: "Arms", benefit: "Arm hypertrophy for balanced upper body." },
  ],
  [
    { name: "Back Squat", setsReps: "5 x 5", muscles: "Quads, glutes", benefit: "Heavy lower-body strength for muscle retention." },
    { name: "Romanian Deadlift", setsReps: "4 x 8", muscles: "Hamstrings, glutes", benefit: "Posterior-chain hypertrophy while leaning out." },
    { name: "Assault Bike Intervals", setsReps: "10 x 20s / 100s", muscles: "Cardio", benefit: "Metabolic stimulus without long cardio sessions." },
    { name: "Walking Lunge", setsReps: "3 x 12/leg", muscles: "Legs", benefit: "Unilateral volume for leg shape." },
    { name: "Pallof Press", setsReps: "3 x 12", muscles: "Core", benefit: "Anti-rotation strength for heavy compounds." },
  ],
  [
    { name: "Yoga Flow", setsReps: "25 minutes", muscles: "Mobility", benefit: "Active recovery between hard training days." },
    { name: "Light Full-Body Circuit", setsReps: "20 minutes", muscles: "Full body", benefit: "Blood flow without heavy fatigue." },
    { name: "Stretching", setsReps: "15 minutes", muscles: "Mobility", benefit: "Maintains range for next training block." },
    { name: "Steps Target", setsReps: "8-10k steps", muscles: "Lifestyle", benefit: "Supports adherence and energy balance." },
    { name: "Protein Check", setsReps: "Habit", muscles: "Nutrition", benefit: "Protein supports muscle retention during fat loss." },
  ],
  [
    { name: "Rest Walk", setsReps: "25 minutes", muscles: "Recovery", benefit: "Minimal stress movement on a rest day." },
    { name: "Gentle Stretch", setsReps: "15 minutes", muscles: "Mobility", benefit: "Reduces tightness without training stress." },
    { name: "Hydration", setsReps: "Habit", muscles: "Recovery", benefit: "Supports performance and appetite regulation." },
    { name: "Sleep", setsReps: "Habit", muscles: "Recovery", benefit: "Sleep drives recomposition outcomes." },
    { name: "Weekly Review", setsReps: "10 minutes", muscles: "Adherence", benefit: "Improves consistency for long-term results." },
  ],
];

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
    dayPlans: buildDayPlans(
      [
        { day: "Monday", focus: "Full Body Strength + 20 min incline walk" },
        { day: "Tuesday", focus: "Low-impact cardio + mobility" },
        { day: "Wednesday", focus: "Lower Body Strength + core" },
        { day: "Thursday", focus: "Active recovery" },
        { day: "Friday", focus: "Upper Body Strength + intervals" },
        { day: "Saturday", focus: "Steady-state cardio" },
        { day: "Sunday", focus: "Rest" },
      ],
      wlRows
    ),
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
    dayPlans: buildDayPlans(
      [
        { day: "Monday", focus: "Push (chest, shoulders, triceps)" },
        { day: "Tuesday", focus: "Pull (back, biceps)" },
        { day: "Wednesday", focus: "Lower body hypertrophy" },
        { day: "Thursday", focus: "Rest / mobility" },
        { day: "Friday", focus: "Upper hypertrophy" },
        { day: "Saturday", focus: "Lower body + accessories" },
        { day: "Sunday", focus: "Rest" },
      ],
      mbRows
    ),
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
    dayPlans: buildDayPlans(
      [
        { day: "Monday", focus: "Heavy squat + accessory" },
        { day: "Tuesday", focus: "Heavy press + upper back" },
        { day: "Wednesday", focus: "Recovery + mobility" },
        { day: "Thursday", focus: "Heavy deadlift + posterior chain" },
        { day: "Friday", focus: "Volume bench + pull variations" },
        { day: "Saturday", focus: "Conditioning / weak-point work" },
        { day: "Sunday", focus: "Rest" },
      ],
      stRows
    ),
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
    dayPlans: buildDayPlans(
      [
        { day: "Monday", focus: "Zone 2 base cardio" },
        { day: "Tuesday", focus: "Lower body strength maintenance" },
        { day: "Wednesday", focus: "Tempo intervals" },
        { day: "Thursday", focus: "Mobility and breathing work" },
        { day: "Friday", focus: "Long easy session" },
        { day: "Saturday", focus: "Upper body + core" },
        { day: "Sunday", focus: "Rest" },
      ],
      enRows
    ),
  },
  {
    slug: "flexibility",
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
    dayPlans: buildDayPlans(
      [
        { day: "Monday", focus: "Hips + ankles mobility flow" },
        { day: "Tuesday", focus: "Upper body mobility + breathing" },
        { day: "Wednesday", focus: "Full-body movement circuit" },
        { day: "Thursday", focus: "Recovery walk + stretch" },
        { day: "Friday", focus: "Thoracic spine + shoulders" },
        { day: "Saturday", focus: "Active flexibility session" },
        { day: "Sunday", focus: "Rest" },
      ],
      flexRows
    ),
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
    dayPlans: buildDayPlans(
      [
        { day: "Monday", focus: "Upper strength + steps target" },
        { day: "Tuesday", focus: "Lower hypertrophy + core" },
        { day: "Wednesday", focus: "Low-intensity cardio + mobility" },
        { day: "Thursday", focus: "Upper hypertrophy" },
        { day: "Friday", focus: "Lower strength + intervals" },
        { day: "Saturday", focus: "Active recovery" },
        { day: "Sunday", focus: "Rest" },
      ],
      brRows
    ),
  },
];

export const programBySlug = (slug: string) =>
  programs.find((program) => program.slug === slug);
