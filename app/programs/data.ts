// ═══════════════════════════════════════════════════════════════════════
//  FitConMi · Scientific Exercise Database v3.0
//  Based on: Schoenfeld (2010), Tabata (1996), Gibala et al. (2012),
//  Daniels Running Formula, Seiler 80/20 model, Barakat et al. (2020),
//  Weppler & Magnusson (2010), Westside Barbell, Sheiko programming
// ═══════════════════════════════════════════════════════════════════════

export type Exd = {
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  explanation: string;
  img: string;
};
export type DayD = { name: string; exercises: { A: Exd[]; B: Exd[]; C: Exd[] } };

// ── Image registry (Unsplash photo IDs mapped to movement categories) ──
const PFX = "https://images.unsplash.com/";
const SFX = "?w=400&q=80&fit=crop&crop=faces";

const IMGS: Record<string, string> = {
  // Squat / lower body
  sq:  "photo-1552673597-e3cd6747a996",
  // Deadlift / hinge
  dl:  "photo-1526506118085-60ce8714f8c5",
  // Upper body / barbell
  ub:  "photo-1583454155184-870a1f63aebc",
  // Battle ropes / metabolic
  bk:  "photo-1599058917212-d750089bc07e",
  // Core
  co:  "photo-1571019614242-c5c5dee9f50b",
  // Cardio / running
  rn:  "photo-1534438327276-14e5300c3a48",
  // Glutes
  gl:  "photo-1544016768-77a6e4c6f68b",
  // Shoulders / overhead
  sh:  "photo-1574680096145-d05b474e2155",
  // Flexibility / yoga
  fx:  "photo-1518611012118-696072aa579a",
  // Kettlebell / functional
  kb:  "photo-1607962837359-5e7e89f86776",
  // Women strength
  ws:  "photo-1574680178050-55c6a6a96e0a",
  // Women HIIT / jump
  wh:  "photo-1571019613454-1cb2f99b2d8b",
  // Men power clean / explosive
  pc:  "photo-1581009137042-c552e485697a",
};

function img(key: string): string {
  return PFX + (IMGS[key] ?? IMGS.co) + SFX;
}

// ════════════════════════════════════════════════════════════════════════
//  EXERCISE DICTIONARY — every entry has:
//    muscle   : primary + synergists
//    imgKey   : photo key
//    explW    : women-specific scientific explanation
//    explM    : men-specific scientific explanation
// ════════════════════════════════════════════════════════════════════════
type DictItem = { muscle: string; imgKey: string; explW: string; explM: string };

