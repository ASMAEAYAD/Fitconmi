// ═══════════════════════════════════════════════════════════════════
//  FitConMi — Program Definitions
//  6 programs: 3 women's + 3 men's — each production-ready.
// ═══════════════════════════════════════════════════════════════════

import type { Program } from "../types/fitness";

export const programs: Program[] = [

  // ══════════════════════════════════════════════════════════════
  //  WOMEN'S PROGRAMS
  // ══════════════════════════════════════════════════════════════

  {
    id: "womens-fat-loss",
    title: "Women's Fat Loss",
    slug: "womens-fat-loss",
    gender: "women",
    goal: "weight-loss",
    level: "beginner",
    durationWeeks: 8,
    daysPerWeek: 4,
    description:
      "A science-backed fat-loss program designed specifically for female physiology. Combines HIIT intervals with posterior-chain resistance training to maximize EPOC (Excess Post-Exercise Oxygen Consumption) while preserving lean muscle during a caloric deficit. Built on Tabata (1996) and Gibala (2012) protocols.",
    shortDesc: "HIIT + strength. Burn fat, keep muscle.",
    whoItsFor:
      "Women starting a fat-loss journey or returning after a break who want to lose body fat sustainably without crash dieting or extreme cardio.",
    benefits: [
      "Improved body composition without muscle loss",
      "36-hour EPOC metabolic boost after each session",
      "Stronger glutes, core, and posterior chain",
      "Better cardiovascular fitness and energy levels",
      "Evidence-based — not fads",
    ],
    avoidIf:
      "You are currently underweight, pregnant, or recovering from severe energy deficiency. Consult your GP before starting any high-intensity program.",
    phases: [
      {
        name: "Foundation",
        weekRange: [1, 2],
        description: "Learn the movement patterns. Lower intensity — focus on form, not weight.",
        keyFocus: ["Movement quality", "Habit building", "Aerobic base"],
      },
      {
        name: "Progression",
        weekRange: [3, 5],
        description: "Add load progressively. Heart rate targets rise. Introduce more compound work.",
        keyFocus: ["Progressive overload", "Intensity increase", "HIIT adaptation"],
      },
      {
        name: "Peak",
        weekRange: [6, 7],
        description: "Maximum intensity. Highest calorie burn. Push your limits.",
        keyFocus: ["Peak effort", "Density increase", "Metabolic finishers"],
      },
      {
        name: "Deload",
        weekRange: [8, 8],
        description: "50% volume, same weight. Recover, consolidate, prepare for the next block.",
        keyFocus: ["Recovery", "Technique refinement", "Performance test"],
      },
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Glute + Posterior Chain HIIT", isRest: false },
      { day: "Tuesday", focus: "Active Recovery", isRest: true },
      { day: "Wednesday", focus: "Upper Body Metabolic Circuit", isRest: false },
      { day: "Thursday", focus: "Active Recovery", isRest: true },
      { day: "Friday", focus: "Full-Body HIIT + Core", isRest: false },
      { day: "Saturday", focus: "Conditioning + Mobility", isRest: false },
      { day: "Sunday", focus: "Rest", isRest: true },
    ],
    science: {
      principle: "EPOC (Excess Post-Exercise Oxygen Consumption)",
      explanation:
        "Combining resistance training with HIIT maximises EPOC — your metabolism stays elevated for up to 36 hours post-workout, burning significantly more calories than steady-state cardio alone. Progressive overload preserves lean muscle during a caloric deficit, ensuring fat — not muscle — is the primary fuel source.",
      keyMetric: "EPOC Effect",
      keyMetricValue:
        "Resistance training creates metabolic disturbance that elevates oxygen consumption for 36 hours post-workout — the key to lasting fat loss.",
    },
    nutrition: [
      {
        icon: "🥩",
        label: "Protein 1.6g/kg",
        detail:
          "Eat 1.6g of protein per kg of bodyweight daily. This preserves lean tissue throughout the fat-loss phase and keeps hunger under control.",
      },
      {
        icon: "🩸",
        label: "Iron-Rich Foods",
        detail:
          "Prioritise iron-rich foods (leafy greens, legumes, red meat). Women lose iron monthly and deficiency severely impacts training energy.",
      },
      {
        icon: "⚖️",
        label: "10–15% Caloric Deficit",
        detail:
          "Eat at a 10–15% caloric deficit — aggressive restriction kills muscle and motivation. Sustainable deficit drives consistent progress.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&fit=crop&crop=faces",
    imageAlt:
      "Athletic woman performing high-intensity interval training with intense focus",
    cardImageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&fit=crop&crop=faces",
    tags: ["fat-loss", "hiit", "women", "beginner", "glutes", "metabolic"],
    featured: true,
  },

  {
    id: "womens-muscle-building",
    title: "Women's Muscle Building",
    slug: "womens-muscle-building",
    gender: "women",
    goal: "muscle-gain",
    level: "intermediate",
    durationWeeks: 8,
    daysPerWeek: 4,
    description:
      "Hypertrophy-focused program built on Schoenfeld's (2010) three mechanisms of muscle growth: mechanical tension, metabolic stress, and muscle damage. Designed for women who want visible muscle definition — without adding bulk — using the 8–12 rep range at 70–80% 1RM.",
    shortDesc: "Shape, tone, and build real strength.",
    whoItsFor:
      "Women with basic movement experience who want visible muscle definition, a stronger physique, and to experience what real strength training feels like.",
    benefits: [
      "Visible muscle shape and tone",
      "Higher resting metabolic rate",
      "Improved posture and body confidence",
      "Greater strength in everyday movements",
      "Bone density improvements (critical for women over 30)",
    ],
    avoidIf:
      "You cannot currently recover from 4 training sessions per week. Start with the Fat Loss program to build your base first.",
    phases: [
      {
        name: "Foundation",
        weekRange: [1, 2],
        description: "Establish the mind-muscle connection. 2-1-2 tempo on all movements.",
        keyFocus: ["Technique mastery", "Tempo training", "Progressive adaptation"],
      },
      {
        name: "Progression",
        weekRange: [3, 5],
        description: "Add load every session. Volume increases. Hit the hypertrophy zone.",
        keyFocus: ["Progressive overload", "Volume accumulation", "Metabolic stress"],
      },
      {
        name: "Peak",
        weekRange: [6, 7],
        description: "Maximum hypertrophy stimulus. High volume and intensity.",
        keyFocus: ["Peak volume", "Intensifying techniques", "Mind-muscle mastery"],
      },
      {
        name: "Deload",
        weekRange: [8, 8],
        description: "50% sets, same weight. Adaptation occurs during recovery.",
        keyFocus: ["Recovery", "Super-compensation", "Next-block prep"],
      },
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Glutes + Legs (Primary)", isRest: false },
      { day: "Tuesday", focus: "Back + Biceps", isRest: false },
      { day: "Wednesday", focus: "Rest / Light Mobility", isRest: true },
      { day: "Thursday", focus: "Chest + Shoulders + Triceps", isRest: false },
      { day: "Friday", focus: "Glutes + Legs (Secondary)", isRest: false },
      { day: "Saturday", focus: "Rest", isRest: true },
      { day: "Sunday", focus: "Rest", isRest: true },
    ],
    science: {
      principle: "Hypertrophy — Three Mechanisms",
      explanation:
        "Hypertrophy requires mechanical tension, metabolic stress, and muscle damage. The 8–12 rep range at 70–80% 1RM simultaneously optimises all three mechanisms for peak muscle protein synthesis. Progressive overload — consistently adding load, reps, or volume over time — is the non-negotiable driver of muscle growth.",
      keyMetric: "Progressive Overload",
      keyMetricValue:
        "Systematically increasing training stimulus forces continuous adaptation — the non-negotiable foundation of muscle growth.",
    },
    nutrition: [
      {
        icon: "🥩",
        label: "Protein 1.8g/kg",
        detail:
          "Eat at a slight caloric surplus (200–300 kcal) focused on protein (1.6–1.8g/kg). Muscle growth requires a positive energy balance.",
      },
      {
        icon: "🍚",
        label: "Carb Timing",
        detail:
          "Don't fear carbohydrates — they're the primary fuel for hypertrophy training. Prioritise carbs pre and post-workout.",
      },
      {
        icon: "💤",
        label: "Sleep Recovery",
        detail:
          "Post-workout nutrition within 2 hours optimises muscle protein synthesis. Sleep 7–9 hours — most muscle repair and hormonal regulation happens during deep sleep.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80&fit=crop&crop=faces",
    imageAlt:
      "Woman performing dumbbell strength training with intense focus in a professional gym",
    cardImageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&fit=crop&crop=faces",
    tags: ["muscle-gain", "hypertrophy", "women", "intermediate", "strength", "glutes"],
    featured: true,
  },

  {
    id: "womens-strength",
    title: "Women's Strength Training",
    slug: "womens-strength",
    gender: "women",
    goal: "strength",
    level: "advanced",
    durationWeeks: 8,
    daysPerWeek: 4,
    description:
      "Neural adaptation-focused strength program applying percentage-based loading (75–95% 1RM) across the big four movements: squat, deadlift, press, and row. Applies Westside and Sheiko periodization principles adapted for female physiology.",
    shortDesc: "Build elite strength with science-backed periodization.",
    whoItsFor:
      "Women with solid technique in compound lifts who want to pursue serious strength goals — heavier lifts, performance PRs, and real athletic achievement.",
    benefits: [
      "Higher 1RM potential in key lifts",
      "Improved neural efficiency (more motor units recruited)",
      "More resilient movement patterns",
      "Bone density increases (30%+ more density than cardio-only)",
      "Confidence that extends far beyond the gym",
    ],
    avoidIf:
      "You have unresolved joint pain under heavy loading. Address the pain source before attempting heavy percentage-based work.",
    phases: [
      {
        name: "Foundation",
        weekRange: [1, 2],
        description: "70–75% 1RM — technique is perfect or you add no weight.",
        keyFocus: ["Bar speed", "Technique groove", "Bracing patterns"],
      },
      {
        name: "Progression",
        weekRange: [3, 5],
        description: "80–85% 1RM — strength territory. RPE 7–8.",
        keyFocus: ["Neural adaptation", "Force production", "Max strength accumulation"],
      },
      {
        name: "Peak",
        weekRange: [6, 7],
        description: "90–95% 1RM — maximal neural recruitment. RPE 9+.",
        keyFocus: ["Peak neural drive", "Competition prep", "PR attempts"],
      },
      {
        name: "Deload",
        weekRange: [8, 8],
        description: "50% volume, 60% intensity. Recovery is where strength is built.",
        keyFocus: ["CNS recovery", "Pattern reinforcement", "Testing preparation"],
      },
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Heavy Squat + Accessories", isRest: false },
      { day: "Tuesday", focus: "Heavy Press + Upper Back", isRest: false },
      { day: "Wednesday", focus: "Recovery + Mobility", isRest: true },
      { day: "Thursday", focus: "Heavy Deadlift + Posterior Chain", isRest: false },
      { day: "Friday", focus: "Volume Bench + Pull Variations", isRest: false },
      { day: "Saturday", focus: "Conditioning + Weak-Point Work", isRest: false },
      { day: "Sunday", focus: "Rest", isRest: true },
    ],
    science: {
      principle: "Neural Adaptation",
      explanation:
        "Maximal strength is primarily a neural adaptation. Training at 85–90% 1RM teaches the nervous system to recruit more motor units simultaneously — delivering strength gains before muscles even visually grow. Periodization — cycling between volume, intensity, and deload phases — prevents neural fatigue and continuously drives strength adaptation without regression.",
      keyMetric: "Motor Unit Synchronization",
      keyMetricValue:
        "Before muscle grows, your nervous system learns to recruit more motor units — delivering measurable strength gains within 2–3 weeks.",
    },
    nutrition: [
      {
        icon: "🥩",
        label: "Protein 1.8g/kg",
        detail:
          "Eat at maintenance or a slight surplus. Protein 1.8g/kg to support recovery under heavy loading.",
      },
      {
        icon: "🩸",
        label: "Iron + Vitamin D",
        detail:
          "Iron is critical for women under heavy training loads. Vitamin D3 supports bone density and hormonal health essential for peak strength performance.",
      },
      {
        icon: "💤",
        label: "Sleep 8+ Hours",
        detail:
          "Sleep is the primary productivity factor for strength development. Growth hormone — the body's primary tissue repair signal — peaks during deep sleep.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=1200&q=80&fit=crop&crop=faces",
    imageAlt: "Athletic woman performing heavy barbell strength training",
    cardImageUrl:
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800&q=80&fit=crop&crop=faces",
    tags: ["strength", "powerlifting", "women", "advanced", "compound"],
    featured: false,
  },

  // ══════════════════════════════════════════════════════════════
  //  MEN'S PROGRAMS
  // ══════════════════════════════════════════════════════════════

  {
    id: "mens-hypertrophy",
    title: "Men's Hypertrophy (Push/Pull/Legs)",
    slug: "mens-hypertrophy",
    gender: "men",
    goal: "muscle-gain",
    level: "intermediate",
    durationWeeks: 8,
    daysPerWeek: 6,
    description:
      "Classic Push/Pull/Legs (PPL) split run twice per week — the most validated hypertrophy split in sports science literature. Built on Schoenfeld's 2010 hypertrophy framework: 10–20 sets per muscle per week, 70–80% 1RM, 60–90 second inter-set rest. Progressive overload every session.",
    shortDesc: "Classic PPL split. Maximum muscle, proven science.",
    whoItsFor:
      "Men with at least 6 months of consistent lifting experience who want to maximise muscle size and achieve a balanced, aesthetic physique.",
    benefits: [
      "Maximum muscle hypertrophy — every major group hit twice weekly",
      "Proven split structure used by natural bodybuilders worldwide",
      "Balanced development — no neglected muscle groups",
      "Progressive overload built into the program architecture",
      "Higher resting metabolic rate",
    ],
    avoidIf:
      "You cannot currently recover from 6 training sessions per week. Start with the Fat Loss or Body Recomp program, then graduate here.",
    phases: [
      {
        name: "Foundation",
        weekRange: [1, 2],
        description: "4×12 at 2-1-2 tempo. Establish form, establish the lift selection.",
        keyFocus: ["Form mastery", "Mind-muscle connection", "Volume acclimatisation"],
      },
      {
        name: "Progression",
        weekRange: [3, 5],
        description: "4×10 at heavier loads. Linear progression each session.",
        keyFocus: ["Progressive overload", "Volume-intensity balance", "Hypertrophic accumulation"],
      },
      {
        name: "Peak",
        weekRange: [6, 7],
        description: "4×8 at peak weights. Intensification techniques — rest-pause, drop sets.",
        keyFocus: ["Intensification", "Maximum hypertrophic stimulus", "Advanced techniques"],
      },
      {
        name: "Deload",
        weekRange: [8, 8],
        description: "3×8 at 60% of peak weight. Active recovery and super-compensation.",
        keyFocus: ["CNS recovery", "Muscle repair", "Next block readiness"],
      },
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Push — Chest, Shoulders, Triceps", isRest: false },
      { day: "Tuesday", focus: "Pull — Back, Biceps", isRest: false },
      { day: "Wednesday", focus: "Legs — Quads, Hamstrings, Glutes", isRest: false },
      { day: "Thursday", focus: "Push — Variation", isRest: false },
      { day: "Friday", focus: "Pull — Variation", isRest: false },
      { day: "Saturday", focus: "Legs — Variation + Calves", isRest: false },
      { day: "Sunday", focus: "Rest", isRest: true },
    ],
    science: {
      principle: "Hypertrophy Volume",
      explanation:
        "10–20 weekly sets per muscle group is the empirically validated range for maximising hypertrophy (Schoenfeld, 2017). The PPL split achieves this by hitting each major group twice per week with different movement patterns — ensuring full stimulus coverage while allowing adequate recovery between sessions.",
      keyMetric: "Weekly Volume",
      keyMetricValue:
        "Research confirms muscles must receive 10–20 hard sets per week to maximally grow. PPL twice-weekly achieves this threshold consistently.",
    },
    nutrition: [
      {
        icon: "🥩",
        label: "Protein 2.2g/kg",
        detail:
          "Target 2.2g of protein per kg of bodyweight daily. Creatine monohydrate (3–5g/day) adds measurable strength and cell hydration for hypertrophy.",
      },
      {
        icon: "📈",
        label: "300–500 kcal Surplus",
        detail:
          "Eat at a 300–500 kcal surplus — excessive bulking adds fat, not muscle. Time protein and carbs around training sessions for optimal muscle protein synthesis.",
      },
      {
        icon: "💤",
        label: "Sleep 8–9 Hours",
        detail:
          "Testosterone peaks during deep sleep — the primary muscle-building hormone. Sleep 8–9 hours for maximum anabolic environment.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=1200&q=80&fit=crop&crop=faces",
    imageAlt:
      "Muscular man performing heavy dumbbell training with exceptional form",
    cardImageUrl:
      "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=800&q=80&fit=crop&crop=faces",
    tags: ["muscle-gain", "hypertrophy", "men", "intermediate", "ppl", "strength"],
    featured: true,
  },

  {
    id: "mens-strength",
    title: "Men's Powerlifting Strength",
    slug: "mens-strength",
    gender: "men",
    goal: "strength",
    level: "advanced",
    durationWeeks: 8,
    daysPerWeek: 5,
    description:
      "Percentage-based linear periodization built on Westside Barbell and Sheiko programming principles. Heavy squat, deadlift, and bench press at 75–95% 1RM across a 5-day split. Neural adaptation and force production is the goal — physique is a side-effect.",
    shortDesc: "Squat, deadlift, bench — maximum force production.",
    whoItsFor:
      "Experienced lifters targeting performance milestones — 3-plate squat, 4-plate deadlift, 2-plate bench — with structured periodization to get there without injury.",
    benefits: [
      "Higher 1RM in squat, deadlift, and bench press",
      "Improved neural efficiency — more motor units recruited simultaneously",
      "More resilient, powerful movement patterns",
      "Improved hormonal profile (testosterone, GH)",
      "Athletic carry-over to sports performance",
    ],
    avoidIf:
      "You have unresolved joint pain under heavy loading. Address the source before heavy percentage-based work.",
    phases: [
      {
        name: "Foundation",
        weekRange: [1, 2],
        description: "5×5 at 70–75% 1RM. Bar speed is the metric — not weight.",
        keyFocus: ["Bar speed", "Technique consistency", "Bracing and positioning"],
      },
      {
        name: "Progression",
        weekRange: [3, 5],
        description: "4×4 at 80–85% 1RM. RPE 7–8. Strength is building weekly.",
        keyFocus: ["Heavy loading", "Accessory strength", "Neural drive"],
      },
      {
        name: "Peak",
        weekRange: [6, 7],
        description: "3×3 at 90–95% 1RM. Max neural recruitment. Careful with recovery.",
        keyFocus: ["Supramaximal loads", "Peak neural recruitment", "Competition prep"],
      },
      {
        name: "Deload",
        weekRange: [8, 8],
        description: "50% volume, 60% intensity. CNS recovery — where strength is built.",
        keyFocus: ["CNS recovery", "Deload protocol", "Testing in week 9"],
      },
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Heavy Squat Day", isRest: false },
      { day: "Tuesday", focus: "Heavy Bench + Upper Back", isRest: false },
      { day: "Wednesday", focus: "Recovery + Mobility", isRest: true },
      { day: "Thursday", focus: "Heavy Deadlift Day", isRest: false },
      { day: "Friday", focus: "Volume Bench + Accessories", isRest: false },
      { day: "Saturday", focus: "Conditioning + Weak Points", isRest: false },
      { day: "Sunday", focus: "Rest", isRest: true },
    ],
    science: {
      principle: "Neural Strength Adaptation",
      explanation:
        "At 90%+ 1RM, the squat produces the highest combined electrical activity across the lower body musculature of any exercise. Neural efficiency is the dominant adaptation — the CNS learns to recruit Type IIa and IIx motor units simultaneously. 3–5 minutes full ATP-PCr recovery between sets is mandatory.",
      keyMetric: "Motor Unit Recruitment",
      keyMetricValue:
        "At 90%+ 1RM, bar velocity slows but motor unit recruitment approaches 100% — the only loading zone that fully adapts Type IIx fast-twitch fibers.",
    },
    nutrition: [
      {
        icon: "🥩",
        label: "Protein 2.2g/kg",
        detail:
          "Protein 2.2g/kg is the evidence-based ceiling for muscle protein synthesis in strength athletes. Distribute across 4–5 meals.",
      },
      {
        icon: "💊",
        label: "Creatine 5g/day",
        detail:
          "Creatine monohydrate (5g/day) is the most studied performance supplement in existence. Increases intramuscular phosphocreatine stores — the fuel for maximal strength efforts lasting 1–10 seconds.",
      },
      {
        icon: "🍚",
        label: "Carb Timing",
        detail:
          "High carbohydrate meals 3–4 hours before heavy sessions maximise muscle glycogen — the fuel for maximal effort sets. Post-training: 50g carbs + protein within 30 minutes.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80&fit=crop&crop=faces",
    imageAlt: "Powerlifter performing heavy barbell squat with exceptional form",
    cardImageUrl:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80&fit=crop&crop=faces",
    tags: ["strength", "powerlifting", "men", "advanced", "squat", "deadlift", "bench"],
    featured: false,
  },

  {
    id: "mens-fat-loss",
    title: "Men's Body Recomposition",
    slug: "mens-fat-loss",
    gender: "men",
    goal: "body-recomposition",
    level: "intermediate",
    durationWeeks: 8,
    daysPerWeek: 5,
    description:
      "Simultaneous fat loss and muscle retention through strength training at caloric maintenance. Based on Barakat et al. (2020): high-protein diet (2.2g/kg) + resistance training signals the body to spare muscle while oxidising fat stores. 5-day upper/lower/cardio split.",
    shortDesc: "Lose fat. Keep muscle. Transform your physique.",
    whoItsFor:
      "Men who want visible body composition changes without an aggressive bulk-cut cycle. Ideal for those starting from 18–30% body fat who want to build a strong athletic foundation.",
    benefits: [
      "Simultaneous fat loss and muscle gain (recomposition)",
      "Sustainable results — not just weight loss",
      "Improved metabolic health markers",
      "Stronger, more functional physique",
      "Better hormonal profile through muscle retention",
    ],
    avoidIf:
      "You need rapid short-term weight changes for sport competition. This is a long-game approach — minimum 12–16 weeks for full transformation.",
    phases: [
      {
        name: "Foundation",
        weekRange: [1, 2],
        description: "Establish movement patterns, caloric baseline, and protein targets.",
        keyFocus: ["Habit formation", "Movement quality", "Nutrition structure"],
      },
      {
        name: "Progression",
        weekRange: [3, 5],
        description: "Progressive overload on strength work; cardio volume increases.",
        keyFocus: ["Strength progression", "Cardiovascular base", "Fat oxidation"],
      },
      {
        name: "Peak",
        weekRange: [6, 7],
        description: "Maximum training density — HIIT intervals + heavy compound work.",
        keyFocus: ["Peak effort", "Metabolic drive", "Composition shift"],
      },
      {
        name: "Deload",
        weekRange: [8, 8],
        description: "50% volume. Active recovery. Body composition testing.",
        keyFocus: ["Recovery", "Measurements", "Next phase planning"],
      },
    ],
    weeklySchedule: [
      { day: "Monday", focus: "Upper Strength + Steps Target", isRest: false },
      { day: "Tuesday", focus: "Lower Hypertrophy + Core", isRest: false },
      { day: "Wednesday", focus: "Low-Intensity Cardio + Mobility", isRest: false },
      { day: "Thursday", focus: "Upper Hypertrophy", isRest: false },
      { day: "Friday", focus: "Lower Strength + HIIT Intervals", isRest: false },
      { day: "Saturday", focus: "Active Recovery", isRest: true },
      { day: "Sunday", focus: "Rest", isRest: true },
    ],
    science: {
      principle: "Protein-Sparing Recomposition",
      explanation:
        "Body recomposition — losing fat and gaining muscle simultaneously — is achievable at caloric maintenance with high protein intake (2+ g/kg) and consistent resistance training (Barakat et al., 2020). Resistance training sends the anabolic signal to build and preserve muscle, while caloric balance ensures fat stores are oxidised for energy.",
      keyMetric: "Protein-Sparing Effect",
      keyMetricValue:
        "High protein combined with resistance training signals the body to spare muscle while oxidising fat — the metabolic core of recomposition.",
    },
    nutrition: [
      {
        icon: "🥩",
        label: "Protein 2.2g/kg",
        detail:
          "Protein 2.2g/kg is non-negotiable. It is the single most critical nutritional lever for maintaining muscle while losing fat.",
      },
      {
        icon: "💊",
        label: "Creatine 5g/day",
        detail:
          "Creatine monohydrate (5g/day) maintains muscle strength and cell hydration during a recomposition phase, preventing strength losses.",
      },
      {
        icon: "📈",
        label: "Caloric Maintenance",
        detail:
          "Eat at maintenance calories (or a very slight 5% deficit). The goal is composition change — not scale weight loss. Track protein, not just calories.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80&fit=crop&crop=faces",
    imageAlt: "Athletic man performing a barbell squat showing muscle definition and strength",
    cardImageUrl:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80&fit=crop&crop=faces",
    tags: ["body-recomposition", "fat-loss", "men", "intermediate", "strength", "hiit"],
    featured: true,
  },
];

// ── Lookup helpers ────────────────────────────────────────────────

export const programById = (id: string): Program | undefined =>
  programs.find((p) => p.id === id);

export const programBySlug = (slug: string): Program | undefined =>
  programs.find((p) => p.slug === slug);

export const programsByGender = (gender: string): Program[] =>
  programs.filter((p) => p.gender === gender || p.gender === "both");

export const programsByGoal = (goal: string): Program[] =>
  programs.filter((p) => p.goal === goal);

export const programsByLevel = (level: string): Program[] =>
  programs.filter((p) => p.level === level);

export const featuredPrograms = (): Program[] =>
  programs.filter((p) => p.featured);
