"use client";
import { useState } from "react";
import Link from "next/link";

type Gender = "woman" | "man";
type Phase = "quiz" | "grid" | "duration" | "detail";
type Days = 3 | 4 | 5 | 6;
type Weeks = 8 | 12 | 16 | 20;
type DurCfg = { days: Days; weeks: Weeks };
type Prog = { slug: string; name: string; image: string; goal: string; kw: string[]; rec?: boolean };

const PI: Record<string, string> = {
  "weight-loss-w": "https://images.unsplash.com/photo-1549570652-97324981a6fd?w=1200&q=80",
  "weight-loss-m": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80",
  "muscle-building-w": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
  "muscle-building-m": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&q=80",
  "strength-training": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80",
  endurance: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
  flexibility: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
  "body-recomposition": "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=1200&q=80",
};
const progImg = (slug: string, g: Gender) =>
  PI[`${slug}-${g[0]}`] ?? PI[slug] ?? PI["strength-training"];

const WOMEN: Prog[] = [
  { slug: "weight-loss", name: "Weight Loss", image: PI["weight-loss-w"], goal: "Lose fat, preserve lean muscle", kw: ["Hip thrusts", "Romanian deadlifts", "Jump rope intervals", "Cable kickbacks"], rec: true },
  { slug: "body-recomposition", name: "Body Recomposition", image: PI["body-recomposition"], goal: "Lose fat and build lean muscle", kw: ["Full-body circuits", "Compound lifts", "HIIT finishers", "Goblet squats"], rec: true },
  { slug: "flexibility", name: "Flexibility & Mobility", image: PI["flexibility"], goal: "Improve range of motion & posture", kw: ["Hip flexor stretch", "Pigeon pose", "Thoracic rotations", "Shoulder flows"], rec: true },
  { slug: "muscle-building", name: "Toning & Muscle", image: PI["muscle-building-w"], goal: "Build lean muscle, improve composition", kw: ["Goblet squats", "DB lunges", "Lat pulldowns", "Incline press"] },
  { slug: "endurance", name: "Endurance", image: PI["endurance"], goal: "Build cardiovascular fitness", kw: ["Running intervals", "Cycling", "Rowing", "Bodyweight circuits"] },
  { slug: "strength-training", name: "Strength Training", image: PI["strength-training"], goal: "Build functional strength & confidence", kw: ["Barbell squat", "Deadlift", "Bench press", "Pull-ups"] },
];
const MEN: Prog[] = [
  { slug: "muscle-building", name: "Hypertrophy", image: PI["muscle-building-m"], goal: "Maximise muscle size & definition", kw: ["Bench press", "Barbell rows", "Pull-ups", "Preacher curls"], rec: true },
  { slug: "strength-training", name: "Strength Training", image: PI["strength-training"], goal: "Build maximum strength across all lifts", kw: ["Squat", "Deadlift", "Bench press", "Power clean"], rec: true },
  { slug: "body-recomposition", name: "Body Recomposition", image: PI["body-recomposition"], goal: "Build muscle and burn fat together", kw: ["Compound lifts", "Supersets", "HIIT", "Loaded carries"], rec: true },
  { slug: "weight-loss", name: "Weight Loss", image: PI["weight-loss-m"], goal: "Burn fat, maintain muscle mass", kw: ["Barbell deadlifts", "Weighted squats", "Battle ropes", "Sled push"] },
  { slug: "endurance", name: "Endurance", image: PI["endurance"], goal: "Build elite cardiovascular capacity", kw: ["Long runs", "Interval sprints", "Cycling", "Rowing"] },
  { slug: "flexibility", name: "Flexibility & Mobility", image: PI["flexibility"], goal: "Improve performance, eliminate injury", kw: ["Hip mobility drills", "Thoracic rotations", "Ankle mobility", "Dynamic warm-ups"] },
];