const DICT: Record<string, DictItem> = {

  // ── GLUTES & POSTERIOR CHAIN ─────────────────────────────────────────

  "Barbell Hip Thrust (Shoulder-Elevated)": {
    muscle: "Gluteus Maximus (primary) · Hamstrings · Core",
    imgKey: "gl",
    explW: "EMG research (Contreras, 2015) shows this activates gluteus maximus at 95% MVC — 3× higher than a squat. The horizontal loading vector targets terminal hip extension, the position where the glute is most powerful. Essential for female glute development, pelvic stability, and injury prevention in the knee and lower back.",
    explM:  "Peak gluteus maximus recruitment occurs at full hip extension with a barbell load. Heavy loading (80–90% 1RM) drives fast-twitch fiber hypertrophy in the posterior chain, directly improving deadlift lockout, sprint power, and overall athletic output.",
  },
  "Dumbbell Romanian Deadlift (3-sec Eccentric)": {
    muscle: "Hamstrings (primary) · Gluteus Maximus · Erector Spinae",
    imgKey: "dl",
    explW: "The 3-second eccentric phase maximizes time under tension on the hamstrings, triggering superior hypertrophy compared to ballistic hinge. The hip-hinge pattern preserves lumbar spine health, burns significant calories through posterior chain activation, and builds the glute-hamstring tie-in crucial to the female aesthetic.",
    explM:  "Eccentric overload on the hamstrings creates micro-tears that initiate satellite cell activation and muscle protein synthesis (MPS). The hip-hinge trains the posterior chain in a stretched position — the mechanically optimal stimulus for hamstring hypertrophy per Schoenfeld's lengthened-state loading research.",
  },
  "Sumo Deadlift (Wide Stance)": {
    muscle: "Adductors (primary) · Gluteus Maximus · Quadriceps · Hamstrings",
    imgKey: "dl",
    explW: "The wide sumo stance places greater mechanical advantage on the hip adductors and gluteus maximus compared to conventional stance. Women with wider hip angles achieve greater hip abductor activation, making this the most biomechanically efficient pulling pattern for female lower body development.",
    explM:  "Sumo mechanics shorten the effective moment arm at the hip and leverage hip abductor strength, allowing maximal loading of the posterior chain. At 85–95% 1RM, sumo deadlifts trigger peak neural recruitment of motor unit pools and a profound anabolic hormonal response (testosterone + IGF-1).",
  },
  "Conventional Deadlift (Braced Spine)": {
    muscle: "Erector Spinae · Gluteus Maximus · Hamstrings · Quadriceps · Lats",
    imgKey: "dl",
    explW: "Full-body compound movement that develops exceptional posterior chain strength without adding unwanted bulk (female hormonal profiles limit hypertrophy). Research confirms deadlifts increase bone mineral density at the lumbar spine — critical for women's long-term skeletal health.",
    explM:  "At 90%+ 1RM, the deadlift triggers the highest testosterone and growth hormone response of any exercise. Neural efficiency adaptations dominate in the first 6 weeks: more motor units recruited, faster firing rate, improved inter-muscular coordination. The foundation of raw strength.",
  },
  "Bulgarian Split Squat (Rear-Foot Elevated)": {
    muscle: "Quadriceps (primary) · Gluteus Maximus · Hip Stabilizers",
    imgKey: "sq",
    explW: "Unilateral loading corrects left-right strength asymmetries while activating gluteus medius 40% more than bilateral squats (EMG data). The elevated rear foot increases hip flexor stretch, improving pelvic tilt — a primary postural correction for women spending long hours seated.",
    explM:  "Unilateral leg training creates greater stabilizer demand on the stance-side hip abductors, VMO, and glute medius. Without spinal compression, volume can be pushed far higher than bilateral squats, driving quad and glute hypertrophy while improving single-leg power output for athletic performance.",
  },
  "Barbell Back Squat (High Bar)": {
    muscle: "Quadriceps (primary) · Gluteus Maximus · Hamstrings · Erector Spinae",
    imgKey: "sq",
    explW: "High-bar positioning increases quadriceps recruitment and trunk upright posture, distributing load through the full lower chain. Progressive squat loading triggers osteoblast activation — building bone density that protects against osteoporosis, the primary skeletal risk for women post-40.",
    explM:  "The king of compound movements. At 80–90% 1RM, high-bar squats stimulate the highest systemic anabolic response — testosterone, GH, and IGF-1 spike simultaneously. Neural adaptation (motor unit synchronization) accounts for 30–50% of strength gains in the first 8 weeks.",
  },
  "Cable Pull-Through (Hip Hinge)": {
    muscle: "Gluteus Maximus · Hamstrings · Erector Spinae",
    imgKey: "gl",
    explW: "The horizontal force vector from the cable uniquely loads the glutes at peak contraction — a position missed by vertical loading exercises. This is the safest way to overload the hip hinge pattern with constant cable tension, making it ideal for women building the mind-muscle connection at the glute.",
    explM:  "Trains the hinge mechanics with a forward-directed force, reinforcing the glute lockout pattern critical to deadlift performance. The constant cable tension eliminates the dead spots present with free weights, maintaining mechanical tension throughout the full range of motion.",
  },
  "Curtsy Lunge (Weighted)": {
    muscle: "Gluteus Medius (primary) · Gluteus Maximus · Hip Abductors",
    imgKey: "sq",
    explW: "The cross-body movement uniquely targets the gluteus medius — the muscle responsible for the lateral glute curve that creates hip width. EMG data shows 60% higher gluteus medius activation versus standard lunges. Critical for hip stability and reducing knee valgus (inward collapse) during running.",
    explM:  "Develops frontal-plane hip stability and strengthens the gluteus medius and minimus — often the weakest links in athletes with IT band syndrome or persistent knee pain. Improves single-leg stability mechanics for field sport performance.",
  },
  "Cable Kickback (Full Hip Extension)": {
    muscle: "Gluteus Maximus (isolated) · Hamstrings",
    imgKey: "gl",
    explW: "Unlike bodyweight kickbacks, cable resistance provides constant tension throughout the full range of motion, targeting gluteus maximus in its fully contracted position. Isolation exercises like this boost sarcoplasmic hypertrophy, contributing to visible glute shape and fullness.",
    explM:  "Adds isolation volume to the gluteus maximus after heavy compound movements, driving metabolic stress — the second of Schoenfeld's three hypertrophy mechanisms. The full hip extension position maximizes fiber recruitment in the posterior bundle of the gluteus maximus.",
  },
  "Jump Lunge (Alternating Plyometric)": {
    muscle: "Quadriceps · Gluteus Maximus · Gastrocnemius · Cardiorespiratory System",
    imgKey: "wh",
    explW: "Plyometric alternating lunges elevate heart rate to 85–95% HRmax within 30 seconds, creating maximal EPOC (excess post-exercise oxygen consumption) that persists for 24–36 hours. Burns 12–15 kcal/min. Develops explosive glute power in the same movement pattern as running — functional and efficient.",
    explM:  "Develops rate of force development (RFD) bilaterally through the stretch-shortening cycle. The amortization phase (ground contact) must be minimized to maximize elastic energy return. Creates extreme metabolic demand across the largest lower body muscles, rapidly depleting glycogen stores.",
  },
  "Goblet Squat (Dumbbell)": {
    muscle: "Quadriceps · Gluteus Maximus · Core (anti-flexion)",
    imgKey: "sq",
    explW: "Anterior loading of the goblet squat forces the torso upright, dramatically reducing lumbar shear forces while teaching proper squat mechanics. Core must work anti-flexion to prevent trunk collapse. Excellent for women developing pain-free squat depth before loading the barbell.",
    explM:  "The counterbalance load teaches hip-crease-below-knee depth naturally. Core bracing demand is significantly higher than barbell squats due to the anterior loading point. An excellent primer for squat mechanics and a powerful high-rep finishing option for metabolic conditioning.",
  },

  // ── UPPER BODY PUSH ──────────────────────────────────────────────────

  "Barbell Bench Press (2-1-2 Tempo)": {
    muscle: "Pectoralis Major · Anterior Deltoid · Triceps Brachii",
    imgKey: "ub",
    explW: "The 2-second descent creates controlled eccentric tension in the pectorals at the stretch, triggering superior hypertrophy stimulus versus fast, uncontrolled reps. Progressive bench press loading builds the pectoral shelf beneath breast tissue — creating a natural lift effect through muscle density.",
    explM:  "Prime upper body pressing movement. EMG data confirms 93% pectoralis major MVC with a shoulder-width grip. The 2-1-2 tempo extends time under tension to the hypertrophic sweet spot (40–60 sec per set per Schoenfeld, 2010). Testosterone peaks are highest with heavy multi-joint pressing.",
  },
  "Incline Dumbbell Press (30° — 2-sec Eccentric)": {
    muscle: "Clavicular Head of Pectoralis Major · Anterior Deltoid · Triceps",
    imgKey: "ub",
    explW: "The 30° incline angle shifts tension to the upper pectoral (clavicular head), creating fullness in the upper chest. Dumbbells allow independent movement at each shoulder joint, accommodating individual biomechanics and preventing the dominant side from taking over.",
    explM:  "The underdeveloped clavicular head responds best to 30–45° incline angles. Dumbbell handles allow a larger range of motion at the shoulder joint (greater chest stretch at the bottom) than barbells, increasing the effective ROM under tension and stimulating superior upper chest hypertrophy.",
  },
  "Overhead Press (Barbell — Strict)": {
    muscle: "Medial + Anterior Deltoid · Triceps Brachii · Upper Trapezius · Core",
    imgKey: "sh",
    explW: "Strict overhead pressing (no leg drive) builds the medial deltoid — creating the 'capped shoulder' effect that makes the waist appear slimmer by contrast. The core must isometrically brace to prevent lumbar hyperextension, improving functional trunk stability for everyday strength.",
    explM:  "The overhead press is the ultimate test of pressing kinetic chain integrity. At 80%+ 1RM, it requires full-body tension — dorsiflexion braced feet, glutes squeezed, core locked. Builds monstrous shoulder width and overhead lock-out strength that directly improves the snatch and jerk.",
  },
  "Dumbbell Arnold Press (Full Rotation)": {
    muscle: "All Three Deltoid Heads · Triceps · Upper Trapezius",
    imgKey: "sh",
    explW: "The rotational component of the Arnold press recruits all three deltoid heads (anterior, medial, posterior) in a single movement — providing maximum shoulder development efficiency. The supination-to-pronation rotation also activates the rotator cuff stabilizers, reducing impingement risk.",
    explM:  "The external-to-internal rotation during the press creates a unique neuromuscular demand not replicated by any other shoulder movement. All three deltoid heads are sequentially activated throughout the arc, maximizing total deltoid volume and improving shoulder-joint structural balance.",
  },
  "Wide-Grip Push-Up (3-sec Eccentric)": {
    muscle: "Pectoralis Major · Anterior Deltoids · Triceps · Serratus Anterior",
    imgKey: "ub",
    explW: "Wide grip increases pectoral stretch at the bottom, improving the eccentric loading zone. The 3-second descent builds eccentric strength — the phase responsible for the majority of muscle damage and subsequent adaptive hypertrophy. Serratus anterior activation improves scapular upward rotation.",
    explM:  "Functional pressing that activates serratus anterior (the 'boxer's muscle') to achieve full scapular protraction at the top. 3-second eccentrics drive significant muscle damage in the pecs even without external load, making this an excellent finisher for chest days after heavy barbell work.",
  },
  "Cable Chest Fly (Mid-Cable)": {
    muscle: "Pectoralis Major Sternal Head · Anterior Deltoid",
    imgKey: "ub",
    explW: "Cable flies maintain constant tension throughout the full range of motion — critical because dumbbell flies drop to zero tension at the top. This constant metabolic stress triggers the third hypertrophy mechanism: cell swelling and sarcoplasmic growth, giving the pectorals lasting shape and tone.",
    explM:  "The cable pulley maintains a consistent resistance curve that dumbbells cannot replicate. Full pectoral stretch under load at the bottom → full contraction at the top creates superior time under tension. The chest is fully adducted at peak contraction — the position of highest pectoral fiber recruitment.",
  },
  "Leg Press (Feet High — 4-sec Negative)": {
    muscle: "Quadriceps · Gluteus Maximus · Hamstrings",
    imgKey: "sq",
    explW: "Placing feet high on the platform shifts emphasis toward the gluteus maximus and hamstrings. The 4-second negative controls the eccentric load on the knee joint — critical for women with greater Q-angle (wider hip angle), reducing patellar stress while maximizing muscle time under tension.",
    explM:  "The leg press allows quad-focused loading without axial spine compression. High-foot placement shifts the center of pressure toward the hips, loading the glutes and hamstrings alongside the quads. The 4-sec negative creates significant eccentric micro-damage for subsequent muscle protein synthesis.",
  },

  // ── UPPER BODY PULL ──────────────────────────────────────────────────

  "Pull-Up (Pronated Grip — Full ROM)": {
    muscle: "Latissimus Dorsi (primary) · Biceps Brachii · Rhomboids · Rear Deltoid",
    imgKey: "ub",
    explW: "Pull-ups build relative upper body strength — the ratio of strength to bodyweight. For women, achieving bodyweight pull-ups is a profound functional milestone. Latissimus dorsi development widens the back visually, creating the hourglass V-taper that is the foundation of upper body aesthetics.",
    explM:  "The gold standard of relative upper body pulling strength. Full ROM (dead hang to chin above bar) is non-negotiable — partial reps stimulate neither the stretch reflex at the bottom nor full lat contraction at the top. Weighted pull-ups are the fastest path to massive lat development.",
  },
  "Barbell Bent-Over Row (Overhand Grip — 45°)": {
    muscle: "Latissimus Dorsi · Rhomboids · Trapezius · Rear Deltoid · Biceps",
    imgKey: "bk",
    explW: "Overhand grip rows uniquely target the latissimus dorsi and rear deltoids — the muscles responsible for shoulder retraction and spinal extension. Mandatory for women who develop chronic forward-head posture from screen time. Prevents the upper cross syndrome (tight pecs / weak back).",
    explM:  "Heavy horizontal pulling is the non-negotiable counterpart to pressing. Overhand barbell rows build maximum back thickness through the rhomboids, middle traps, and lats in a mechanically strong position. At 75–85% 1RM, this is one of the highest-volume compound back movements possible.",
  },
  "Lat Pulldown (Overhand Wide Grip)": {
    muscle: "Latissimus Dorsi (primary) · Biceps Brachii · Rear Deltoid",
    imgKey: "bk",
    explW: "Lat pulldown is the primary lat width builder. In women, developing the lats creates the V-taper illusion that accentuates the waist without requiring any fat loss. Machine-based resistance is beginner-accessible and allows controlled loading before progressing to bodyweight pull-ups.",
    explM:  "The primary isolation tool for lat width when pull-up volume is limited. Wide overhand grip minimizes bicep contribution and maximizes lat stretch at the top — the critical position for lengthened-position hypertrophy. Essential for developing the visual back width that defines an impressive physique.",
  },
  "Seated Cable Row (Neutral Grip — 2-sec Hold)": {
    muscle: "Rhomboids · Middle Trapezius · Latissimus Dorsi · Rear Deltoid · Biceps",
    imgKey: "bk",
    explW: "The 2-second isometric hold at peak contraction adds significant time under tension without adding weight, beneficial for women building initial pulling strength. Neutral grip reduces ulnar deviation stress at the wrist. Seated cable row directly corrects the postural deviations caused by prolonged sitting.",
    explM:  "The 2-second peak contraction forces maximum rhomboid and mid-trap activation. Seated position eliminates lower back involvement, isolating the mid-back musculature. Neutral grip allows heavier loading than supinated or pronated grips due to optimal forearm mechanical advantage.",
  },
  "Single-Arm Dumbbell Row (Knee on Bench)": {
    muscle: "Latissimus Dorsi · Rhomboid · Trapezius · Biceps",
    imgKey: "bk",
    explW: "Unilateral rowing addresses side-to-side strength imbalances common in women who favor one hand. The unsupported side requires significant core anti-rotation work. Research confirms unilateral training produces 11% more neural drive per limb than bilateral variations.",
    explM:  "Unilateral pulling allows heavier loads per side than barbell rows by eliminating the need for bilateral balance. The free limb creates an anti-rotation demand on the core (quadratus lumborum and obliques). Elevating range of motion by allowing the shoulder to protract maximizes lat stretch.",
  },
  "Face Pull (Rope — External Rotation)": {
    muscle: "Rear Deltoid · Infraspinatus · Teres Minor · Middle Trapezius",
    imgKey: "sh",
    explW: "The external rotation at the top of the face pull is non-negotiable — it specifically targets infraspinatus and teres minor of the rotator cuff. These muscles are chronically underloaded and underappreciated. Strong external rotators prevent anterior shoulder impingement from pressing exercises.",
    explM:  "Non-negotiable rotator cuff health movement. Every 3 sets of pressing requires at least 1 set of face pulls. The external rotation component specifically targets infraspinatus and teres minor — the muscles that prevent anterior glenohumeral impingement under heavy bench press loads.",
  },
  "Dumbbell Lateral Raise (75° Arm Angle)": {
    muscle: "Medial Deltoid (primary) · Supraspinatus",
    imgKey: "sh",
    explW: "Raising the arms to 75° (not 90°) maintains supraspinatus engagement below the impingement zone. Light-to-moderate loads with controlled eccentrics maximally stimulate the medial deltoid — the muscle that creates the 'capped shoulder' appearance that makes the waist look smaller by visual contrast.",
    explM:  "The medial deltoid creates shoulder width — the primary driver of the V-taper aesthetic in males. Strict form (no body English, controlled 2-sec descent) at 15–20 reps creates extreme metabolic stress in the deltoid. Higher rep ranges (15–30) outperform heavy low-rep training for lateral deltoid hypertrophy.",
  },
  "Preacher Curl (EZ-Bar — Slow Positive)": {
    muscle: "Biceps Brachii (short head) · Brachialis",
    imgKey: "ub",
    explW: "Preacher placement locks the elbows forward, completely eliminating shoulder flexion cheating. The short head of the bicep is maximally loaded in its shortened position — producing the peak contraction that builds arm definition. Women focusing on arm aesthetics respond exceptionally well to this strict isolation.",
    explM:  "Eliminates all momentum. The EZ-bar grip reduces ulnar deviation stress while maintaining high bicep activation. Slow concentric tempo (3 seconds up) combined with the locked elbow produces maximal motor unit recruitment without load increases — ideal for 8–12 rep hypertrophy focused bicep work.",
  },
  "Incline Dumbbell Curl (30-sec Eccentric Hold)": {
    muscle: "Biceps Brachii (long head) · Brachialis · Brachioradialis",
    imgKey: "ub",
    explW: "The incline position pre-stretches the bicep long head — placing it in its most lengthened position before the curl begins. Research by Maeo et al. (2021) demonstrates that lengthened-state resistance training produces 2× more hypertrophy in the distal bicep than standard curls. Critical for arm fullness.",
    explM:  "Stretch-mediated hypertrophy is the most potent hypertrophic stimulus per recent muscle fiber research. The 30° incline creates maximal bicep long head stretch — a position that activates satellite cells at a higher rate than traditional curls. Builds the entire length of the bicep rather than just the peak.",
  },

  // ── ARMS & ISOLATION ─────────────────────────────────────────────────

  "Close-Grip Bench Press (Tricep Focus)": {
    muscle: "Triceps Brachii (all heads) · Pectoralis Major · Anterior Deltoid",
    imgKey: "ub",
    explW: "Triceps comprise 60% of upper arm volume. Women store disproportionate fat in the posterior arm due to estrogen — building the triceps muscle creates definition that cannot be achieved through fat loss alone. Close-grip pressing loads all three tricep heads simultaneously, unlike isolation movements.",
    explM:  "Heavier loading than any tricep isolation exercise. Close-grip bench activates the long, medial, and lateral heads of the triceps simultaneously under significant mechanical tension. Progressive loading here adds more total tricep mass than any other single movement in the tricep repertoire.",
  },
  "EZ-Bar Skull Crusher (Long Head Focus)": {
    muscle: "Triceps Brachii Long Head (primary) · Medial Head",
    imgKey: "ub",
    explW: "Lengthened-position loading of the long head (arms extended overhead and behind) is the most powerful hypertrophy stimulus for the triceps per 2022 meta-analysis (Maeo et al.). This builds the hanging portion of the tricep — directly addressing the common female concern of loose skin on the back of the arm.",
    explM:  "Skull crushers place the long head of the triceps in a fully lengthened position — its optimal stimulus position. Research confirms the long head constitutes 57% of total tricep volume; prioritizing it with lengthened-state loading maximizes arm size far beyond lateral head isolation work.",
  },
  "Cable Tricep Pushdown (Rope — Flare Out)": {
    muscle: "Triceps Brachii Lateral Head · Medial Head",
    imgKey: "ub",
    explW: "Flaring the rope ends apart at lockout creates maximal pronation of the forearm, uniquely isolating the lateral head of the triceps. Constant cable tension maintains mechanical load through the full ROM — superior to dumbbells that lose tension at extension. High-rep pump work for the triceps creates sarcoplasmic volume.",
    explM:  "The rope flare-out at full extension creates peak lateral head contraction that straight-bar pushdowns cannot replicate. Lateral head development creates the horseshoe shape visible from the side. High-rep (15–20) cable work drives sarcoplasmic hypertrophy and extreme localized blood flow.",
  },
  "Overhead Tricep Extension (Cable — Long Head)": {
    muscle: "Triceps Brachii Long Head (primary)",
    imgKey: "ub",
    explW: "Overhead positioning places the long head in maximum stretch — the neuromuscular position with the highest hypertrophic potential for the tricep. Cable constant tension prevents the deload point at the bottom that free-weight variations create. Critical for eliminating the soft-upper-arm appearance.",
    explM:  "The overhead position is the only way to fully lengthen the long head of the triceps. Doing this in cable format maintains tension at the lengthened position compared to dumbbell variations that lose tension at the bottom. The long head drives the overall size of the arm — make this a priority movement.",
  },
  "Hammer Curl (Cross-Body Variation)": {
    muscle: "Brachialis · Brachioradialis · Biceps Brachii Long Head",
    imgKey: "ub",
    explW: "Cross-body hammer curls target the brachialis — the muscle underneath the bicep that pushes the bicep up, creating the appearance of a larger, rounder arm. Neutral grip reduces supinator stress, making this accessible for women with wrist discomfort during standard curls.",
    explM:  "The brachialis is a dedicated elbow flexor that sits beneath the bicep — developing it literally pushes the bicep belly higher, significantly increasing the arm's visual size without increasing bicep length. Cross-body hammer curls create maximum brachioradialis and brachialis tension.",
  },

  // ── CORE ─────────────────────────────────────────────────────────────

  "Ab Wheel Rollout (Kneeling — Full Extension)": {
    muscle: "Rectus Abdominis · Transverse Abdominis · Lats · Hip Flexors",
    imgKey: "co",
    explW: "The rollout is an anti-extension exercise — the core must resist spine hyperextension through the full range of motion, creating extreme rectus abdominis and transverse abdominis activation. EMG research shows rollouts produce 2× more abdominal activation than the standard crunch.",
    explM:  "One of the most challenging anti-extension core exercises. Full extension attempts to pull the lumbar spine into hyperextension — maximally loading the rectus abdominis and transverse abdominis in their lengthened position. Lats and subscapularis must co-contract, making this a true full-body core challenge.",
  },
  "Plank (Active — Glutes Squeezed)": {
    muscle: "Transverse Abdominis · Rectus Abdominis · Gluteus Maximus · Diaphragm",
    imgKey: "co",
    explW: "Squeezing the glutes during the plank activates the posterior pelvic tilt — the pelvic position that maximally engages the transverse abdominis (the deep core 'corset' muscle). This is the most effective anti-extension core exercise for developing the flat-stomach appearance by tightening the inner core unit.",
    explM:  "The active plank (glutes squeezed, posterior pelvic tilt) creates full-body irradiation — tension radiates from the hips through the core and into the shoulder girdle. This irradiation pattern mirrors the body position required for maximum force transfer in heavy compound lifts like the squat and deadlift.",
  },
  "Side Plank (Hip Elevated — Abduction)": {
    muscle: "Obliques · Quadratus Lumborum · Gluteus Medius · Hip Abductors",
    imgKey: "co",
    explW: "Lateral core stability is frequently undertrained and critical for female athletic performance. Side plank prevents lateral spinal bending (Trendelenburg gait) and directly builds the obliques — the muscles that create the lateral waist contour. Hip elevation version increases gluteus medius recruitment.",
    explM:  "Lateral core stiffness is the primary stability demand in all unilateral lifting patterns. Weak quadratus lumborum and obliques create lateral trunk flexion during heavy deadlifts and squats — leaking force. The hip-elevated variation adds gluteus medius demand, reinforcing hip stability under load.",
  },
  "Dead Bug (Contralateral Limb Extension)": {
    muscle: "Transverse Abdominis · Rectus Abdominis · Spinal Extensors · Diaphragm",
    imgKey: "co",
    explW: "The dead bug teaches diaphragmatic bracing — pressing the low back into the floor while extending opposite arm and leg trains the deep core to stabilize the spine independently of limb movement. This motor pattern directly transfers to postural improvement and lower back pain prevention.",
    explM:  "Contralateral coordination patterns replicate the neural demands of bipedal movement. The dead bug is the primary rehabilitation and prehabilitation exercise for training the deep stabilizer system. A critical movement for athletes to maintain lumbar neutrality under conditions of limb loading.",
  },
  "Hanging Knee Raise (Controlled ROT)": {
    muscle: "Rectus Abdominis (lower) · Hip Flexors · Transverse Abdominis",
    imgKey: "ub",
    explW: "Hanging removes hip flexor dominance and isolates the lower rectus abdominis through controlled posterior pelvic tilt. This is the most effective bodyweight exercise for training the lower abdominal region. The grip demand simultaneously develops forearm flexor strength for pulling exercises.",
    explM:  "Full hang eliminates the stabilizing advantage of floor support, forcing the core to create all stability from its own contractile force. Controlling the descent (2 seconds) creates eccentric tension in the rectus abdominis at its lengthened position — the optimal position for lower ab development.",
  },

  // ── METABOLIC / CARDIO / HIIT ─────────────────────────────────────────

  "Barbell Thruster (Squat-to-Press)": {
    muscle: "Quadriceps · Gluteus Maximus · Deltoids · Triceps · Core",
    imgKey: "pc",
    explW: "Combines a front squat with an overhead press in one continuous movement, engaging 85%+ of total muscle mass. Burns 18–22 kcal/min. The metabolic demand elevates heart rate to 90%+ HRmax within 4 repetitions, creating the maximal EPOC response (36+ hours of elevated metabolism post-exercise).",
    explM:  "The thruster is the highest metabolic demand barbell exercise in existence. Full-body muscle activation combined with overhead demand creates extreme peripheral fatigue and central cardiovascular stress simultaneously. Releases the largest combined testosterone and GH pulse of any single exercise.",
  },
  "Kettlebell Swing (Hip-Hinge Explosive)": {
    muscle: "Gluteus Maximus · Hamstrings · Erector Spinae · Deltoids · Core",
    imgKey: "kb",
    explW: "The ballistic hip hinge trains the Rate of Force Development (RFD) in the posterior chain while burning 20+ kcal/min. The swing is unique: it conditions the glutes explosively while simultaneously improving cardiovascular fitness. Zero knee stress. Train heavy swings in sets of 20 for fat loss.",
    explM:  "The swing teaches explosive hip extension — the foundational athletic skill. The ballistic posterior chain engagement triggers a massive catecholamine and growth hormone release. 10-min kettlebell swing circuits have been shown to increase VO2max by 6% in 6 weeks while reducing body fat.",
  },
  "Jump Rope Double-Under (1-min AMRAP)": {
    muscle: "Gastrocnemius · Tibialis Anterior · Shoulder Stabilizers · Cardiovascular",
    imgKey: "wh",
    explW: "Double-unders develop ankle stiffness and reactive strength in the calf-Achilles complex — the elastic energy storage system. At maximum effort, burns 15–20 kcal/min — the highest caloric output per minute of any low-equipment exercise. Improves bone density through the repeated impact loading.",
    explM:  "Maximal ankle stiffness training. The double-under demands 100% cardiovascular effort and forces rapid calf recycling at every contact. Develops the ankle spring mechanism essential for sprint acceleration. Continuous 1-min AMRAP sets push VO2max capability at near-maximal intensity.",
  },
  "Assault Bike Sprint (45-sec Max Effort)": {
    muscle: "Quadriceps · Gluteus Maximus · Hamstrings · Deltoids · Core · VO2max",
    imgKey: "rn",
    explW: "The assault bike simultaneously loads the arms and legs, creating cardiovascular stress unlike any other cardio machine. 45-second max-effort intervals push heart rate to 95%+ HRmax — the intensity zone that drives VO2max adaptation. One of the most metabolically demanding HIIT protocols proven to maximize EPOC.",
    explM:  "Max-effort assault bike intervals produce the highest measured blood lactate values of any ergometer — indicating complete metabolic system engagement. Research confirms 4×45-sec all-out Wingate sprints produce similar VO2max improvements to 45 minutes of steady-state cycling in 25% of the time.",
  },
  "Battle Rope Alternating Wave (40-sec Work)": {
    muscle: "Deltoids · Forearm Extensors · Core Anti-Rotation · Cardiovascular",
    imgKey: "bk",
    explW: "Battle rope waves generate 800–1200W of power output per 40-second interval. The alternating pattern intensely targets the anterior deltoids and creates anti-rotation demand in the obliques. Upper-body cardio that burns fat without the knee impact of running — ideal for high-frequency training.",
    explM:  "Battle ropes generate mechanical power via rapid shoulder flexion-extension. Research shows 10 minutes of battle rope work elevates blood lactate to 7+ mmol/L — comparable to high-intensity sprint intervals. The forearm and grip musculature are simultaneously conditioned, improving dead-hang and pulling strength.",
  },
  "Burpee (Full ROM — 10-sec Rest)": {
    muscle: "Pectoralis Major · Quadriceps · Deltoids · Core · Cardiovascular System",
    imgKey: "wh",
    explW: "Full ROM burpees (chest to floor on descent, fully extended at jump apex) maximize the metabolic demand. Burns 13–15 kcal/min. Elevates heart rate to 90%+ HRmax within 30 seconds. The stretch-shortening cycle at the push-up bottom position adds pectoral load that intensifies the metabolic effect.",
    explM:  "Burpees compress maximum athletic demands into one movement: push, plank, squat, jump. Power output during the jump component stimulates fast-twitch Type IIx fiber fatigue — the fibers most responsive to metabolic conditioning improvements. 10-sec rest between reps maintains heart rate above lactate threshold.",
  },
  "Box Jump (Maximal Height — Soft Landing)": {
    muscle: "Quadriceps · Gluteus Maximus · Gastrocnemius · Stretch-Shortening Cycle",
    imgKey: "rn",
    explW: "Maximal height box jumps train the stretch-shortening cycle — the neuromuscular mechanism by which elastic energy stored during the counter-movement is released explosively. Develops fast-twitch muscle fiber recruitment that cannot be achieved with heavy lifting alone. Increases post-activation potentiation before heavy lower body sets.",
    explM:  "Maximal intent during takeoff is the primary stimulus — the nervous system must be trained to recruit the maximum number of motor units simultaneously. Soft landings (feet → knees soft → controlled descent) prevent injury while allowing maximum loading of the eccentric phase for subsequent reactive training.",
  },
  "Sprint Interval (20m — Maximum Acceleration)": {
    muscle: "Quadriceps · Gluteus Maximus · Hamstrings · Calves · VO2max System",
    imgKey: "rn",
    explW: "20m sprints target the phosphocreatine energy system (0–6 seconds), developing maximum muscular power. The hamstring is under specific stretch-reflex demand during the terminal swing phase of running — making sprints the most effective non-gym hamstring training method. 6–8 sprints constitute a complete speed session.",
    explM:  "20m sprints tax the alactic (ATP-PCr) energy system maximally. Research confirms sprint training produces testosterone and GH response comparable to resistance training. Develops fast-twitch fiber hypertrophy, improves muscle capillarization, and increases glycolytic enzyme activity — all critical for body composition.",
  },
  "Mountain Climbers (Alternating — Explosive)": {
    muscle: "Rectus Abdominis · Hip Flexors · Deltoids · Cardiovascular",
    imgKey: "co",
    explW: "Explosive alternating mountain climbers maintain the push-up planked position while driving the knees forward at maximum velocity. The dynamic core demand (anti-extension + anti-rotation during knee drive) burns 8–10 kcal/min. Efficient upper-body cardio that simultaneously builds spinal stabilization.",
    explM:  "Running in place while maintaining a rigid plank position forces the core to stabilize under continuous contralateral limb loading — an advanced anti-rotation challenge. The hip flexors (primarily psoas major and iliacus) reach near-maximal activation. Sustains cardiovascular demand equivalent to a 5-minute run in 90 seconds.",
  },
  "High Knees (Sprint Mechanics — 30s)": {
    muscle: "Hip Flexors · Quadriceps · Gastrocnemius · Cardiovascular",
    imgKey: "rn",
    explW: "High knees train the maximal hip flexion range of motion under cardiovascular demand. Knee height above 90° (thigh parallel to ground) activates the psoas major at its shortened position — strengthening the muscle responsible for anterior pelvic tilt correction. Critical hip flexor conditioning for female posture.",
    explM:  "High knees at sprint mechanics (forward lean, arm drive, maximum knee height) develop running technique while simultaneously creating cardiovascular overload. Targets the hip flexors under metabolic stress — the weakest link for many men who lift but neglect hip flexor mobility and active strength.",
  },
  "Lateral Shuffle (Resist-Band — 15m)": {
    muscle: "Gluteus Medius · Hip Abductors · Adductors · Agility Systems",
    imgKey: "rn",
    explW: "Resistance band lateral shuffles activate gluteus medius at 80%+ MVC while simultaneously training frontal-plane agility — both severely undertrained in women. Strengthening the hip abductors reduces the risk of ACL injury by 50%, making this a critical injury prevention movement for female athletes.",
    explM:  "Lateral locomotion trains the hip abductors and adductors in their primary functional pattern — resisting valgus collapse under dynamic loading. Band resistance adds consistent hip abduction demand throughout the shuffle. Develops the athletic base for court sports, field sports, and combat performance.",
  },

  // ── STRENGTH / POWERLIFTING ──────────────────────────────────────────

  "Barbell Squat (75–95% 1RM — RPE 7–9)": {
    muscle: "Quadriceps · Gluteus Maximus · Hamstrings · Erector Spinae (all primary)",
    imgKey: "sq",
    explW: "Percentage-based loading (75–95% 1RM) drives primarily neural adaptation in the first 8 weeks: motor unit synchronization, firing rate coding, and inter-muscular coordination improvements. Women produce 83% fewer Y chromosomal motor neurons but adapt neurally at identical rates to men — equal progress potential.",
    explM:  "At 90%+ 1RM, the squat produces the highest combined electrical activity across the lower body musculature of any resistance exercise. Neural efficiency is the dominant adaptation — the CNS learns to recruit Type IIa and IIx motor units simultaneously. 3–5 minutes full ATP-PCr recovery between sets is mandatory.",
  },
  "Conventional Deadlift (85–93% 1RM — RPE 8)": {
    muscle: "Erector Spinae · Gluteus Maximus · Hamstrings · Lats · Quadriceps",
    imgKey: "dl",
    explW: "The strength deadlift protocol (85–93% 1RM) pushes beyond the hypertrophy zone into pure neural strength territory. Intra-abdominal pressure during a max deadlift can exceed 400 mmHg — requiring full Valsalva maneuver and absolute spinal bracing. Developing this motor pattern transfers to all other movement competencies.",
    explM:  "At 85–93% 1RM, the deadlift is a pure test of the nervous system's ability to recruit every available motor unit simultaneously. Rate coding (firing frequency) and synchronization both peak at supra-maximal loads. Lumbar irradiation during maximal pulls creates the thick erector development visible in powerlifters.",
  },
  "Barbell Bench Press (85–95% 1RM — Competition Grip)": {
    muscle: "Pectoralis Major · Anterior Deltoid · Triceps Brachii",
    imgKey: "ub",
    explW: "Competition-width grip (approximately shoulder-width + hand width) allows maximum leg drive transfer and reduces pectoral stretch depth, enabling heavier loads. At 85%+ 1RM, the pectoral contributes ~65% of force while the triceps provide the remaining 35% at lockout. The neural co-activation pattern is unique to maximal pressing.",
    explM:  "Maximal bench pressing triggers peak anterior chain neural synchronization. Competition grip with full arch and leg drive maximizes biomechanical efficiency. At 90% 1RM, the bar speed is slower but motor unit recruitment approaches 100% — the only loading zone that fully adapts Type IIx fast-twitch fibers.",
  },
  "Barbell Overhead Press (85% 1RM — Strict)": {
    muscle: "Medial + Anterior Deltoid · Triceps · Upper Trapezius · Serratus Anterior",
    imgKey: "sh",
    explW: "Strict overhead press at 85%+ 1RM is one of the primary women's strength benchmarks. It demands full bracing of the obliques and transverse abdominis to prevent lumbar extension under load. Neural adaptation specific to overhead pressing creates lasting improvements in shoulder girdle stability that protect against shoulder injuries.",
    explM:  "The strict press at 85% 1RM requires the most complete whole-body neuromuscular coordination of any upper body movement. Serratus anterior must fully protract and upwardly rotate the scapula at lockout — if it fails, the supraspinatus impinges. The neural demand is what separates truly strong pressers from intermediates.",
  },
  "Power Clean (Hip Extension — Full Pull)": {
    muscle: "Hamstrings · Gluteus Maximus · Trapezius · Deltoids · Full CNS",
    imgKey: "pc",
    explW: "The power clean is a Rate of Force Development (RFD) exercise — it trains the nervous system to produce maximum force in minimum time. Unlike slow strength movements, the clean develops explosive power expression critical for functional athletic performance. For women, it builds the fast-twitch fiber economy rarely targeted in typical programs.",
    explM:  "The gold standard for explosive power development. The triple extension (ankle, knee, hip) followed by the aggressive pull-under and racking trains the entire stretch-shortening cycle under maximal load conditions. Research confirms power cleans improve vertical jump, sprint performance, and resistance to athletic injury more than any other movement.",
  },
  "Pause Squat (3-sec Pause at Parallel)": {
    muscle: "Quadriceps · Gluteus Maximus · Erector Spinae · Core",
    imgKey: "sq",
    explW: "The 3-second pause at parallel eliminates the stretch-shortening cycle contribution, forcing the muscles to generate force from a dead-stop position. This exposes and eliminates the 'bounce point' weakness at the bottom of the squat — strengthening the position where most squat failures occur.",
    explM:  "Pause squats create extreme quadriceps time under tension at the mechanically disadvantaged bottom position. Without elastic bounce, 100% of the force must be generated contractilely. This builds the starting strength and bottom-position neural recruitment that transfers directly to competition squats.",
  },
  "Floor Press (Barbell — Tricep Lockout)": {
    muscle: "Triceps Brachii · Pectoralis Major Sternal Head · Anterior Deltoid",
    imgKey: "ub",
    explW: "The floor limits the range of motion, eliminating the bottom-stretch portion of the bench press where the shoulder is most vulnerable. This allows heavy tricep-dominant pressing even for those with anterior shoulder impingement. Builds the lockout strength critical for bench press personal records.",
    explM:  "Classic Westside-influenced movement. Eliminating the bottom ROM forces the triceps to provide nearly all the concentric force without elastic assistance from pectorals. Specifically targets bench press lockout weakness. The 3-second touch-and-go pause eliminates the stretch reflex contribution entirely.",
  },
  "Romanian Deadlift (85% 1RM — Powerlifting)": {
    muscle: "Hamstrings (primary eccentric) · Gluteus Maximus · Erector Spinae",
    imgKey: "dl",
    explW: "Strength-focused RDL at 85% 1RM builds the eccentric hamstring strength critical for posterior chain longevity. Women who strength train the RDL to heavy loads develop hamstring stiffness that reduces ACL injury risk during deceleration movements by up to 70% in athletic populations.",
    explM:  "Heavy RDL at 85%+ 1RM is the primary hamstring strength movement in powerlifting. The eccentric overload at near-maximal loads creates the highest mechanical tension possible in the hamstring muscle — driving both maximal strength and hypertrophy in a single exercise. Non-negotiable for serious pulling strength.",
  },

  // ── ENDURANCE / ZONE TRAINING ─────────────────────────────────────────

  "Zone 2 Steady-State Run (130–145 BPM)": {
    muscle: "Type I Slow-Twitch Muscle Fibers · Cardiovascular System · Mitochondrial Network",
    imgKey: "rn",
    explW: "Zone 2 training (130–145 BPM, conversational pace) maximizes mitochondrial biogenesis — the creation of new mitochondria that are the cellular engines of fat oxidation. Women have a naturally higher proportion of Type I fibers and are typically better fat oxidizers — making Zone 2 their most efficient fat loss protocol.",
    explM:  "Zone 2 is the aerobic training zone with the highest mitochondrial density stimulus per hour of training. The Seiler 80/20 model prescribes 80% of training volume at Zone 2 to maximize aerobic base while preventing overreach. Improves stroke volume (heart pumps more blood per beat) and lowers resting heart rate.",
  },
  "Zone 5 VO2max Interval (90–100% HRmax — 4min)": {
    muscle: "Type II Muscle Fibers · Cardiovascular System · VO2max Ceiling",
    imgKey: "rn",
    explW: "4-minute Zone 5 intervals (90%+ HRmax) are the gold standard VO2max stimulus. Norwegian research on elite athletes confirms: 4×4min at 90–95% HRmax maximizes cardiac output improvements. VO2max is the strongest predictor of long-term cardiovascular health and metabolic disease prevention in women.",
    explM:  "Zone 5 intervals push the cardiovascular system to its absolute maximum oxygen uptake ceiling. Research confirms that 4×4min at 90–95% HRmax is the single most effective training method for improving VO2max — the primary metric of cardiorespiratory fitness that drops 1% per year after 30 without training.",
  },
  "Tempo Run (Lactate Threshold — 80–85% HRmax)": {
    muscle: "Type I + Type IIa Fibers · Lactate Clearance System · Respiratory Muscles",
    imgKey: "rn",
    explW: "Lactate threshold running (20-min continuous at 80–85% HRmax) trains the body to clear lactic acid at higher running speeds. This is the physiological mechanism that allows you to run further and faster before 'the burn.' Progressive lactate threshold training directly improves running economy for any target distance.",
    explM:  "Lactate threshold (LT) is the exercise intensity above which lactate accumulates exponentially in the blood. Training at or just above LT (Daniels' T-pace) raises the threshold, allowing higher speeds to be sustained aerobically. Critical for 5K–marathon performance and for metabolic conditioning between strength sessions.",
  },
  "Long Slow Distance Run (60–75% HRmax — Aerobic Base)": {
    muscle: "Type I (Slow-Twitch) Fibers · Mitochondrial Density · Aerobic Metabolism",
    imgKey: "rn",
    explW: "Long slow distance builds the aerobic base — the foundation from which all speed and performance improvements are made. Mitochondrial density increases proportionally with training volume at Zone 2 intensity. For women, this zone maximizes fat oxidation rate, making it the primary foundation for body composition improvement.",
    explM:  "The aerobic base is built through volume — not intensity. Long Zone 1–2 runs (conversational pace, 60–75% HRmax) increase left ventricular volume (cardiac remodeling), slow-twitch fiber mitochondrial density, and capillary bed density. This foundation determines the ceiling of all subsequent high-intensity work.",
  },
  "Rowing Machine (Zone 2 — 22 spm)": {
    muscle: "Posterior Chain · Quadriceps · Shoulder Girdle · Cardiovascular System",
    imgKey: "bk",
    explW: "Rowing at 22 strokes per minute at Zone 2 provides complete full-body aerobic training without any lower body impact. The 60/40 leg-arm power split means 60% of propulsion comes from leg drive, making this the most effective seated cardio for lower body muscular endurance development alongside cardiovascular conditioning.",
    explM:  "Rowing engages 86% of skeletal muscle mass — more than any other aerobic exercise. At 22 spm Zone 2 pace, this creates both cardiovascular adaptation and muscular endurance in the posterior chain simultaneously. Used extensively in elite rowing programs as the primary aerobic base builder.",
  },
  "Cycling (Zone 2 — 85–90 rpm Cadence)": {
    muscle: "Quadriceps · Gluteus Maximus · Hamstrings · Cardiovascular System",
    imgKey: "rn",
    explW: "Cycling at 85–90 rpm cadence in Zone 2 creates non-impact aerobic stimulus that spares the lower body joints. High cadence (over 85 rpm) selectively trains the aerobic capacity of the quadriceps at low resistance — building fatigue-resistant Type I fiber capacity without DOMS interference with resistance training.",
    explM:  "High-cadence Zone 2 cycling at 85–90 rpm develops aerobic capacity in the quadriceps without the eccentric damage of running. Essential for recovery cycling between strength training sessions. Cyclists who train at 90 rpm cadence demonstrate superior mitochondrial density in quadriceps versus lower-cadence grinders.",
  },

  // ── FLEXIBILITY / MOBILITY / PNF ─────────────────────────────────────

  "Standing Hip Flexor PNF Stretch (Contract-Relax)": {
    muscle: "Iliopsoas · Rectus Femoris · Anterior Hip Capsule",
    imgKey: "fx",
    explW: "PNF Contract-Relax: push into the lunge for 6 seconds (contract iliopsoas isometrically), relax completely, then deepen the stretch. PNF stretching increases ROM 10–15% faster than static stretching (Weppler & Magnusson, 2010) by exploiting the Golgi tendon organ inhibitory reflex. Critical for anterior pelvic tilt correction in women.",
    explM:  "Tight hip flexors from sitting lock the pelvis in anterior tilt — directly causing lower back pain and reducing squat depth. PNF contract-relax technique extends the stretch to 8–10% beyond passive ROM by inhibiting the myotatic reflex. Non-negotiable for men with limited squat depth due to hip flexor restriction.",
  },
  "90-90 Hip Stretch (Internal + External Rotation)": {
    muscle: "Piriformis · Gluteus Medius · Hip Internal Rotators · Hip Capsule",
    imgKey: "fx",
    explW: "The 90-90 position simultaneously addresses hip internal and external rotation — both planes frequently restricted in women due to sedentary sitting. FRC (Functional Range Conditioning) passive end-range loading in this position increases capsular space and improves true hip joint mobility, not just muscle extensibility.",
    explM:  "Hip internal rotation is the most restricted plane in men — a direct consequence of hip-dominant training patterns (squats, deadlifts) that never load internal rotation. The 90-90 stretch addresses capsular restriction that cannot be improved by muscle stretching alone. Unlocks 5–10° additional hip ROM for deeper squats.",
  },
  "Pigeon Pose PNF (External Rotation — 60–90 sec)": {
    muscle: "Piriformis · Gluteus Medius · Hip External Rotators · IT Band",
    imgKey: "fx",
    explW: "Deep external rotation stretch combined with 6-second piriformis contraction (push foot into ground isometrically) then release creates the maximal PNF stretch reflex response. Releases the sciatic nerve impingement that the piriformis can cause — a common and undertreated source of hip and lower back discomfort in women.",
    explM:  "Piriformis tightness is epidemic in heavy squatters and deadlifters. The pigeon pose PNF creates deep hip external rotation stretching that passive pigeon pose cannot achieve alone. The 60–90 second hold accesses the slow-twitch connective tissue relaxation response (creep) that only occurs beyond 45 seconds.",
  },
  "Thoracic Extension (Foam Roll + PAILs)": {
    muscle: "Thoracic Erector Spinae · Rhomboids · Thoracic Facet Joints",
    imgKey: "co",
    explW: "Foam roller sagittal thoracic mobilization combined with PAILs (Progressive Angular Isometric Loading) restores thoracic extension lost through prolonged sitting. 30° of additional thoracic extension directly improves overhead shoulder mobility and reduces cervical spine compensation. Essential for women with office-based occupations.",
    explM:  "Thoracic kyphosis (excessive rounding) reduces overhead shoulder ROM by compressing the subacromial space and limiting scapular upward rotation. PAILs after foam rolling: contract the thoracic extensors for 20 seconds at end-range extension, relax, and move deeper. Produces lasting thoracic mobility in 4–6 sessions.",
  },
  "Hamstring PNF (Supine — Contract-Relax 3×30)": {
    muscle: "Biceps Femoris · Semitendinosus · Semimembranosus · Sciatic Nerve",
    imgKey: "fx",
    explW: "Supine hamstring PNF: flex hip to passive end-range, contract hamstring (push leg into resistance) for 6 seconds, relax, flex 5–10° further. Three cycles add 15–25% ROM. Hamstring flexibility directly improves Romanian deadlift depth and reduces lumbar flexion during the initial pull — preventing lower back injury.",
    explM:  "Tight hamstrings are the #1 limiting factor in squat depth and deadlift mechanics. PNF three-cycle stretching (contract-relax-contract → deepen) produces ROM gains that persist for 48 hours post-session versus 30 minutes for static stretching. Critical for optimizing hip-hinge biomechanics under load.",
  },
  "Shoulder CARS (Controlled Articular Rotations)": {
    muscle: "Rotator Cuff (all 4) · Deltoids · Serratus Anterior · Scapular Stabilizers",
    imgKey: "sh",
    explW: "CARS (controlled articular rotations) move the shoulder through its complete accessible range under maximal neurological tension — creating a 'joint health assessment' every session. Research confirms CARS maintain the synovial fluid nutrition of articular cartilage, preventing the degenerative changes that accompany stiffness and inactivity.",
    explM:  "Heavy pressing and pulling build muscle but neglect end-range shoulder mobility where impingement and labral tears occur. CARS under maximum irradiation (whole-body tension) train the rotator cuff through the full 360° arc under neural drive — the only stimulus that maintains long-term glenohumeral joint health.",
  },
  "Cat-Cow (Segmental Spinal Articulation)": {
    muscle: "Erector Spinae · Multifidus · Rectus Abdominis · Diaphragm",
    imgKey: "co",
    explW: "Segmental spinal articulation hydrates intervertebral discs through cyclic fluid exchange — discs have no blood supply and rely solely on movement for nutrition. 10 controlled repetitions before every session improves disc hydration, reduces spinal stiffness, and activates the multifidus — the deep spinal stabilizer chronically weakened by sitting.",
    explM:  "The spine must articulate independently at each vertebral segment for optimal movement quality. Loaded exercises (squats, deadlifts) demand complete spinal rigidity — but mobility work must independently maintain segmental range. Cat-cow is the daily maintenance movement for spinal intervertebral disc health.",
  },
  "World's Greatest Stretch (Dynamic — 5 Reps)": {
    muscle: "Hip Flexors · Thoracic Rotators · Hamstrings · Ankle Dorsiflexors",
    imgKey: "fx",
    explW: "The world's greatest stretch simultaneously addresses ankle dorsiflexion, hip flexor length, thoracic rotation, and hamstring extensibility — all in one movement. Research identifies it as the highest total-ROI warm-up movement per time spent. Women who perform this pre-session demonstrate 12% improved squat depth.",
    explM:  "The world's greatest stretch addresses the four most common movement restrictions in male athletes: ankle dorsiflexion, hip flexor tightness, thoracic rotation, and hamstring length. Five reps per side takes 90 seconds and produces the greatest multi-joint mobility impact of any single movement preparation exercise.",
  },
  "Ankle Dorsiflexion Mobilization (Wall Drill)": {
    muscle: "Soleus · Gastrocnemius · Posterior Ankle Capsule",
    imgKey: "fx",
    explW: "Limited ankle dorsiflexion (<30°) is one of the most common compensations seen in women's squatting patterns — forcing excessive forward lean and heel rise that loads the lower back instead of the quads. 2 minutes of wall ankle mobilization consistently adds 8–12° of dorsiflexion that directly improves squat mechanics.",
    explM:  "Ankle dorsiflexion is the most overlooked movement restriction in strength training. Insufficient dorsiflexion (<30°) forces the heel to rise during squats, shifting load to the lower back and reducing quad recruitment. Wall drill stretches the posterior capsule of the ankle joint — the capsular restriction that mobility exercises cannot address.",
  },
  "Butterfly Hip Stretch (Adductor PNF)": {
    muscle: "Hip Adductors · Gracilis · Pectineus · Obturator Externus",
    imgKey: "fx",
    explW: "Adductor tightness compresses the hip joint medially, restricting the squat's ability to externally rotate at depth. PNF application: push knees into palms (adductor contraction, 6 sec), release, then gently press knees toward floor. Three cycles produce measurable groin flexibility that reduces inner thigh discomfort during sumo movements.",
    explM:  "Restricted adductor length limits sumo deadlift stance width and squat external rotation. Men with externally-rotated walking gait (toe-out pattern) often have paradoxically tight adductors. PNF adductor stretching adds the lateral hip ROM needed for wide stances and significantly reduces groin strain risk during speed work.",
  },
  "Spinal Rotation Stretch (Supine Knees Bent)": {
    muscle: "External + Internal Obliques · Thoracolumbar Fascia · Quadratus Lumborum",
    imgKey: "co",
    explW: "Supine spinal rotation creates a myofascial release in the thoracolumbar fascia — the connective tissue linking the lower back, glutes, and upper back. Hold 45–90 seconds per side to access the slow creep response in fascia. This improves rotational mobility critical for dynamic sporting movements and alleviates sitting-related lower back compression.",
    explM:  "The thoracolumbar fascia compresses under heavy deadlift and squat loading. Post-workout supine spinal rotation decompresses the lumbar discs and stretches the quadratus lumborum bilaterally. Research confirms 90-second holds produce fascial release responses not accessible at shorter durations.",
  },
};

