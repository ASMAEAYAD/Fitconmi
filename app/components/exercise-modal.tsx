"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Exercise } from "../lib/programs-data";

// ── Utility: detect if a setsReps string is timed ─────────────────────
function parseDuration(setsReps: string): number | null {
  // Matches patterns like "45 sec", "1min", "30s", "45s", "2 min", "10 minutes"
  const secMatch = setsReps.match(/(\d+)\s*(?:sec|s)\b/i);
  if (secMatch && secMatch[1]) return parseInt(secMatch[1], 10);
  const minMatch = setsReps.match(/(\d+)\s*min(?:utes?)?/i);
  if (minMatch && minMatch[1]) return parseInt(minMatch[1], 10) * 60;
  return null;
}

// ── Difficulty badge colour ────────────────────────────────────────────
function difficultyFromMuscle(muscles: string): "Beginner" | "Intermediate" | "Advanced" {
  const m = muscles.toLowerCase();
  if (m.includes("full body") || m.includes("explosive") || m.includes("vo2") || m.includes("neural"))
    return "Advanced";
  if (m.includes("posterior chain") || m.includes("all") || m.includes("primary"))
    return "Intermediate";
  return "Beginner";
}

// ── Equipment inference from exercise data ────────────────────────────
function inferEquipment(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("barbell")) return "Barbell + rack";
  if (n.includes("dumbbell")) return "Dumbbells";
  if (n.includes("cable") || n.includes("pulldown") || n.includes("pushdown")) return "Cable machine";
  if (n.includes("kettlebell")) return "Kettlebell";
  if (n.includes("resistance band") || n.includes("resist-band")) return "Resistance band";
  if (n.includes("assault bike")) return "Assault bike";
  if (n.includes("rowing machine") || n.includes("row erg")) return "Rowing machine";
  if (n.includes("jump rope") || n.includes("double-under")) return "Jump rope";
  if (n.includes("box jump") || n.includes("depth jump")) return "Plyo box";
  if (n.includes("battle rope")) return "Battle ropes";
  if (n.includes("ab wheel")) return "Ab wheel";
  if (n.includes("pull-up") || n.includes("hanging")) return "Pull-up bar";
  if (n.includes("ez-bar") || n.includes("skull crusher")) return "EZ-bar";
  if (n.includes("sled")) return "Sled + plates";
  if (n.includes("run") || n.includes("sprint") || n.includes("walk") || n.includes("jog"))
    return "No equipment (outdoor)";
  if (n.includes("foam roll")) return "Foam roller";
  if (n.includes("push-up") || n.includes("burpee") || n.includes("mountain climber") ||
      n.includes("plank") || n.includes("dead bug") || n.includes("cat-cow") ||
      n.includes("stretch") || n.includes("pnf") || n.includes("hip") || n.includes("pigeon") ||
      n.includes("world's greatest") || n.includes("90-90") || n.includes("butterfly") ||
      n.includes("spinal") || n.includes("ankle") || n.includes("cars") || n.includes("thoracic"))
    return "No equipment";
  return "Varies — check description";
}

