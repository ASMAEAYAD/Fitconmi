export type Exd = { name: string; muscle: string; sets: number; reps: string; explanation: string; img: string };
export type DayD = { name: string; exercises: { A: Exd[]; B: Exd[]; C: Exd[] } };

const PFX = "https://images.unsplash.com/";
const SFX = "?w=400&q=80";

const IMGS: Record<string, string> = {
  sq: "photo-1567598508481-65985588e295",
  dl: "photo-1598971639058-fab3c3109a37",
  ub: "photo-1571019613454-1cb2f99b2d8b",
  bk: "photo-1526506118085-60ce8714f8c5",
  co: "photo-1518611012118-696072aa579a",
  rn: "photo-1461896836934-ffe607ba8211",
  gl: "photo-1574680096145-d05b474e2155",
  sh: "photo-1583454155184-870a1f63aebc",
  fx: "photo-1518310383802-640c2de311b2",
  kb: "photo-1607962837359-5e7e89f86776",
};

type DictItem = { muscle: string; imgKey: string; explW: string; explM: string };
const DICT: Record<string, DictItem> = {
  "Hip Thrust": { muscle: "Glutes", imgKey: "gl", explW: "EMG studies show hip thrusts activate gluteus maximus 3x more than squats. Essential for female fat loss and glute development.", explM: "Directly loads the gluteus maximus in terminal hip extension. Heavy loading maximizes fast-twitch fiber recruitment for posterior chain power." },
  "Barbell Hip Thrust": { muscle: "Glutes", imgKey: "gl", explW: "The gold standard for glute development. With added barbell load, activates 95% of gluteus maximus MVC (maximum voluntary contraction).", explM: "Crucial for explosive power and deadlift lockout strength. Heavy loads in terminal extension maximize glute hypertrophy." },
  "Weighted Hip Thrust": { muscle: "Glutes", imgKey: "gl", explW: "Progressive overload on the glutes triggers serious adaptation. Shapes and lifts the glute muscles exceptionally well.", explM: "Progressive overload directly loads the gluteus maximus, heavily contributing to lower body power metrics." },
  "Romanian Deadlift": { muscle: "Hamstrings & Glutes", imgKey: "dl", explW: "Targets the posterior chain, improves hamstring flexibility while burning significant calories through large muscle group activation.", explM: "Eccentric deficit training that aggressively loads the hamstrings. Critical for preventing athletic injuries and driving lower body mass." },
  "Sumo Deadlift": { muscle: "Inner Thighs & Glutes", imgKey: "dl", explW: "The wide stance of sumo deadlift places greater emphasis on hip adductors and glutes — key areas for female body recomposition.", explM: "A highly mechanical lift that utilizes leverage. Activates adductor mass and drives immense lower body strength." },
  "Single-Leg Deadlift": { muscle: "Balance & Posterior Chain", imgKey: "dl", explW: "Unilateral hinge pattern challenges proprioception while maximally loading each glute independently. Advanced fat-burning compound movement.", explM: "Unilateral stability movement that targets hamstring asymmetries. Prevents leakage of force during bilateral deadlifts." },
  "Lateral Lunge": { muscle: "Inner Thighs & Quads", imgKey: "sq", explW: "Activates the often-neglected hip adductors. Women have wider hips making this exercise especially effective for thigh toning.", explM: "Builds frontal plane stability and adductor strength. An essential supplemental movement for athletic performance." },
  "Curtsy Lunge": { muscle: "Glutes & Hip Abductors", imgKey: "sq", explW: "Cross-body movement pattern uniquely targets the gluteus medius — responsible for the side glute curve women often seek.", explM: "Strengthens the gluteus medius and improves hip stability, directly transferring to squat mechanics and knee health." },
  "Jump Lunge": { muscle: "Quads, Glutes & Cardio", imgKey: "sq", explW: "Alternating plyometric lunges maintain elevated heart rate while building explosive leg power. Burns 12-15 calories per minute.", explM: "An explosive plyometric movement driving unilateral leg power output. Generates high EPOC through large muscle demand." },
  "Bulgarian Split Squat": { muscle: "Quads & Glutes", imgKey: "sq", explW: "Unilateral movement that corrects muscle imbalances. Studies show 40% greater glute activation vs bilateral squats.", explM: "A savage unilateral builder for quads and glutes. Allows immense mechanical tension without loading the lumbar spine." },
  "Cable Kickback": { muscle: "Glutes", imgKey: "gl", explW: "Isolates the gluteus maximus through full hip extension. The cable provides constant tension unlike bodyweight variations.", explM: "Isolation movement focused on full glute extension. Provides metabolic stress to the gluteal muscles for complete hypertrophy." },
  "Resistance Band Kickback": { muscle: "Glutes", imgKey: "gl", explW: "Progressive resistance through full range of motion. The band's accommodating resistance matches the strength curve of hip extension.", explM: "Accommodating resistance matches the strength curve. Useful for high-rep pump work and glute activation." },
  "Cable Pull-Through": { muscle: "Glutes & Hamstrings", imgKey: "dl", explW: "Hip hinge movement with horizontal resistance vector — uniquely loads the glutes at peak contraction unlike vertical loading exercises.", explM: "Trains the hinge mechanism with a horizontal force vector. Reinforces glute lockout mechanics safely." },
  "Plank": { muscle: "Core", imgKey: "co", explW: "Activates transverse abdominis — the deep core muscle that creates the 'flat stomach' effect. More effective than crunches for women.", explM: "Anti-extension isometric hold. Develops rigorous core rigidity essential for squat and deadlift bracing safety." },
  "Side Plank": { muscle: "Obliques & Core", imgKey: "co", explW: "Targets the lateral core and hip abductors simultaneously. Essential for waist definition and spinal stability in women.", explM: "Develops lateral core stability and strengthens the quadratus lumborum. Prevents spinal rotation under heavy unilateral loads." },
  "Plank with Reach": { muscle: "Core Stability", imgKey: "co", explW: "Anti-rotation core challenge. Extending one arm disrupts center of mass, forcing deeper core stabilizer engagement.", explM: "Anti-rotation isometric drill. Requires massive core recruitment to prevent spinal twist while a limb is elevated." },
  "Jump Squat": { muscle: "Full Body/Cardio", imgKey: "sq", explW: "Plyometric movement elevates heart rate rapidly, increasing EPOC (afterburn effect) for up to 24 hours post-workout.", explM: "Develops rate of force development (RFD). Fast-twitch muscle fiber recruitment maximizes athletic explosiveness." },
  "Box Jump": { muscle: "Power & Cardio", imgKey: "rn", explW: "Explosive plyometric that develops fast-twitch muscle fibers. Increases metabolic rate for 36+ hours post-exercise.", explM: "Essential tool for developing leg power. Enhances the stretch-shortening cycle for greater vertical leap and athletic dominance." },
  "Depth Jump": { muscle: "Explosive Power", imgKey: "rn", explW: "Advanced plyometric using the stretch-shortening cycle to maximize power output and metabolic demand.", explM: "The pinnacle of plyometric training. Maximizes the stretch reflex and neural output for elite athletic power." },
  "Jump Rope": { muscle: "Cardio/EPOC", imgKey: "rn", explW: "Most calorie-dense cardio exercise at 15-20 cal/min. Improves coordination, bone density, and cardiovascular efficiency.", explM: "Intense cardiovascular conditioning that simultaneously develops ankle stiffness and calf endurance for athletic resilience." },
  "Burpees": { muscle: "Full Body", imgKey: "ub", explW: "Combines squat, plank and jump into one movement. Elevates heart rate to 90%+ max, creating maximum EPOC effect.", explM: "Total-body anaerobic conditioning. Rapidly depletes glycogen stores and pushes metabolic conditioning to its limits." },
  "Mountain Climbers": { muscle: "Core & Cardio", imgKey: "co", explW: "Dynamic core exercise that maintains elevated heart rate. Targets rectus abdominis while burning 8-10 calories per minute.", explM: "A dynamic plank variation that crushes the core while sustaining a massive cardiovascular demand." },
  "High Knees": { muscle: "Hip Flexors & Cardio", imgKey: "rn", explW: "Running in place at maximum effort. Improves hip flexor strength critical for women's posture and lower back health.", explM: "High-intensity sprinting drill that overloads the hip flexors and sustains max aerobic output." },
  "Lateral Shuffles": { muscle: "Agility & Legs", imgKey: "rn", explW: "Side-to-side movement activates hip abductors and improves frontal plane stability — often undertrained in women.", explM: "Builds athletic agility in the frontal plane. Conditions the adductors and abductors for rapid change of direction." },
  "Sprint Intervals": { muscle: "VO2 Max", imgKey: "rn", explW: "Maximum effort sprints elevate VO2 max — the strongest predictor of longevity and metabolic health.", explM: "The ultimate metabolic igniter. Sprints release massive amounts of testosterone and GH while shredding body fat." },
  "Squat Jumps": { muscle: "Quads & Power", imgKey: "sq", explW: "Explosive power movement that fires the glutes out of the hole, triggering intense calorie burn.", explM: "Trains explosive lower body force generation. Hits the quads and glutes with heavy eccentric demands." },
  "Skater Jumps": { muscle: "Lateral Power", imgKey: "rn", explW: "Mimics ice skating to target the glute medius and outer thighs, sculpting the legs while driving heart rate up.", explM: "Unilateral plyometric drill demanding extreme lateral power and knee stability. Crucial for field athletes." },
  "Tuck Jumps": { muscle: "Explosive Cardio", imgKey: "rn", explW: "High-intensity jump requiring core strength to bring knees to chest, burning maximal calories.", explM: "High-demand plyometric drill. Forces extreme rapid core contraction and lower body power." },
  "Push-Ups": { muscle: "Chest & Triceps", imgKey: "ub", explW: "Compound pushing movement. Women often neglect chest training — it lifts and firms the chest by strengthening pectoralis major beneath breast tissue.", explM: "Functional push movement that engages the core and serratus anterior. A high-rep finisher to flush the chest with blood." },
  "Dumbbell Row": { muscle: "Back & Biceps", imgKey: "bk", explW: "Pulls the shoulder blades together, counteracting forward posture from daily life. Women with desk jobs critically need this movement.", explM: "Corrects muscular imbalances and drives serious back thickness. A heavy compound pull that supports bench press stability." },
  "Shoulder Press": { muscle: "Deltoids", imgKey: "sh", explW: "Develops the medial deltoid creating the 'capped shoulder' look that creates the visual illusion of a smaller waist.", explM: "Builds massive shoulder width and pressing power. Engages the core heavily to stabilize vertical loads." },
  "Lat Pulldown": { muscle: "Back Width", imgKey: "bk", explW: "Develops latissimus dorsi — the muscle that creates the V-taper. In women, this creates hourglass proportions.", explM: "The primary builder of lat width. A wide back creates the ultimate aesthetic taper and aids in deadlift stability." },
  "Tricep Dips": { muscle: "Triceps", imgKey: "ub", explW: "Targets the tricep — the muscle comprising 60% of upper arm volume. Women store more fat here due to estrogen, making direct training essential.", explM: "Compound tricep movement using bodyweight/added weight. The long head of the tricep is fully stretched at the top — critical for maximum mass development." },
  "Bicep Curl": { muscle: "Biceps", imgKey: "ub", explW: "The long head of the bicep is often underdeveloped in women. Curl variations prevent the 'soft arm' appearance.", explM: "Isolates the biceps brachii for maximal hypertrophy. Constant tension builds peak aesthetic arm size." },
  "Cable Fly": { muscle: "Chest Isolation", imgKey: "ub", explW: "Provides constant tension to the chest muscles, lifting the bust while avoiding excessive stress on the shoulder joints.", explM: "Cables maintain constant tension throughout the full range of motion unlike dumbbells — maximizing time under tension for hypertrophy." },
  "Face Pull": { muscle: "Rear Delts", imgKey: "sh", explW: "Essential for posture correction. Strengthens the muscles that pull the shoulders back, creating a proud, confident stance.", explM: "Non-negotiable for shoulder health. Balances out heavy pressing by targeting the external rotators and rear deltoids." },
  "Overhead Tricep Extension": { muscle: "Triceps Long Head", imgKey: "ub", explW: "Lengthens the tricep fully to tone the back of the arms, specifically addressing typical female trouble areas.", explM: "Isolation movement that fully lengthens the long head of the tricep. Lengthened-position training is superior for muscle hypertrophy." },
  "Goblet Squat": { muscle: "Quads & Glutes", imgKey: "sq", explW: "Front-loading the weight forces upright posture and deep core engagement, making it highly effective for lower body toning.", explM: "A fantastic anterior-loaded quad builder. Demands intense core bracing and perfects deep squat mechanics." },
  "Incline Press": { muscle: "Upper Chest", imgKey: "ub", explW: "Targets the upper pectoral muscles, lifting the chest aesthetically while tightening the upper torso safely.", explM: "The upper chest (clavicular head of pectoralis major) is often underdeveloped. Incline angle shifts emphasis to create the 'shelf' appearance at the collarbone." },
  "Tricep Pushdown": { muscle: "Triceps", imgKey: "ub", explW: "Firms the triceps effectively with cables, providing constant resistance to tighten the back of the arms.", explM: "Isolates the lateral head of the triceps. Ideal for high-rep pump work and building the horseshoe aesthetic." },
  "Barbell Squat": { muscle: "Quads & Glutes", imgKey: "sq", explW: "The ultimate lower body builder. Loading the spine increases bone mineral density, combatting osteoporosis in women.", explM: "85%+ neural adaptation. High testosterone release from heavy loads makes this the king of overall muscle and strength." },
  "Deadlift": { muscle: "Full Body", imgKey: "dl", explW: "Develops incredible total body strength without adding unwanted bulk (due to female hormonal profiles). Strengthens the entire back.", explM: "The ultimate indicator of raw strength. Triggers a massive hormonal response and CNS adaptation for system-wide growth." },
  "Bench Press": { muscle: "Chest & Triceps", imgKey: "ub", explW: "A fundamental upper body movement that builds strength and density in the chest, shoulders, and arms.", explM: "The king of upper body exercises. Activates 93% of pectoralis major MVC. Testosterone release is maximized with heavy compound pressing." },
  "Overhead Press": { muscle: "Shoulders", imgKey: "sh", explW: "Builds functional strength for daily life tasks while defining the shoulders perfectly to complement the female physique.", explM: "The ultimate test of upper body kinetic chain strength. Builds monstrous shoulders and a rock-solid core." },
  "Pull-ups": { muscle: "Back & Biceps", imgKey: "bk", explW: "Mastering the pull-up builds incredible relative strength and confidence while creating beautiful upper back definition.", explM: "The absolute standard for relative upper body strength. Unlatches extreme back width and bicep thickness." },
  "Barbell Row": { muscle: "Back", imgKey: "bk", explW: "Heavy compound rows build a dense, strong back that supports deadlifts and counteracts poor modern posture.", explM: "Heavy horizontal pulls are mandatory for a massive, thick back. Directly balances the heavy pressing to keep shoulders healthy." },
  "Running": { muscle: "Cardio", imgKey: "rn", explW: "Builds a deep aerobic base, improving mitochondrial density and cardiovascular health specific to female longevity.", explM: "LISS or tempo running increases stroke volume and cardiovascular efficiency, enabling faster recovery between heavy sets." },
  "Cycling": { muscle: "Cardio", imgKey: "rn", explW: "Low-impact endurance work that tones the quads and improves cardiovascular efficiency safely.", explM: "Non-impact aerobic conditioning that spares the joints while building immense quad endurance and cardiovascular capacity." },
  "Rowing": { muscle: "Full Body Cardio", imgKey: "bk", explW: "A full-body cardiovascular challenge that relies heavily on leg drive and back strength, maximizing calorie burn.", explM: "Combines powerful leg drive with an aggressive back pull. Builds explosive endurance and torches calories rapidly." },
  "Stair Climber": { muscle: "Glutes & Quads", imgKey: "gl", explW: "The ultimate functional cardio for targeting the glutes and leaning out the legs simultaneously.", explM: "Savage lower-body conditioning that builds endurance in the quads and glutes while testing mental fortitude." },
  "Swimming": { muscle: "Full Body", imgKey: "ub", explW: "Complete zero-impact cardiovascular training that elongates muscles and increases lung capacity naturally.", explM: "Incredible for active recovery and shoulder mobility. Provides a brutal full-body cardiovascular stimulus with zero joint impact." },
  "Hip Flexor Stretch": { muscle: "Flexibility", imgKey: "fx", explW: "Releases tight hips from sitting, resetting pelvic tilt and easing lower back pain effectively.", explM: "Opens up the anterior chain, severely improving squat depth and alleviating lower back tightness from heavy lifting." },
  "Pigeon Pose": { muscle: "Glute Mobility", imgKey: "fx", explW: "A deep glute and piriformis stretch that increases pelvic elasticity and regulates hormones through mindful yoga practice.", explM: "Deep external rotation stretch. Unlocks tight hips, facilitating deeper, safer squats and deadlifts." },
  "Thoracic Rotation": { muscle: "Spine Mobility", imgKey: "co", explW: "Improves upper back mobility, keeping the spine youthful and supple to counteract daily slouching.", explM: "Restores rotational mobility in the mid-back. Critical for overhead lifting mechanics and shoulder health." },
  "Hamstring Stretch": { muscle: "Flexibility", imgKey: "fx", explW: "Lengthens the back of the legs dynamically, reducing the risk of injuries during explosive athletic movements.", explM: "Increases hamstring tissue extensibility. Crucial for optimizing the hip hinge in Romanian Deadlifts and swings." },
  "Shoulder Mobility": { muscle: "Shoulders", imgKey: "sh", explW: "Opens up the chest and shoulders, allowing for better posture and pain-free upper body movement.", explM: "Releases tight pecs and anterior delts, preventing impingement during heavy bench pressing." },
  "Cat-Cow": { muscle: "Spine", imgKey: "co", explW: "Rhythmic breathing paired with spinal flexion and extension gently nourishes the discs and relieves back tension.", explM: "Safely articulates the spinal segments. A mandatory warm-up for hydrating the intervertebral discs before heavy loaded squats." },
  "Butterfly Stretch": { muscle: "Inner Thighs", imgKey: "fx", explW: "A classic stretch that opens the hips and groin, improving overall pelvic floor elasticity.", explM: "Lengthens the adductor complex, reducing the risk of groin strains during wide-stance explosive movements." },
  "Spinal Twist": { muscle: "Spine", imgKey: "co", explW: "A deep restorative stretch targeting the fascia, leaving the entire back feeling thoroughly decompressed.", explM: "Decompresses the lumbar spine and stretches the obliques. Excellent for post-workout neural recovery." },
  "Incline Dumbbell Press": { muscle: "Upper Chest", imgKey: "ub", explW: "Shifts the emphasis to the upper chest, creating firmness and lift for a more youthful décolletage.", explM: "The upper chest (clavicular head of pectoralis major) is often underdeveloped. Incline angle shifts emphasis to create the 'shelf' appearance at the collarbone." },
  "Skull Crushers": { muscle: "Tricep Long Head", imgKey: "ub", explW: "Isolates the back of the arms forcefully, ensuring the triceps stay tight and strong.", explM: "Isolation movement that fully lengthens the long head of the tricep. Lengthened-position training is superior for muscle hypertrophy per recent research." },
  "Leg Press": { muscle: "Quads", imgKey: "sq", explW: "Allows for heavy, safe loading of the legs without stressing the spine, perfect for concentrated leg toning.", explM: "Delivers massive hyper-focused volume to the quads with zero axial fatigue on the spine." },
  "Leg Curl": { muscle: "Hamstrings", imgKey: "dl", explW: "Directly isolates the hamstrings to create a balanced lift and tone on the back of the thighs.", explM: "Isolates the knee flexion function of the hamstrings. Critical for complete posterior leg development." },
  "Leg Extension": { muscle: "Quads", imgKey: "sq", explW: "Isolates the quadriceps for a deep burn, sculpting the front of the thighs with precision.", explM: "Takes the quads through full terminal extension. Maximizes the 'teardrop' (VMO) muscle hypertrophy." },
  "Calf Raise": { muscle: "Calves", imgKey: "sq", explW: "Strengthens the lower leg and ankle joint, building shapely calves while preventing high-heel related injuries.", explM: "Pumps high-rep volume into the dense gastrocnemius muscles, sparking stubborn lower leg growth." },
  "Lateral Raise": { muscle: "Lateral Deltoid", imgKey: "sh", explW: "Widens the shoulders slightly to visually shrink the waist, a key move for female body recomposition.", explM: "Directly targets the medial deltoid. Capped shoulders drastically widen the frame and enhance the critical V-taper." },
  "Front Raise": { muscle: "Anterior Deltoid", imgKey: "sh", explW: "Firms the front of the shoulders for total rounded arm definition and lifting capability.", explM: "Isolates the front delt. Supplements pressing power while defining the separation between chest and shoulder." },
  "Shrug": { muscle: "Upper Traps", imgKey: "bk", explW: "Relieves neck tension and strengthens the upper back for carrying heavy daily loads.", explM: "Builds a massive yoke. Thick upper traps are visually dominant and support the neck against heavy barbell impact." },
  "Arnold Press": { muscle: "All Deltoids", imgKey: "sh", explW: "A twisting press that engages all three shoulder heads simultaneously for maximum efficiency.", explM: "The rotational mechanics recruit maximum muscle fibers across the anterior and medial deltoids for severe growth." },
  "Preacher Curl": { muscle: "Bicep Peak", imgKey: "ub", explW: "Locks the elbows in place to prevent momentum, strictly isolating the bicep muscle.", explM: "Eliminates cheating. Engorges the bicep under strict tension to maximize the absolute peak size." },
  "Incline Curl": { muscle: "Bicep Long Head", imgKey: "ub", explW: "Stretches the bicep uniquely from a reclined angle, reaching muscle fibers often missed.", explM: "Places the bicep in an extreme stretch. Stretch-mediated hypertrophy triggers aggressive new tissue synthesis." },
  "Ab Wheel": { muscle: "Full Core", imgKey: "co", explW: "An intense anti-extension rollout that engages the entire abdominal wall deeper than standard sit-ups.", explM: "A brutal anti-extension core drill. Engages the lats and completely obliterates the rectus abdominis." },
  "Power Clean": { muscle: "Full Body Explosive", imgKey: "rn", explW: "Develops total-body power and coordination, utilizing the entire kinetic chain at once.", explM: "The gold standard for rate of force development (RFD). Trains the nervous system to explode with heavy loads." },
  "Kettlebell Swing": { muscle: "Posterior Chain", imgKey: "kb", explW: "A hip-hinge powerhouse that intensely fires the glutes while burning massive calories through momentum control.", explM: "Aggressive explosive hip-hinge. Revs the metabolism incredibly high while sparing the knees and boosting testosterone." },
  "Battle Ropes": { muscle: "Cardiovascular", imgKey: "ub", explW: "A brutal upper-body cardio workout that torches fat without traditional running.", explM: "Anaerobic upper-body conditioning. Elevates EPOC instantly and sustains a massive pump without muscle mass loss." },
  "Sled Push": { muscle: "Full Body Power", imgKey: "sq", explW: "Pure concentric work that burns massive amounts of calories with almost zero muscle soreness the next day.", explM: "Maximal concentric effort with no eccentric damage. Perfectly maintains metabolic rate without interfering with heavy lifting recovery." },
};