// ════════════════════════════════════════════════════════════════════════
//  PROTOCOL TABLES — Sets × Reps per Phase per Program
//  Based on peer-reviewed periodization science:
//  • wl = EPOC-maximizing HIIT (Tabata/Gibala): high reps, short rest
//  • mb = Hypertrophy zone (Schoenfeld 2010): 6–12 reps, 60–90s rest
//  • st = Neural strength (Westside/Sheiko): 1–5 reps, 3–5min rest
//  • en = Endurance volume: duration-based, progressive 10%/week
//  • fl = PNF progression: 30s→60s→90s holds (Weppler & Magnusson)
//  • br = Recomp bridge (Barakat 2020): 8–15 rep range concurrent
// ════════════════════════════════════════════════════════════════════════
const PROTO: Record<string, { A: [number, string]; B: [number, string]; C: [number, string] }> = {
  st: { A: [5, "5 @ 70–75% 1RM"],   B: [4, "4 @ 80–85% 1RM"],   C: [3, "3 @ 90–95% 1RM"]   },
  mb: { A: [4, "12 @ 2-1-2 tempo"], B: [4, "10 @ 2-1-2 tempo"], C: [4, "8 @ 2-0-2 tempo"]   },
  wl: { A: [4, "40s work/20s rest"], B: [4, "40s work/20s rest"], C: [5, "40s work/20s rest"] },
  en: { A: [1, "20 min Zone 2"],     B: [1, "28 min Zone 2"],     C: [1, "36 min Zone 2"]     },
  fl: { A: [3, "30–45 sec hold"],    B: [3, "60 sec hold"],       C: [3, "90 sec hold"]       },
  br: { A: [3, "15 @ controlled"],   B: [4, "12 @ controlled"],   C: [4, "10 superset"]       },
};

