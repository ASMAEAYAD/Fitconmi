"use client";
import { useState } from "react";
import { SiteFooter, SiteNavbar } from "../components/site-chrome";
import { PROG_DATA } from "./data";

/* ── Types ── */
type G = "w" | "m";
type Days = 3 | 4 | 5 | 6;
type Weeks = 8 | 12 | 16 | 20;
type Ex = [string, string, string, string];

/* ── Images ── */
/* image map unused — images now live in data.ts */

/* ── Programs ── */
type Prog = { slug: string; name: string; diff: string; goal: string; img: string };
const WPR: Prog[] = [
  { slug: "wl", name: "Weight Loss", diff: "Beginner", goal: "Lose fat, preserve muscle", img: "https://images.unsplash.com/photo-1549570652-97324981a6fd?w=800&q=80" },
  { slug: "mb", name: "Muscle Building", diff: "Intermediate", goal: "Build lean muscle", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80" },
  { slug: "st", name: "Strength Training", diff: "Advanced", goal: "Build functional strength", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80" },
  { slug: "en", name: "Endurance", diff: "Intermediate", goal: "Cardiovascular fitness", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80" },
  { slug: "fl", name: "Flexibility", diff: "Beginner", goal: "Range of motion & posture", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80" },
  { slug: "br", name: "Body Recomp", diff: "Intermediate", goal: "Lose fat, gain muscle", img: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800&q=80" },
];
const MPR: Prog[] = [
  { slug: "wl", name: "Weight Loss", diff: "Beginner", goal: "Burn fat, maintain muscle", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" },
  { slug: "mb", name: "Hypertrophy", diff: "Intermediate", goal: "Maximise muscle size", img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80" },
  { slug: "st", name: "Strength Training", diff: "Advanced", goal: "Maximum strength", img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80" },
  { slug: "en", name: "Endurance", diff: "Intermediate", goal: "Elite cardiovascular capacity", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" },
  { slug: "fl", name: "Flexibility", diff: "Beginner", goal: "Athletic performance & injury prevention", img: "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=800&q=80" },
  { slug: "br", name: "Body Recomp", diff: "Intermediate", goal: "Build muscle, burn fat", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" },
];
const HERO: Record<string, Record<string, string>> = {
  w: { wl: "https://images.unsplash.com/photo-1549570652-97324981a6fd?w=1200&q=80", mb: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80", st: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1200&q=80", en: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80", fl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80", br: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=1200&q=80" },
  m: { wl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80", mb: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&q=80", st: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80", en: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80", fl: "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=1200&q=80", br: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&q=80" },
};

/* ── Weekly variation ── */
const getVariation = (week: number): "A" | "B" | "C" => {
  if (week <= 4) return "A";
  if (week <= 8) return "B";
  return "C";
};
const VAR_LABEL: Record<string, { label: string; emoji: string; color: string }> = {
  A: { label: "Foundation",   emoji: "🌱", color: "#9ca3af" },
  B: { label: "Progression",  emoji: "⚡", color: "#facc15" },
  C: { label: "Transformation",emoji: "🔥", color: "#f97316" },
};

/* ── Science ── */
const SCI: Record<string, { p1: string; p2: string; kp: string; kpv: string }> = {
  wl: { p1: "Combining resistance training with HIIT maximises EPOC — your metabolism stays elevated for up to 36 hours post-workout, burning significantly more calories than steady-state cardio alone.", p2: "Progressive overload preserves lean muscle during a caloric deficit, ensuring fat — not muscle — is the primary fuel source. The result: a leaner, stronger physique.", kp: "EPOC Effect", kpv: "Resistance training creates metabolic disturbance that elevates oxygen consumption for 36 hours post-workout — the key to lasting fat loss." },
  mb: { p1: "Hypertrophy requires mechanical tension, metabolic stress, and muscle damage. The 8-12 rep range at 70-80% 1RM simultaneously optimises all three mechanisms for peak muscle protein synthesis.", p2: "Progressive overload — consistently adding load, reps, or volume over time — is the non-negotiable driver of muscle growth. Without it, adaptation stops within 2-4 weeks.", kp: "Progressive Overload", kpv: "Systematically increasing training stimulus forces continuous adaptation — the non-negotiable foundation of muscle growth." },
  st: { p1: "Maximal strength is primarily a neural adaptation. Training at 85-90% 1RM teaches the nervous system to recruit more motor units simultaneously — delivering strength gains before muscles even visually grow.", p2: "Periodisation — cycling between volume, intensity, and deload phases — prevents neural fatigue and continuously drives strength adaptation without regression.", kp: "Neural Adaptation", kpv: "Before muscle grows, your nervous system learns to recruit more motor units — delivering measurable strength gains within 2-3 weeks." },
  en: { p1: "Zone 2 training (60-70% max HR) maximises mitochondrial density and fat oxidation — the aerobic foundation upon which all endurance performance is built.", p2: "Lactate threshold intervals train your body to sustain higher intensities for longer durations, directly translating to improved performance at any distance.", kp: "VO2 Max Training", kpv: "Training at varying intensities pushes VO2 max ceiling — the single best predictor of long-term cardiovascular health and endurance performance." },
  fl: { p1: "PNF stretching increases range of motion 10-15% faster than static stretching by exploiting the muscle's inhibitory reflex mechanism (the Golgi tendon organ).", p2: "Dynamic mobility pre-workout increases power output by 5-8% by improving neuromuscular readiness — making every training session more effective and safer.", kp: "PNF Stretching", kpv: "PNF techniques exploit neurological reflexes to increase ROM 10-15% faster than traditional static stretching protocols." },
  br: { p1: "Body recomposition — losing fat and gaining muscle simultaneously — is achievable at caloric maintenance with high protein intake (2+ g/kg) and consistent resistance training.", p2: "Resistance training sends the anabolic signal to build and preserve muscle, while caloric balance ensures fat stores are oxidised for energy — simultaneous body composition improvement.", kp: "Protein-Sparing Effect", kpv: "High protein combined with resistance training signals the body to spare muscle while oxidising fat — the metabolic core of recomposition." },
};

/* ── Nutrition ── */
const NUTR: Record<string, Record<string, [string, string, string]>> = {
  w: {
    wl: ["Eat at a 10-15% caloric deficit — aggressive restriction kills muscle and motivation.", "Target 1.6g protein per kg bodyweight to preserve lean tissue throughout.", "Prioritise iron-rich foods (leafy greens, legumes) — women lose iron monthly and deficiency crushes energy levels."],
    mb: ["Eat at a slight caloric surplus (200-300 kcal) focused on protein (1.6-1.8g/kg).", "Don't fear carbohydrates — they're the primary fuel for hypertrophy training.", "Post-workout nutrition within 2 hours optimises muscle protein synthesis during recovery."],
    def: ["Protein is the foundation: target 1.6g per kg of bodyweight daily.", "Prioritise whole foods, iron-rich vegetables, and healthy fats for hormonal balance.", "Sleep 7-9 hours — most muscle repair and hormonal regulation happens during deep sleep."],
  },
  m: {
    wl: ["Eat at a 15-20% caloric deficit while keeping protein at 2.2g/kg to maintain muscle.", "Keep training volume high — mechanical stimulus in a deficit signals the body to retain muscle.", "Cycle carbohydrates: higher on training days, lower on rest days for optimal body composition."],
    mb: ["Eat at a 300-500 kcal surplus — excessive bulking adds fat, not muscle.", "Target 2.2g protein per kg bodyweight daily. Creatine monohydrate (3-5g/day) adds measurable strength.", "Time protein and carbs around training sessions for optimal muscle protein synthesis."],
    def: ["Protein is king: target 2.2g per kg bodyweight to support muscle growth and recovery.", "Sleep 8-9 hours — testosterone peaks during deep sleep, the primary muscle-building hormone.", "Stay hydrated: even 2% dehydration drops performance by 5%. Aim for 35ml/kg bodyweight daily."],
  },
};
function getNutr(g: G, slug: string): [string, string, string] {
  const bank = NUTR[g];
  return (bank[slug] ?? bank.def) as [string, string, string];
}

/* ── Milestones & phases ── */
const MW = ["💪 You'll feel stronger and more energised. First workouts are hardest — you're building the habit.", "🔥 Real changes are visible. Strength is climbing, energy is up, clothes fit differently.", "✨ Visible transformation. An unshakeable routine and results that speak for themselves.", "👑 Elite level. Strength, discipline, and confidence that extends far beyond the gym."];
const MM = ["⚡ Neuromuscular adaptation begins. Nervous system calibrating for heavier loads.", "📈 Measurable strength increases weekly. Body composition shifts noticeably.", "🏆 Significant physique transformation. Strength numbers confirm what the mirror shows.", "🔱 Elite performance. The discipline and body of a serious athlete."];
const WL: Record<number, string> = { 8: "Build the habit 🌱", 12: "See real results ⚡", 16: "Transform your body 🔥", 20: "Elite level 🏆" };
const PHASES = [["Foundation Phase 🌱", "Weeks 1-2"], ["Progression Phase ⚡", "Weeks 3-6"], ["Transformation Phase 🔥", "Weeks 7-12"], ["Elite Phase 🏆", "Weeks 13+"]];
const PHASE_EMOJI = ["🌱", "⚡", "🔥", "🏆"];
const SETS: Record<number, string> = { 0: "3×12", 1: "4×10", 2: "4×8", 3: "5×6" };
const getPhase = (w: number) => w <= 2 ? 0 : w <= 6 ? 1 : w <= 12 ? 2 : 3;

/* ── Nutrition icons by program ── */
const NUTR_ICONS: Record<string, [string, string][]> = {
  "w-wl": [["🥩", "Protein 1.6g/kg"], ["🩸", "Iron-rich foods"], ["⚖️", "Caloric balance"]],
  "w-mb": [["🥩", "Protein 1.8g/kg"], ["🍚", "Carb timing"], ["💤", "Sleep recovery"]],
  "w-st": [["🥩", "Protein 1.8g/kg"], ["🩸", "Iron-rich foods"], ["💊", "Vitamin D"]],
  "w-en": [["🥩", "Protein 1.6g/kg"], ["🍌", "Carb fuelling"], ["🩸", "Iron-rich foods"]],
  "w-fl": [["🥩", "Protein 1.6g/kg"], ["🩸", "Iron-rich foods"], ["⚖️", "Caloric balance"]],
  "w-br": [["🥩", "Protein 1.6g/kg"], ["🩸", "Iron-rich foods"], ["⚖️", "Caloric balance"]],
  "m-wl": [["🥩", "Protein 2.2g/kg"], ["🍚", "Carb cycling"], ["📈", "Caloric deficit"]],
  "m-mb": [["🥩", "Protein 2.2g/kg"], ["💊", "Creatine 5g/day"], ["📈", "Caloric surplus"]],
  "m-st": [["🥩", "Protein 2.2g/kg"], ["💊", "Creatine 5g/day"], ["🍚", "Carb timing"]],
  "m-en": [["🥩", "Protein 2.0g/kg"], ["🍌", "Carb fuelling"], ["💧", "Hydration 35ml/kg"]],
  "m-fl": [["🥩", "Protein 2.0g/kg"], ["💊", "Vitamin D"], ["💤", "Sleep 8-9h"]],
  "m-br": [["🥩", "Protein 2.2g/kg"], ["💊", "Creatine 5g/day"], ["📈", "Slight surplus"]],
};

/* ═══════════════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════════════ */
export default function ProgramsPage() {
  const [g, setG] = useState<G | null>(null);
  const [prog, setProg] = useState<Prog | null>(null);
  const [days, setDays] = useState<Days | null>(null);
  const [weeks, setWeeks] = useState<Weeks | null>(null);
  const [step, setStep] = useState(0);
  const [aDay, setADay] = useState(0);
  const [curWk, setCurWk] = useState(1);
  const [fade, setFade] = useState(false);

  const go = (fn: () => void) => { setFade(true); setTimeout(() => { fn(); setFade(false); }, 380); };
  const progs = g === "w" ? WPR : MPR;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <SiteNavbar />
      <main style={{ opacity: fade ? 0 : 1, transition: "opacity 0.38s ease" }}>
        {step === 0 && <S1 onChoose={g => go(() => { setG(g); setStep(1); })} />}
        {step === 1 && g && <S2 progs={progs} g={g} onSelect={p => go(() => { setProg(p); setStep(2); })} onBack={() => go(() => { setG(null); setStep(0); })} />}
        {step === 2 && prog && g && <S3 g={g} prog={prog} days={days} weeks={weeks} setDays={setDays} setWeeks={setWeeks} onConfirm={() => go(() => { setStep(3); setADay(0); setCurWk(1); })} onBack={() => go(() => setStep(1))} />}
        {step === 3 && prog && g && days && weeks && <S4 prog={prog} g={g} days={days} weeks={weeks} aDay={aDay} setADay={setADay} curWk={curWk} setCurWk={setCurWk} onBack={() => go(() => setStep(1))} />}
      </main>
      <SiteFooter />
    </div>
  );
}

/* ── Step 1: Gender ─────────────────────────────────────────── */
function S1({ onChoose }: { onChoose: (g: G) => void }) {
  return (
    <section aria-label="Choose your gender">
      <div style={{ textAlign: "center", padding: "3rem 1rem 2rem" }}>
        <p style={{ color: "#a3e635", fontWeight: 700, letterSpacing: "0.22em", fontSize: "0.72rem", textTransform: "uppercase" }}>Step 1 of 4 — Personalise Your Plan</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,7vw,5rem)", margin: "0.4rem 0 0", letterSpacing: "0.05em", lineHeight: 1 }}>WHO ARE YOU TRAINING FOR?</h1>
        <p style={{ color: "#9ca3af", marginTop: "0.75rem" }}>Choose to see programs personalised for your goals</p>
      </div>
      <div className="hg" style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: "75vh" }}>
        <HC img="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80" title="I'm a Woman" sub="Programs designed for female physiology & goals" onClick={() => onChoose("w")} aria="Select women's programs" />
        <HC img="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80" title="I'm a Man" sub="Programs built for male performance & strength" onClick={() => onChoose("m")} aria="Select men's programs" />
      </div>
      <style>{`@media(min-width:768px){.hg{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}
function HC({ img, title, sub, onClick, aria }: { img: string; title: string; sub: string; onClick: () => void; aria: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} aria-label={aria} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", overflow: "hidden", border: "none", padding: 0, cursor: "pointer", minHeight: "75vh", display: "block", width: "100%", boxShadow: hov ? "0 0 40px rgba(163,230,53,0.4)" : "none", transition: "all 0.4s ease" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", transform: hov ? "scale(1.03)" : "scale(1)", transition: "transform 0.6s ease" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.5) 60%,rgba(0,0,0,.2) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", minHeight: "75vh", padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)", color: hov ? "#a3e635" : "#fff", margin: 0, letterSpacing: "0.05em", transition: "color 0.4s ease" }}>{title}</h2>
        <p style={{ color: "rgba(255,255,255,.7)", marginTop: "0.75rem", maxWidth: "20rem" }}>{sub}</p>
        <span style={{ marginTop: "1.5rem", display: "inline-flex", background: hov ? "#a3e635" : "rgba(163,230,53,.15)", color: hov ? "#0a0a0a" : "#a3e635", border: "1px solid rgba(163,230,53,.5)", borderRadius: "9999px", padding: "0.6rem 1.5rem", fontSize: "0.875rem", fontWeight: 700, transition: "all 0.35s ease", boxShadow: hov ? "0 0 24px rgba(163,230,53,.4)" : "none" }}>
          {hov ? "Let's go →" : "Choose"}
        </span>
      </div>
    </button>
  );
}

/* ── Step 2: Programs Grid ──────────────────────────────────── */
function S2({ progs, g, onSelect, onBack }: { progs: Prog[]; g: G; onSelect: (p: Prog) => void; onBack: () => void }) {
  return (
    <section aria-label="Program selection" style={{ maxWidth: "90rem", margin: "0 auto", padding: "4rem 1.5rem", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
        <div>
          <p style={{ color: "#a3e635", fontWeight: 700, letterSpacing: "0.2em", fontSize: "0.72rem", textTransform: "uppercase", margin: 0 }}>Step 2 — Choose Your Program</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,4rem)", margin: "0.3rem 0 0.5rem", letterSpacing: "0.05em", lineHeight: 1 }}>{g === "w" ? "YOUR STRENGTH JOURNEY" : "DOMINATE YOUR TRAINING"}</h1>
          <p style={{ color: "#9ca3af", maxWidth: "36rem", margin: 0 }}>{g === "w" ? "Science-backed programs for female physiology — strong, confident, sustainable." : "Performance-engineered programs to maximise power, muscle, and results."}</p>
        </div>
        <GBtn onClick={onBack} aria="Back to gender selection">← Change</GBtn>
      </div>
      <div className="pg2">
        {progs.map(p => <PC key={p.slug} prog={p} onSelect={onSelect} />)}
      </div>
      <style>{`.pg2{display:grid;grid-template-columns:1fr;gap:1.5rem}@media(min-width:640px){.pg2{grid-template-columns:repeat(2,1fr)}}@media(min-width:1024px){.pg2{grid-template-columns:repeat(3,1fr)}}`}</style>
    </section>
  );
}
function PC({ prog, onSelect }: { prog: Prog; onSelect: (p: Prog) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ borderRadius: "1rem", overflow: "hidden", position: "relative", minHeight: 300, cursor: "pointer", border: hov ? "1px solid rgba(163,230,53,.55)" : "1px solid rgba(255,255,255,.1)", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? "0 0 36px rgba(163,230,53,.18)" : "none", transition: "all 0.4s ease" }}>
      <img src={prog.img} alt={`${prog.name} program`} loading="lazy" width={800} height={300} style={{ width: "100%", height: 300, objectFit: "cover", transform: hov ? "scale(1.07)" : "scale(1)", transition: "transform 0.6s ease", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.45) 60%,transparent 100%)" }} aria-hidden="true" />
      <div style={{ position: "absolute", bottom: 0, left: 0, padding: "1.5rem" }}>
        <p style={{ color: "#a3e635", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.2rem" }}>{prog.diff}</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", margin: 0, letterSpacing: "0.05em" }}>{prog.name}</h2>
        <p style={{ color: "rgba(255,255,255,.7)", fontSize: "0.83rem", margin: "0.25rem 0 1rem" }}>{prog.goal}</p>
        <button onClick={() => onSelect(prog)} aria-label={`Select ${prog.name} program`} style={{ background: "#a3e635", color: "#0a0a0a", border: "none", borderRadius: "9999px", padding: "0.55rem 1.2rem", fontSize: "0.83rem", fontWeight: 700, cursor: "pointer", boxShadow: hov ? "0 0 20px rgba(163,230,53,.4)" : "none", transition: "box-shadow 0.4s ease" }}>
          Select Program →
        </button>
      </div>
    </article>
  );
}

/* ── Step 3: Duration ───────────────────────────────────────── */
function S3({ g, prog, days, weeks, setDays, setWeeks, onConfirm, onBack }: { g: G; prog: Prog; days: Days | null; weeks: Weeks | null; setDays: (d: Days) => void; setWeeks: (w: Weeks) => void; onConfirm: () => void; onBack: () => void }) {
  const ready = days && weeks;
  const bA = { borderRadius: "0.75rem", padding: "1.2rem 1rem", fontFamily: "var(--font-display)" as const, fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", textAlign: "center" as const, background: "#a3e635", color: "#0a0a0a", border: "1px solid #a3e635", boxShadow: "0 0 24px rgba(163,230,53,.4)", display: "block", width: "100%", fontSize: "1rem" };
  const bI = { ...bA, background: "rgba(255,255,255,.04)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", boxShadow: "none" };
  return (
    <section aria-label="Duration selection" style={{ maxWidth: "46rem", margin: "0 auto", padding: "4rem 1.5rem", width: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 72px)", justifyContent: "center" }}>
      <GBtn onClick={onBack} aria="Back to programs" style={{ marginBottom: "2.5rem", alignSelf: "flex-start" }}>← Back to Programs</GBtn>
      <p style={{ color: "#a3e635", fontWeight: 700, letterSpacing: "0.2em", fontSize: "0.72rem", textTransform: "uppercase", margin: 0 }}>Step 3 — Customise Your Schedule</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,4vw,2.8rem)", margin: "0.4rem 0 0.4rem", letterSpacing: "0.05em", lineHeight: 1.1 }}>
        {g === "w" ? "How many days can you commit, queen? 👑" : "How many days will you grind? 💪"}
      </h1>
      <p style={{ color: "#9ca3af", margin: "0 0 2.5rem" }}>Building your <span style={{ color: "#a3e635", fontWeight: 700 }}>{prog.name}</span> plan</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "rgba(255,255,255,.5)", letterSpacing: "0.12em", margin: "0 0 0.75rem" }}>DAYS PER WEEK</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.75rem", marginBottom: "2rem" }}>
        {([3, 4, 5, 6] as Days[]).map(d => (
          <button key={d} onClick={() => setDays(d)} aria-label={`${d} days per week`} style={days === d ? bA : bI}>
            <span style={{ display: "block", fontSize: "1.5rem" }}>{d}</span>
            <span style={{ fontSize: "0.62rem", fontWeight: 400, opacity: 0.8 }}>days</span>
          </button>
        ))}
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "rgba(255,255,255,.5)", letterSpacing: "0.12em", margin: "0 0 0.75rem" }}>PROGRAM DURATION</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.75rem", marginBottom: "0.75rem" }}>
        {([8, 12, 16, 20] as Weeks[]).map(w => (
          <button key={w} onClick={() => setWeeks(w)} aria-label={`${w} weeks`} style={weeks === w ? bA : bI}>
            <span style={{ display: "block", fontSize: "1.3rem" }}>{w}w</span>
            <span style={{ fontSize: "0.62rem", fontWeight: weeks === w ? 700 : 400 }}>{WL[w]}</span>
          </button>
        ))}
      </div>
      {ready && <p style={{ color: "#a3e635", fontSize: "0.85rem", textAlign: "center", margin: "0.5rem 0 1.5rem", fontStyle: "italic" }}>✦ {days} days × {weeks} weeks = {(days as number) * (weeks as number)} total sessions</p>}
      <button onClick={onConfirm} disabled={!ready} aria-label="Build my personalized program"
        style={{ background: ready ? "#a3e635" : "rgba(255,255,255,.08)", color: ready ? "#0a0a0a" : "rgba(255,255,255,.25)", border: "none", borderRadius: "9999px", padding: "1rem 2rem", fontSize: "1rem", fontWeight: 700, cursor: ready ? "pointer" : "not-allowed", boxShadow: ready ? "0 0 30px rgba(163,230,53,.4)" : "none", transition: "all 0.4s ease", width: "100%", marginTop: ready ? 0 : "1.5rem" }}>
        Build My Program →
      </button>
    </section>
  );
}

/* ── Step 4: Detail (redesigned) ─────────────────────────────── */
function S4({ prog, g, days, weeks, aDay, setADay, curWk, setCurWk, onBack }: { prog: Prog; g: G; days: Days; weeks: Weeks; aDay: number; setADay: (d: number) => void; curWk: number; setCurWk: (w: number) => void; onBack: () => void }) {
  const [fadDay, setFadDay] = useState(false);
  const isW = g === "w";
  const sci = SCI[prog.slug] ?? SCI.wl;
  const phase = getPhase(curWk);
  const miles = isW ? MW : MM;
  const nutr = getNutr(g, prog.slug);
  const heroImg = HERO[g]?.[prog.slug] ?? prog.img;
  const progDays = PROG_DATA[g]?.[prog.slug] ?? {};
  const variation = getVariation(curWk);
  const rawDay = progDays[aDay + 1];
  const dayName = rawDay?.name ?? "Training Day";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exMap = (rawDay?.exercises ?? { A: [], B: [], C: [] }) as any;
  const dayExercises: { name: string; muscle: string; sci: string; img: string }[] = exMap[variation] ?? exMap["A"] ?? [];
  const varInfo = VAR_LABEL[variation];
  const nutrIcons = NUTR_ICONS[`${g}-${prog.slug}`] ?? [["🥩", "Protein"], ["💧", "Hydration"], ["💤", "Recovery"]];

  const switchDay = (i: number) => { setFadDay(true); setTimeout(() => { setADay(i); setFadDay(false); }, 200); };
  const switchWk = (w: number) => { setFadDay(true); setTimeout(() => { setCurWk(w); setFadDay(false); }, 200); };

  const milestoneCount = weeks >= 16 ? 4 : weeks >= 12 ? 3 : 2;

  return (
    <article aria-label={`${prog.name} program detail`}>
      {/* ── Hero ── */}
      <div style={{ position: "relative", height: "clamp(320px,52vh,500px)", overflow: "hidden" }}>
        <img src={heroImg} alt={`${prog.name} — ${isW ? "Women's" : "Men's"} program hero`} loading="lazy" width={1200} height={500}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(10,10,10,0.95))" }} aria-hidden="true" />
        {/* Back button */}
        <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem" }}>
          <button onClick={onBack} aria-label={`Back to ${isW ? "women's" : "men's"} programs`}
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", borderRadius: "9999px", padding: "0.45rem 1rem", fontSize: "0.8rem", cursor: "pointer", fontWeight: 500, transition: "all 0.2s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#a3e635"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(163,230,53,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; }}>
            ← Back to Programs
          </button>
        </div>
        {/* Hero content */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 1.5rem 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.25rem)", margin: "0 0 1.1rem", letterSpacing: "0.04em", lineHeight: 1 }}>{prog.name}</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[["⏱", `${weeks} Weeks`], ["📅", `${days}× / Week`], ["💪", prog.diff], ["🎯", prog.goal]].map(([icon, val]) => (
                <span key={val} style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "9999px", padding: "0.35rem 0.85rem", fontSize: "0.8rem", fontWeight: 600, color: "#fff", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  {icon} {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Layout: sidebar + main ── */}
      <div className="s4-layout" style={{ display: "flex", alignItems: "flex-start", minHeight: "60vh" }}>

        {/* ── LEFT SIDEBAR (desktop) ── */}
        <aside className="s4-sidebar" aria-label="Day navigation" style={{ width: 280, flexShrink: 0, background: "#111111", borderRight: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "1.5rem 1rem 1rem" }}>
            <p style={{ color: "#a3e635", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.75rem", paddingLeft: "0.5rem" }}>Training Days</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {Array.from({ length: days }).map((_, i) => {
                const active = aDay === i;
                const dName = progDays[i + 1]?.name ?? "Training Day";
                return (
                  <button key={i} onClick={() => switchDay(i)} aria-label={`Day ${i + 1}: ${dName}`}
                    style={{ background: active ? "#a3e635" : "transparent", color: active ? "#0a0a0a" : "#9ca3af", borderRadius: "0.6rem", border: "none", padding: "0.65rem 0.75rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s ease", display: "flex", flexDirection: "column", gap: "0.1rem" }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af"; }}>
                    <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>Day {i + 1} {active ? "●" : ""}</span>
                    <span style={{ fontSize: "0.72rem", opacity: active ? 0.7 : 0.55, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{dName}</span>
                  </button>
                );
              })}
              {Array.from({ length: 7 - days }).map((_, i) => (
                <div key={i} style={{ padding: "0.65rem 0.75rem", color: "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>Rest</div>
              ))}
            </div>
          </div>
          {/* Week navigator */}
          <div style={{ marginTop: "auto", padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
              <button onClick={() => switchWk(Math.max(1, curWk - 1))} aria-label="Previous week"
                style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "1rem", padding: "0.25rem 0.5rem" }}>←</button>
              <span style={{ fontSize: "0.8rem", color: "#d1d5db", fontWeight: 600 }}>Week {curWk}/{weeks}</span>
              <button onClick={() => switchWk(Math.min(weeks, curWk + 1))} aria-label="Next week"
                style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "1rem", padding: "0.25rem 0.5rem" }}>→</button>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ background: "rgba(163,230,53,0.12)", color: "#a3e635", border: "1px solid rgba(163,230,53,0.25)", borderRadius: "9999px", padding: "0.2rem 0.75rem", fontSize: "0.72rem", fontWeight: 700 }}>
                {PHASE_EMOJI[phase]} {PHASES[phase][0]}
              </span>
            </div>
          </div>
        </aside>

        {/* ── MOBILE TABS ── */}
        <div className="s4-tabs" style={{ display: "none" }} aria-label="Day navigation tabs">
          <div style={{ overflowX: "auto", display: "flex", gap: "0.4rem", padding: "0.75rem 1rem", background: "#111", borderBottom: "1px solid rgba(255,255,255,0.06)", scrollbarWidth: "none" }}>
            {Array.from({ length: days }).map((_, i) => {
              const active = aDay === i;
              return (
                <button key={i} onClick={() => switchDay(i)} aria-label={`Day ${i + 1}: ${progDays[i + 1]?.name ?? "Training Day"}`}
                  style={{ background: active ? "#a3e635" : "rgba(255,255,255,0.06)", color: active ? "#0a0a0a" : "#9ca3af", border: `1px solid ${active ? "#a3e635" : "rgba(255,255,255,0.1)"}`, borderRadius: "9999px", padding: "0.45rem 1rem", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s ease" }}>
                  Day {i + 1}
                </button>
              );
            })}
            {Array.from({ length: 7 - days }).map((_, i) => (
              <span key={i} style={{ background: "transparent", color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "9999px", padding: "0.45rem 1rem", fontSize: "0.8rem", whiteSpace: "nowrap", flexShrink: 0 }}>Rest</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 1rem", background: "#111", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <button onClick={() => switchWk(Math.max(1, curWk - 1))} aria-label="Previous week"
              style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "0.85rem", padding: "0.25rem 0.5rem" }}>←</button>
            <span style={{ fontSize: "0.78rem", color: "#d1d5db" }}>Week {curWk}/{weeks} · <span style={{ color: "#a3e635" }}>{PHASE_EMOJI[phase]} {PHASES[phase][0]}</span></span>
            <button onClick={() => switchWk(Math.min(weeks, curWk + 1))} aria-label="Next week"
              style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "0.85rem", padding: "0.25rem 0.5rem" }}>→</button>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, minWidth: 0, padding: "2.5rem 1.5rem 5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ opacity: fadDay ? 0 : 1, transition: "opacity 0.2s ease" }}>

              {/* Day heading */}
              <div style={{ marginBottom: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem,3vw,2rem)", margin: 0, letterSpacing: "0.04em" }}>
                    Day {aDay + 1} — {dayName}
                  </h2>
                  <span style={{ background: "rgba(163,230,53,0.1)", color: "#a3e635", border: "1px solid rgba(163,230,53,0.25)", borderRadius: "9999px", padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>
                    {PHASE_EMOJI[phase]} {PHASES[phase][0]}
                  </span>
                </div>
                <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0.4rem 0 0" }}>{SETS[phase]} · {dayExercises.length} exercises</p>
              <p style={{ fontSize: "0.75rem", margin: "0.3rem 0 0", color: varInfo.color, fontWeight: 600 }}>{varInfo.emoji} Week {curWk} — {varInfo.label}</p>
              </div>

              {/* Exercise cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3rem" }}>
                {dayExercises.map((ex, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#111", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", alignItems: "flex-start" }}>
                    <img src={ex.img} alt={`${ex.name} exercise demonstration`} loading="lazy" width={80} height={80}
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", margin: 0, fontWeight: 700, letterSpacing: "0.03em", lineHeight: 1.2 }}>{ex.name}</h3>
                        <span style={{ background: "rgba(163,230,53,0.12)", color: "#a3e635", border: "1px solid rgba(163,230,53,0.25)", borderRadius: "9999px", padding: "0.15rem 0.6rem", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{SETS[phase]}</span>
                      </div>
                      <p style={{ color: "#a3e635", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.35rem" }}>{ex.muscle}</p>
                      <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: 0, lineHeight: 1.5, fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ex.sci}</p>
                    </div>
                  </div>
                ))}
                {dayExercises.length === 0 && (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "2rem", background: "#111", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>No exercises for this day.</p>
                )}
              </div>

              {/* Science section */}
              <section aria-label="Science explanation" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,3vw,1.75rem)", margin: "0 0 1.25rem", letterSpacing: "0.04em" }}>Why This Works</h2>
                <p style={{ color: "#d1d5db", lineHeight: 1.75, margin: "0 0 1rem", fontSize: "0.95rem" }}>{sci.p1}</p>
                <p style={{ color: "#d1d5db", lineHeight: 1.75, margin: "0 0 1.5rem", fontSize: "0.95rem" }}>{sci.p2}</p>
                <div style={{ background: "rgba(163,230,53,0.06)", border: "1px solid rgba(163,230,53,0.2)", borderRadius: "12px", padding: "1.25rem 1.5rem" }}>
                  <p style={{ color: "#a3e635", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 0.4rem" }}>Key Principle: {sci.kp}</p>
                  <p style={{ color: "#d1d5db", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>{sci.kpv}</p>
                </div>
              </section>

              {/* Nutrition tips */}
              <section aria-label="Nutrition strategy" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,3vw,1.75rem)", margin: "0 0 1.5rem", letterSpacing: "0.04em" }}>Fuel Your Progress</h2>
                <div className="nutr-grid">
                  {nutrIcons.map(([icon, label], i) => (
                    <div key={i} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.25rem 1rem", textAlign: "center" }}>
                      <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{icon}</div>
                      <p style={{ color: "#a3e635", fontWeight: 700, fontSize: "0.82rem", margin: "0 0 0.35rem" }}>{label}</p>
                      <p style={{ color: "#9ca3af", fontSize: "0.78rem", margin: 0, lineHeight: 1.5 }}>{nutr[i] ?? ""}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Milestones */}
              <section aria-label="Progress milestones" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,3vw,1.75rem)", margin: "0 0 2rem", letterSpacing: "0.04em" }}>Your Journey</h2>
                <div className="milestone-row">
                  {miles.slice(0, milestoneCount).map((m, i) => {
                    const active = i <= phase;
                    return (
                      <div key={i} className="milestone-item" style={{ flex: 1, minWidth: 0, position: "relative" }}>
                        <div style={{ width: 32, height: 32, borderRadius: "9999px", background: active ? "#a3e635" : "rgba(255,255,255,0.08)", border: active ? "none" : "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", marginBottom: "0.75rem", flexShrink: 0 }}>
                          {active ? "✓" : <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>{i + 1}</span>}
                        </div>
                        <p style={{ color: active ? "#a3e635" : "rgba(255,255,255,0.35)", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.3rem" }}>{PHASES[i][0]}</p>
                        <p style={{ color: active ? "#d1d5db" : "rgba(255,255,255,0.3)", fontSize: "0.82rem", margin: 0, lineHeight: 1.55 }}>{m}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* CTA */}
              <div style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)", background: "#111", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.05em", margin: "0 0 0.4rem" }}>READY TO START?</p>
                <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 1.5rem" }}>{days}d/week · {weeks} weeks · {days * weeks} sessions</p>
                <a href="#" aria-label="Get full program plan" style={{ display: "inline-block", background: "#a3e635", color: "#0a0a0a", borderRadius: "9999px", padding: "0.9rem 2.5rem", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 28px rgba(163,230,53,0.35)" }}>Get Full Program Plan →</a>
              </div>

            </div>
          </div>
        </main>
      </div>

      <style>{`
        .s4-layout { flex-direction: row; }
        .s4-sidebar { display: flex !important; }
        .s4-tabs { display: none !important; }
        .nutr-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
        .milestone-row { display: flex; flex-direction: row; gap: 1.5rem; position: relative; }
        .milestone-row::before { content: ''; position: absolute; top: 15px; left: 16px; right: 16px; height: 2px; background: rgba(255,255,255,0.08); z-index: 0; }
        .milestone-item { z-index: 1; }
        @media(max-width: 768px) {
          .s4-layout { flex-direction: column !important; }
          .s4-sidebar { display: none !important; }
          .s4-tabs { display: block !important; }
          .nutr-grid { grid-template-columns: 1fr !important; }
          .milestone-row { flex-direction: column !important; gap: 1.25rem; }
          .milestone-row::before { display: none; }
          .milestone-item { display: flex; gap: 1rem; align-items: flex-start; }
          .milestone-item > div:first-child { margin-bottom: 0 !important; }
        }
        @media(max-width: 640px) {
          .s4-layout main { padding: 1.5rem 1rem 4rem !important; }
        }
      `}</style>
    </article>
  );
}

/* ── Shared atoms ─────────────────────────────────────────────── */
function GBtn({ onClick, aria, children, style }: { onClick: () => void; aria: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} aria-label={aria} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "transparent", border: `1px solid ${hov ? "rgba(163,230,53,.6)" : "rgba(255,255,255,.2)"}`, color: hov ? "#a3e635" : "rgba(255,255,255,.65)", borderRadius: "9999px", padding: "0.6rem 1.25rem", fontSize: "0.875rem", cursor: "pointer", transition: "all 0.3s ease", ...style }}>
      {children}
    </button>
  );
}