// ── Step-by-step fallback generator ───────────────────────────────────
function generateSteps(name: string, muscles: string): string[] {
  const n = name.toLowerCase();
  const isStretch = n.includes("stretch") || n.includes("pnf") || n.includes("pose") || n.includes("cars") || n.includes("rotation") || n.includes("flow");
  const isCardio = n.includes("run") || n.includes("sprint") || n.includes("bike") || n.includes("row") || n.includes("jump rope");
  const isPly = n.includes("jump") || n.includes("box") || n.includes("burpee");

  if (isStretch) return [
    `Set up in the starting position for ${name}: find a stable base and keep your spine neutral.`,
    `Ease into the stretch until you feel moderate tension — never pain — in the target area: ${muscles}.`,
    `For PNF phases: contract the target muscle group isometrically for 6 seconds against resistance, then relax.`,
    `On the exhale, deepen into the next available range of motion without forcing.`,
    `Hold the end position for the prescribed duration. Breathe slowly and deliberately — 4s inhale, 4s exhale.`,
    "Pro tip: Focus on active relaxation. Tension = less ROM. Let each breath release you 1–2% deeper.",
  ];

  if (isCardio) return [
    `Start at an easy warm-up pace for the first 2 minutes to prime the cardiovascular system.`,
    `Settle into your target heart rate zone as prescribed in the sets × reps for ${name}.`,
    `Maintain rhythm with your breathing — aim to breathe through the nose for Zone 2 efforts.`,
    `Keep consistent form: tall posture, relaxed shoulders, controlled stride or stroke rate.`,
    `In the final 10%, reduce intensity to aid recovery before your next exercise or session.`,
    "Pro tip: Conversational pace for Zone 2 = you can say a sentence without gasping. If you can't, slow down.",
  ];

  if (isPly) return [
    `Stand with feet shoulder-width apart, hips back, slight forward lean ready for the movement.`,
    `Load your hips into a quarter-squat counter-movement; feel tension build in your glutes and quads.`,
    `Drive explosively through the heels, extending hips → knees → ankles (triple extension) simultaneously.`,
    `Land softly with knees tracking toes, absorbing force through the entire foot, ankle, knee, and hip chain.`,
    `Reset your posture fully before the next rep — never bounce into the next rep without control.`,
    "Pro tip: The amortization phase (ground contact) should be <250ms. Speed of contact = power output.",
  ];

  return [
    `Set up with feet ${n.includes("squat") || n.includes("deadlift") || n.includes("press") ? "hip-to-shoulder-width" : "stable"} apart and brace your core.`,
    `Begin the ${n.includes("eccentric") || n.includes("negative") ? "3-second eccentric (lowering)" : "controlled lowering"} phase — feel the target muscles (${muscles.split("·")[0]?.trim() || muscles}) lengthen under tension.`,
    `Pause 1 second at the bottom or stretch position — eliminate momentum and maximise muscle tension.`,
    `Drive through the concentric phase with intent — move the load powerfully while maintaining joint alignment.`,
    `Breathe in on the eccentric, brace and breathe out on the concentric effort (Valsalva for heavy loads).`,
    "Common mistake: rushing the eccentric. Slow the lowering to 2–3 seconds for maximum hypertrophy stimulus.",
  ];
}

