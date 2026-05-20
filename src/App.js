import { useState, useEffect } from "react";

// eslint-disable-next-line
const COLORS = {
  green: "#2d6a2d",
  greenMid: "#3e8e3e",
  greenLight: "#5cb85c",
  greenPale: "#e8f5e8",
  orange: "#e07b30",
  white: "#ffffff",
  offwhite: "#f4f9f4",
  dark: "#1a2e1a",
  gray: "#6b7c6b",
  lightGray: "#d4e4d4",
};

const ZAMBIAN_FOODS = [
  { name: "Nshima", cal: 340, carbs: 78, protein: 7, fat: 1, emoji: "🍚", portion: "1 plate" },
  { name: "Kapenta", cal: 180, carbs: 2, protein: 34, fat: 5, emoji: "🐟", portion: "100g" },
  { name: "Rape Leaves", cal: 45, carbs: 6, protein: 3, fat: 1, emoji: "🥬", portion: "1 cup" },
  { name: "Groundnuts", cal: 280, carbs: 10, protein: 12, fat: 24, emoji: "🥜", portion: "50g" },
  { name: "Sweet Potato", cal: 120, carbs: 28, protein: 2, fat: 0, emoji: "🍠", portion: "1 medium" },
  { name: "Beans (Dry)", cal: 200, carbs: 36, protein: 14, fat: 1, emoji: "🫘", portion: "100g" },
  { name: "Chicken", cal: 250, carbs: 0, protein: 35, fat: 12, emoji: "🍗", portion: "150g" },
  { name: "Mango", cal: 99, carbs: 25, protein: 1, fat: 0, emoji: "🥭", portion: "1 medium" },
];

const MEAL_PLANS = [
  {
    day: "Monday",
    meals: [
      { time: "Breakfast", food: "Nshima + Kapenta", cal: 520 },
      { time: "Lunch", food: "Beans + Rape Leaves", cal: 245 },
      { time: "Dinner", food: "Chicken + Sweet Potato", cal: 370 },
    ],
  },
  {
    day: "Tuesday",
    meals: [
      { time: "Breakfast", food: "Groundnuts + Mango", cal: 379 },
      { time: "Lunch", food: "Nshima + Rape Leaves", cal: 385 },
      { time: "Dinner", food: "Kapenta + Beans", cal: 380 },
    ],
  },
  {
    day: "Wednesday",
    meals: [
      { time: "Breakfast", food: "Sweet Potato + Kapenta", cal: 300 },
      { time: "Lunch", food: "Chicken + Groundnuts", cal: 530 },
      { time: "Dinner", food: "Nshima + Beans", cal: 540 },
    ],
  },
];

const TIPS = [
  "Small changes today lead to a healthier tomorrow.",
  "Drinking 8 glasses of water daily supports digestion.",
  "Kapenta is rich in calcium — great for strong bones!",
  "Nshima with relish provides balanced energy for the day.",
  "Fresh fruits like mango are packed with vitamins A & C.",
  "Groundnuts are an excellent source of healthy fats.",
];

function CircleProgress({ value, size = 90, stroke = 8, color = "#5cb85c", label }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#d4e4d4" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }} />
      </svg>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a2e1a", lineHeight: 1 }}>{value}%</div>
        {label && <div style={{ fontSize: 9, color: "#6b7c6b" }}>{label}</div>}
      </div>
    </div>
  );
}

function ProgressBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b7c6b", marginBottom: 3 }}>
        <span>{label}</span><span>{value}%</span>
      </div>
      <div style={{ height: 7, background: "#d4e4d4", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 10, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

function HomeScreen({ steps, water, goal, tip }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => { setTimeout(() => setAnim(true), 100); }, []);
  return (
    <div style={{ padding: "0 16px 80px", overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 8px" }}>
        <div>
          <div style={{ fontSize: 13, color: "#6b7c6b" }}>Good morning! 👋</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1a2e1a" }}>Welcome to NutriGuide</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#e8f5e8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
      </div>
      <div style={{ background: "linear-gradient(135deg, #2d6a2d, #3e8e3e)", borderRadius: 18, padding: 18, color: "white", marginBottom: 14, boxShadow: "0 6px 20px rgba(45,106,45,0.3)" }}>
        <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 8 }}>Today's Progress</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <CircleProgress value={anim ? goal : 0} size={80} stroke={7} color="white" label="Daily Goal" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, marginBottom: 6, opacity: 0.9 }}>Nutrient Balance</div>
            <ProgressBar label="Carbs" value={45} color="#FFD700" />
            <ProgressBar label="Protein" value={30} color="#90EE90" />
            <ProgressBar label="Fats" value={25} color="#FFA07A" />
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { icon: "💧", label: "Water", value: `${water}/8`, sub: "glasses", color: "#4fc3f7" },
          { icon: "👟", label: "Steps", value: steps.toLocaleString(), sub: "steps today", color: "#e07b30" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", borderRadius: 14, padding: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1a2e1a" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#6b7c6b" }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#e8f5e8", borderRadius: 14, padding: 14, display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{ fontSize: 20 }}>💡</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#2d6a2d", marginBottom: 3 }}>Daily Tip</div>
          <div style={{ fontSize: 12, color: "#1a2e1a", lineHeight: 1.4 }}>{tip}</div>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1a", marginBottom: 8 }}>🇿🇲 Zambian Foods Today</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {ZAMBIAN_FOODS.slice(0, 5).map(f => (
            <div key={f.name} style={{ minWidth: 72, background: "white", borderRadius: 12, padding: "10px 8px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", flexShrink: 0 }}>
              <div style={{ fontSize: 24 }}>{f.emoji}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#1a2e1a", marginTop: 3 }}>{f.name}</div>
              <div style={{ fontSize: 9, color: "#6b7c6b" }}>{f.cal} kcal</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MealsScreen({ logged, setLogged }) {
  const [day, setDay] = useState(0);
  const [adding, setAdding] = useState(null);
  const plan = MEAL_PLANS[day];
  const totalCal = plan.meals.reduce((a, m) => a + m.cal, 0);
  return (
    <div style={{ padding: "0 16px 80px", overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 0 8px", fontSize: 18, fontWeight: 700, color: "#1a2e1a" }}>Meal Plans</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, overflowX: "auto" }}>
        {MEAL_PLANS.map((p, i) => (
          <button key={i} onClick={() => setDay(i)} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", background: day === i ? "#2d6a2d" : "#d4e4d4", color: day === i ? "white" : "#1a2e1a", fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
            {p.day}
          </button>
        ))}
      </div>
      <div style={{ background: "linear-gradient(135deg,#2d6a2d,#3e8e3e)", borderRadius: 14, padding: "12px 16px", color: "white", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><div style={{ fontSize: 11, opacity: 0.85 }}>Total Calories</div><div style={{ fontSize: 24, fontWeight: 700 }}>{totalCal}</div></div>
        <div style={{ fontSize: 11, opacity: 0.85, textAlign: "right" }}>Goal: 2,000 kcal<br /><span style={{ fontSize: 18, fontWeight: 700 }}>{Math.round((totalCal / 2000) * 100)}%</span></div>
      </div>
      {plan.meals.map((m, i) => (
        <div key={i} style={{ background: "white", borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "#e07b30", fontWeight: 600 }}>{m.time}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2e1a" }}>{m.food}</div>
            <div style={{ fontSize: 11, color: "#6b7c6b" }}>{m.cal} kcal</div>
          </div>
          <button onClick={() => setLogged(l => ({ ...l, [m.time]: !l[m.time] }))} style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${logged[m.time] ? "#5cb85c" : "#d4e4d4"}`, background: logged[m.time] ? "#e8f5e8" : "transparent", cursor: "pointer", fontSize: 16 }}>
            {logged[m.time] ? "✅" : "○"}
          </button>
        </div>
      ))}
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1a", margin: "14px 0 8px" }}>Add Zambian Food</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {ZAMBIAN_FOODS.map(f => (
          <div key={f.name} onClick={() => setAdding(f)} style={{ background: adding?.name === f.name ? "#e8f5e8" : "white", borderRadius: 12, padding: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, border: `1.5px solid ${adding?.name === f.name ? "#5cb85c" : "transparent"}` }}>
            <span style={{ fontSize: 22 }}>{f.emoji}</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#1a2e1a" }}>{f.name}</div>
              <div style={{ fontSize: 10, color: "#6b7c6b" }}>{f.cal} kcal · {f.portion}</div>
            </div>
          </div>
        ))}
      </div>
      {adding && (
        <div style={{ marginTop: 12, background: "#e8f5e8", borderRadius: 14, padding: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1a2e1a", marginBottom: 6 }}>{adding.emoji} {adding.name}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
            {[["Calories", adding.cal, "kcal"], ["Carbs", adding.carbs, "g"], ["Protein", adding.protein, "g"], ["Fat", adding.fat, "g"]].map(([k, v, u]) => (
              <div key={k} style={{ background: "white", borderRadius: 8, padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#2d6a2d" }}>{v}</div>
                <div style={{ fontSize: 9, color: "#6b7c6b" }}>{k} ({u})</div>
              </div>
            ))}
          </div>
          <button onClick={() => setAdding(null)} style={{ marginTop: 10, width: "100%", padding: "8px 0", background: "#2d6a2d", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>+ Log This Food</button>
        </div>
      )}
    </div>
  );
}

function ScanScreen() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const scan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult(ZAMBIAN_FOODS[Math.floor(Math.random() * ZAMBIAN_FOODS.length)]);
    }, 2000);
  };
  return (
    <div style={{ padding: "0 16px 80px", overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 0 8px", fontSize: 18, fontWeight: 700, color: "#1a2e1a" }}>Food Scanner</div>
      <div style={{ background: "#1a2e1a", borderRadius: 20, overflow: "hidden", marginBottom: 16, position: "relative", height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {scanning ? (
          <div style={{ textAlign: "center", color: "white" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 13 }}>Scanning...</div>
          </div>
        ) : result ? (
          <div style={{ textAlign: "center", color: "white" }}>
            <div style={{ fontSize: 50 }}>{result.emoji}</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{result.name} detected!</div>
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.6)" }}>
            <div style={{ fontSize: 40 }}>📷</div>
            <div style={{ fontSize: 12, marginTop: 8 }}>Point camera at food barcode</div>
          </div>
        )}
      </div>
      <button onClick={scan} disabled={scanning} style={{ width: "100%", padding: "14px 0", background: scanning ? "#6b7c6b" : "#2d6a2d", color: "white", border: "none", borderRadius: 14, fontWeight: 700, fontSize: 15, cursor: scanning ? "not-allowed" : "pointer", marginBottom: 16 }}>
        {scanning ? "Scanning..." : "📷 Scan Food Barcode"}
      </button>
      {result && (
        <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 40 }}>{result.emoji}</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2e1a" }}>{result.name}</div>
              <div style={{ fontSize: 12, color: "#6b7c6b" }}>Per {result.portion}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[["🔥 Calories", result.cal, "kcal", "#e07b30"], ["🌾 Carbs", result.carbs, "g", "#5cb85c"], ["💪 Protein", result.protein, "g", "#4fc3f7"], ["🥑 Fat", result.fat, "g", "#FFD700"]].map(([k, v, u, c]) => (
              <div key={k} style={{ background: "#f4f9f4", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: "#6b7c6b" }}>{k}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: c }}>{v}<span style={{ fontSize: 11, color: "#6b7c6b" }}> {u}</span></div>
              </div>
            ))}
          </div>
          <button style={{ marginTop: 12, width: "100%", padding: "10px 0", background: "#e8f5e8", color: "#2d6a2d", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>+ Add to Today's Meals</button>
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1a", marginBottom: 8 }}>Or search manually:</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {ZAMBIAN_FOODS.map(f => (
            <button key={f.name} onClick={() => setResult(f)} style={{ minWidth: 60, padding: "8px 6px", background: "white", border: "1.5px solid #d4e4d4", borderRadius: 10, cursor: "pointer", textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 20 }}>{f.emoji}</div>
              <div style={{ fontSize: 9, color: "#1a2e1a", fontWeight: 600 }}>{f.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressScreen({ steps, water, weight }) {
  const weekData = [1200, 4500, 7200, 3800, 8100, 6200, 7200];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const maxSteps = Math.max(...weekData);
  return (
    <div style={{ padding: "0 16px 80px", overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 0 8px", fontSize: 18, fontWeight: 700, color: "#1a2e1a" }}>Your Progress</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[["💧", "Water", `${water}/8`, "glasses"], ["👟", "Steps", steps.toLocaleString(), "today"], ["⚖️", "Weight", weight, "kg"]].map(([icon, label, val, sub]) => (
          <div key={label} style={{ background: "white", borderRadius: 12, padding: 12, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize: 22 }}>{icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2e1a" }}>{val}</div>
            <div style={{ fontSize: 9, color: "#6b7c6b" }}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1a", marginBottom: 12 }}>Steps This Week</div>
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80 }}>
          {weekData.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: i === 6 ? "#2d6a2d" : "#d4e4d4", height: `${(v / maxSteps) * 100}%`, minHeight: 4 }} />
              <div style={{ fontSize: 9, color: "#6b7c6b" }}>{days[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1a", marginBottom: 12 }}>Nutrient Balance</div>
        <ProgressBar label="Carbohydrates" value={45} color="#FFD700" />
        <ProgressBar label="Protein" value={30} color="#5cb85c" />
        <ProgressBar label="Healthy Fats" value={25} color="#e07b30" />
        <ProgressBar label="Fibre" value={60} color="#4fc3f7" />
        <ProgressBar label="Vitamins" value={72} color="#ce93d8" />
      </div>
      <div style={{ background: "linear-gradient(135deg,#2d6a2d,#3e8e3e)", borderRadius: 16, padding: 16, color: "white" }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Weekly Goals</div>
        {[["Drink 8 glasses daily", true], ["Log all meals", true], ["10,000 steps/day", false], ["No sugary drinks", true]].map(([g, done]) => (
          <div key={g} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
            <span style={{ fontSize: 14 }}>{done ? "✅" : "⬜"}</span>
            <span style={{ fontSize: 12, opacity: done ? 1 : 0.7 }}>{g}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  const [name, setName] = useState("Keith");
  const [age, setAge] = useState("22");
  const [weight, setWeight] = useState("68");
  const [goal, setGoal] = useState("Maintain Weight");
  const goals = ["Lose Weight", "Maintain Weight", "Gain Muscle", "Eat Healthier"];
  return (
    <div style={{ padding: "0 16px 80px", overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 0 8px", fontSize: 18, fontWeight: 700, color: "#1a2e1a" }}>My Profile</div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: "linear-gradient(135deg,#2d6a2d,#3e8e3e)", borderRadius: 18, padding: 16, color: "white", marginBottom: 16 }}>
        <div style={{ width: 58, height: 58, borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🧑🏾</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{name}</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>🇿🇲 NutriGuide Zambia Member</div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>Goal: {goal}</div>
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1a", marginBottom: 12 }}>Personal Info</div>
        {[["Name", name, setName, "text"], ["Age", age, setAge, "number"], ["Weight (kg)", weight, setWeight, "number"]].map(([label, val, setter, type]) => (
          <div key={label} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#6b7c6b", marginBottom: 4 }}>{label}</div>
            <input value={val} onChange={e => setter(e.target.value)} type={type} style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: "1.5px solid #d4e4d4", fontSize: 13, color: "#1a2e1a", outline: "none", boxSizing: "border-box", background: "#f4f9f4" }} />
          </div>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1a", marginBottom: 10 }}>Health Goal</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {goals.map(g => (
            <button key={g} onClick={() => setGoal(g)} style={{ padding: "10px 8px", borderRadius: 10, border: `1.5px solid ${goal === g ? "#5cb85c" : "#d4e4d4"}`, background: goal === g ? "#e8f5e8" : "transparent", color: goal === g ? "#2d6a2d" : "#1a2e1a", fontWeight: 600, fontSize: 11, cursor: "pointer" }}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: "#e8f5e8", borderRadius: 16, padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 32 }}>🇿🇲</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1a" }}>Made for Zambians.</div>
          <div style={{ fontSize: 11, color: "#6b7c6b" }}>Local food insights. Local solutions. A healthier Zambia starts with you.</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [steps] = useState(7200);
  const [water, setWater] = useState(6);
  const [weight] = useState("68.2");
  const [goal] = useState(78);
  const [tipIndex, setTipIndex] = useState(0);
  const [logged, setLogged] = useState({});

  useEffect(() => {
    const interval = setInterval(() => setTipIndex(i => (i + 1) % TIPS.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "meals", icon: "🍽️", label: "Meals" },
    { id: "scan", icon: "📷", label: "Scan" },
    { id: "progress", icon: "📊", label: "Progress" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f0f0f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 375, height: 720, background: "#f4f9f4", borderRadius: 40, boxShadow: "0 30px 80px rgba(0,0,0,0.25), 0 0 0 8px #1a1a1a", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "white", padding: "10px 20px 6px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #d4e4d4" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#2d6a2d", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 14 }}>🌿</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#1a2e1a" }}>Nutri<span style={{ color: "#2d6a2d" }}>Guide</span></span>
            <span style={{ fontSize: 10, color: "#e07b30", fontWeight: 700 }}>ZAMBIA</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button onClick={() => setWater(w => Math.min(8, w + 1))} style={{ fontSize: 14, background: "none", border: "none", cursor: "pointer" }}>💧</button>
            <span style={{ fontSize: 11, color: "#6b7c6b" }}>8:41</span>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {tab === "home" && <HomeScreen steps={steps} water={water} goal={goal} tip={TIPS[tipIndex]} />}
          {tab === "meals" && <MealsScreen logged={logged} setLogged={setLogged} />}
          {tab === "scan" && <ScanScreen />}
          {tab === "progress" && <ProgressScreen steps={steps} water={water} weight={weight} />}
          {tab === "profile" && <ProfileScreen />}
        </div>
        <div style={{ background: "white", borderTop: "1px solid #d4e4d4", display: "flex", padding: "6px 0 10px" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
              <div style={{ fontSize: 20, lineHeight: 1, filter: tab === t.id ? "none" : "grayscale(1) opacity(0.5)" }}>{t.icon}</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: tab === t.id ? "#2d6a2d" : "#6b7c6b" }}>{t.label}</div>
              {tab === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2d6a2d" }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}