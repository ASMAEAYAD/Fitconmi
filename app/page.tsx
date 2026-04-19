"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Link from "next/link";

/* ── Motion.js global type (loaded via CDN) ── */
declare global {
  interface Window {
    Motion?: {
      animate: (
        el: Element | Element[],
        keyframes: Record<string, unknown>,
        options?: Record<string, unknown>
      ) => void;
    };
  }
}

/* ── Button click pulse via Motion.js ── */
function useMotionPulse() {
  return useCallback((el: HTMLElement | null) => {
    if (!el || !window.Motion) return;
    window.Motion.animate(
      el,
      { scale: [1, 0.95, 1.02, 1] } as Record<string, unknown>,
      { duration: 0.3, easing: "ease-out" }
    );
  }, []);
}

/* ── 3D card tilt on mousemove ── */
function use3DTilt(maxDeg = 10) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      el.style.setProperty("--ry", `${(x * maxDeg).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * maxDeg).toFixed(2)}deg`);
      el.style.transform = `rotateX(${(-y * maxDeg).toFixed(2)}deg) rotateY(${(x * maxDeg).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
      el.style.transform = "rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxDeg]);
  return ref;
}

/* ── Brand Logo ─────────────────────────────────────────── */
function BrandLogo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="FitConMi home">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-[#a3e635]"
        aria-hidden="true"
      >
        <path
          d="M13.5 2 6 13h5l-1 9 8-12h-5l.5-8Z"
          fill="currentColor"
        />
      </svg>
      <span
        className="text-[26px] leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span className="text-white">Fit</span>
        <span className="text-[#a3e635]">Con</span>
        <span className="text-white">Mi</span>
      </span>
    </a>
  );
}

/* ── Use Intersection Observer hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Hero Images (all with real humans, no repeats) ── */
const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&fit=crop&crop=center",
    alt: "Athletic man and woman training together intensely in a professional gym, embodying team fitness",
  },
  {
    url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1920&q=80&fit=crop&crop=center",
    alt: "Athlete performing battle ropes with explosive energy and full-body power in gym training",
  },
  {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80&fit=crop&crop=center",
    alt: "Woman doing high-intensity HIIT jump training with explosive athletic movements",
  },
  {
    url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1920&q=80&fit=crop&crop=center",
    alt: "Male powerlifter executing a heavy barbell deadlift with intense concentration and chalk-covered hands",
  },
  {
    url: "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=1920&q=80&fit=crop&crop=center",
    alt: "Man performing pull-ups with excellent muscle definition and athletic form",
  },
];

/* ── Program levels ── */
const programs = [
  {
    title: "Beginner",
    level: "0–6 months",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    duration: "12 weeks",
    workouts: "3× per week",
    goal: "Build foundation & habits",
    key: "Progressive overload basics, form mastery, recovery",
    cta: "Start Beginner Program",
    img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80&fit=crop&crop=faces",
    imgAlt: "Beginner athlete learning proper dumbbell curl form with trainer guidance in bright gym",
  },
  {
    title: "Intermediate",
    level: "6m–2 years",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    duration: "16 weeks",
    workouts: "4× per week",
    goal: "Strength & body composition",
    key: "Periodization, nutrition timing, strength benchmarks",
    cta: "Start Intermediate Program",
    img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80&fit=crop&crop=faces",
    imgAlt: "Intermediate athlete performing barbell back squat with controlled form and strong posture",
  },
  {
    title: "Advanced",
    level: "2+ years",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M6.5 6.5h11M6.5 17.5h11M2 12h20" strokeLinecap="round"/>
        <circle cx="6.5" cy="6.5" r="2" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="2" strokeWidth="2"/>
        <circle cx="6.5" cy="17.5" r="2" strokeWidth="2"/>
        <circle cx="17.5" cy="17.5" r="2" strokeWidth="2"/>
      </svg>
    ),
    duration: "20 weeks",
    workouts: "5× per week",
    goal: "Peak performance",
    key: "Advanced periodization, competition prep, elite nutrition",
    cta: "Start Advanced Program",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80&fit=crop&crop=faces",
    imgAlt: "Advanced male athlete performing heavy barbell lift with chalk and intense focus in powerlifting gym",
  },
];

/* ── Stats ── */
const stats = [
  { label: "Members", value: 10000, suffix: "+" },
  { label: "Programs", value: 50, suffix: "+" },
  { label: "Success Rate", value: 95, suffix: "%" },
  { label: "Science-Based", value: 100, suffix: "%" },
];

/* ── Method steps ── */
const methodSteps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#a3e635]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.667-4.5M19.8 15a2.25 2.25 0 01-1.5 2.25M5 14.5A2.25 2.25 0 003.5 16.75m0 0v2.25m0-2.25h15m-15 2.25H15m-15 0A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Assess",
    text: "We analyze your fitness level, goals, and lifestyle to build the right starting point.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#a3e635]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Program",
    text: "Get your personalized science-based training plan built around your schedule.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#a3e635]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Progress",
    text: "Track results with evidence-based metrics. Adapt your program as you improve.",
  },
];

/* ── Science cards ── */
const scienceCards = [
  {
    title: "Progressive Overload",
    text: "The #1 principle for muscle growth: gradually increase training stimulus so your body keeps adapting and never plateaus.",
  },
  {
    title: "Periodization",
    text: "Planned variation in intensity and volume helps you avoid plateaus and sustain long-term progress over months.",
  },
  {
    title: "Recovery Science",
    text: "Rest is 50% of your results. Sleep, recovery days, and stress control are non-negotiable for elite performance.",
  },
];

/* ── Testimonials ── */
const testimonials = [
  {
    name: "Youssef M.",
    result: "Lost 12 kg in 16 weeks",
    quote:
      "I stopped guessing and followed the program exactly. The structure and progress tracking changed everything for me.",
    avatar: "YM",
  },
  {
    name: "Fatima K.",
    result: "Built strength & toned up in 14 weeks",
    quote:
      "The workouts are clear, the nutrition plan is realistic, and I finally feel consistent without burnout.",
    avatar: "FK",
  },
  {
    name: "Karim B.",
    result: "Added 18 kg to squat in 12 weeks",
    quote:
      "FitConMi made training simple and data-driven. I can see measurable improvement every single month.",
    avatar: "KB",
  },
];

/* ── Community images (no repeats, real humans) ── */
const communityImages = [
  {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop&crop=faces",
    alt: "Athletic woman performing explosive jump squat HIIT training with full-body effort",
  },
  {
    url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&q=80&fit=crop&crop=faces",
    alt: "Woman lifting barbell with strong athletic form demonstrating powerful strength training",
  },
  {
    url: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&q=80&fit=crop&crop=faces",
    alt: "Woman doing battle ropes circuit in high-intensity cardio gym training session",
  },
  {
    url: "https://images.unsplash.com/photo-1556746834-1cb5b8fabd54?w=600&q=80&fit=crop&crop=faces",
    alt: "Male athlete running along coastal road with dynamic stride and athletic endurance",
  },
  {
    url: "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=600&q=80&fit=crop&crop=faces",
    alt: "Man performing weighted pull-ups with impressive back muscle definition and strength",
  },
  {
    url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80&fit=crop&crop=faces",
    alt: "Male powerlifter executing heavy barbell deadlift with chalk and full concentration",
  },
];

const navLinks = ["Home", "Programs", "Nutrition", "About"];

const socialIcons = [
  {
    name: "Instagram",
    href: "#",
    path: "M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7Zm11 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12Zm-6 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5Zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5Zm6-3a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 18 6.5Z",
  },
  {
    name: "TikTok",
    href: "#",
    path: "M14 3c.26 2.04 1.4 3.35 3.5 3.46v2.35a6.35 6.35 0 0 1-3.45-1.07v6.43A5.18 5.18 0 1 1 8.87 9h.01v2.43a2.75 2.75 0 1 0 2.74 2.74V2.5H14V3Z",
  },
  {
    name: "YouTube",
    href: "#",
    path: "M23 12s0-3.34-.43-4.95a2.58 2.58 0 0 0-1.82-1.82C19.14 4.8 12 4.8 12 4.8s-7.14 0-8.75.43A2.58 2.58 0 0 0 1.43 7.05C1 8.66 1 12 1 12s0 3.34.43 4.95a2.58 2.58 0 0 0 1.82 1.82c1.61.43 8.75.43 8.75.43s7.14 0 8.75-.43a2.58 2.58 0 0 0 1.82-1.82C23 15.34 23 12 23 12ZM10 15.5v-7l6 3.5-6 3.5Z",
  },
];

/* ══════════════════════════════════════════════════════════
   Main Page
══════════════════════════════════════════════════════════ */
export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const statsRef = useRef<HTMLElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const programsReveal = useReveal();
  const communityReveal = useReveal();
  const scienceReveal = useReveal();
  const testimonialsReveal = useReveal();
  const methodReveal = useReveal();

  /* 3D tilt refs for feature sections */
  const tilt3dWomen = use3DTilt(6);
  const tilt3dMen   = use3DTilt(6);

  /* Motion.js button pulse */
  const pulse = useMotionPulse();
  const ctaRef    = useRef<HTMLAnchorElement>(null);
  const navCtaRef = useRef<HTMLAnchorElement>(null);

  /* ── Auto-advance hero ── */
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, []);

  /* ── Keyboard close video modal ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    if (isVideoOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isVideoOpen]);

  /* ── Stats intersection observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Count-up animation ── */
  useEffect(() => {
    if (!statsVisible) return;
    const duration = 1400;
    const steps = 50;
    const tick = duration / steps;
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCounts(stats.map((s) => Math.floor(s.value * eased)));
      if (progress >= 1) window.clearInterval(timer);
    }, tick);
    return () => window.clearInterval(timer);
  }, [statsVisible]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Navigation ── */}
      <header
        className="sticky top-0 z-50 border-b border-white/10"
        style={{ backgroundColor: "rgba(10,10,10,0.88)", backdropFilter: "blur(14px)" }}
      >
        <nav
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <BrandLogo />
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-8 text-base text-white" role="list">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    className="nav-link transition-colors duration-300 hover:text-[#a3e635]"
                    href={
                      link === "Programs"
                        ? "/programs"
                        : link === "Home"
                        ? "/"
                        : "#"
                    }
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <a
            ref={navCtaRef}
            href="/programs"
            onClick={() => pulse(navCtaRef.current)}
            className="btn-primary gradient-border rounded-full px-5 py-2 text-sm font-bold text-[#a3e635]"
          >
            Start Free
          </a>
          </div>
          <button
            className="rounded-md border border-white/20 p-2 text-white transition-colors hover:border-[#a3e635] md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {mobileOpen
                ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
              }
            </svg>
          </button>
        </nav>
        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#0a0a0a]/95 px-4 py-4 md:hidden">
            <ul className="space-y-3 text-white" role="list">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    className="block transition-colors duration-300 hover:text-[#a3e635]"
                    href={
                      link === "Programs"
                        ? "/programs"
                        : link === "Home"
                        ? "/"
                        : "#"
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/programs"
                  className="btn-primary mt-2 inline-flex rounded-full bg-[#a3e635] px-5 py-2 text-sm font-bold text-[#0a0a0a]"
                >
                  Start Free
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main>

        {/* ── Hero Section ── */}
        <section
          className="relative flex min-h-[100vh] items-center overflow-hidden px-4 sm:px-6 lg:px-8"
          aria-label="Hero — Train smarter, not harder"
        >
          {/* Background images */}
          {HERO_IMAGES.map((image, idx) => (
            <div
              key={image.url}
              className={`anim-hero-image absolute inset-0 transition-opacity duration-[1200ms] ${
                idx === currentHero ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={idx !== currentHero}
            >
              <img
                src={image.url}
                alt={image.alt}
                loading={idx === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/65 to-black/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}

          {/* Decorative blurs */}
          <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[#a3e635]/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-[#a3e635]/8 blur-3xl" />

          {/* Hero content */}
          <div className="relative mx-auto w-full max-w-7xl">
            <p className="anim-hero-badge inline-flex rounded-full border border-[#a3e635]/40 bg-black/30 px-4 py-2 text-sm font-semibold text-[#a3e635] backdrop-blur-sm">
              Evidence-Based Training
            </p>
            <h1 className="anim-hero-title mt-5 max-w-4xl leading-[0.88] text-[52px] sm:text-[90px]">
              <span className="block text-white">TRAIN SMARTER.</span>
              <span className="block gradient-text-hero">NOT HARDER.</span>
            </h1>
            <p className="anim-hero-subtitle mt-5 max-w-xl text-lg text-white/80 sm:text-xl">
              Science-backed programs trusted by{" "}
              <strong className="text-white">10,000+ athletes</strong> worldwide.
              Zero guesswork. Real results.
            </p>
            <div className="anim-hero-cta mt-10 flex flex-wrap items-center gap-4">
              <a
                ref={ctaRef}
                href="/programs"
                onClick={() => pulse(ctaRef.current)}
                className="btn-primary gradient-border rounded-full px-8 py-3 text-base font-bold text-[#a3e635]"
              >
                START FREE PROGRAM
              </a>
              <button
                onClick={() => setIsVideoOpen(true)}
                aria-label="Watch how FitConMi works"
                className="btn-secondary flex items-center gap-2 rounded-full border border-white/40 bg-black/25 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm hover:border-[#a3e635] hover:text-[#a3e635]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                WATCH HOW IT WORKS
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <a
            href="#stats"
            aria-label="Scroll to stats section"
            className="scroll-bounce absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 transition-colors hover:text-[#a3e635]"
            style={{ transitionDuration: "180ms" }}
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Slide dots */}
          <div className="absolute bottom-8 right-6 z-10 flex gap-2 sm:right-10">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrentHero(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentHero
                    ? "w-8 bg-[#a3e635]"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ── Stats Section ── */}
        <section
          id="stats"
          ref={statsRef}
          className="border-y border-white/10 bg-[#111111] px-4 py-10 sm:px-6 lg:px-8"
          aria-label="Key statistics"
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <article
                key={stat.label}
                className={`prog-card card-3d rounded-xl border border-white/10 bg-[#1a1a1a] p-5 hover:border-[#a3e635] ${
                  statsVisible ? "stat-visible" : "opacity-0"
                }`}
                style={statsVisible ? { animationDelay: `${idx * 0.1}s` } : {}}
              >
                <p className="text-3xl font-bold text-[#a3e635]">
                  {counts[idx]?.toLocaleString()}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-sm text-[#9ca3af]">{stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Full-width journey banner ── */}
        <section className="relative h-[400px] overflow-hidden" aria-label="Your fitness journey">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&fit=crop&crop=center"
            alt="Man and woman training together intensely in gym, representing the FitConMi community"
            loading="lazy"
            className="hero-img-tilt h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            <div className="reveal-up">
              <h2 className="gradient-text text-5xl sm:text-7xl">
                YOUR JOURNEY STARTS TODAY
              </h2>
              <p className="mt-4 text-white/70 sm:text-lg">
                Every elite athlete was once a beginner. Your first step matters most.
              </p>
            </div>
          </div>
        </section>

        {/* ── Programs Section ── */}
        <section
          id="programs"
          className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
          aria-label="Training programs"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#0a0a0a]/80" aria-hidden="true" />

          <div ref={programsReveal.ref} className="relative">
            <div className="text-center fade-in">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a3e635]">
                Science-Backed Plans
              </p>
              <h2 className="mt-2 text-center text-5xl text-white sm:text-6xl">
                Choose Your Path
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {programs.map((program, idx) => (
                <article
                  key={program.title}
                  className={`prog-card card-3d reveal-card stagger-${idx + 1} group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] ${
                    programsReveal.visible ? "is-visible" : ""
                  }`}
                >
                  {/* Program image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.img}
                      alt={program.imgAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/30 to-transparent" />
                  </div>

                  <div className="card-3d-inner relative z-10 p-8">
                    <div className="flex items-center gap-3 text-[#a3e635]">
                      {program.icon}
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#a3e635]">
                        {program.level}
                      </span>
                    </div>
                    <h3 className="mt-3 text-4xl text-white transition-colors duration-300 group-hover:text-[#a3e635]">
                      {program.title}
                    </h3>
                    <span className="mt-2 inline-flex rounded-full border border-[#a3e635]/40 bg-[#a3e635]/10 px-3 py-1 text-xs font-semibold text-[#a3e635]">
                      {program.duration}
                    </span>
                    <div className="mt-4 space-y-2 text-sm text-[#9ca3af]">
                      <p>
                        <span className="text-white font-semibold">Workouts:</span>{" "}
                        {program.workouts}
                      </p>
                      <p>
                        <span className="text-white font-semibold">Goal:</span>{" "}
                        {program.goal}
                      </p>
                      <p>
                        <span className="text-white font-semibold">Focus:</span>{" "}
                        {program.key}
                      </p>
                    </div>
                    <Link
                      href="/programs"
                      className="btn-primary mt-7 inline-flex rounded-full bg-[#a3e635] px-6 py-3 text-sm font-bold text-[#0a0a0a]"
                    >
                      {program.cta}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── For Women section ── */}
        <section
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8"
          aria-label="Women's fitness programs"
        >
          <div
            ref={tilt3dWomen as React.RefObject<HTMLDivElement>}
            className="card-3d overflow-hidden rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&fit=crop&crop=faces"
              alt="Strong woman performing dumbbell strength training with intense focus in a professional gym"
              loading="lazy"
              className="feature-screenshot h-full min-h-[360px] w-full object-cover"
            />
          </div>
          <article className="reveal-up flex flex-col justify-center rounded-2xl bg-[#111111] p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a3e635]">
              For Women
            </p>
            <h2 className="mt-3 text-5xl text-white sm:text-6xl">
              STRONG IS THE NEW{" "}
              <span className="gradient-text">BEAUTIFUL</span>
            </h2>
            <p className="mt-4 text-[#9ca3af] leading-relaxed">
              Specially designed programs for women focused on strength, confidence, and sustainable results.
              No extreme diets. No impossible standards. Science, not shame.
            </p>
            <a
              href="/programs"
              className="btn-primary mt-6 inline-flex w-fit rounded-full bg-[#a3e635] px-6 py-3 font-bold text-[#0a0a0a]"
            >
              Explore Women's Programs
            </a>
          </article>
        </section>

        {/* ── For Men section ── */}
        <section
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8"
          aria-label="Men's fitness programs"
        >
          <article className="reveal-up flex flex-col justify-center rounded-2xl bg-[#111111] p-8 lg:order-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a3e635]">
              For Men
            </p>
            <h2 className="mt-3 text-5xl text-white sm:text-6xl">
              BUILD YOUR{" "}
              <span className="gradient-text">BEST PHYSIQUE</span>
            </h2>
            <p className="mt-4 text-[#9ca3af] leading-relaxed">
              Evidence-based hypertrophy and strength programs for men at every level.
              From first gym session to competition stage — built on real science.
            </p>
            <a
              href="/programs"
              className="btn-primary mt-6 inline-flex w-fit rounded-full bg-[#a3e635] px-6 py-3 font-bold text-[#0a0a0a]"
            >
              Explore Men's Programs
            </a>
          </article>
          <div
            ref={tilt3dMen as React.RefObject<HTMLDivElement>}
            className="card-3d overflow-hidden rounded-2xl lg:order-2"
          >
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop&crop=faces"
              alt="Muscular man training with heavy dumbbells showing impressive muscle definition and strength"
              loading="lazy"
              className="feature-screenshot h-full min-h-[360px] w-full object-cover"
            />
          </div>
        </section>

        {/* ── Community Grid ── */}
        <section
          className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          aria-label="FitConMi community members"
        >
          <div className="fade-in text-center">
            <h2 className="text-5xl text-white sm:text-6xl">
              THE FITCONMI COMMUNITY
            </h2>
            <p className="mt-3 text-[#9ca3af]">
              Real athletes. Real transformations. Real results.
            </p>
          </div>
          <div
            ref={communityReveal.ref}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {communityImages.map((image, idx) => (
              <article
                key={image.url}
                className={`prog-card card-3d reveal-card stagger-${idx + 1} group relative overflow-hidden rounded-lg border border-white/10 hover:border-[#a3e635] ${
                  communityReveal.visible ? "is-visible" : ""
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
              </article>
            ))}
          </div>
        </section>

        {/* ── The FitConMi Method ── */}
        <section
          id="method"
          className="bg-[#111111] px-4 py-16 sm:px-6 lg:px-8"
          aria-label="The FitConMi training method"
        >
          <div ref={methodReveal.ref} className="mx-auto w-full max-w-7xl">
            <div className="fade-in text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a3e635]">
                Our Approach
              </p>
              <h2 className="mt-2 text-center text-5xl text-white sm:text-6xl">
                The FitConMi Method
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {methodSteps.map((step, idx) => (
                <article
                  key={step.title}
                  className={`prog-card card-3d reveal-card stagger-${idx + 1} rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 hover:border-[#a3e635] ${
                    methodReveal.visible ? "is-visible" : ""
                  }`}
                >
                  <div className="card-3d-inner">
                    {step.icon}
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-[#a3e635]">
                      Step {idx + 1}
                    </p>
                    <h3 className="mt-1 text-4xl text-white">{step.title}</h3>
                    <p className="mt-3 text-[#9ca3af] leading-relaxed">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Science Section ── */}
        <section
          className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          aria-label="Science of training"
        >
          <div ref={scienceReveal.ref}>
            <div className="fade-in text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a3e635]">
                Evidence-Based
              </p>
              <h2 className="mt-2 text-center text-5xl text-white sm:text-6xl">
                Why Science-Based Training Works
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {scienceCards.map((card, idx) => (
                <article
                  key={card.title}
                  className={`prog-card card-3d reveal-card stagger-${idx + 1} rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 hover:border-[#a3e635] ${
                    scienceReveal.visible ? "is-visible" : ""
                  }`}
                >
                  <div className="card-3d-inner">
                    <div className="mb-4 h-1 w-12 rounded-full bg-[#a3e635]" />
                    <h3 className="text-3xl text-white">{card.title}</h3>
                    <p className="mt-4 text-[#9ca3af] leading-relaxed">{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section
          className="bg-[#111111] px-4 py-16 sm:px-6 lg:px-8"
          aria-label="Member testimonials"
        >
          <div ref={testimonialsReveal.ref} className="mx-auto w-full max-w-7xl">
            <div className="fade-in text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a3e635]">
                Success Stories
              </p>
              <h2 className="mt-2 text-center text-5xl text-white sm:text-6xl">
                Real Results, Real People
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((t, idx) => (
                <article
                  key={t.name}
                  className={`prog-card reveal-card stagger-${idx + 1} relative rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 hover:border-[#a3e635] ${
                    testimonialsReveal.visible ? "is-visible" : ""
                  }`}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5" aria-label="5 star rating">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-[#a3e635]" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  {/* Avatar */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a3e635] text-sm font-bold text-[#0a0a0a]">
                      {t.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{t.name}</h3>
                      <p className="text-xs font-semibold text-[#a3e635]">{t.result}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[#9ca3af] leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section
          className="relative overflow-hidden border-y border-white/10 bg-[#0f0f0f] px-4 py-20 sm:px-6 lg:px-8"
          aria-label="Call to action"
        >
          <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#a3e635]/10 blur-3xl" aria-hidden="true" />
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <div className="reveal-up">
              <h2 className="text-5xl text-white sm:text-6xl">
                Ready to{" "}
                <span className="gradient-text">Transform</span>{" "}
                Your Body?
              </h2>
              <p className="mt-4 max-w-lg text-lg text-[#9ca3af]">
                Join 10,000+ athletes. No gym membership required. Your personalized plan starts free.
              </p>
              <a
                href="/programs"
                className="btn-primary gradient-border mt-8 inline-block rounded-full px-10 py-4 text-lg font-bold text-[#a3e635]"
              >
                Get Started Free →
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
          aria-label="Site footer"
        >
          <div className="flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
            <BrandLogo />
            <ul className="flex flex-wrap items-center gap-4 text-[#9ca3af] sm:gap-6" role="list">
              {["Programs", "Nutrition", "Calculator", "About"].map((item) => (
                <li key={item}>
                  <a
                    className="nav-link transition-colors hover:text-[#a3e635]"
                    href={item === "Programs" ? "/programs" : "#"}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={`Follow FitConMi on ${social.name}`}
                  className="rounded-full border border-white/15 p-2 text-[#9ca3af] transition-all duration-300 hover:border-[#a3e635] hover:text-[#a3e635]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 space-y-1 text-sm text-[#9ca3af]">
            <p>© 2026 FitConMi. All rights reserved.</p>
            <p>Always consult a physician before starting any fitness program.</p>
          </div>
        </footer>

      </main>

      {/* ── Video Modal ── */}
      {isVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fitness training video"
          onClick={() => setIsVideoOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            animation: "fcModalIn 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <style>{`@keyframes fcModalIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}`}</style>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "90%", maxWidth: 900, position: "relative" }}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video modal"
              style={{
                position: "absolute",
                top: "-3.5rem",
                right: 0,
                background: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "9999px",
                color: "#fff",
                fontSize: "0.875rem",
                fontWeight: 600,
                padding: "0.4rem 1rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#a3e635";
                (e.currentTarget as HTMLButtonElement).style.color = "#a3e635";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
            >
              Close ✕
            </button>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <p style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.4rem" }}>
                Why Science-Based Fitness Changes Everything
              </p>
              <p style={{ color: "#9ca3af", fontSize: "0.875rem", margin: 0, maxWidth: 600, marginInline: "auto" }}>
                Modern training methods and evidence-based nutrition create sustainable, measurable results
              </p>
            </div>
            <div style={{ aspectRatio: "16/9", width: "100%", borderRadius: 14, overflow: "hidden", boxShadow: "0 0 60px rgba(163,230,53,0.2)" }}>
              <iframe
                key="video-open"
                src="https://www.youtube.com/embed/U8dNYlGTWIY?autoplay=1&rel=0&modestbranding=1"
                title="Science-Based Fitness Explained"
                allow="autoplay; fullscreen"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