const SCIENCE: Record<string, { p1: string; p2: string; kp: string; kpv: string }> = {
  "weight-loss": { p1: "Combining resistance training with HIIT creates a powerful EPOC effect — your metabolism stays elevated for up to 36 hours post-workout, burning far more calories than cardio alone.", p2: "Progressive overload preserves and builds lean muscle during a caloric deficit, ensuring the weight you lose is fat, not muscle. This leads to a leaner, stronger physique.", kp: "EPOC Effect", kpv: "Resistance training creates metabolic disturbance that elevates oxygen consumption for up to 36 hours post-workout." },
  "muscle-building": { p1: "Hypertrophy is driven by mechanical tension, metabolic stress, and muscle damage. The 8–12 rep range at 70–80% 1RM optimally targets all three mechanisms simultaneously.", p2: "Progressive overload — consistently adding weight, reps, or sets over time — is the non-negotiable driver of muscle growth. Without it, adaptation stops.", kp: "Progressive Overload", kpv: "Systematically increasing training stimulus forces continuous muscle adaptation — the foundation of every successful program." },
  "strength-training": { p1: "Maximal strength is primarily a neural adaptation. Training at 85%+ of your 1RM teaches your nervous system to recruit more motor units simultaneously — producing force increases before muscles even grow.", p2: "Structured periodisation — cycling between volume, intensity, and deload phases — prevents plateaus and continuously drives neuromuscular adaptation.", kp: "Neural Adaptation", kpv: "Before muscle grows, your nervous system learns to recruit more motor units — delivering measurable strength gains within 2–3 weeks." },
  endurance: { p1: "Zone 2 training (60–70% max HR) is the most efficient way to build your aerobic base. It maximises mitochondrial density and fat oxidation — the engine behind sustainable performance.", p2: "Lactate threshold intervals train your body to sustain higher intensities for longer periods, directly translating to faster race times and better endurance capacity.", kp: "Zone 2 Training", kpv: "Training at 60–70% max heart rate maximises mitochondrial density and fat oxidation — the foundation of all endurance performance." },
  flexibility: { p1: "PNF (Proprioceptive Neuromuscular Facilitation) stretching increases range of motion 10–15% faster than static stretching by exploiting the muscle's inhibitory reflex mechanism.", p2: "Dynamic mobility training pre-workout increases power output by 5–8% by improving neuromuscular readiness and joint range — making every training session more effective.", kp: "PNF Stretching", kpv: "PNF techniques exploit neurological reflexes to increase ROM 10–15% faster than traditional static stretching protocols." },
  "body-recomposition": { p1: "Body recomposition — losing fat and gaining muscle simultaneously — is achievable at caloric maintenance when paired with high protein intake (2+ g/kg) and consistent resistance training.", p2: "Resistance training sends the anabolic signal to preserve and build muscle, while the caloric balance ensures fat stores are used for energy. The result: simultaneous body composition improvement.", kp: "Protein-Sparing Effect", kpv: "High protein intake combined with resistance training signals the body to spare muscle while using fat for fuel — the core of recomposition." },
};

const SCH_BASE: Record<string, string[]> = {
  "weight-loss": ["Full Body + Cardio", "HIIT Circuit", "Lower Body + Core", "Active Recovery", "Full Body Strength", "Cardio + Mobility"],
  "muscle-building": ["Upper Push", "Lower Body", "Upper Pull", "Full Body", "Push + Shoulders", "Pull + Core"],
  "strength-training": ["Squat Focus", "Bench + Upper", "Deadlift + Posterior", "Overhead + Accessory", "Volume Day", "Conditioning"],
  endurance: ["Zone 2 Base", "Strength Maintenance", "Tempo Intervals", "Cross Training", "Long Session", "Active Recovery"],
  flexibility: ["Hip + Lower Flow", "Thoracic + Shoulder", "Full Body Dynamic", "Restorative", "Active Flexibility", "Recovery Mobility"],
  "body-recomposition": ["Full Body Strength A", "HIIT", "Full Body Strength B", "HIIT Finisher", "Upper Hypertrophy", "Lower + Core"],
};
const W_TWEAK: Record<number, string> = { 1: " (Glute Focus)", 2: " (Core Emphasis)", 4: " (Glute + Core)" };
const M_TWEAK: Record<number, string> = { 0: " (Strength)", 2: " (Power)", 4: " (Hypertrophy)" };
function buildSch(slug: string, g: Gender, days: Days) {
  const base = SCH_BASE[slug] ?? SCH_BASE["weight-loss"];
  const tweak = g === "woman" ? W_TWEAK : M_TWEAK;
  const out: string[] = [];
  for (let i = 0; i < days; i++) {
    const label = base[i] ?? base[i % base.length];
    out.push(label + (tweak[i] ?? ""));
  }
  return out;
}

import { PROG_DATA, Exd } from "../programs/data";