// Default fallback generator
function safeDict(name: string, gender: "w" | "m") {
  const ex = DICT[name];
  if (ex) return { muscle: ex.muscle, explanation: gender === "w" ? ex.explW : ex.explM, imgKey: ex.imgKey };
  return { muscle: "Full Body", explanation: gender === "w" ? "Empowering body-positive compound movement." : "Performance-focused powerful movement.", imgKey: "co" };
}

// Sets/Reps Rules
const PROTO: Record<string, { A: [number, string]; B: [number, string]; C: [number, string] }> = {
  st: { A: [5, "5"], B: [4, "4"], C: [3, "3"] },
  mb: { A: [4, "10"], B: [4, "8"], C: [5, "6"] },
  wl: { A: [3, "15"], B: [4, "12"], C: [4, "15"] },
  en: { A: [3, "20"], B: [4, "20"], C: [5, "20"] },
  fl: { A: [3, "30s"], B: [4, "45s"], C: [5, "60s"] },
  br: { A: [3, "12"], B: [4, "10"], C: [4, "8"] },
};

function buildEx(progKey: string, phase: "A" | "B" | "C", gender: "w" | "m", overrideRepData: string): Exd {
  let [name, customRep] = overrideRepData.split("|");
  const d = safeDict(name, gender);
  let sets = PROTO[progKey][phase][0];
  let reps = customRep || PROTO[progKey][phase][1];
  
  if (progKey === "br" && phase === "C" && !customRep) reps += " + HIIT";
  // specific rest tweaks per rules
  if (progKey === "wl" && phase === "C" && !customRep) reps += " (30s rest)";

  return {
    name,
    muscle: d.muscle,
    sets,
    reps,
    explanation: d.explanation,
    img: PFX + IMGS[d.imgKey] + SFX,
  };
}