// ── Countdown timer component ─────────────────────────────────────────
function CountdownTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    clearInterval(intervalRef.current!);
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current!);
    setRunning(false);
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => () => clearInterval(intervalRef.current!), []);

  const pct = ((seconds - remaining) / seconds) * 100;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isDone = remaining === 0;

  return (
    <div
      style={{
        borderRadius: 14,
        border: "1px solid rgba(163,230,53,0.25)",
        background: "rgba(163,230,53,0.06)",
        padding: "16px 20px",
        marginTop: 16,
      }}
    >
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a3e635", margin: "0 0 10px" }}>
        ⏱ Exercise Timer
      </p>
      {/* Progress bar */}
      <div style={{ height: 4, borderRadius: 99, background: "rgba(255,255,255,0.1)", overflow: "hidden", marginBottom: 12 }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: isDone ? "#ef4444" : "#a3e635",
            borderRadius: 99,
            transition: "width 0.9s linear",
          }}
        />
      </div>
      {/* Time display */}
      <p
        style={{
          fontSize: 36,
          fontWeight: 800,
          fontVariantNumeric: "tabular-nums",
          color: isDone ? "#ef4444" : "#fff",
          margin: "0 0 12px",
          fontFamily: "monospace",
          textAlign: "center",
        }}
      >
        {isDone ? "DONE! 🎉" : `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`}
      </p>
      {/* Controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {!isDone && (
          <button
            type="button"
            onClick={running ? pause : start}
            style={{
              borderRadius: 99,
              border: "none",
              background: "#a3e635",
              color: "#0a0a0a",
              fontWeight: 700,
              fontSize: 13,
              padding: "8px 20px",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
          >
            {running ? "⏸ Pause" : remaining === seconds ? "▶ Start" : "▶ Resume"}
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          style={{
            borderRadius: 99,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "#9ca3af",
            fontWeight: 600,
            fontSize: 13,
            padding: "8px 20px",
            cursor: "pointer",
          }}
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────
type ExerciseModalProps = {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkDone: (name: string) => void;
  doneNames: Set<string>;
};

// ══════════════════════════════════════════════════════════════════════
//  ExerciseModal — main export
// ══════════════════════════════════════════════════════════════════════
export default function ExerciseModal({
  exercise,
  isOpen,
  onClose,
  onMarkDone,
  doneNames,
}: ExerciseModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mount/unmount with animation
  useEffect(() => {
    if (isOpen && exercise) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(t);
    }
  }, [isOpen, exercise]);

  // Keyboard close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted || !exercise) return null;

  const timerSeconds = parseDuration(exercise.setsReps);
  const difficulty = difficultyFromMuscle(exercise.muscles);
  const equipment = inferEquipment(exercise.name);
  const steps = exercise.instructions.length >= 4 ? exercise.instructions : generateSteps(exercise.name, exercise.muscles);
  const isDone = doneNames.has(exercise.name);

  // Parse muscles into primary + secondary badges
  const muscleTokens = exercise.muscles.split(/[,·]/).map((m) => m.trim()).filter(Boolean);
  const primaryMuscle = muscleTokens[0] ?? exercise.muscles;
  const secondaryMuscles = muscleTokens.slice(1);

  const diffColor: Record<string, string> = {
    Beginner: "#22c55e",
    Intermediate: "#f97316",
    Advanced: "#ef4444",
  };

  return (
    <>
      {/* ── Global keyframe styles ── */}
      <style>{`
        @keyframes fcModalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fcModalSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fcModalSlideCenter { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .fc-modal-body { scrollbar-width: thin; scrollbar-color: rgba(163,230,53,0.3) transparent; }
        .fc-modal-body::-webkit-scrollbar { width: 4px; }
        .fc-modal-body::-webkit-scrollbar-track { background: transparent; }
        .fc-modal-body::-webkit-scrollbar-thumb { background-color: rgba(163,230,53,0.3); border-radius: 99px; }
        .fc-mark-done:hover { background: #84cc16 !important; transform: translateY(-1px); }
        .fc-close-btn:hover { border-color: #a3e635 !important; color: #a3e635 !important; }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        ref={backdropRef}
        onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
        role="dialog"
        aria-modal="true"
        aria-label={`${exercise.name} exercise detail`}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9000,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          background: "rgba(0,0,0,0.75)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          // Desktop: center it
        }}
      >
        {/* ── Responsive layout switch via inline media-query via CSS vars ── */}
        <style>{`
          @media (min-width: 768px) {
            .fc-modal-panel {
              align-self: center !important;
              max-height: 88vh !important;
              border-radius: 20px !important;
              transform: ${visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)"} !important;
              animation: ${mounted ? "fcModalSlideCenter" : "none"} 0.35s cubic-bezier(0.16,1,0.3,1) both !important;
              margin-bottom: 0 !important;
            }
          }
        `}</style>

        {/* ── Panel ── */}
        <div
          className="fc-modal-panel"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 620,
            maxHeight: "92vh",
            background: "#111111",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 -20px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(163,230,53,0.1)",
            display: "flex",
            flexDirection: "column",
            transform: visible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: 0,
            // Mobile: slide up animation
            animation: mounted ? "fcModalSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── Drag handle (mobile only) ── */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
            <div style={{ width: 36, height: 4, borderRadius: 99, background: "rgba(255,255,255,0.2)" }} />
          </div>

          {/* ── Hero image ── */}
          <div style={{ position: "relative", height: 280, flexShrink: 0, overflow: "hidden" }}>
            <img
              src={exercise.imageUrl}
              alt={`${exercise.name} — exercise demonstration`}
              loading="eager"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,17,17,1) 0%, rgba(17,17,17,0.3) 60%, transparent 100%)" }} />

            {/* Top row: close + sets×reps badge */}
            <div style={{ position: "absolute", top: 14, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
              {/* Sets × Reps badge */}
              <span
                style={{
                  background: "#a3e635",
                  color: "#0a0a0a",
                  fontWeight: 800,
                  fontSize: 13,
                  borderRadius: 99,
                  padding: "5px 14px",
                  boxShadow: "0 4px 16px rgba(163,230,53,0.35)",
                  flexShrink: 0,
                }}
              >
                {exercise.setsReps}
              </span>
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close exercise detail modal"
                className="fc-close-btn"
                style={{
                  borderRadius: 99,
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  width: 34,
                  height: 34,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* ── Scrollable content ── */}
          <div
            className="fc-modal-body"
            style={{ overflowY: "auto", padding: "20px 24px 32px", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* Exercise name + difficulty */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <h2
                style={{
                  fontFamily: "var(--font-display, 'Bebas Neue', Impact, sans-serif)",
                  fontSize: 28,
                  letterSpacing: "0.04em",
                  color: "#fff",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {exercise.name}
              </h2>
              <span
                style={{
                  flexShrink: 0,
                  borderRadius: 99,
                  border: `1px solid ${diffColor[difficulty]}40`,
                  background: `${diffColor[difficulty]}15`,
                  color: diffColor[difficulty],
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                {difficulty}
              </span>
            </div>

            {/* Equipment */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, color: "#a3e635", flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14.5 6.5h-11m14 5h-14m14 5h-11" strokeLinecap="round"/>
                <circle cx="17.5" cy="6.5" r="2"/>
                <circle cx="3.5" cy="11.5" r="2"/>
                <circle cx="17.5" cy="16.5" r="2"/>
              </svg>
              <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>
                <span style={{ color: "#d1d5db", fontWeight: 600 }}>Equipment:</span> {equipment}
              </p>
            </div>

            {/* Muscle badges */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 8px" }}>
                Muscles Worked
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {/* Primary */}
                <span
                  style={{
                    borderRadius: 99,
                    border: "1px solid rgba(163,230,53,0.4)",
                    background: "rgba(163,230,53,0.12)",
                    color: "#a3e635",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "4px 12px",
                  }}
                >
                  {primaryMuscle}
                </span>
                {/* Secondary */}
                {secondaryMuscles.map((m) => (
                  <span
                    key={m}
                    style={{
                      borderRadius: 99,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#9ca3af",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "4px 12px",
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Scientific explanation */}
            <div
              style={{
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.03)",
                padding: 16,
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a3e635", margin: "0 0 10px" }}>
                🔬 Scientific Benefit
              </p>
              <p style={{ margin: 0, fontSize: 14, color: "#d1d5db", lineHeight: 1.7 }}>
                {exercise.benefit}
              </p>
            </div>

            {/* Step-by-step guide */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px" }}>
                📋 Step-by-Step Guide
              </p>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {steps.map((step, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 24,
                        height: 24,
                        borderRadius: 99,
                        background: i === 0 ? "#a3e635" : "rgba(163,230,53,0.12)",
                        color: i === 0 ? "#0a0a0a" : "#a3e635",
                        fontWeight: 800,
                        fontSize: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 1,
                      }}
                    >
                      {i + 1}
                    </span>
                    <p style={{ margin: 0, fontSize: 14, color: "#d1d5db", lineHeight: 1.65 }}>{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Countdown timer (if timed exercise) */}
            {timerSeconds !== null && <CountdownTimer seconds={timerSeconds} />}

            {/* Mark as done button */}
            <button
              type="button"
              onClick={() => onMarkDone(exercise.name)}
              className="fc-mark-done"
              style={{
                borderRadius: 99,
                border: isDone ? "1px solid rgba(163,230,53,0.4)" : "none",
                background: isDone ? "transparent" : "#a3e635",
                color: isDone ? "#a3e635" : "#0a0a0a",
                fontWeight: 800,
                fontSize: 15,
                padding: "14px 24px",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                marginTop: 4,
              }}
            >
              {isDone ? "✓ Completed!" : "Mark as Done ✓"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