function getExercises(slug: string, g: Gender): Exd[] {
  const genderKey = g === "woman" ? "w" : "m";
  const pData = PROG_DATA[genderKey]?.[slug];
  if (!pData) {
    // Basic fallback if slug is unmatched
    return PROG_DATA["m"]["st"][1].exercises.A;
  }
  // Return Day 1 Phase A exercises
  return pData[1].exercises.A;
}

const MILE_W = ["💪 Adaptation — your body is calibrating. Soreness is growth.", "🔥 Progression — energy is up, strength is climbing, clothes fit differently.", "✨ Transformation — visible results, unshakeable habits, unstoppable confidence."];
const MILE_M = ["⚡ Adaptation — neuromuscular learning begins. CNS is calibrating.", "📈 Progression — strength numbers climb. Performance metrics visibly improve.", "🏆 Transformation — body composition shifts. Peak performance unlocked."];
const WEEK_LABELS: Record<Weeks, string> = { 8: "Build the habit", 12: "See real results", 16: "Transform your body", 20: "Elite level" };

const NUTR: Record<string, [string, string, string]> = {
  "weight-loss-w": ["Eat at a 10–15% caloric deficit — aggressive restriction kills muscle and motivation.", "Target 1.6 g protein per kg bodyweight to preserve lean tissue throughout.", "Time carbs around training sessions for optimal energy and recovery."],
  "weight-loss-m": ["Eat at a 15–20% deficit while keeping protein at 2.2 g/kg to maintain muscle mass.", "Keep training volume high — muscle retention in a deficit requires continued mechanical stimulus.", "Cycle carbs: higher on training days, lower on rest days for optimal body composition."],
  default: ["Protein is the foundation: women target 1.6 g/kg, men target 2.2 g/kg daily.", "Sleep 7–9 hours — most hormonal adaptation and muscle repair happens during deep sleep.", "Hydration: even 2% dehydration reduces performance by 5%. Stay ahead of thirst."],
};
function getNutr(slug: string, g: Gender): [string, string, string] {
  return NUTR[`${slug}-${g[0]}`] ?? NUTR.default;
}

/* ── Root ────────────────────────────────────────────────────── */
export default function GenderPrograms() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [selected, setSelected] = useState<Prog | null>(null);
  const [dur, setDur] = useState<DurCfg | null>(null);
  const [fading, setFading] = useState(false);

  const go = (fn: () => void) => { setFading(true); setTimeout(() => { fn(); setFading(false); }, 360); };
  const progs = gender === "woman" ? WOMEN : MEN;

  return (
    <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.36s ease" }}>
      {phase === "quiz" && <GenderQuiz onChoose={(g) => go(() => { setGender(g); setPhase("grid"); })} />}
      {phase === "grid" && gender && <ProgramsGrid progs={progs} gender={gender} onSelect={(p) => go(() => { setSelected(p); setPhase("duration"); })} onBack={() => go(() => { setGender(null); setPhase("quiz"); })} />}
      {phase === "duration" && selected && gender && <DurationSelector gender={gender} prog={selected} onConfirm={(d) => go(() => { setDur(d); setPhase("detail"); })} onBack={() => go(() => setPhase("grid"))} />}
      {phase === "detail" && selected && gender && dur && <ProgramDetail prog={selected} gender={gender} dur={dur} onBack={() => go(() => { setDur(null); setPhase("grid"); })} />}
    </div>
  );
}

