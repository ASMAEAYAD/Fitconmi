"use client";

import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────────────────────────────────────── */
type Program = {
  slug: string;
  name: string;
  image: string;
  goal: string;
  science: string;
  exercises: string[];
  duration: string;
  frequency: string;
  whyItWorks: string;
  recommended?: boolean;
  weeklySchedule: { day: string; focus: string }[];
};

type Gender = "woman" | "man";
type Phase = "quiz" | "grid" | "detail";

const IMGS: Record<string, string> = {
  "weight-loss": "https://images.unsplash.com/photo-1549570652-97324981a6fd?w=800&q=80",
  "muscle-building": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80",
  "strength-training": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
  endurance: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
  flexibility: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  "body-recomposition": "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=800&q=80",
};

const WOMEN: Program[] = [
  {
    slug: "weight-loss", name: "Weight Loss", image: IMGS["weight-loss"],
    goal: "Lose fat while preserving lean muscle",
    science: "Combines HIIT and resistance training to maximise EPOC (excess post-exercise oxygen consumption), keeping your metabolism elevated long after the session ends.",
    exercises: ["Hip thrusts", "Romanian deadlifts", "Cable kickbacks", "Jump rope intervals", "Plank variations"],
    duration: "12 weeks", frequency: "4x / week", recommended: true,
    whyItWorks: "Women respond better to mixed-modality training for fat loss than cardio alone. The resistance + interval combination preserves muscle while accelerating fat burn.",
    weeklySchedule: [
      { day: "Monday", focus: "HIIT + lower resistance" },
      { day: "Tuesday", focus: "Active recovery / mobility" },
      { day: "Wednesday", focus: "Full-body resistance" },
      { day: "Thursday", focus: "Rest" },
      { day: "Friday", focus: "HIIT circuits" },
      { day: "Saturday", focus: "Light cardio / walk" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "body-recomposition", name: "Body Recomposition", image: IMGS["body-recomposition"],
    goal: "Lose fat and build lean muscle simultaneously",
    science: "Caloric balance at maintenance with high protein (2 g/kg body weight) triggers recomposition — your body uses dietary protein to build muscle while pulling energy from fat stores.",
    exercises: ["Full-body circuits", "Compound lifts", "HIIT finishers", "Goblet squats", "Cable rows"],
    duration: "20 weeks", frequency: "4x / week", recommended: true,
    whyItWorks: "Recomposition works best for women newer to consistent training. High-protein nutrition protects lean tissue while the caloric structure drives sustainable fat loss.",
    weeklySchedule: [
      { day: "Monday", focus: "Full-body strength A" },
      { day: "Tuesday", focus: "HIIT conditioning" },
      { day: "Wednesday", focus: "Rest / walk" },
      { day: "Thursday", focus: "Full-body strength B" },
      { day: "Friday", focus: "HIIT finisher" },
      { day: "Saturday", focus: "Active recovery" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "flexibility", name: "Flexibility & Mobility", image: IMGS["flexibility"],
    goal: "Improve range of motion, reduce injury risk, enhance posture",
    science: "PNF stretching and yoga-based mobility increase fascia elasticity and joint range, improving both performance and injury resilience.",
    exercises: ["Hip flexor stretch", "Pigeon pose", "Thoracic rotations", "Hamstring stretches", "Shoulder mobility flows"],
    duration: "8 weeks", frequency: "5x / week", recommended: true,
    whyItWorks: "Consistent mobility work rewires movement patterns, reduces chronic tension, and builds the body awareness needed to stay strong and confident in everyday life.",
    weeklySchedule: [
      { day: "Monday", focus: "Hips + lower body mobility" },
      { day: "Tuesday", focus: "Shoulders + thoracic spine" },
      { day: "Wednesday", focus: "Full-body flow" },
      { day: "Thursday", focus: "Restorative / breathwork" },
      { day: "Friday", focus: "Dynamic mobility session" },
      { day: "Saturday", focus: "Optional gentle yoga" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "muscle-building", name: "Toning & Muscle Building", image: IMGS["muscle-building"],
    goal: "Build lean muscle and improve body composition",
    science: "Progressive overload with moderate weights (65–75 % 1RM) triggers hypertrophy without excessive bulk, sculpting a strong and defined physique.",
    exercises: ["Goblet squats", "Dumbbell lunges", "Lat pulldowns", "Dumbbell rows", "Incline press"],
    duration: "16 weeks", frequency: "4x / week",
    whyItWorks: "Women have lower testosterone but higher estrogen, which supports muscle endurance and recovery. This program leverages your hormonal environment for sustainable, confident gains.",
    weeklySchedule: [
      { day: "Monday", focus: "Upper push (chest, shoulders, triceps)" },
      { day: "Tuesday", focus: "Lower body (quads, glutes)" },
      { day: "Wednesday", focus: "Rest / active recovery" },
      { day: "Thursday", focus: "Upper pull (back, biceps)" },
      { day: "Friday", focus: "Full-body compound session" },
      { day: "Saturday", focus: "Light cardio / mobility" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "endurance", name: "Endurance", image: IMGS["endurance"],
    goal: "Build cardiovascular fitness and sustainable stamina",
    science: "Zone 2 training improves mitochondrial density, meaning your cells generate more energy per oxygen molecule — giving you lasting energy all day.",
    exercises: ["Running intervals", "Cycling", "Rowing", "Stair climber", "Bodyweight circuits"],
    duration: "12 weeks", frequency: "5x / week",
    whyItWorks: "A structured aerobic base makes every other workout more effective. As your engine grows stronger, recovery improves and everyday fatigue drops.",
    weeklySchedule: [
      { day: "Monday", focus: "Zone 2 steady-state cardio" },
      { day: "Tuesday", focus: "Bodyweight strength circuit" },
      { day: "Wednesday", focus: "Interval training" },
      { day: "Thursday", focus: "Cross-training (cycling / rowing)" },
      { day: "Friday", focus: "Long easy run or bike" },
      { day: "Saturday", focus: "Active recovery" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "strength-training", name: "Strength Training", image: IMGS["strength-training"],
    goal: "Build functional strength and unshakeable confidence",
    science: "Neuromuscular adaptation through compound movements improves strength without significant size increase, while directly increasing bone density.",
    exercises: ["Barbell squat", "Deadlift", "Bench press", "Overhead press", "Pull-ups"],
    duration: "16 weeks", frequency: "3x / week",
    whyItWorks: "Strength training increases bone density — crucial for women's long-term health and injury prevention. Lifting heavy is one of the most empowering habits you can build.",
    weeklySchedule: [
      { day: "Monday", focus: "Squat focus + accessories" },
      { day: "Tuesday", focus: "Rest / mobility" },
      { day: "Wednesday", focus: "Bench press + upper pull" },
      { day: "Thursday", focus: "Rest" },
      { day: "Friday", focus: "Deadlift + posterior chain" },
      { day: "Saturday", focus: "Optional light cardio" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
];

const MEN: Program[] = [
  {
    slug: "muscle-building", name: "Hypertrophy", image: IMGS["muscle-building"],
    goal: "Maximise muscle size and definition",
    science: "The 8–12 rep range at 70–80 % 1RM with progressive overload is the optimal stimulus for hypertrophy, triggering satellite cell activation and peak muscle protein synthesis.",
    exercises: ["Bench press", "Incline dumbbell press", "Barbell rows", "Pull-ups", "Preacher curls", "Tricep dips"],
    duration: "16 weeks", frequency: "5x / week", recommended: true,
    whyItWorks: "Male testosterone levels directly support muscle protein synthesis. This program is engineered to exploit that hormonal advantage for maximum size and strength gains.",
    weeklySchedule: [
      { day: "Monday", focus: "Chest + triceps (push)" },
      { day: "Tuesday", focus: "Back + biceps (pull)" },
      { day: "Wednesday", focus: "Legs — quads, glutes, hamstrings" },
      { day: "Thursday", focus: "Shoulders + traps" },
      { day: "Friday", focus: "Arms + lagging muscle groups" },
      { day: "Saturday", focus: "Rest" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "strength-training", name: "Strength Training", image: IMGS["strength-training"],
    goal: "Build maximum strength across all major lifts",
    science: "Neural adaptations from the 3–6 rep range at 85 %+ 1RM increase maximal force output faster than hypertrophy training. Periodisation continuously prevents plateaus.",
    exercises: ["Squat", "Deadlift", "Bench press", "Overhead press", "Power clean"],
    duration: "20 weeks", frequency: "4x / week", recommended: true,
    whyItWorks: "Periodisation continuously challenges the nervous system, driving adaptation cycles that keep strength climbing throughout the programme — no plateaus, no ceiling.",
    weeklySchedule: [
      { day: "Monday", focus: "Squat day — heavy + accessory" },
      { day: "Tuesday", focus: "Bench press + upper back" },
      { day: "Wednesday", focus: "Rest / mobility" },
      { day: "Thursday", focus: "Deadlift + posterior chain" },
      { day: "Friday", focus: "Overhead press + weak-point work" },
      { day: "Saturday", focus: "Optional conditioning" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "body-recomposition", name: "Body Recomposition", image: IMGS["body-recomposition"],
    goal: "Build muscle and burn fat simultaneously",
    science: "High protein (2.2 g/kg) combined with caloric cycling optimises the hormonal environment for simultaneous fat loss and muscle gain — no traditional bulk-cut needed.",
    exercises: ["Compound lifts", "Supersets", "HIIT", "Loaded carries", "Cable work"],
    duration: "20 weeks", frequency: "5x / week", recommended: true,
    whyItWorks: "Caloric cycling keeps metabolism high while protein preserves and builds muscle. The result: a harder, leaner physique without the time cost of a traditional bulk-cut cycle.",
    weeklySchedule: [
      { day: "Monday", focus: "Upper push (strength emphasis)" },
      { day: "Tuesday", focus: "Lower body (strength emphasis)" },
      { day: "Wednesday", focus: "Metabolic HIIT" },
      { day: "Thursday", focus: "Upper pull (hypertrophy)" },
      { day: "Friday", focus: "Full-body HIIT finisher" },
      { day: "Saturday", focus: "Active recovery" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "weight-loss", name: "Weight Loss", image: IMGS["weight-loss"],
    goal: "Burn fat while maintaining muscle mass",
    science: "Combines strength training with metabolic conditioning to preserve testosterone levels and muscle while creating a consistent caloric deficit.",
    exercises: ["Barbell deadlifts", "Weighted squats", "Battle ropes", "Sled push", "Kettlebell swings"],
    duration: "12 weeks", frequency: "4x / week",
    whyItWorks: "Men's higher baseline muscle mass means resistance training burns significantly more calories at rest. This programme builds on that advantage to accelerate fat loss.",
    weeklySchedule: [
      { day: "Monday", focus: "Strength circuit A" },
      { day: "Tuesday", focus: "Metabolic conditioning" },
      { day: "Wednesday", focus: "Rest" },
      { day: "Thursday", focus: "Strength circuit B" },
      { day: "Friday", focus: "HIIT + finisher" },
      { day: "Saturday", focus: "Active recovery" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "endurance", name: "Endurance", image: IMGS["endurance"],
    goal: "Build elite cardiovascular capacity",
    science: "VO₂ max training and lactate threshold work improve oxygen utilisation and sustained power output, transforming you into a true endurance athlete.",
    exercises: ["Long runs", "Interval sprints", "Cycling", "Swimming", "Rowing"],
    duration: "16 weeks", frequency: "5x / week",
    whyItWorks: "Structured aerobic periodisation pushes your VO₂ max higher each block. Combined with lactate threshold work, you'll dominate at higher intensities for longer.",
    weeklySchedule: [
      { day: "Monday", focus: "Easy base run" },
      { day: "Tuesday", focus: "Interval sprints" },
      { day: "Wednesday", focus: "Cross-training (cycling / swim)" },
      { day: "Thursday", focus: "Tempo run" },
      { day: "Friday", focus: "Long slow distance" },
      { day: "Saturday", focus: "Active recovery" },
      { day: "Sunday", focus: "Rest" },
    ],
  },
  {
    slug: "flexibility", name: "Flexibility & Mobility", image: IMGS["flexibility"],
    goal: "Improve athletic performance and eliminate injury risk",
    science: "Dynamic stretching pre-workout increases power output by 5–8 %. Consistent mobility work removes the hidden limiters on your strength and performance ceiling.",
    exercises: ["Hip mobility drills", "Thoracic spine rotations", "Ankle mobility", "Foam rolling", "Dynamic warm-ups"],
    duration: "8 weeks", frequency: "Daily",
    whyItWorks: "Athletes who move better, lift better. Expanding your range of motion directly improves strength mechanics and unlocks power you didn't know you had.",
    weeklySchedule: [
      { day: "Monday", focus: "Hip flexors + glutes" },
      { day: "Tuesday", focus: "Thoracic spine + shoulders" },
      { day: "Wednesday", focus: "Ankle + knee mobility" },
      { day: "Thursday", focus: "Full lower-body flow" },
      { day: "Friday", focus: "Dynamic warm-up protocol" },
      { day: "Saturday", focus: "Foam roll + restorative" },
      { day: "Sunday", focus: "Breathwork + light stretch" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function GenderPrograms() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [selected, setSelected] = useState<Program | null>(null);
  const [fading, setFading] = useState(false);

  function go(fn: () => void) {
    setFading(true);
    setTimeout(() => { fn(); setFading(false); }, 380);
  }

  const programs = gender === "woman" ? WOMEN : gender === "man" ? MEN : [];

  return (
    <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.38s ease" }}>
      {phase === "quiz" && (
        <GenderQuiz
          onChoose={(g) => go(() => { setGender(g); setPhase("grid"); })}
        />
      )}
      {phase === "grid" && gender && (
        <ProgramsGrid
          programs={programs}
          gender={gender}
          onSelect={(p) => go(() => { setSelected(p); setPhase("detail"); })}
          onBack={() => go(() => { setGender(null); setPhase("quiz"); })}
        />
      )}
      {phase === "detail" && selected && gender && (
        <ProgramDetail
          program={selected}
          gender={gender}
          onBack={() => go(() => { setSelected(null); setPhase("grid"); })}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   GENDER QUIZ
───────────────────────────────────────────────────────────────────────────── */
function GenderQuiz({ onChoose }: { onChoose: (g: Gender) => void }) {
  return (
    <section aria-label="Gender selection" style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 72px)" }}>
      <div style={{ textAlign: "center", padding: "3rem 1rem 2rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#a3e635", margin: 0 }}>
          Step 1 of 2 — Personalise Your Plan
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 6vw, 5rem)", color: "#fff", margin: "0.4rem 0 0", letterSpacing: "0.05em", lineHeight: 1 }}>
          WHO ARE YOU TRAINING FOR?
        </h1>
        <p style={{ color: "#9ca3af", marginTop: "0.75rem" }}>
          Choose to see programs personalised for your goals
        </p>
      </div>
      <div className="gq-grid" style={{ display: "grid", gridTemplateColumns: "1fr", flex: 1, minHeight: "70vh" }}>
        <HeroCard image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80" title="I'm a Woman" subtitle="Programs designed for female physiology" onClick={() => onChoose("woman")} ariaLabel="Select women's programs" />
        <HeroCard image="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" title="I'm a Man" subtitle="Programs built for male performance" onClick={() => onChoose("man")} ariaLabel="Select men's programs" />
      </div>
      <style>{`@media(min-width:768px){.gq-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

function HeroCard({ image, title, subtitle, onClick, ariaLabel }: { image: string; title: string; subtitle: string; onClick: () => void; ariaLabel: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} aria-label={ariaLabel} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer", background: "none", border: "none", padding: 0, display: "block", width: "100%", minHeight: "70vh", boxShadow: hov ? "inset 0 0 0 3px rgba(163,230,53,.7),0 0 60px rgba(163,230,53,.2)" : "inset 0 0 0 0 transparent", transition: "box-shadow 0.4s ease" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.6s ease" }} aria-hidden="true" />
      <div style={{ position: "absolute", inset: 0, background: hov ? "linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.4) 60%,rgba(0,0,0,.18) 100%)" : "linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.6) 60%,rgba(0,0,0,.3) 100%)", transition: "background 0.4s ease" }} aria-hidden="true" />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%,rgba(163,230,53,.12) 0%,transparent 70%)", opacity: hov ? 1 : 0, transition: "opacity 0.4s ease" }} aria-hidden="true" />
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", minHeight: "70vh", padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: hov ? "#a3e635" : "#fff", margin: 0, letterSpacing: "0.05em", transition: "color 0.4s ease", lineHeight: 1 }}>{title}</h2>
        <p style={{ color: hov ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.6)", marginTop: "0.75rem", maxWidth: "20rem", transition: "color 0.4s ease" }}>{subtitle}</p>
        <span style={{ display: "inline-flex", alignItems: "center", marginTop: "1.5rem", background: hov ? "#a3e635" : "rgba(163,230,53,.15)", color: hov ? "#0a0a0a" : "#a3e635", border: "1px solid rgba(163,230,53,.5)", borderRadius: "9999px", padding: "0.6rem 1.5rem", fontSize: "0.875rem", fontWeight: 700, transition: "all 0.35s ease", boxShadow: hov ? "0 0 24px rgba(163,230,53,.4)" : "none" }}>
          {hov ? "Let's go →" : "Choose"}
        </span>
        <div style={{ marginTop: "1.25rem", width: 8, height: 8, borderRadius: "50%", background: "#a3e635", animation: "pdot 1.8s ease-in-out infinite", opacity: hov ? 0 : 0.8, transition: "opacity 0.3s ease" }} aria-hidden="true" />
      </div>
      <style>{`@keyframes pdot{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.6);opacity:.3}}`}</style>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROGRAMS GRID
───────────────────────────────────────────────────────────────────────────── */
function ProgramsGrid({ programs, gender, onSelect, onBack }: { programs: Program[]; gender: Gender; onSelect: (p: Program) => void; onBack: () => void }) {
  const isW = gender === "woman";
  return (
    <section aria-label={`Programs for ${isW ? "women" : "men"}`} style={{ maxWidth: "90rem", margin: "0 auto", padding: "4rem 1.5rem", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
        <div>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a3e635", margin: 0 }}>Personalised for {isW ? "Women" : "Men"}</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#fff", margin: "0.25rem 0 0.5rem", letterSpacing: "0.05em", lineHeight: 1 }}>
            {isW ? "Your Strength Journey Starts Here" : "Dominate Your Training"}
          </h1>
          <p style={{ color: "#9ca3af", maxWidth: "36rem", margin: 0, fontSize: "0.95rem" }}>
            {isW ? "Science-backed programs designed around female physiology — strong, confident, and sustainable." : "Performance-engineered programs built to maximise power, muscle, and results."}
            {" "}<span style={{ color: "rgba(255,255,255,.4)" }}>⭐ = top picks.</span>
          </p>
        </div>
        <GhostButton onClick={onBack} ariaLabel="Go back to gender selection">← Change</GhostButton>
      </div>
      <div className="pg">
        {programs.map(p => <ProgramCard key={p.slug} program={p} onSelect={onSelect} />)}
      </div>
      <style>{`.pg{display:grid;grid-template-columns:1fr;gap:1.5rem}@media(min-width:640px){.pg{grid-template-columns:repeat(2,1fr)}}@media(min-width:1024px){.pg{grid-template-columns:repeat(3,1fr)}}`}</style>
    </section>
  );
}

function ProgramCard({ program, onSelect }: { program: Program; onSelect: (p: Program) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: "1rem", overflow: "hidden", border: hov ? "1px solid rgba(163,230,53,.55)" : "1px solid rgba(255,255,255,.1)", boxShadow: hov ? "0 0 36px rgba(163,230,53,.18)" : "none", transform: hov ? "translateY(-4px)" : "translateY(0)", transition: "all 0.4s ease", background: "#111", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={program.image} alt={`${program.name} program`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.07)" : "scale(1)", transition: "transform 0.6s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#111 0%,rgba(17,17,17,.4) 50%,transparent 100%)" }} aria-hidden="true" />
        {program.recommended && <span style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "#a3e635", color: "#0a0a0a", borderRadius: "9999px", padding: "0.25rem 0.75rem", fontSize: "0.7rem", fontWeight: 700 }}>⭐ Top Pick</span>}
      </div>
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: hov ? "#a3e635" : "#fff", margin: 0, letterSpacing: "0.05em", lineHeight: 1.1, transition: "color 0.3s ease" }}>{program.name}</h2>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0.4rem 0 0", lineHeight: 1.5 }}>{program.goal}</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.85rem" }}>
          <Chip accent>{program.duration}</Chip>
          <Chip>{program.frequency}</Chip>
        </div>
        <ul style={{ marginTop: "0.9rem", paddingLeft: "1.1rem", color: "#9ca3af", fontSize: "0.8rem", lineHeight: 1.8, margin: "0.9rem 0 0 1.1rem" }}>
          {program.exercises.slice(0, 4).map(ex => <li key={ex}>{ex}</li>)}
        </ul>
        <p style={{ marginTop: "0.8rem", fontSize: "0.77rem", color: "rgba(163,230,53,.75)", fontStyle: "italic", lineHeight: 1.5 }}>💡 {program.whyItWorks}</p>
        <div style={{ flex: 1 }} />
        <button onClick={() => onSelect(program)} aria-label={`Start ${program.name} program`}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1.25rem", background: "#a3e635", color: "#0a0a0a", borderRadius: "9999px", padding: "0.75rem 1.5rem", fontSize: "0.875rem", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: hov ? "0 0 22px rgba(163,230,53,.4)" : "none", transition: "box-shadow 0.4s ease", width: "100%" }}>
          Start This Program →
        </button>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROGRAM DETAIL
───────────────────────────────────────────────────────────────────────────── */
function ProgramDetail({ program, gender, onBack }: { program: Program; gender: Gender; onBack: () => void }) {
  const isW = gender === "woman";
  return (
    <section aria-label={`${program.name} program detail`} style={{ maxWidth: "72rem", margin: "0 auto", padding: "3rem 1.5rem 5rem", width: "100%" }}>
      <GhostButton onClick={onBack} ariaLabel={`Back to ${isW ? "women's" : "men's"} programs`} style={{ marginBottom: "2.5rem" }}>
        ← Back to {isW ? "Women's" : "Men's"} Programs
      </GhostButton>

      {/* Hero */}
      <div style={{ position: "relative", height: "clamp(220px,38vh,400px)", borderRadius: "1.25rem", overflow: "hidden", marginBottom: "2.5rem" }}>
        <img src={program.image} alt={program.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,.88) 0%,rgba(0,0,0,.45) 60%,rgba(0,0,0,.1) 100%)" }} aria-hidden="true" />
        <div style={{ position: "absolute", bottom: 0, left: 0, padding: "2rem 2.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a3e635", margin: "0 0 0.3rem" }}>
            {isW ? "Women's Program" : "Men's Program"}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", color: "#fff", margin: 0, letterSpacing: "0.05em", lineHeight: 1 }}>{program.name}</h1>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <Chip accent>{program.duration}</Chip>
            <Chip>{program.frequency}</Chip>
          </div>
        </div>
      </div>

      <div className="dg">
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          <InfoCard title="GOAL" accentBorder={false}><p style={{ color: "#d1d5db", margin: 0, lineHeight: 1.6 }}>{program.goal}</p></InfoCard>
          <InfoCard title="THE SCIENCE" accentBorder><p style={{ color: "#d1d5db", margin: 0, lineHeight: 1.6 }}>{program.science}</p></InfoCard>
          <InfoCard title="WHY IT WORKS FOR YOU" accentBg><p style={{ color: "#d1d5db", margin: 0, lineHeight: 1.6 }}>{program.whyItWorks}</p></InfoCard>
          <InfoCard title="KEY EXERCISES" accentBorder={false}>
            <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {program.exercises.map(ex => <li key={ex} style={{ color: "#d1d5db", fontSize: "0.95rem", lineHeight: 1.5 }}>{ex}</li>)}
            </ul>
          </InfoCard>
        </div>

        {/* Right column — schedule */}
        <div>
          <div style={{ background: "#111", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem", padding: "1.5rem", position: "sticky", top: "90px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#a3e635", margin: "0 0 1rem", letterSpacing: "0.05em" }}>WEEKLY SCHEDULE</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {program.weeklySchedule.map((s, i) => (
                <div key={s.day} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0.8rem", borderRadius: "0.5rem", background: i % 2 === 0 ? "rgba(255,255,255,.03)" : "transparent" }}>
                  <span style={{ minWidth: "4.5rem", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#a3e635", paddingTop: "0.1rem" }}>{s.day}</span>
                  <span style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.5 }}>{s.focus}</span>
                </div>
              ))}
            </div>
            <Link href="#" aria-label={`Get full ${program.name} plan`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1.5rem", background: "#a3e635", color: "#0a0a0a", borderRadius: "9999px", padding: "0.85rem 1.5rem", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 22px rgba(163,230,53,.3)", transition: "box-shadow 0.3s ease" }}>
              Get Full Program Plan →
            </Link>
          </div>
        </div>
      </div>

      <style>{`.dg{display:grid;grid-template-columns:1fr;gap:1.5rem}@media(min-width:768px){.dg{grid-template-columns:1fr 1fr}}@media(min-width:1024px){.dg{grid-template-columns:3fr 2fr}}`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED UI ATOMS
───────────────────────────────────────────────────────────────────────────── */
function Chip({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span style={{ borderRadius: "9999px", border: accent ? "1px solid rgba(163,230,53,.35)" : "1px solid rgba(255,255,255,.15)", background: accent ? "rgba(163,230,53,.08)" : "rgba(255,255,255,.05)", color: accent ? "#a3e635" : "rgba(255,255,255,.6)", padding: "0.2rem 0.75rem", fontSize: "0.72rem", fontWeight: 600 }}>
      {children}
    </span>
  );
}

function InfoCard({ title, children, accentBorder, accentBg }: { title: string; children: React.ReactNode; accentBorder?: boolean; accentBg?: boolean }) {
  return (
    <div style={{ background: accentBg ? "rgba(163,230,53,.06)" : "#111", border: `1px solid ${accentBorder ? "rgba(163,230,53,.25)" : "rgba(255,255,255,.08)"}`, borderRadius: "1rem", padding: "1.5rem" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "#a3e635", margin: "0 0 0.6rem", letterSpacing: "0.05em" }}>{title}</h2>
      {children}
    </div>
  );
}

function GhostButton({ onClick, ariaLabel, children, style }: { onClick: () => void; ariaLabel: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} aria-label={ariaLabel} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "transparent", border: `1px solid ${hov ? "rgba(163,230,53,.6)" : "rgba(255,255,255,.2)"}`, color: hov ? "#a3e635" : "rgba(255,255,255,.65)", borderRadius: "9999px", padding: "0.6rem 1.25rem", fontSize: "0.875rem", cursor: "pointer", transition: "all 0.3s ease", flexShrink: 0, ...style }}>
      {children}
    </button>
  );
}