function safeDict(name: string, gender: "w" | "m") {
  const ex = DICT[name];
  if (ex) {
    return {
      muscle: ex.muscle,
      explanation: gender === "w" ? ex.explW : ex.explM,
      imgKey: ex.imgKey,
    };
  }
  return {
    muscle: "Compound movement",
    explanation:
      gender === "w"
        ? "Evidence-based compound movement targeting multiple muscle groups simultaneously for maximum metabolic and hypertrophic response."
        : "Performance-focused compound movement that drives neural adaptation and hormonal response across the entire kinetic chain.",
    imgKey: "co",
  };
}

function buildEx(
  progKey: string,
  phase: "A" | "B" | "C",
  gender: "w" | "m",
  overrideRepData: string
): Exd {
  const [name, customRep] = overrideRepData.split("|");
  const d = safeDict(name, gender);
  const proto = PROTO[progKey][phase];
  const sets = proto[0];
  const reps = customRep ?? proto[1];
  return {
    name,
    muscle: d.muscle,
    sets,
    reps,
    explanation: d.explanation,
    img: img(d.imgKey),
  };
}

function makeDay(
  name: string,
  progKey: string,
  gender: "w" | "m",
  aList: string[],
  bList: string[],
  cList: string[]
): DayD {
  return {
    name,
    exercises: {
      A: aList.map((e) => buildEx(progKey, "A", gender, e)),
      B: bList.map((e) => buildEx(progKey, "B", gender, e)),
      C: cList.map((e) => buildEx(progKey, "C", gender, e)),
    },
  };
}