/* ── Gender Quiz ─────────────────────────────────────────────── */
function GenderQuiz({ onChoose }: { onChoose: (g: Gender) => void }) {
  return (
    <section aria-label="Gender selection" style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 72px)" }}>
      <div style={{ textAlign: "center", padding: "3rem 1rem 2rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#a3e635", margin: 0 }}>Step 1 of 4 — Personalise Your Plan</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 7vw, 5rem)", color: "#fff", margin: "0.4rem 0 0", letterSpacing: "0.05em", lineHeight: 1 }}>WHO ARE YOU TRAINING FOR?</h1>
        <p style={{ color: "#9ca3af", marginTop: "0.75rem" }}>Choose to see programs personalised for your goals</p>
      </div>
      <div className="gq" style={{ display: "grid", gridTemplateColumns: "1fr", flex: 1, minHeight: "70vh" }}>
        <HeroCard image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80" title="I'm a Woman" sub="Programs designed for female physiology" onClick={() => onChoose("woman")} aria="Select women's programs" />
        <HeroCard image="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" title="I'm a Man" sub="Programs built for male performance" onClick={() => onChoose("man")} aria="Select men's programs" />
      </div>
      <style>{`@media(min-width:768px){.gq{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}
function HeroCard({ image, title, sub, onClick, aria }: { image: string; title: string; sub: string; onClick: () => void; aria: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} aria-label={aria} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", overflow: "hidden", cursor: "pointer", background: "none", border: "none", padding: 0, width: "100%", minHeight: "70vh", boxShadow: hov ? "inset 0 0 0 3px rgba(163,230,53,.7)" : "none", transition: "box-shadow 0.4s ease" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.6s ease" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.5) 60%,rgba(0,0,0,.2) 100%)", transition: "background 0.4s ease" }} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", minHeight: "70vh", padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: hov ? "#a3e635" : "#fff", margin: 0, letterSpacing: "0.05em", transition: "color 0.4s ease" }}>{title}</h2>
        <p style={{ color: "rgba(255,255,255,.65)", marginTop: "0.75rem" }}>{sub}</p>
        <span style={{ display: "inline-flex", marginTop: "1.5rem", background: hov ? "#a3e635" : "rgba(163,230,53,.15)", color: hov ? "#0a0a0a" : "#a3e635", border: "1px solid rgba(163,230,53,.5)", borderRadius: "9999px", padding: "0.6rem 1.5rem", fontSize: "0.875rem", fontWeight: 700, transition: "all 0.35s ease" }}>
          {hov ? "Let's go →" : "Choose"}
        </span>
      </div>
    </button>
  );
}

/* ── Programs Grid ───────────────────────────────────────────── */
function ProgramsGrid({ progs, gender, onSelect, onBack }: { progs: Prog[]; gender: Gender; onSelect: (p: Prog) => void; onBack: () => void }) {
  const isW = gender === "woman";
  return (
    <section aria-label={`Programs for ${isW ? "women" : "men"}`} style={{ maxWidth: "90rem", margin: "0 auto", padding: "4rem 1.5rem", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a3e635", margin: 0 }}>Step 2 — Choose Your Program</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", margin: "0.25rem 0 0.5rem", letterSpacing: "0.05em", lineHeight: 1 }}>{isW ? "Your Strength Journey Starts Here" : "Dominate Your Training"}</h1>
          <p style={{ color: "#9ca3af", maxWidth: "36rem", margin: 0, fontSize: "0.9rem" }}>{isW ? "Science-backed programs for female physiology — strong, confident, sustainable." : "Performance-engineered programs to maximise power, muscle, and results."}</p>
        </div>
        <GhostBtn onClick={onBack} aria="Back to gender selection">← Change</GhostBtn>
      </div>
      <div className="pg">
        {progs.map(p => <ProgCard key={p.slug} prog={p} onSelect={onSelect} />)}
      </div>
      <style>{`.pg{display:grid;grid-template-columns:1fr;gap:1.5rem}@media(min-width:640px){.pg{grid-template-columns:repeat(2,1fr)}}@media(min-width:1024px){.pg{grid-template-columns:repeat(3,1fr)}}`}</style>
    </section>
  );
}
function ProgCard({ prog, onSelect }: { prog: Prog; onSelect: (p: Prog) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ borderRadius: "1rem", overflow: "hidden", border: hov ? "1px solid rgba(163,230,53,.55)" : "1px solid rgba(255,255,255,.1)", boxShadow: hov ? "0 0 36px rgba(163,230,53,.18)" : "none", transform: hov ? "translateY(-4px)" : "none", transition: "all 0.4s ease", background: "#111", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={prog.image} alt={prog.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.07)" : "scale(1)", transition: "transform 0.6s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#111 0%,rgba(17,17,17,.4) 50%,transparent 100%)" }} />
        {prog.rec && <span style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "#a3e635", color: "#0a0a0a", borderRadius: "9999px", padding: "0.25rem 0.75rem", fontSize: "0.7rem", fontWeight: 700 }}>⭐ Top Pick</span>}
      </div>
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: hov ? "#a3e635" : "#fff", margin: 0, letterSpacing: "0.05em", transition: "color 0.3s ease" }}>{prog.name}</h2>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0.4rem 0 0.9rem" }}>{prog.goal}</p>
        <ul style={{ margin: "0 0 0 1rem", padding: 0, color: "#9ca3af", fontSize: "0.79rem", lineHeight: 1.8 }}>{prog.kw.map(k => <li key={k}>{k}</li>)}</ul>
        <div style={{ flex: 1 }} />
        <button onClick={() => onSelect(prog)} aria-label={`Select ${prog.name}`} style={{ marginTop: "1.25rem", background: "#a3e635", color: "#0a0a0a", borderRadius: "9999px", padding: "0.75rem", fontSize: "0.875rem", fontWeight: 700, border: "none", cursor: "pointer", width: "100%", boxShadow: hov ? "0 0 22px rgba(163,230,53,.4)" : "none", transition: "box-shadow 0.4s ease" }}>
          Select Program →
        </button>
      </div>
    </article>
  );
}

/* ── Duration Selector (Step 3) ──────────────────────────────── */
function DurationSelector({ gender, prog, onConfirm, onBack }: { gender: Gender; prog: Prog; onConfirm: (d: DurCfg) => void; onBack: () => void }) {
  const [days, setDays] = useState<Days>(4);
  const [weeks, setWeeks] = useState<Weeks>(12);
  const isW = gender === "woman";
  const dayOpts: Days[] = [3, 4, 5, 6];
  const wkOpts: Weeks[] = [8, 12, 16, 20];
  const btnBase = { borderRadius: "0.75rem", border: "1px solid", padding: "1.25rem 1.5rem", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", fontFamily: "var(--font-display)", letterSpacing: "0.05em" };
  const active = { ...btnBase, background: "#a3e635", color: "#0a0a0a", borderColor: "#a3e635", boxShadow: "0 0 24px rgba(163,230,53,.45)" };
  const inactive = { ...btnBase, background: "rgba(255,255,255,.04)", color: "#fff", borderColor: "rgba(255,255,255,.15)" };
  return (
    <section aria-label="Duration selection" style={{ maxWidth: "48rem", margin: "0 auto", padding: "4rem 1.5rem", width: "100%", minHeight: "calc(100vh - 72px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <GhostBtn onClick={onBack} aria="Back to programs" style={{ marginBottom: "2.5rem", alignSelf: "flex-start" }}>← Back</GhostBtn>
      <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a3e635", margin: 0 }}>Step 3 — Customise Your Schedule</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", margin: "0.4rem 0 0.5rem", letterSpacing: "0.05em", lineHeight: 1.1 }}>
        {isW ? `How many days can you train, queen? 👑` : `How many days are you willing to grind? 💪`}
      </h1>
      <p style={{ color: "#9ca3af", marginBottom: "2rem" }}>Building your <span style={{ color: "#a3e635" }}>{prog.name}</span> plan</p>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "rgba(255,255,255,.6)", letterSpacing: "0.1em", marginBottom: "0.9rem" }}>DAYS PER WEEK</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.75rem", marginBottom: "2.5rem" }}>
        {dayOpts.map(d => <button key={d} onClick={() => setDays(d)} aria-label={`${d} days per week`} style={days === d ? active : inactive}>{d}<br /><span style={{ fontSize: "0.65rem", fontWeight: 400, opacity: 0.7 }}>days</span></button>)}
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "rgba(255,255,255,.6)", letterSpacing: "0.1em", marginBottom: "0.9rem" }}>PROGRAM DURATION</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.75rem", marginBottom: "0.75rem" }}>
        {wkOpts.map(w => (
          <button key={w} onClick={() => setWeeks(w)} aria-label={`${w} weeks`} style={weeks === w ? active : inactive}>
            {w} weeks<br /><span style={{ fontSize: "0.65rem", fontWeight: 400, opacity: 0.75 }}>{WEEK_LABELS[w]}</span>
          </button>
        ))}
      </div>
      <p style={{ color: "#a3e635", fontSize: "0.85rem", textAlign: "center", marginBottom: "2rem", fontStyle: "italic" }}>
        ✦ {days} days/week × {weeks} weeks = {days * weeks} total training sessions
      </p>
      <button onClick={() => onConfirm({ days, weeks })} aria-label="Build my program" style={{ background: "#a3e635", color: "#0a0a0a", border: "none", borderRadius: "9999px", padding: "1rem 2rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 0 30px rgba(163,230,53,.4)", transition: "all 0.3s ease", width: "100%" }}>
        Build My Program →
      </button>
    </section>
  );
}

/* ── Program Detail (Step 4) ─────────────────────────────────── */
function ProgramDetail({ prog, gender, dur, onBack }: { prog: Prog; gender: Gender; dur: DurCfg; onBack: () => void }) {
  const isW = gender === "woman";
  const sci = SCIENCE[prog.slug] ?? SCIENCE["muscle-building"];
  const schedule = buildSch(prog.slug, gender, dur.days);
  const exs = getExercises(prog.slug, gender);
  const miles = isW ? MILE_W : MILE_M;
  const nutr = getNutr(prog.slug, gender);
  const heroImg = progImg(prog.slug, gender);
  const milePh: [string, string, string][] = [["Week 1–2", dur.weeks >= 12 ? "Week 3–6" : "Week 3–4", dur.weeks >= 8 ? `Week 7–${dur.weeks}` : "Week 7+"] as [string, string, string], miles as [string, string, string], miles as [string, string, string]];

  return (
    <article aria-label={`${prog.name} program detail`} style={{ maxWidth: "72rem", margin: "0 auto", padding: "3rem 1.5rem 6rem", width: "100%" }}>
      <GhostBtn onClick={onBack} aria={`Back to ${isW ? "women's" : "men's"} programs`} style={{ marginBottom: "2rem" }}>← Back to Programs</GhostBtn>

      {/* Hero */}
      <div style={{ position: "relative", height: "clamp(240px,45vh,440px)", borderRadius: "1.25rem", overflow: "hidden", marginBottom: "3rem" }}>
        <img src={heroImg} alt={prog.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,.9) 0%,rgba(0,0,0,.5) 60%,rgba(0,0,0,.1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span style={{ background: "#a3e635", color: "#0a0a0a", borderRadius: "9999px", padding: "0.2rem 0.75rem", fontSize: "0.72rem", fontWeight: 700 }}>🔬 Science-Based</span>
            <span style={{ background: "rgba(255,255,255,.15)", color: "#fff", borderRadius: "9999px", padding: "0.2rem 0.75rem", fontSize: "0.72rem", fontWeight: 600 }}>{isW ? "Women's Program" : "Men's Program"}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", margin: "0 0 1rem", letterSpacing: "0.05em", lineHeight: 1 }}>{prog.name}</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,auto)", gap: "0.5rem 2rem" }} className="stats-grid">
            {[["Duration", `${dur.weeks} weeks`], ["Frequency", `${dur.days}x / week`], ["Sessions", `${dur.days * dur.weeks} total`], ["Goal", prog.goal]].map(([k, v]) => (
              <div key={k}><p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#a3e635", margin: 0 }}>{k}</p><p style={{ fontSize: "0.95rem", color: "#fff", margin: 0, fontWeight: 600 }}>{v}</p></div>
            ))}
          </div>
        </div>
      </div>

      <div className="dg">
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Science */}
          <section aria-label="Science section" style={{ background: "#111", border: "1px solid rgba(163,230,53,.2)", borderRadius: "1rem", padding: "1.75rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#a3e635", margin: "0 0 1rem", letterSpacing: "0.05em" }}>WHY THIS PROGRAM WORKS</h2>
            <p style={{ color: "#d1d5db", lineHeight: 1.7, margin: "0 0 0.9rem" }}>{sci.p1}</p>
            <p style={{ color: "#d1d5db", lineHeight: 1.7, margin: "0 0 1.25rem" }}>{sci.p2}</p>
            <div style={{ background: "rgba(163,230,53,.08)", border: "1px solid rgba(163,230,53,.35)", borderRadius: "0.75rem", padding: "1rem 1.25rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#a3e635", margin: "0 0 0.3rem" }}>Key Principle: {sci.kp}</p>
              <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: 0, lineHeight: 1.5 }}>{sci.kpv}</p>
            </div>
          </section>

          {/* Weekly Schedule */}
          <section aria-label="Weekly schedule" style={{ background: "#111", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem", padding: "1.75rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#a3e635", margin: "0 0 1rem", letterSpacing: "0.05em" }}>YOUR WEEKLY SCHEDULE</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {schedule.map((focus, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.65rem 0.9rem", borderRadius: "0.5rem", background: i % 2 === 0 ? "rgba(255,255,255,.03)" : "transparent" }}>
                  <span style={{ minWidth: "3.5rem", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#a3e635" }}>Day {i + 1}</span>
                  <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>{focus}</span>
                </div>
              ))}
              {Array.from({ length: 7 - dur.days }).map((_, i) => (
                <div key={`rest-${i}`} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.65rem 0.9rem", borderRadius: "0.5rem", opacity: 0.4 }}>
                  <span style={{ minWidth: "3.5rem", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#9ca3af" }}>Day {dur.days + i + 1}</span>
                  <span style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Rest & Recovery</span>
                </div>
              ))}
            </div>
          </section>

          {/* Exercise Library */}
          <section aria-label="Exercise library" style={{ background: "#111", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem", padding: "1.75rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#a3e635", margin: "0 0 1rem", letterSpacing: "0.05em" }}>EXERCISE LIBRARY</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {exs.map(ex => (
                <div key={ex.name} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.75rem", borderRadius: "0.75rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)" }}>
                  <img src={ex.img} alt={ex.name} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "0.5rem", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#fff", margin: 0, letterSpacing: "0.03em" }}>{ex.name}</h3>
                      <span style={{ background: "rgba(163,230,53,.12)", color: "#a3e635", borderRadius: "9999px", padding: "0.15rem 0.6rem", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>{ex.sets}×{ex.reps}</span>
                    </div>
                    <p style={{ color: "#a3e635", fontSize: "0.72rem", fontWeight: 600, margin: "0.1rem 0 0.25rem" }}>{ex.muscle}</p>
                    <p style={{ color: "#9ca3af", fontSize: "0.78rem", margin: 0, lineHeight: 1.4 }}>{ex.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Progress Milestones */}
          <section aria-label="Progress milestones" style={{ background: "#111", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem", padding: "1.75rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#a3e635", margin: "0 0 1rem", letterSpacing: "0.05em" }}>PROGRESS MILESTONES</h2>
            {[["Week 1–2", 0], [dur.weeks >= 12 ? "Week 3–6" : "Week 3–4", 1], [`Week 7–${dur.weeks}`, 2]].map(([label, idx]) => (
              <div key={String(label)} style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "2px solid rgba(163,230,53,.35)" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#a3e635", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.2rem" }}>{label}</p>
                <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: 0, lineHeight: 1.5 }}>{miles[idx as number]}</p>
              </div>
            ))}
          </section>

          {/* Nutrition */}
          <section aria-label="Nutrition tips" style={{ background: "rgba(163,230,53,.06)", border: "1px solid rgba(163,230,53,.25)", borderRadius: "1rem", padding: "1.75rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#a3e635", margin: "0 0 0.25rem", letterSpacing: "0.05em" }}>NUTRITION STRATEGY</h2>
            <p style={{ color: "#a3e635", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 1rem" }}>Protein target: {isW ? "1.6 g/kg" : "2.2 g/kg"} bodyweight</p>
            {nutr.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.85rem" }}>
                <span style={{ color: "#a3e635", fontWeight: 700, flexShrink: 0, fontSize: "1rem" }}>{i + 1}.</span>
                <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: 0, lineHeight: 1.6 }}>{tip}</p>
              </div>
            ))}
          </section>

          {/* CTA */}
          <div style={{ background: "#111", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem", padding: "1.75rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "#fff", letterSpacing: "0.05em", margin: "0 0 0.5rem" }}>READY TO START?</p>
            <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 1.25rem" }}>{dur.days} days/week · {dur.weeks} weeks · {dur.days * dur.weeks} sessions</p>
            <Link href="#" aria-label="Get full program" style={{ display: "block", background: "#a3e635", color: "#0a0a0a", borderRadius: "9999px", padding: "0.9rem", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 24px rgba(163,230,53,.35)" }}>
              Get Full Program Plan →
            </Link>
          </div>
        </div>
      </div>

      <style>{`.dg{display:grid;grid-template-columns:1fr;gap:1.5rem}@media(min-width:900px){.dg{grid-template-columns:3fr 2fr}}.stats-grid{grid-template-columns:repeat(2,auto)!important}@media(min-width:640px){.stats-grid{grid-template-columns:repeat(4,auto)!important}}`}</style>
    </article>
  );
}

/* ── Shared atoms ─────────────────────────────────────────────── */
function GhostBtn({ onClick, aria, children, style }: { onClick: () => void; aria: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} aria-label={aria} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: "transparent", border: `1px solid ${hov ? "rgba(163,230,53,.6)" : "rgba(255,255,255,.2)"}`, color: hov ? "#a3e635" : "rgba(255,255,255,.65)", borderRadius: "9999px", padding: "0.6rem 1.25rem", fontSize: "0.875rem", cursor: "pointer", transition: "all 0.3s ease", ...style }}>
      {children}
    </button>
  );
}