function makeDay(name: string, progKey: string, gender: "w" | "m", aList: string[], bList: string[], cList: string[]): DayD {
  return {
    name,
    exercises: {
      A: aList.map((e) => buildEx(progKey, "A", gender, e)),
      B: bList.map((e) => buildEx(progKey, "B", gender, e)),
      C: cList.map((e) => buildEx(progKey, "C", gender, e)),
    },
  };
}

export const PROG_DATA: Record<string, Record<string, Record<number, DayD>>> = {
  w: {
    wl: {
      1: makeDay("Glute & Leg Burn", "wl", "w",
        ["Hip Thrust", "Romanian Deadlift", "Lateral Lunge", "Cable Kickback", "Plank", "Jump Squat"],
        ["Sumo Deadlift", "Bulgarian Split Squat", "Curtsy Lunge", "Resistance Band Kickback", "Side Plank", "Box Jump"],
        ["Barbell Hip Thrust", "Single-Leg Deadlift", "Jump Lunge", "Cable Pull-Through", "Plank with Reach", "Depth Jump"]
      ),
      2: makeDay("HIIT Cardio", "wl", "w",
        ["Jump Rope|1min", "Burpees", "Mountain Climbers|20", "High Knees|30s", "Lateral Shuffles|30s", "Sprint Intervals|20s"],
        ["Jump Rope|1min", "Burpees", "Mountain Climbers|25", "High Knees|40s", "Squat Jumps", "Skater Jumps"],
        ["Jump Rope|1min", "Box Jump", "Mountain Climbers|30", "Tuck Jumps", "Lateral Shuffles|40s", "Sprint Intervals|30s"]
      ),
      3: makeDay("Upper Body Tone", "wl", "w",
        ["Push-Ups", "Dumbbell Row", "Shoulder Press", "Lat Pulldown", "Tricep Dips", "Bicep Curl"],
        ["Push-Ups", "Dumbbell Row", "Shoulder Press", "Lat Pulldown", "Cable Fly", "Face Pull"],
        ["Incline Press", "Dumbbell Row", "Shoulder Press", "Lat Pulldown", "Overhead Tricep Extension", "Bicep Curl"]
      ),
      4: makeDay("Full Body Metabolic Circuit", "wl", "w",
        ["Goblet Squat", "Push-Ups", "Romanian Deadlift", "Cable Kickback", "Plank", "Jump Rope|1min"],
        ["Sumo Deadlift", "Cable Fly", "Bulgarian Split Squat", "Resistance Band Kickback", "Side Plank", "Skater Jumps"],
        ["Barbell Hip Thrust", "Incline Press", "Single-Leg Deadlift", "Cable Pull-Through", "Plank with Reach", "Sprint Intervals|30s"]
      )
    },
    mb: {
      1: makeDay("Glutes & Legs", "mb", "w",
        ["Hip Thrust", "Bulgarian Split Squat", "Goblet Squat", "Romanian Deadlift", "Leg Press", "Calf Raise"],
        ["Barbell Hip Thrust", "Bulgarian Split Squat", "Goblet Squat", "Sumo Deadlift", "Leg Press", "Calf Raise"],
        ["Weighted Hip Thrust", "Barbell Squat", "Leg Press", "Single-Leg Deadlift", "Leg Curl", "Calf Raise"]
      ),
      2: makeDay("Back & Biceps", "mb", "w",
        ["Lat Pulldown", "Dumbbell Row", "Face Pull", "Bicep Curl", "Incline Curl", "Plank"],
        ["Lat Pulldown", "Barbell Row", "Face Pull", "Preacher Curl", "Incline Curl", "Side Plank"],
        ["Pull-ups", "Barbell Row", "Cable Pull-Through", "Bicep Curl", "Preacher Curl", "Plank with Reach"]
      ),
      3: makeDay("Chest, Shoulders & Triceps", "mb", "w",
        ["Incline Press", "Push-Ups", "Cable Fly", "Shoulder Press", "Tricep Pushdown", "Tricep Dips"],
        ["Incline Press", "Arnold Press", "Cable Fly", "Lateral Raise", "Overhead Tricep Extension", "Tricep Dips"],
        ["Bench Press", "Arnold Press", "Front Raise", "Lateral Raise", "Skull Crushers", "Tricep Pushdown"]
      ),
      4: makeDay("Full Body Power", "mb", "w",
        ["Deadlift", "Barbell Squat", "Pull-ups", "Incline Press", "Plank", "Jump Squat"],
        ["Sumo Deadlift", "Barbell Squat", "Lat Pulldown", "Shoulder Press", "Side Plank", "Box Jump"],
        ["Romanian Deadlift", "Bulgarian Split Squat", "Barbell Row", "Arnold Press", "Plank with Reach", "Depth Jump"]
      )
    },
    st: {
      1: makeDay("Lower Strength", "st", "w",
        ["Barbell Squat", "Romanian Deadlift", "Leg Press", "Hip Thrust", "Calf Raise", "Plank"],
        ["Barbell Squat", "Sumo Deadlift", "Leg Press", "Barbell Hip Thrust", "Calf Raise", "Side Plank"],
        ["Barbell Squat", "Deadlift", "Leg Press", "Weighted Hip Thrust", "Calf Raise", "Plank with Reach"]
      ),
      2: makeDay("Upper Strength", "st", "w",
        ["Bench Press", "Overhead Press", "Pull-ups", "Barbell Row", "Tricep Dips", "Face Pull"],
        ["Incline Press", "Overhead Press", "Lat Pulldown", "Dumbbell Row", "Tricep Pushdown", "Face Pull"],
        ["Bench Press", "Arnold Press", "Pull-ups", "Barbell Row", "Skull Crushers", "Face Pull"]
      ),
      3: makeDay("Full Body Strength", "st", "w",
        ["Deadlift", "Barbell Squat", "Bench Press", "Overhead Press", "Pull-ups", "Hip Thrust"],
        ["Sumo Deadlift", "Barbell Squat", "Incline Press", "Arnold Press", "Lat Pulldown", "Barbell Hip Thrust"],
        ["Deadlift", "Barbell Squat", "Bench Press", "Overhead Press", "Pull-ups", "Weighted Hip Thrust"]
      )
    },
    en: {
      1: makeDay("Long Intervals", "en", "w",
        ["Running", "Stair Climber", "Rowing", "Jump Rope", "Cycling", "Swimming"],
        ["Running", "Stair Climber", "Rowing", "Jump Rope", "Cycling", "Swimming"],
        ["Running", "Stair Climber", "Rowing", "Jump Rope", "Cycling", "Swimming"]
      ),
      2: makeDay("Strength Base", "en", "w",
        ["Goblet Squat", "Push-Ups", "Dumbbell Row", "Plank", "Hip Thrust", "Lateral Lunge"],
        ["Bulgarian Split Squat", "Push-Ups", "Barbell Row", "Side Plank", "Barbell Hip Thrust", "Curtsy Lunge"],
        ["Barbell Squat", "Bench Press", "Pull-ups", "Plank with Reach", "Weighted Hip Thrust", "Jump Lunge"]
      ),
      3: makeDay("Tempo Push", "en", "w",
        ["Sprint Intervals", "High Knees", "Box Jump", "Jump Rope", "Mountain Climbers", "Lateral Shuffles"],
        ["Sprint Intervals", "High Knees", "Box Jump", "Jump Rope", "Mountain Climbers", "Lateral Shuffles"],
        ["Sprint Intervals", "High Knees", "Depth Jump", "Jump Rope", "Mountain Climbers", "Lateral Shuffles"]
      ),
      4: makeDay("Cross Training", "en", "w",
        ["Rowing", "Cycling", "Swimming", "Stair Climber", "Plank", "Side Plank"],
        ["Rowing", "Cycling", "Swimming", "Stair Climber", "Plank", "Side Plank"],
        ["Rowing", "Cycling", "Swimming", "Stair Climber", "Plank with Reach", "Ab Wheel"]
      ),
      5: makeDay("Endurance Distance", "en", "w",
        ["Running", "Plank", "Hip Thrust", "Hip Flexor Stretch", "Calf Raise", "Jump Rope"],
        ["Running", "Side Plank", "Barbell Hip Thrust", "Pigeon Pose", "Calf Raise", "Jump Rope"],
        ["Running", "Plank with Reach", "Weighted Hip Thrust", "Hamstring Stretch", "Calf Raise", "Jump Rope"]
      )
    },
    fl: {
      1: makeDay("Hips & Lower", "fl", "w",
        ["Hip Flexor Stretch", "Pigeon Pose", "Butterfly Stretch", "Lateral Lunge", "Hamstring Stretch", "Calf Raise"],
        ["Hip Flexor Stretch", "Pigeon Pose", "Butterfly Stretch", "Curtsy Lunge", "Hamstring Stretch", "Calf Raise"],
        ["Hip Flexor Stretch", "Pigeon Pose", "Butterfly Stretch", "Jump Lunge", "Hamstring Stretch", "Calf Raise"]
      ),
      2: makeDay("Spine & Core", "fl", "w",
        ["Cat-Cow", "Thoracic Rotation", "Spinal Twist", "Plank", "Side Plank", "Shoulder Mobility"],
        ["Cat-Cow", "Thoracic Rotation", "Spinal Twist", "Plank", "Side Plank", "Shoulder Mobility"],
        ["Cat-Cow", "Thoracic Rotation", "Spinal Twist", "Plank with Reach", "Ab Wheel", "Shoulder Mobility"]
      ),
      3: makeDay("Full Body Flow", "fl", "w",
        ["Hip Flexor Stretch", "Pigeon Pose", "Thoracic Rotation", "Hamstring Stretch", "Shoulder Mobility", "Spinal Twist"],
        ["Hip Flexor Stretch", "Pigeon Pose", "Thoracic Rotation", "Hamstring Stretch", "Shoulder Mobility", "Spinal Twist"],
        ["Hip Flexor Stretch", "Pigeon Pose", "Thoracic Rotation", "Hamstring Stretch", "Shoulder Mobility", "Spinal Twist"]
      ),
      4: makeDay("Recovery Stretch", "fl", "w",
        ["Butterfly Stretch", "Cat-Cow", "Thoracic Rotation", "Spinal Twist", "Hip Flexor Stretch", "Pigeon Pose"],
        ["Butterfly Stretch", "Cat-Cow", "Thoracic Rotation", "Spinal Twist", "Hip Flexor Stretch", "Pigeon Pose"],
        ["Butterfly Stretch", "Cat-Cow", "Thoracic Rotation", "Spinal Twist", "Hip Flexor Stretch", "Pigeon Pose"]
      ),
      5: makeDay("Mobility Drills", "fl", "w",
        ["Lateral Lunge", "Shoulder Mobility", "Cat-Cow", "Spinal Twist", "Hamstring Stretch", "Hip Flexor Stretch"],
        ["Lateral Lunge", "Shoulder Mobility", "Cat-Cow", "Spinal Twist", "Hamstring Stretch", "Hip Flexor Stretch"],
        ["Lateral Lunge", "Shoulder Mobility", "Cat-Cow", "Spinal Twist", "Hamstring Stretch", "Hip Flexor Stretch"]
      )
    },
    br: {
      1: makeDay("Strength Compound", "br", "w",
        ["Barbell Squat", "Deadlift", "Bench Press", "Dumbbell Row", "Plank", "Hip Thrust"],
        ["Barbell Squat", "Sumo Deadlift", "Incline Press", "Barbell Row", "Side Plank", "Barbell Hip Thrust"],
        ["Barbell Squat", "Romanian Deadlift", "Overhead Press", "Pull-ups", "Plank with Reach", "Weighted Hip Thrust"]
      ),
      2: makeDay("Burn Intervals", "br", "w",
        ["Jump Rope|1min", "Burpees", "Mountain Climbers", "High Knees", "Lateral Shuffles", "Jump Squat"],
        ["Jump Rope|1min", "Burpees", "Mountain Climbers", "High Knees", "Skater Jumps", "Box Jump"],
        ["Jump Rope|1min", "Burpees", "Mountain Climbers", "High Knees", "Tuck Jumps", "Depth Jump"]
      ),
      3: makeDay("Strength Accessories", "br", "w",
        ["Bulgarian Split Squat", "Lat Pulldown", "Shoulder Press", "Cable Fly", "Cable Kickback", "Bicep Curl"],
        ["Lateral Lunge", "Face Pull", "Arnold Press", "Cable Fly", "Resistance Band Kickback", "Tricep Pushdown"],
        ["Curtsy Lunge", "Pull-ups", "Lateral Raise", "Cable Fly", "Cable Pull-Through", "Skull Crushers"]
      ),
      4: makeDay("HIIT Circuit", "br", "w",
        ["Sprint Intervals|20s", "Burpees", "Mountain Climbers", "High Knees", "Jump Squat", "Plank"],
        ["Sprint Intervals|30s", "Burpees", "Mountain Climbers", "High Knees", "Box Jump", "Side Plank"],
        ["Sprint Intervals|40s", "Burpees", "Mountain Climbers", "High Knees", "Depth Jump", "Plank with Reach"]
      )
    }
  },
  m: {
    wl: {
      1: makeDay("Metabolic Lower", "wl", "m",
        ["Deadlift", "Barbell Squat", "Leg Press", "Kettlebell Swing", "Box Jump", "Calf Raise"],
        ["Romanian Deadlift", "Barbell Squat", "Leg Press", "Kettlebell Swing", "Box Jump", "Calf Raise"],
        ["Deadlift", "Bulgarian Split Squat", "Leg Press", "Kettlebell Swing", "Depth Jump", "Calf Raise"]
      ),
      2: makeDay("Upper Metcon", "wl", "m",
        ["Pull-ups", "Bench Press", "Dumbbell Row", "Battle Ropes", "Burpees", "Mountain Climbers"],
        ["Pull-ups", "Incline Press", "Barbell Row", "Battle Ropes", "Burpees", "Mountain Climbers"],
        ["Pull-ups", "Overhead Press", "Barbell Row", "Battle Ropes", "Burpees", "Mountain Climbers"]
      ),
      3: makeDay("Full Body Burn", "wl", "m",
        ["Power Clean", "Push-Ups", "Kettlebell Swing", "Sled Push", "Jump Rope|1min", "Plank"],
        ["Power Clean", "Dumbbell Row", "Kettlebell Swing", "Sled Push", "Jump Rope|1min", "Side Plank"],
        ["Power Clean", "Arnold Press", "Kettlebell Swing", "Sled Push", "Jump Rope|1min", "Ab Wheel"]
      ),
      4: makeDay("HIIT Cond.", "wl", "m",
        ["Sprint Intervals|30s", "Burpees", "Mountain Climbers", "Plank", "Battle Ropes", "High Knees"],
        ["Sprint Intervals|40s", "Burpees", "Mountain Climbers", "Side Plank", "Battle Ropes", "High Knees"],
        ["Sprint Intervals|45s", "Burpees", "Mountain Climbers", "Ab Wheel", "Battle Ropes", "High Knees"]
      )
    },
    mb: {
      1: makeDay("Chest & Triceps", "mb", "m",
        ["Bench Press", "Incline Press", "Cable Fly", "Tricep Dips", "Skull Crushers", "Push-Ups"],
        ["Bench Press", "Incline Press", "Cable Fly", "Tricep Dips", "Skull Crushers", "Tricep Pushdown"],
        ["Bench Press", "Incline Press", "Cable Fly", "Tricep Dips", "Overhead Tricep Extension", "Push-Ups"]
      ),
      2: makeDay("Back & Biceps", "mb", "m",
        ["Pull-ups", "Barbell Row", "Lat Pulldown", "Cable Row", "Bicep Curl", "Preacher Curl"],
        ["Pull-ups", "Barbell Row", "Lat Pulldown", "Dumbbell Row", "Incline Curl", "Preacher Curl"],
        ["Pull-ups", "Barbell Row", "Face Pull", "Cable Row", "Bicep Curl", "Incline Curl"]
      ),
      3: makeDay("Legs", "mb", "m",
        ["Barbell Squat", "Leg Press", "Romanian Deadlift", "Leg Curl", "Leg Extension", "Calf Raise"],
        ["Barbell Squat", "Leg Press", "Romanian Deadlift", "Leg Curl", "Leg Extension", "Calf Raise"],
        ["Barbell Squat", "Bulgarian Split Squat", "Deadlift", "Leg Curl", "Leg Extension", "Calf Raise"]
      ),
      4: makeDay("Shoulders", "mb", "m",
        ["Overhead Press", "Lateral Raise", "Front Raise", "Face Pull", "Shrug", "Arnold Press"],
        ["Overhead Press", "Lateral Raise", "Front Raise", "Face Pull", "Shrug", "Arnold Press"],
        ["Overhead Press", "Lateral Raise", "Front Raise", "Face Pull", "Shrug", "Arnold Press"]
      ),
      5: makeDay("Arms + Core", "mb", "m",
        ["Preacher Curl", "Incline Curl", "Tricep Pushdown", "Overhead Tricep Extension", "Plank", "Ab Wheel"],
        ["Bicep Curl", "Incline Curl", "Tricep Pushdown", "Skull Crushers", "Side Plank", "Ab Wheel"],
        ["Preacher Curl", "Bicep Curl", "Tricep Dips", "Overhead Tricep Extension", "Plank with Reach", "Ab Wheel"]
      )
    },
    st: {
      1: makeDay("Squat Power", "st", "m",
        ["Barbell Squat", "Romanian Deadlift", "Leg Press", "Calf Raise", "Plank", "Kettlebell Swing"],
        ["Barbell Squat", "Power Clean", "Leg Press", "Calf Raise", "Side Plank", "Kettlebell Swing"],
        ["Barbell Squat", "Deadlift", "Leg Press", "Calf Raise", "Ab Wheel", "Kettlebell Swing"]
      ),
      2: makeDay("Press Power", "st", "m",
        ["Bench Press", "Overhead Press", "Incline Press", "Tricep Dips", "Push-Ups", "Face Pull"],
        ["Bench Press", "Overhead Press", "Incline Press", "Tricep Dips", "Push-Ups", "Face Pull"],
        ["Bench Press", "Overhead Press", "Arnold Press", "Tricep Dips", "Push-Ups", "Face Pull"]
      ),
      3: makeDay("Hinge Day", "st", "m",
        ["Deadlift", "Romanian Deadlift", "Barbell Row", "Pull-ups", "Leg Curl", "Bicep Curl"],
        ["Deadlift", "Power Clean", "Barbell Row", "Pull-ups", "Leg Curl", "Bicep Curl"],
        ["Deadlift", "Power Clean", "Barbell Row", "Pull-ups", "Leg Curl", "Bicep Curl"]
      ),
      4: makeDay("Explosive Power", "st", "m",
        ["Power Clean", "Overhead Press", "Box Jump", "Battle Ropes", "Plank", "Sled Push"],
        ["Power Clean", "Overhead Press", "Box Jump", "Battle Ropes", "Side Plank", "Sled Push"],
        ["Power Clean", "Overhead Press", "Depth Jump", "Battle Ropes", "Ab Wheel", "Sled Push"]
      )
    },
    en: {
      1: makeDay("Zone 2 Aerobic", "en", "m",
        ["Running", "Stair Climber", "Rowing", "Jump Rope", "Cycling", "Swimming"],
        ["Running", "Stair Climber", "Rowing", "Jump Rope", "Cycling", "Swimming"],
        ["Running", "Stair Climber", "Rowing", "Jump Rope", "Cycling", "Swimming"]
      ),
      2: makeDay("Strength Base", "en", "m",
        ["Barbell Squat", "Bench Press", "Pull-ups", "Plank", "Romanian Deadlift", "Overhead Press"],
        ["Barbell Squat", "Bench Press", "Pull-ups", "Side Plank", "Romanian Deadlift", "Overhead Press"],
        ["Barbell Squat", "Bench Press", "Pull-ups", "Ab Wheel", "Deadlift", "Overhead Press"]
      ),
      3: makeDay("Interval Threshold", "en", "m",
        ["Sprint Intervals", "Box Jump", "Battle Ropes", "Jump Rope", "Mountain Climbers", "Running"],
        ["Sprint Intervals", "Box Jump", "Battle Ropes", "Jump Rope", "Mountain Climbers", "Running"],
        ["Sprint Intervals", "Depth Jump", "Battle Ropes", "Jump Rope", "Mountain Climbers", "Running"]
      ),
      4: makeDay("Capacity Cross", "en", "m",
        ["Rowing", "Cycling", "Swimming", "Stair Climber", "Plank", "Side Plank"],
        ["Rowing", "Cycling", "Swimming", "Stair Climber", "Plank", "Side Plank"],
        ["Rowing", "Cycling", "Swimming", "Stair Climber", "Ab Wheel", "Side Plank"]
      ),
      5: makeDay("Long Haul", "en", "m",
        ["Running", "Plank", "Hip Flexor Stretch", "Hamstring Stretch", "Shoulder Mobility", "Cat-Cow"],
        ["Running", "Side Plank", "Hip Flexor Stretch", "Hamstring Stretch", "Shoulder Mobility", "Cat-Cow"],
        ["Running", "Ab Wheel", "Hip Flexor Stretch", "Hamstring Stretch", "Shoulder Mobility", "Cat-Cow"]
      )
    },
    fl: {
      1: makeDay("Dynamic Legs", "fl", "m",
        ["Hip Flexor Stretch", "Hamstring Stretch", "Lateral Lunge", "Calf Raise", "Pigeon Pose", "Butterfly Stretch"],
        ["Hip Flexor Stretch", "Hamstring Stretch", "Lateral Lunge", "Calf Raise", "Pigeon Pose", "Butterfly Stretch"],
        ["Hip Flexor Stretch", "Hamstring Stretch", "Lateral Lunge", "Calf Raise", "Pigeon Pose", "Butterfly Stretch"]
      ),
      2: makeDay("Thoracic Flow", "fl", "m",
        ["Thoracic Rotation", "Shoulder Mobility", "Cat-Cow", "Spinal Twist", "Face Pull", "Plank"],
        ["Thoracic Rotation", "Shoulder Mobility", "Cat-Cow", "Spinal Twist", "Face Pull", "Side Plank"],
        ["Thoracic Rotation", "Shoulder Mobility", "Cat-Cow", "Spinal Twist", "Face Pull", "Ab Wheel"]
      ),
      3: makeDay("Agility Prep", "fl", "m",
        ["Jump Rope", "Box Jump", "High Knees", "Mountain Climbers", "Lateral Shuffles", "Sprint Intervals"],
        ["Jump Rope", "Box Jump", "High Knees", "Mountain Climbers", "Lateral Shuffles", "Sprint Intervals"],
        ["Jump Rope", "Depth Jump", "High Knees", "Mountain Climbers", "Lateral Shuffles", "Sprint Intervals"]
      ),
      4: makeDay("Deep Opening", "fl", "m",
        ["Pigeon Pose", "Butterfly Stretch", "Hip Flexor Stretch", "Hamstring Stretch", "Spinal Twist", "Cat-Cow"],
        ["Pigeon Pose", "Butterfly Stretch", "Hip Flexor Stretch", "Hamstring Stretch", "Spinal Twist", "Cat-Cow"],
        ["Pigeon Pose", "Butterfly Stretch", "Hip Flexor Stretch", "Hamstring Stretch", "Spinal Twist", "Cat-Cow"]
      ),
      5: makeDay("Full Mobility", "fl", "m",
        ["Thoracic Rotation", "Shoulder Mobility", "Lateral Lunge", "Calf Raise", "Face Pull", "Plank"],
        ["Thoracic Rotation", "Shoulder Mobility", "Lateral Lunge", "Calf Raise", "Face Pull", "Side Plank"],
        ["Thoracic Rotation", "Shoulder Mobility", "Lateral Lunge", "Calf Raise", "Face Pull", "Ab Wheel"]
      )
    },
    br: {
      1: makeDay("Upper Push/Pull", "br", "m",
        ["Bench Press", "Overhead Press", "Pull-ups", "Barbell Row", "Tricep Dips", "Battle Ropes"],
        ["Incline Press", "Overhead Press", "Pull-ups", "Dumbbell Row", "Tricep Dips", "Battle Ropes"],
        ["Bench Press", "Arnold Press", "Pull-ups", "Barbell Row", "Skull Crushers", "Battle Ropes"]
      ),
      2: makeDay("Lower Strength", "br", "m",
        ["Barbell Squat", "Deadlift", "Romanian Deadlift", "Leg Press", "Kettlebell Swing", "Box Jump"],
        ["Barbell Squat", "Deadlift", "Romanian Deadlift", "Leg Press", "Kettlebell Swing", "Box Jump"],
        ["Barbell Squat", "Power Clean", "Romanian Deadlift", "Bulgarian Split Squat", "Kettlebell Swing", "Depth Jump"]
      ),
      3: makeDay("HIIT Metcon", "br", "m",
        ["Sprint Intervals|30s", "Burpees", "Mountain Climbers", "Battle Ropes", "Sled Push", "Jump Rope|1min"],
        ["Sprint Intervals|40s", "Burpees", "Mountain Climbers", "Battle Ropes", "Sled Push", "Jump Rope|1min"],
        ["Sprint Intervals|45s", "Burpees", "Mountain Climbers", "Battle Ropes", "Sled Push", "Jump Rope|1min"]
      ),
      4: makeDay("Full Accessories", "br", "m",
        ["Pull-ups", "Barbell Row", "Cable Row", "Plank", "Face Pull", "Ab Wheel"],
        ["Pull-ups", "Dumbbell Row", "Face Pull", "Side Plank", "Bicep Curl", "Ab Wheel"],
        ["Pull-ups", "Barbell Row", "Cable Row", "Plank with Reach", "Preacher Curl", "Ab Wheel"]
      )
    }
  }
};

export const SLUG_MAP: Record<string, string> = {
  wl: "wl", mb: "mb", st: "st", en: "en", fl: "fl", br: "br",
};