// ════════════════════════════════════════════════════════════════════════
//  PROGRAM DATABASE
//  Structure: PROG_DATA[gender][program_slug][day_number]
//  Each day has phases A (weeks 1–4), B (weeks 5–8), C (weeks 9+)
//  Deload: Week 4/8/12 = 50% volume, 60% intensity (applied in UI)
// ════════════════════════════════════════════════════════════════════════
export const PROG_DATA: Record<string, Record<string, Record<number, DayD>>> = {

  // ══════════════════════════════════════════════════════════════════════
  //  WOMEN'S PROGRAMS
  // ══════════════════════════════════════════════════════════════════════
  w: {

    // ── W · WEIGHT LOSS — EPOC Maximization (Tabata/Gibala protocols) ──
    wl: {
      1: makeDay("Glute-Posterior Chain HIIT", "wl", "w",
        // Phase A — Foundation HIIT (40s work / 20s rest circuits)
        [
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Jump Lunge (Alternating Plyometric)",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Goblet Squat (Dumbbell)",
          "Mountain Climbers (Alternating — Explosive)",
        ],
        // Phase B — Progression (add load, same work/rest ratio)
        [
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Sumo Deadlift (Wide Stance)",
          "Jump Lunge (Alternating Plyometric)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Burpee (Full ROM — 10-sec Rest)",
        ],
        // Phase C — Transformation (increase density, shorter rest)
        [
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Conventional Deadlift (Braced Spine)",
          "Jump Lunge (Alternating Plyometric)",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Box Jump (Maximal Height — Soft Landing)",
        ]
      ),
      2: makeDay("Upper Body Metabolic Circuit", "wl", "w",
        [
          "Battle Rope Alternating Wave (40-sec Work)",
          "Barbell Bench Press (2-1-2 Tempo)|8 AMRAP",
          "Single-Arm Dumbbell Row (Knee on Bench)|10 each",
          "Push-Up (Wide-Grip Push-Up (3-sec Eccentric))|AMRAP",
          "Dumbbell Lateral Raise (75° Arm Angle)|15",
          "Mountain Climbers (Alternating — Explosive)",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Incline Dumbbell Press (30° — 2-sec Eccentric)|10",
          "Single-Arm Dumbbell Row (Knee on Bench)|10 each",
          "Wide-Grip Push-Up (3-sec Eccentric)|AMRAP",
          "Face Pull (Rope — External Rotation)|15",
          "Burpee (Full ROM — 10-sec Rest)",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Barbell Bench Press (2-1-2 Tempo)|10",
          "Lat Pulldown (Overhand Wide Grip)|12",
          "Cable Chest Fly (Mid-Cable)|12",
          "Face Pull (Rope — External Rotation)|15",
          "Box Jump (Maximal Height — Soft Landing)",
        ]
      ),
      3: makeDay("Full-Body HIIT + Core", "wl", "w",
        [
          "Jump Rope Double-Under (1-min AMRAP)",
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Burpee (Full ROM — 10-sec Rest)",
          "Plank (Active — Glutes Squeezed)|60s",
          "High Knees (Sprint Mechanics — 30s)",
        ],
        [
          "Jump Rope Double-Under (1-min AMRAP)",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Assault Bike Sprint (45-sec Max Effort)",
          "Burpee (Full ROM — 10-sec Rest)",
          "Dead Bug (Contralateral Limb Extension)|10 each",
          "Sprint Interval (20m — Maximum Acceleration)",
        ],
        [
          "Jump Rope Double-Under (1-min AMRAP)",
          "Barbell Thruster (Squat-to-Press)|8",
          "Assault Bike Sprint (45-sec Max Effort)",
          "Box Jump (Maximal Height — Soft Landing)",
          "Ab Wheel Rollout (Kneeling — Full Extension)|8",
          "Sprint Interval (20m — Maximum Acceleration)",
        ]
      ),
      4: makeDay("Conditioning + Mobility", "wl", "w",
        [
          "Jump Rope Double-Under (1-min AMRAP)",
          "Lateral Shuffle (Resist-Band — 15m)",
          "High Knees (Sprint Mechanics — 30s)",
          "Mountain Climbers (Alternating — Explosive)",
          "Side Plank (Hip Elevated — Abduction)|45s each",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)|60s each",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Lateral Shuffle (Resist-Band — 15m)",
          "Sprint Interval (20m — Maximum Acceleration)",
          "Mountain Climbers (Alternating — Explosive)",
          "Dead Bug (Contralateral Limb Extension)|10 each",
          "90-90 Hip Stretch (Internal + External Rotation)|60s each",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Sprint Interval (20m — Maximum Acceleration)",
          "Burpee (Full ROM — 10-sec Rest)",
          "Ab Wheel Rollout (Kneeling — Full Extension)|10",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
        ]
      ),
    },

    // ── W · MUSCLE BUILDING — Hypertrophy (Schoenfeld 2010 + Progressive Overload) ──
    mb: {
      1: makeDay("Glutes + Legs (Primary Hypertrophy)", "mb", "w",
        [
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)",
          "Goblet Squat (Dumbbell)",
          "Leg Press (Feet High — 4-sec Negative)",
          "Cable Kickback (Full Hip Extension)",
        ],
        [
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Barbell Back Squat (High Bar)",
          "Sumo Deadlift (Wide Stance)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Leg Press (Feet High — 4-sec Negative)",
          "Cable Pull-Through (Hip Hinge)",
        ],
        [
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Conventional Deadlift (Braced Spine)",
          "Barbell Back Squat (High Bar)",
          "Curtsy Lunge (Weighted)",
          "Leg Press (Feet High — 4-sec Negative)",
          "Cable Kickback (Full Hip Extension)",
        ]
      ),
      2: makeDay("Back + Biceps (Width & Thickness)", "mb", "w",
        [
          "Lat Pulldown (Overhand Wide Grip)",
          "Single-Arm Dumbbell Row (Knee on Bench)",
          "Face Pull (Rope — External Rotation)",
          "Preacher Curl (EZ-Bar — Slow Positive)",
          "Incline Dumbbell Curl (30-sec Eccentric Hold)",
          "Dead Bug (Contralateral Limb Extension)",
        ],
        [
          "Pull-Up (Pronated Grip — Full ROM)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Seated Cable Row (Neutral Grip — 2-sec Hold)",
          "Face Pull (Rope — External Rotation)",
          "Preacher Curl (EZ-Bar — Slow Positive)",
          "Hammer Curl (Cross-Body Variation)",
        ],
        [
          "Pull-Up (Pronated Grip — Full ROM)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Lat Pulldown (Overhand Wide Grip)",
          "Seated Cable Row (Neutral Grip — 2-sec Hold)",
          "Incline Dumbbell Curl (30-sec Eccentric Hold)",
          "Cable Pull-Through (Hip Hinge)",
        ]
      ),
      3: makeDay("Chest + Shoulders + Triceps", "mb", "w",
        [
          "Incline Dumbbell Press (30° — 2-sec Eccentric)",
          "Overhead Press (Barbell — Strict)",
          "Cable Chest Fly (Mid-Cable)",
          "Dumbbell Lateral Raise (75° Arm Angle)",
          "Cable Tricep Pushdown (Rope — Flare Out)",
          "Overhead Tricep Extension (Cable — Long Head)",
        ],
        [
          "Barbell Bench Press (2-1-2 Tempo)",
          "Dumbbell Arnold Press (Full Rotation)",
          "Cable Chest Fly (Mid-Cable)",
          "Dumbbell Lateral Raise (75° Arm Angle)",
          "EZ-Bar Skull Crusher (Long Head Focus)",
          "Cable Tricep Pushdown (Rope — Flare Out)",
        ],
        [
          "Barbell Bench Press (2-1-2 Tempo)",
          "Incline Dumbbell Press (30° — 2-sec Eccentric)",
          "Overhead Press (Barbell — Strict)",
          "Wide-Grip Push-Up (3-sec Eccentric)",
          "EZ-Bar Skull Crusher (Long Head Focus)",
          "Overhead Tricep Extension (Cable — Long Head)",
        ]
      ),
      4: makeDay("Full Body Power + Accessory", "mb", "w",
        [
          "Conventional Deadlift (Braced Spine)",
          "Barbell Back Squat (High Bar)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Incline Dumbbell Press (30° — 2-sec Eccentric)",
          "Plank (Active — Glutes Squeezed)|60s",
          "Kettlebell Swing (Hip-Hinge Explosive)",
        ],
        [
          "Sumo Deadlift (Wide Stance)",
          "Barbell Back Squat (High Bar)",
          "Pull-Up (Pronated Grip — Full ROM)",
          "Overhead Press (Barbell — Strict)",
          "Side Plank (Hip Elevated — Abduction)|45s each",
          "Box Jump (Maximal Height — Soft Landing)",
        ],
        [
          "Conventional Deadlift (Braced Spine)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Dumbbell Arnold Press (Full Rotation)",
          "Ab Wheel Rollout (Kneeling — Full Extension)",
          "Kettlebell Swing (Hip-Hinge Explosive)",
        ]
      ),
    },

    // ── W · STRENGTH — Neural Adaptation (Westside + Sheiko Periodization) ──
    st: {
      1: makeDay("Squat Pattern (70–95% 1RM)", "st", "w",
        [
          "Barbell Squat (75–95% 1RM — RPE 7–9)|5 @ 70–75% 1RM",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)|4×8 accessory",
          "Barbell Hip Thrust (Shoulder-Elevated)|4×8",
          "Bulgarian Split Squat (Rear-Foot Elevated)|3×8",
          "Plank (Active — Glutes Squeezed)|3×60s",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
        ],
        [
          "Barbell Squat (75–95% 1RM — RPE 7–9)|4 @ 80–85% 1RM",
          "Pause Squat (3-sec Pause at Parallel)|3×3",
          "Conventional Deadlift (Braced Spine)|3×5 @ 75%",
          "Bulgarian Split Squat (Rear-Foot Elevated)|3×6",
          "Dead Bug (Contralateral Limb Extension)|3×8",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
        ],
        [
          "Barbell Squat (75–95% 1RM — RPE 7–9)|3 @ 90–95% 1RM",
          "Pause Squat (3-sec Pause at Parallel)|3×2",
          "Conventional Deadlift (Braced Spine)|2×3 @ 85%",
          "Curtsy Lunge (Weighted)|3×8 each",
          "Ab Wheel Rollout (Kneeling — Full Extension)|3×8",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
        ]
      ),
      2: makeDay("Press Pattern (70–95% 1RM)", "st", "w",
        [
          "Barbell Bench Press (85–95% 1RM — Competition Grip)|5 @ 70–75%",
          "Overhead Press (Barbell — Strict)|4×6",
          "Pull-Up (Pronated Grip — Full ROM)|4×5",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|4×6",
          "Face Pull (Rope — External Rotation)|4×15",
          "Wide-Grip Push-Up (3-sec Eccentric)|2×AMRAP",
        ],
        [
          "Barbell Bench Press (85–95% 1RM — Competition Grip)|4 @ 82–85%",
          "Floor Press (Barbell — Tricep Lockout)|3×4",
          "Pull-Up (Pronated Grip — Full ROM)|4×4",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|4×5",
          "Face Pull (Rope — External Rotation)|4×15",
          "Close-Grip Bench Press (Tricep Focus)|3×6",
        ],
        [
          "Barbell Bench Press (85–95% 1RM — Competition Grip)|3 @ 90–93%",
          "Floor Press (Barbell — Tricep Lockout)|3×3",
          "Barbell Overhead Press (85% 1RM — Strict)|3×3",
          "Pull-Up (Pronated Grip — Full ROM)|3×5",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|3×4",
          "EZ-Bar Skull Crusher (Long Head Focus)|3×8",
        ]
      ),
      3: makeDay("Hinge Pattern + Full Body Strength", "st", "w",
        [
          "Conventional Deadlift (Braced Spine)|5 @ 70–75% 1RM",
          "Romanian Deadlift (85% 1RM — Powerlifting)|3×5",
          "Barbell Back Squat (High Bar)|3×5",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|4×5",
          "Plank (Active — Glutes Squeezed)|3×60s",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
        ],
        [
          "Conventional Deadlift (Braced Spine)|4 @ 80–85% 1RM",
          "Romanian Deadlift (85% 1RM — Powerlifting)|4×4",
          "Pause Squat (3-sec Pause at Parallel)|3×3",
          "Pull-Up (Pronated Grip — Full ROM)|3×5",
          "Side Plank (Hip Elevated — Abduction)|3×45s each",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
        ],
        [
          "Conventional Deadlift (Braced Spine)|3 @ 90–93% 1RM",
          "Romanian Deadlift (85% 1RM — Powerlifting)|3×3",
          "Barbell Squat (75–95% 1RM — RPE 7–9)|2×3 @ 85%",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|3×5",
          "Ab Wheel Rollout (Kneeling — Full Extension)|3×8",
          "90-90 Hip Stretch (Internal + External Rotation)",
        ]
      ),
    },

    // ── W · ENDURANCE — VO2max + Lactate Threshold (Seiler 80/20 + Daniels) ──
    en: {
      1: makeDay("Zone 2 Aerobic Base (80% Training Volume)", "en", "w",
        ["Zone 2 Steady-State Run (130–145 BPM)|20 min"],
        ["Zone 2 Steady-State Run (130–145 BPM)|28 min"],
        ["Zone 2 Steady-State Run (130–145 BPM)|36 min"]
      ),
      2: makeDay("Strength Base (Injury Prevention)", "en", "w",
        [
          "Barbell Hip Thrust (Shoulder-Elevated)|3×12",
          "Goblet Squat (Dumbbell)|3×12",
          "Single-Arm Dumbbell Row (Knee on Bench)|3×10 each",
          "Plank (Active — Glutes Squeezed)|3×45s",
          "Dead Bug (Contralateral Limb Extension)|3×8",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
        ],
        [
          "Conventional Deadlift (Braced Spine)|3×8",
          "Bulgarian Split Squat (Rear-Foot Elevated)|3×10",
          "Pull-Up (Pronated Grip — Full ROM)|3×5",
          "Side Plank (Hip Elevated — Abduction)|3×45s each",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)|3×10",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
        ],
        [
          "Conventional Deadlift (Braced Spine)|4×6",
          "Barbell Back Squat (High Bar)|3×8",
          "Pull-Up (Pronated Grip — Full ROM)|3×6",
          "Ab Wheel Rollout (Kneeling — Full Extension)|3×8",
          "Barbell Hip Thrust (Shoulder-Elevated)|3×10",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
        ]
      ),
      3: makeDay("VO2max Intervals (20% High-Intensity)", "en", "w",
        ["Zone 5 VO2max Interval (90–100% HRmax — 4min)|4×4min (3min active rest)"],
        ["Zone 5 VO2max Interval (90–100% HRmax — 4min)|5×4min (2min active rest)"],
        ["Zone 5 VO2max Interval (90–100% HRmax — 4min)|6×4min (90s active rest)"]
      ),
      4: makeDay("Cross-Training + Active Recovery", "en", "w",
        [
          "Rowing Machine (Zone 2 — 22 spm)|20 min",
          "Cycling (Zone 2 — 85–90 rpm Cadence)|15 min",
          "Side Plank (Hip Elevated — Abduction)|3×45s",
          "Dead Bug (Contralateral Limb Extension)|2×8",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
        ],
        [
          "Rowing Machine (Zone 2 — 22 spm)|25 min",
          "Cycling (Zone 2 — 85–90 rpm Cadence)|20 min",
          "Plank (Active — Glutes Squeezed)|3×60s",
          "Ab Wheel Rollout (Kneeling — Full Extension)|3×6",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
        ],
        [
          "Rowing Machine (Zone 2 — 22 spm)|30 min",
          "Cycling (Zone 2 — 85–90 rpm Cadence)|25 min",
          "Ab Wheel Rollout (Kneeling — Full Extension)|3×8",
          "Side Plank (Hip Elevated — Abduction)|3×60s each",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
        ]
      ),
      5: makeDay("Long Run + Recovery Mobility", "en", "w",
        [
          "Long Slow Distance Run (60–75% HRmax — Aerobic Base)|30 min",
          "Plank (Active — Glutes Squeezed)|2×60s",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Cat-Cow (Segmental Spinal Articulation)|10 reps",
        ],
        [
          "Long Slow Distance Run (60–75% HRmax — Aerobic Base)|38 min",
          "Side Plank (Hip Elevated — Abduction)|2×45s",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
        ],
        [
          "Long Slow Distance Run (60–75% HRmax — Aerobic Base)|50 min",
          "Ab Wheel Rollout (Kneeling — Full Extension)|2×8",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Thoracic Extension (Foam Roll + PAILs)",
        ]
      ),
    },

    // ── W · FLEXIBILITY — PNF Stretching + FRC (Weppler & Magnusson 2010) ──
    fl: {
      1: makeDay("Hip + Lower Body Mobility Flow", "fl", "w",
        [
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Butterfly Hip Stretch (Adductor PNF)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
        ],
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
        ],
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Butterfly Hip Stretch (Adductor PNF)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
        ]
      ),
      2: makeDay("Thoracic Spine + Shoulder Mobility", "fl", "w",
        [
          "Cat-Cow (Segmental Spinal Articulation)|10 reps",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Plank (Active — Glutes Squeezed)|45s",
          "Dead Bug (Contralateral Limb Extension)",
        ],
        [
          "Cat-Cow (Segmental Spinal Articulation)|12 reps",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Side Plank (Hip Elevated — Abduction)|45s each",
          "Dead Bug (Contralateral Limb Extension)",
        ],
        [
          "Cat-Cow (Segmental Spinal Articulation)|15 reps",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Ab Wheel Rollout (Kneeling — Full Extension)|5",
          "Dead Bug (Contralateral Limb Extension)",
        ]
      ),
      3: makeDay("Full Body Active Mobility Flow", "fl", "w",
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Cat-Cow (Segmental Spinal Articulation)",
        ],
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
        ],
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
        ]
      ),
      4: makeDay("Restorative Deep Stretch", "fl", "w",
        [
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Butterfly Hip Stretch (Adductor PNF)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "Cat-Cow (Segmental Spinal Articulation)",
        ],
        [
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Butterfly Hip Stretch (Adductor PNF)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "Shoulder CARS (Controlled Articular Rotations)",
        ],
        [
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Butterfly Hip Stretch (Adductor PNF)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
        ]
      ),
      5: makeDay("Performance Mobility Drills", "fl", "w",
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Cat-Cow (Segmental Spinal Articulation)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
        ],
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Butterfly Hip Stretch (Adductor PNF)",
        ],
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Shoulder CARS (Controlled Articular Rotations)",
        ]
      ),
    },

    // ── W · BODY RECOMP — Concurrent Training (Barakat et al. 2020) ──
    br: {
      1: makeDay("Upper Push/Pull Supersets (Compound)", "br", "w",
        [
          "Barbell Bench Press (2-1-2 Tempo)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Overhead Press (Barbell — Strict)",
          "Pull-Up (Pronated Grip — Full ROM)",
          "Plank (Active — Glutes Squeezed)|60s",
          "Face Pull (Rope — External Rotation)|15",
        ],
        [
          "Incline Dumbbell Press (30° — 2-sec Eccentric)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Dumbbell Arnold Press (Full Rotation)",
          "Lat Pulldown (Overhand Wide Grip)",
          "Dead Bug (Contralateral Limb Extension)|10 each",
          "Face Pull (Rope — External Rotation)|15",
        ],
        [
          "Barbell Bench Press (2-1-2 Tempo)|10 superset",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|10 superset",
          "Incline Dumbbell Press (30° — 2-sec Eccentric)|10",
          "Pull-Up (Pronated Grip — Full ROM)|6",
          "Ab Wheel Rollout (Kneeling — Full Extension)|10",
          "Cable Chest Fly (Mid-Cable)|12",
        ]
      ),
      2: makeDay("Lower Body Strength + Conditioning", "br", "w",
        [
          "Conventional Deadlift (Braced Spine)",
          "Barbell Back Squat (High Bar)",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)",
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Box Jump (Maximal Height — Soft Landing)|6",
        ],
        [
          "Conventional Deadlift (Braced Spine)",
          "Barbell Back Squat (High Bar)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Jump Lunge (Alternating Plyometric)",
        ],
        [
          "Sumo Deadlift (Wide Stance)|10 superset",
          "Goblet Squat (Dumbbell)|10 superset",
          "Conventional Deadlift (Braced Spine)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Barbell Hip Thrust (Shoulder-Elevated)",
          "Sprint Interval (20m — Maximum Acceleration)",
        ]
      ),
      3: makeDay("HIIT Metabolic Conditioning", "br", "w",
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Burpee (Full ROM — 10-sec Rest)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Mountain Climbers (Alternating — Explosive)",
          "Side Plank (Hip Elevated — Abduction)|45s each",
          "Jump Rope Double-Under (1-min AMRAP)",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Barbell Thruster (Squat-to-Press)|8",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Burpee (Full ROM — 10-sec Rest)",
          "Dead Bug (Contralateral Limb Extension)|10",
          "Sprint Interval (20m — Maximum Acceleration)",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Barbell Thruster (Squat-to-Press)|10",
          "Jump Rope Double-Under (1-min AMRAP)",
          "Box Jump (Maximal Height — Soft Landing)",
          "Ab Wheel Rollout (Kneeling — Full Extension)|10",
          "Sprint Interval (20m — Maximum Acceleration)",
        ]
      ),
      4: makeDay("Accessory Isolation + Core", "br", "w",
        [
          "Dumbbell Lateral Raise (75° Arm Angle)|15",
          "Cable Kickback (Full Hip Extension)|12 each",
          "Preacher Curl (EZ-Bar — Slow Positive)|12",
          "Cable Tricep Pushdown (Rope — Flare Out)|15",
          "Hanging Knee Raise (Controlled ROT)|12",
          "Plank (Active — Glutes Squeezed)|60s",
        ],
        [
          "Curtsy Lunge (Weighted)|12 each",
          "Cable Kickback (Full Hip Extension)|15 each",
          "Incline Dumbbell Curl (30-sec Eccentric Hold)|10",
          "Overhead Tricep Extension (Cable — Long Head)|12",
          "Side Plank (Hip Elevated — Abduction)|45s each",
          "Dead Bug (Contralateral Limb Extension)|10",
        ],
        [
          "Cable Pull-Through (Hip Hinge)|12 superset",
          "Cable Kickback (Full Hip Extension)|15 superset",
          "Hammer Curl (Cross-Body Variation)|12",
          "EZ-Bar Skull Crusher (Long Head Focus)|10",
          "Ab Wheel Rollout (Kneeling — Full Extension)|10",
          "Hanging Knee Raise (Controlled ROT)|15",
        ]
      ),
    },
  },

  // ══════════════════════════════════════════════════════════════════════
  //  MEN'S PROGRAMS
  // ══════════════════════════════════════════════════════════════════════
  m: {

    // ── M · WEIGHT LOSS — EPOC Maximization (Tabata + Metabolic Resistance) ──
    wl: {
      1: makeDay("Posterior Chain Metabolic HIIT", "wl", "m",
        [
          "Conventional Deadlift (Braced Spine)",
          "Barbell Back Squat (High Bar)",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Box Jump (Maximal Height — Soft Landing)",
          "Mountain Climbers (Alternating — Explosive)",
        ],
        [
          "Conventional Deadlift (Braced Spine)",
          "Barbell Thruster (Squat-to-Press)|8",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Assault Bike Sprint (45-sec Max Effort)",
          "Box Jump (Maximal Height — Soft Landing)",
          "Burpee (Full ROM — 10-sec Rest)",
        ],
        [
          "Sumo Deadlift (Wide Stance)",
          "Barbell Thruster (Squat-to-Press)|10",
          "Power Clean (Hip Extension — Full Pull)|5",
          "Assault Bike Sprint (45-sec Max Effort)",
          "Sprint Interval (20m — Maximum Acceleration)",
          "Battle Rope Alternating Wave (40-sec Work)",
        ]
      ),
      2: makeDay("Upper Body Metcon Circuit", "wl", "m",
        [
          "Pull-Up (Pronated Grip — Full ROM)",
          "Barbell Bench Press (2-1-2 Tempo)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Burpee (Full ROM — 10-sec Rest)",
          "Mountain Climbers (Alternating — Explosive)",
        ],
        [
          "Pull-Up (Pronated Grip — Full ROM)",
          "Incline Dumbbell Press (30° — 2-sec Eccentric)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Assault Bike Sprint (45-sec Max Effort)",
          "Barbell Thruster (Squat-to-Press)|8",
          "Burpee (Full ROM — 10-sec Rest)",
        ],
        [
          "Pull-Up (Pronated Grip — Full ROM)",
          "Barbell Bench Press (2-1-2 Tempo)",
          "Overhead Press (Barbell — Strict)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Assault Bike Sprint (45-sec Max Effort)",
          "Jump Rope Double-Under (1-min AMRAP)",
        ]
      ),
      3: makeDay("Full Body Burn + Power", "wl", "m",
        [
          "Power Clean (Hip Extension — Full Pull)|5",
          "Goblet Squat (Dumbbell)",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Jump Rope Double-Under (1-min AMRAP)",
          "Plank (Active — Glutes Squeezed)|60s",
        ],
        [
          "Power Clean (Hip Extension — Full Pull)|5",
          "Barbell Thruster (Squat-to-Press)|8",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Assault Bike Sprint (45-sec Max Effort)",
          "Sprint Interval (20m — Maximum Acceleration)",
          "Ab Wheel Rollout (Kneeling — Full Extension)|8",
        ],
        [
          "Power Clean (Hip Extension — Full Pull)|5",
          "Barbell Thruster (Squat-to-Press)|10",
          "Conventional Deadlift (Braced Spine)",
          "Assault Bike Sprint (45-sec Max Effort)",
          "Box Jump (Maximal Height — Soft Landing)",
          "Ab Wheel Rollout (Kneeling — Full Extension)|10",
        ]
      ),
      4: makeDay("Sprint HIIT + Core", "wl", "m",
        [
          "Sprint Interval (20m — Maximum Acceleration)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "High Knees (Sprint Mechanics — 30s)",
          "Mountain Climbers (Alternating — Explosive)",
          "Plank (Active — Glutes Squeezed)|60s",
          "Dead Bug (Contralateral Limb Extension)|10 each",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Sprint Interval (20m — Maximum Acceleration)",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Jump Rope Double-Under (1-min AMRAP)",
          "Ab Wheel Rollout (Kneeling — Full Extension)",
          "Side Plank (Hip Elevated — Abduction)|45s each",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Sprint Interval (20m — Maximum Acceleration)",
          "Lateral Shuffle (Resist-Band — 15m)",
          "Box Jump (Maximal Height — Soft Landing)",
          "Ab Wheel Rollout (Kneeling — Full Extension)",
          "Hanging Knee Raise (Controlled ROT)|15",
        ]
      ),
    },

    // ── M · MUSCLE BUILDING — Hypertrophy (Schoenfeld 2010 + Volume Landmarks) ──
    mb: {
      1: makeDay("Chest + Triceps (Push Day A)", "mb", "m",
        [
          "Barbell Bench Press (2-1-2 Tempo)",
          "Incline Dumbbell Press (30° — 2-sec Eccentric)",
          "Cable Chest Fly (Mid-Cable)",
          "Close-Grip Bench Press (Tricep Focus)",
          "EZ-Bar Skull Crusher (Long Head Focus)",
          "Cable Tricep Pushdown (Rope — Flare Out)",
        ],
        [
          "Barbell Bench Press (2-1-2 Tempo)",
          "Incline Dumbbell Press (30° — 2-sec Eccentric)",
          "Wide-Grip Push-Up (3-sec Eccentric)|AMRAP",
          "Cable Chest Fly (Mid-Cable)",
          "EZ-Bar Skull Crusher (Long Head Focus)",
          "Overhead Tricep Extension (Cable — Long Head)",
        ],
        [
          "Barbell Bench Press (2-1-2 Tempo)",
          "Incline Dumbbell Press (30° — 2-sec Eccentric)",
          "Cable Chest Fly (Mid-Cable)",
          "Floor Press (Barbell — Tricep Lockout)|6",
          "EZ-Bar Skull Crusher (Long Head Focus)",
          "Overhead Tricep Extension (Cable — Long Head)",
        ]
      ),
      2: makeDay("Back + Biceps (Pull Day A)", "mb", "m",
        [
          "Pull-Up (Pronated Grip — Full ROM)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Lat Pulldown (Overhand Wide Grip)",
          "Seated Cable Row (Neutral Grip — 2-sec Hold)",
          "Preacher Curl (EZ-Bar — Slow Positive)",
          "Incline Dumbbell Curl (30-sec Eccentric Hold)",
        ],
        [
          "Pull-Up (Pronated Grip — Full ROM)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Lat Pulldown (Overhand Wide Grip)",
          "Single-Arm Dumbbell Row (Knee on Bench)",
          "Preacher Curl (EZ-Bar — Slow Positive)",
          "Hammer Curl (Cross-Body Variation)",
        ],
        [
          "Pull-Up (Pronated Grip — Full ROM)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Seated Cable Row (Neutral Grip — 2-sec Hold)",
          "Lat Pulldown (Overhand Wide Grip)",
          "Incline Dumbbell Curl (30-sec Eccentric Hold)",
          "Hammer Curl (Cross-Body Variation)",
        ]
      ),
      3: makeDay("Legs (Squat + Hinge Emphasis)", "mb", "m",
        [
          "Barbell Back Squat (High Bar)",
          "Conventional Deadlift (Braced Spine)",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Leg Press (Feet High — 4-sec Negative)",
          "Dead Bug (Contralateral Limb Extension)",
        ],
        [
          "Barbell Back Squat (High Bar)",
          "Conventional Deadlift (Braced Spine)",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Goblet Squat (Dumbbell)|15 finisher",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
        ],
        [
          "Barbell Back Squat (High Bar)",
          "Sumo Deadlift (Wide Stance)",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)",
          "Pause Squat (3-sec Pause at Parallel)|5",
          "Leg Press (Feet High — 4-sec Negative)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
        ]
      ),
      4: makeDay("Shoulders (Medial + Rear Delt Focus)", "mb", "m",
        [
          "Overhead Press (Barbell — Strict)",
          "Dumbbell Lateral Raise (75° Arm Angle)",
          "Dumbbell Arnold Press (Full Rotation)",
          "Face Pull (Rope — External Rotation)",
          "Cable Chest Fly (Mid-Cable)|12 front delt",
          "Side Plank (Hip Elevated — Abduction)|45s each",
        ],
        [
          "Overhead Press (Barbell — Strict)",
          "Dumbbell Lateral Raise (75° Arm Angle)",
          "Face Pull (Rope — External Rotation)",
          "Dumbbell Arnold Press (Full Rotation)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Plank (Active — Glutes Squeezed)|60s",
        ],
        [
          "Overhead Press (Barbell — Strict)",
          "Dumbbell Lateral Raise (75° Arm Angle)",
          "Barbell Bench Press (2-1-2 Tempo)|close for front delt",
          "Face Pull (Rope — External Rotation)",
          "Dumbbell Arnold Press (Full Rotation)",
          "Ab Wheel Rollout (Kneeling — Full Extension)",
        ]
      ),
      5: makeDay("Arms + Core (Volume Block)", "mb", "m",
        [
          "Preacher Curl (EZ-Bar — Slow Positive)",
          "Incline Dumbbell Curl (30-sec Eccentric Hold)",
          "Close-Grip Bench Press (Tricep Focus)",
          "Cable Tricep Pushdown (Rope — Flare Out)",
          "Ab Wheel Rollout (Kneeling — Full Extension)",
          "Hanging Knee Raise (Controlled ROT)",
        ],
        [
          "Hammer Curl (Cross-Body Variation)",
          "Preacher Curl (EZ-Bar — Slow Positive)",
          "EZ-Bar Skull Crusher (Long Head Focus)",
          "Overhead Tricep Extension (Cable — Long Head)",
          "Dead Bug (Contralateral Limb Extension)",
          "Hanging Knee Raise (Controlled ROT)",
        ],
        [
          "Incline Dumbbell Curl (30-sec Eccentric Hold)",
          "Hammer Curl (Cross-Body Variation)",
          "EZ-Bar Skull Crusher (Long Head Focus)",
          "Overhead Tricep Extension (Cable — Long Head)",
          "Close-Grip Bench Press (Tricep Focus)|6",
          "Ab Wheel Rollout (Kneeling — Full Extension)",
        ]
      ),
    },

    // ── M · STRENGTH — Neural Strength + Powerlifting (Westside/Sheiko/RPE) ──
    st: {
      1: makeDay("Squat Day (Percentage + Accessory)", "st", "m",
        [
          "Barbell Squat (75–95% 1RM — RPE 7–9)|5 @ 70–75%",
          "Romanian Deadlift (85% 1RM — Powerlifting)|3×8 accessory",
          "Leg Press (Feet High — 4-sec Negative)|3×10",
          "Dead Bug (Contralateral Limb Extension)|3×8",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
        ],
        [
          "Barbell Squat (75–95% 1RM — RPE 7–9)|4 @ 80–85%",
          "Pause Squat (3-sec Pause at Parallel)|3×3",
          "Romanian Deadlift (85% 1RM — Powerlifting)|3×5",
          "Bulgarian Split Squat (Rear-Foot Elevated)|3×6",
          "Ab Wheel Rollout (Kneeling — Full Extension)|3×8",
          "90-90 Hip Stretch (Internal + External Rotation)",
        ],
        [
          "Barbell Squat (75–95% 1RM — RPE 7–9)|3 @ 90–95%",
          "Pause Squat (3-sec Pause at Parallel)|3×2",
          "Conventional Deadlift (Braced Spine)|2×3 @ 85%",
          "Barbell Hip Thrust (Shoulder-Elevated)|3×6",
          "Hanging Knee Raise (Controlled ROT)|3×12",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
        ]
      ),
      2: makeDay("Press Day (Bench + Accessory)", "st", "m",
        [
          "Barbell Bench Press (85–95% 1RM — Competition Grip)|5 @ 70–75%",
          "Overhead Press (Barbell — Strict)|4×5",
          "Pull-Up (Pronated Grip — Full ROM)|4×5",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|4×6",
          "Face Pull (Rope — External Rotation)|4×15",
          "Close-Grip Bench Press (Tricep Focus)|3×8",
        ],
        [
          "Barbell Bench Press (85–95% 1RM — Competition Grip)|4 @ 82–85%",
          "Floor Press (Barbell — Tricep Lockout)|3×4",
          "Pull-Up (Pronated Grip — Full ROM)|4×4",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|4×5",
          "Face Pull (Rope — External Rotation)|4×15",
          "EZ-Bar Skull Crusher (Long Head Focus)|3×8",
        ],
        [
          "Barbell Bench Press (85–95% 1RM — Competition Grip)|3 @ 90–93%",
          "Floor Press (Barbell — Tricep Lockout)|3×3",
          "Barbell Overhead Press (85% 1RM — Strict)|3×3",
          "Pull-Up (Pronated Grip — Full ROM)|3×5",
          "Seated Cable Row (Neutral Grip — 2-sec Hold)|3×8",
          "Overhead Tricep Extension (Cable — Long Head)|3×10",
        ]
      ),
      3: makeDay("Deadlift Day + Posterior Chain", "st", "m",
        [
          "Conventional Deadlift (Braced Spine)|5 @ 70–75%",
          "Romanian Deadlift (85% 1RM — Powerlifting)|3×6",
          "Power Clean (Hip Extension — Full Pull)|3×5",
          "Pull-Up (Pronated Grip — Full ROM)|3×5",
          "Plank (Active — Glutes Squeezed)|3×60s",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
        ],
        [
          "Conventional Deadlift (Braced Spine)|4 @ 80–85%",
          "Romanian Deadlift (85% 1RM — Powerlifting)|3×5",
          "Power Clean (Hip Extension — Full Pull)|3×5",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|3×5",
          "Ab Wheel Rollout (Kneeling — Full Extension)|3×8",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
        ],
        [
          "Conventional Deadlift (Braced Spine)|3 @ 90–93%",
          "Sumo Deadlift (Wide Stance)|3×3 @ 85%",
          "Power Clean (Hip Extension — Full Pull)|4×4",
          "Pull-Up (Pronated Grip — Full ROM)|3×6",
          "Hanging Knee Raise (Controlled ROT)|3×12",
          "Thoracic Extension (Foam Roll + PAILs)",
        ]
      ),
      4: makeDay("Explosive Power + CNS Development", "st", "m",
        [
          "Power Clean (Hip Extension — Full Pull)|5×5",
          "Overhead Press (Barbell — Strict)|4×5",
          "Box Jump (Maximal Height — Soft Landing)|4×5",
          "Battle Rope Alternating Wave (40-sec Work)|3 rounds",
          "Plank (Active — Glutes Squeezed)|3×60s",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
        ],
        [
          "Power Clean (Hip Extension — Full Pull)|5×4",
          "Barbell Overhead Press (85% 1RM — Strict)|4×4",
          "Sprint Interval (20m — Maximum Acceleration)|6 sprints",
          "Battle Rope Alternating Wave (40-sec Work)|4 rounds",
          "Ab Wheel Rollout (Kneeling — Full Extension)|3×10",
          "90-90 Hip Stretch (Internal + External Rotation)",
        ],
        [
          "Power Clean (Hip Extension — Full Pull)|5×3 @ 85%",
          "Barbell Squat (75–95% 1RM — RPE 7–9)|3×3 @ 90%",
          "Sprint Interval (20m — Maximum Acceleration)|8 sprints",
          "Barbell Bench Press (85–95% 1RM — Competition Grip)|3×3",
          "Hanging Knee Raise (Controlled ROT)|3×15",
          "Shoulder CARS (Controlled Articular Rotations)",
        ]
      ),
    },

    // ── M · ENDURANCE — VO2max + Seiler 80/20 Polarized Training ──
    en: {
      1: makeDay("Zone 2 Aerobic Base Run", "en", "m",
        ["Zone 2 Steady-State Run (130–145 BPM)|20 min"],
        ["Zone 2 Steady-State Run (130–145 BPM)|28 min"],
        ["Zone 2 Steady-State Run (130–145 BPM)|36 min"]
      ),
      2: makeDay("Strength Maintenance (Injury Prevention)", "en", "m",
        [
          "Barbell Back Squat (High Bar)|3×8",
          "Barbell Bench Press (2-1-2 Tempo)|3×8",
          "Pull-Up (Pronated Grip — Full ROM)|3×6",
          "Plank (Active — Glutes Squeezed)|3×60s",
          "Conventional Deadlift (Braced Spine)|3×5",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
        ],
        [
          "Barbell Back Squat (High Bar)|3×8",
          "Overhead Press (Barbell — Strict)|3×8",
          "Pull-Up (Pronated Grip — Full ROM)|3×8",
          "Side Plank (Hip Elevated — Abduction)|3×45s each",
          "Romanian Deadlift (85% 1RM — Powerlifting)|3×8 moderate",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
        ],
        [
          "Barbell Back Squat (High Bar)|4×6",
          "Barbell Bench Press (2-1-2 Tempo)|3×8",
          "Pull-Up (Pronated Grip — Full ROM)|4×5",
          "Ab Wheel Rollout (Kneeling — Full Extension)|3×8",
          "Conventional Deadlift (Braced Spine)|3×5",
          "Thoracic Extension (Foam Roll + PAILs)",
        ]
      ),
      3: makeDay("VO2max Intervals (4×4 Norwegian Protocol)", "en", "m",
        ["Zone 5 VO2max Interval (90–100% HRmax — 4min)|4×4min (3min active rest)"],
        ["Zone 5 VO2max Interval (90–100% HRmax — 4min)|5×4min (2min active rest)"],
        ["Zone 5 VO2max Interval (90–100% HRmax — 4min)|6×4min (90s active rest)"]
      ),
      4: makeDay("Lactate Threshold Tempo Run", "en", "m",
        ["Tempo Run (Lactate Threshold — 80–85% HRmax)|20 min continuous"],
        ["Tempo Run (Lactate Threshold — 80–85% HRmax)|25 min continuous"],
        ["Tempo Run (Lactate Threshold — 80–85% HRmax)|30 min continuous"]
      ),
      5: makeDay("Long Run + Mobility Recovery", "en", "m",
        [
          "Long Slow Distance Run (60–75% HRmax — Aerobic Base)|35 min",
          "Plank (Active — Glutes Squeezed)|2×60s",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Cat-Cow (Segmental Spinal Articulation)|10 reps",
        ],
        [
          "Long Slow Distance Run (60–75% HRmax — Aerobic Base)|42 min",
          "Ab Wheel Rollout (Kneeling — Full Extension)|2×6",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
          "Thoracic Extension (Foam Roll + PAILs)",
        ],
        [
          "Long Slow Distance Run (60–75% HRmax — Aerobic Base)|55 min",
          "Hanging Knee Raise (Controlled ROT)|2×10",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
        ]
      ),
    },

    // ── M · FLEXIBILITY — PNF + FRC + Athletic Mobility (Often neglected by men) ──
    fl: {
      1: makeDay("Hip Flexor + Lower Body Mobility", "fl", "m",
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
        ],
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "Butterfly Hip Stretch (Adductor PNF)",
        ],
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "Butterfly Hip Stretch (Adductor PNF)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
        ]
      ),
      2: makeDay("Thoracic + Shoulder Mobility (Neglected by Men)", "fl", "m",
        [
          "Thoracic Extension (Foam Roll + PAILs)",
          "Cat-Cow (Segmental Spinal Articulation)|12 reps",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Face Pull (Rope — External Rotation)|3×15",
          "Dead Bug (Contralateral Limb Extension)|3×8",
        ],
        [
          "Thoracic Extension (Foam Roll + PAILs)",
          "Cat-Cow (Segmental Spinal Articulation)|15 reps",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Plank (Active — Glutes Squeezed)|60s",
          "Side Plank (Hip Elevated — Abduction)|45s each",
        ],
        [
          "Thoracic Extension (Foam Roll + PAILs)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Cat-Cow (Segmental Spinal Articulation)|15 reps",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Ab Wheel Rollout (Kneeling — Full Extension)|8",
          "Dead Bug (Contralateral Limb Extension)|10",
        ]
      ),
      3: makeDay("Athletic Movement Prep + Agility", "fl", "m",
        [
          "Jump Rope Double-Under (1-min AMRAP)",
          "Lateral Shuffle (Resist-Band — 15m)",
          "High Knees (Sprint Mechanics — 30s)",
          "Box Jump (Maximal Height — Soft Landing)|5",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
        ],
        [
          "Jump Rope Double-Under (1-min AMRAP)",
          "Sprint Interval (20m — Maximum Acceleration)|4",
          "Lateral Shuffle (Resist-Band — 15m)",
          "Box Jump (Maximal Height — Soft Landing)|5",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)|3 rounds",
          "Sprint Interval (20m — Maximum Acceleration)|6",
          "Lateral Shuffle (Resist-Band — 15m)",
          "Box Jump (Maximal Height — Soft Landing)|6",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
        ]
      ),
      4: makeDay("Deep Tissue Release + Full Mobility", "fl", "m",
        [
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Butterfly Hip Stretch (Adductor PNF)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
          "Cat-Cow (Segmental Spinal Articulation)",
        ],
        [
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Butterfly Hip Stretch (Adductor PNF)",
          "Spinal Rotation Stretch (Supine Knees Bent)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
        ],
        [
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Hamstring PNF (Supine — Contract-Relax 3×30)",
        ]
      ),
      5: makeDay("Performance Recovery + Squat Prep", "fl", "m",
        [
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Standing Hip Flexor PNF Stretch (Contract-Relax)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Plank (Active — Glutes Squeezed)|60s",
        ],
        [
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Pigeon Pose PNF (External Rotation — 60–90 sec)",
          "Dead Bug (Contralateral Limb Extension)",
        ],
        [
          "Ankle Dorsiflexion Mobilization (Wall Drill)",
          "World's Greatest Stretch (Dynamic — 5 Reps)",
          "90-90 Hip Stretch (Internal + External Rotation)",
          "Thoracic Extension (Foam Roll + PAILs)",
          "Shoulder CARS (Controlled Articular Rotations)",
          "Ab Wheel Rollout (Kneeling — Full Extension)",
        ]
      ),
    },

    // ── M · BODY RECOMP — Concurrent Training (Barakat et al. 2020) ──
    br: {
      1: makeDay("Upper Push/Pull Supersets (Compound)", "br", "m",
        [
          "Barbell Bench Press (2-1-2 Tempo)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Overhead Press (Barbell — Strict)",
          "Pull-Up (Pronated Grip — Full ROM)",
          "Face Pull (Rope — External Rotation)|15",
          "Plank (Active — Glutes Squeezed)|60s",
        ],
        [
          "Incline Dumbbell Press (30° — 2-sec Eccentric)",
          "Barbell Bent-Over Row (Overhand Grip — 45°)",
          "Dumbbell Arnold Press (Full Rotation)",
          "Lat Pulldown (Overhand Wide Grip)",
          "Face Pull (Rope — External Rotation)|15",
          "Dead Bug (Contralateral Limb Extension)|10",
        ],
        [
          "Barbell Bench Press (2-1-2 Tempo)|10 superset",
          "Barbell Bent-Over Row (Overhand Grip — 45°)|10 superset",
          "Overhead Press (Barbell — Strict)|8",
          "Pull-Up (Pronated Grip — Full ROM)|8",
          "Close-Grip Bench Press (Tricep Focus)|8",
          "Ab Wheel Rollout (Kneeling — Full Extension)",
        ]
      ),
      2: makeDay("Lower Body Strength + Power", "br", "m",
        [
          "Conventional Deadlift (Braced Spine)",
          "Barbell Back Squat (High Bar)",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Box Jump (Maximal Height — Soft Landing)|6",
        ],
        [
          "Conventional Deadlift (Braced Spine)",
          "Barbell Back Squat (High Bar)",
          "Power Clean (Hip Extension — Full Pull)|5",
          "Dumbbell Romanian Deadlift (3-sec Eccentric)",
          "Kettlebell Swing (Hip-Hinge Explosive)",
          "Sprint Interval (20m — Maximum Acceleration)",
        ],
        [
          "Conventional Deadlift (Braced Spine)|10 superset",
          "Goblet Squat (Dumbbell)|12 superset",
          "Sumo Deadlift (Wide Stance)",
          "Bulgarian Split Squat (Rear-Foot Elevated)",
          "Power Clean (Hip Extension — Full Pull)|5",
          "Box Jump (Maximal Height — Soft Landing)",
        ]
      ),
      3: makeDay("HIIT Metabolic Conditioning", "br", "m",
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Barbell Thruster (Squat-to-Press)|8",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Burpee (Full ROM — 10-sec Rest)",
          "Mountain Climbers (Alternating — Explosive)",
          "Jump Rope Double-Under (1-min AMRAP)",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Power Clean (Hip Extension — Full Pull)|5",
          "Battle Rope Alternating Wave (40-sec Work)",
          "Barbell Thruster (Squat-to-Press)|8",
          "Sprint Interval (20m — Maximum Acceleration)",
          "Burpee (Full ROM — 10-sec Rest)",
        ],
        [
          "Assault Bike Sprint (45-sec Max Effort)",
          "Barbell Thruster (Squat-to-Press)|10",
          "Sprint Interval (20m — Maximum Acceleration)",
          "Box Jump (Maximal Height — Soft Landing)",
          "Ab Wheel Rollout (Kneeling — Full Extension)|10",
          "Hanging Knee Raise (Controlled ROT)|15",
        ]
      ),
      4: makeDay("Accessory + Core (Volume Block)", "br", "m",
        [
          "Incline Dumbbell Curl (30-sec Eccentric Hold)|12",
          "Preacher Curl (EZ-Bar — Slow Positive)|12",
          "EZ-Bar Skull Crusher (Long Head Focus)|12",
          "Cable Tricep Pushdown (Rope — Flare Out)|15",
          "Hanging Knee Raise (Controlled ROT)|12",
          "Plank (Active — Glutes Squeezed)|60s",
        ],
        [
          "Hammer Curl (Cross-Body Variation)|12",
          "Incline Dumbbell Curl (30-sec Eccentric Hold)|10",
          "Overhead Tricep Extension (Cable — Long Head)|12",
          "EZ-Bar Skull Crusher (Long Head Focus)|10",
          "Side Plank (Hip Elevated — Abduction)|45s each",
          "Dead Bug (Contralateral Limb Extension)|10",
        ],
        [
          "Preacher Curl (EZ-Bar — Slow Positive)|10 superset",
          "Cable Tricep Pushdown (Rope — Flare Out)|12 superset",
          "Incline Dumbbell Curl (30-sec Eccentric Hold)|10",
          "Overhead Tricep Extension (Cable — Long Head)|12",
          "Ab Wheel Rollout (Kneeling — Full Extension)|10",
          "Hanging Knee Raise (Controlled ROT)|15",
        ]
      ),
    },
  },
};

export const SLUG_MAP: Record<string, string> = {
  wl: "wl", mb: "mb", st: "st", en: "en", fl: "fl", br: "br",
};
