import { useState, useEffect } from "react";

const PROTEGE_PURPLE = "#3B2F8F";
const PROTEGE_VIOLET = "#6C5CE7";
const PROTEGE_LIGHT_PURPLE = "#EDE9FF";
const CONF_PURPLE = "#C4B5FD";

// Mock SAM data
const SAMS = {
  nick: {
    name: "Nick",
    accounts: ["OpenAI", "Apple"],
    color: "#6C5CE7",
    avatar: "N",
    contacts: [
      { id: 1, first: "Aidan", last: "Gomez", company: "Cohere", title: "CEO", email: "aidan@cohere.ai", phone: "+1 415 555 0101", notes: "Met at Databricks breakfast. Very interested in DataLab research.", linkedin: "linkedin.com/in/aidangomez", lastContact: "Apr 7, 2026", tag: "Warm" },
      { id: 2, first: "Sara", last: "Hooker", company: "Cohere", title: "VP Research", email: "sara@cohere.ai", phone: "+1 415 555 0102", notes: "Responded to Touch 2. Wants to see DataLab FICO score methodology.", linkedin: "linkedin.com/in/sara-hooker", lastContact: "Apr 9, 2026", tag: "Hot" },
      { id: 3, first: "Bryan", last: "Catanzaro", company: "NVIDIA", title: "VP Applied Deep Learning", email: "bryan@nvidia.com", phone: "+1 408 555 0103", notes: "Confirmed for dinner June 16.", linkedin: "linkedin.com/in/bryancatanzaro", lastContact: "Apr 12, 2026", tag: "Hot" },
    ],
    meetings: [
      { id: 1, contact: "Aidan Gomez", company: "Cohere", date: "Jun 16, 2026", time: "7:30 AM", location: "The Grove SF", type: "Breakfast", status: "confirmed" },
      { id: 2, contact: "Sara Hooker", company: "Cohere", date: "Jun 16, 2026", time: "7:30 AM", location: "The Grove SF", type: "Breakfast", status: "confirmed" },
      { id: 3, contact: "Bryan Catanzaro", company: "NVIDIA", date: "Jun 16, 2026", time: "7:00 PM", location: "Alexander's Steakhouse", type: "Dinner", status: "confirmed" },
      { id: 4, contact: "Arthur Mensch", company: "Mistral AI", date: "Jun 16, 2026", time: "7:30 AM", location: "The Grove SF", type: "Breakfast", status: "pending" },
    ],
  },
  joe: {
    name: "Joe",
    accounts: ["Meta", "NVIDIA"],
    color: "#0984E3",
    avatar: "J",
    contacts: [
      { id: 1, first: "Bryan", last: "Catanzaro", company: "NVIDIA", title: "VP Applied Deep Learning", email: "bryan@nvidia.com", phone: "+1 408 555 0103", notes: "Top priority. Confirmed for dinner.", linkedin: "linkedin.com/in/bryancatanzaro", lastContact: "Apr 12, 2026", tag: "Hot" },
      { id: 2, first: "Head of", last: "Data Infrastructure", company: "Meta AI", title: "Head of Data Infrastructure", email: "", phone: "", notes: "Need to find specific name via LinkedIn.", linkedin: "linkedin.com search: Head Data Infrastructure Meta AI", lastContact: "", tag: "Awareness" },
    ],
    meetings: [
      { id: 1, contact: "Bryan Catanzaro", company: "NVIDIA", date: "Jun 16, 2026", time: "7:00 PM", location: "Alexander's Steakhouse", type: "Dinner", status: "confirmed" },
      { id: 2, contact: "Meta AI Data Lead", company: "Meta AI", date: "Jun 17, 2026", time: "10:00 AM", location: "Moscone Center", type: "1:1", status: "pending" },
    ],
  },
  isabel: {
    name: "Isabel",
    accounts: ["Anthropic", "Amazon"],
    color: "#00B894",
    avatar: "I",
    contacts: [
      { id: 1, first: "Amanda", last: "Askell", company: "Anthropic", title: "Member of Technical Staff", email: "amanda@anthropic.com", phone: "", notes: "Research alignment track. DataLab governance angle resonates.", linkedin: "linkedin.com/in/amandaaskell", lastContact: "Apr 10, 2026", tag: "Warm" },
      { id: 2, first: "Head of", last: "Pre-Training Data", company: "Anthropic", title: "Head of Pre-Training Data", email: "", phone: "", notes: "Confirm identity via LinkedIn before outreach.", linkedin: "linkedin.com search: Head Pre-Training Data Anthropic", lastContact: "", tag: "Awareness" },
    ],
    meetings: [
      { id: 1, contact: "Amanda Askell", company: "Anthropic", date: "Jun 16, 2026", time: "7:30 AM", location: "The Grove SF", type: "Breakfast", status: "confirmed" },
    ],
  },
  cody: {
    name: "Cody",
    accounts: ["Google", "Microsoft"],
    color: "#E17055",
    avatar: "C",
    contacts: [
      { id: 1, first: "Ed", last: "Chi", company: "Google DeepMind", title: "VP Research", email: "edchi@google.com", phone: "", notes: "Public about data quality gap in production AI. Warm signal.", linkedin: "linkedin.com/in/edchi", lastContact: "Apr 11, 2026", tag: "Warm" },
      { id: 2, first: "Eric", last: "Boyd", company: "Microsoft Azure AI", title: "CVP Azure AI Platform", email: "eric.boyd@microsoft.com", phone: "", notes: "Keynote-level presence at Data+AI Summit. Confirmed attendee.", linkedin: "linkedin.com/in/ericboyd", lastContact: "Apr 8, 2026", tag: "Hot" },
    ],
    meetings: [
      { id: 1, contact: "Ed Chi", company: "Google DeepMind", date: "Jun 16, 2026", time: "7:30 AM", location: "The Grove SF", type: "Breakfast", status: "confirmed" },
      { id: 2, contact: "Eric Boyd", company: "Microsoft Azure AI", date: "Jun 16, 2026", time: "7:00 PM", location: "Alexander's Steakhouse", type: "Dinner", status: "pending" },
    ],
  },
};

const CONFERENCES = [
  {
    name: "Databricks Data+AI Summit",
    dates: "June 15-18, 2026",
    location: "Moscone Center, San Francisco, CA",
    mapLink: "https://maps.google.com/?q=Moscone+Center+San+Francisco",
    days: [15, 16, 17, 18],
    month: 5,
    year: 2026,
    schedule: [
      { time: "8:00 AM", item: "Registration & Badge Pickup, South Lobby" },
      { time: "9:00 AM", item: "Opening Keynote: Ali Ghodsi & Matei Zaharia" },
      { time: "11:00 AM", item: "Data Engineering Track Begins" },
      { time: "12:30 PM", item: "Expo Hall Open, Networking Lunch" },
      { time: "2:00 PM", item: "GenAI & LLM Sessions" },
      { time: "4:00 PM", item: "Workshops Block 1" },
      { time: "6:00 PM", item: "Day 1 Evening Reception, Expo Hall" },
    ],
    protege: [
      "Day 2 (Jun 16): DataLab Breakfast @ The Grove SF, 7:30am",
      "Day 2 (Jun 16): Hosted Dinner @ Alexander's Steakhouse, 7:00pm",
      "Dress code: Business casual",
      "Uber from The Grove to Moscone: ~5 min",
    ],
    misc: [],
  },
  {
    name: "Microsoft Build 2026",
    dates: "May 19-21, 2026",
    location: "Seattle Convention Center, Seattle, WA",
    mapLink: "https://maps.google.com/?q=Seattle+Convention+Center",
    days: [19, 20, 21],
    month: 4,
    year: 2026,
    schedule: [
      { time: "9:00 AM", item: "Keynote: Satya Nadella" },
      { time: "11:00 AM", item: "Azure AI Track Opens" },
      { time: "1:00 PM", item: "Networking Lunch" },
      { time: "3:00 PM", item: "Copilot & Enterprise AI Sessions" },
    ],
    protege: ["Activation TBD — Outreach launching March 2026"],
    misc: [],
  },
];

const TAG_COLORS = {
  Hot: { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
  Warm: { bg: "#FEF9C3", text: "#854D0E", dot: "#EAB308" },
  Awareness: { bg: "#F1F5F9", text: "#475569", dot: "#94A3B8" },
};

const STATUS_CONFIG = {
  confirmed: { label: "Confirmed", bg: "#14532D", text: "#4ADE80", dot: "#22C55E" },
  pending: { label: "Pending", bg: "#713F12", text: "#FDE047", dot: "#FACC15" },
  unconfirmed: { label: "Unconfirmed", bg: "#7F1D1D", text: "#FCA5A5", dot: "#EF4444" },
};

// Storage helpers
const load = async (key) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
};
const save = async (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};

export default function ProtegeApp() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [contacts, setContacts] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [confMisc, setConfMisc] = useState({});
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [showAddMisc, setShowAddMisc] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState(null);
  const [editingMeetingData, setEditingMeetingData] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);
  const [newContact, setNewContact] = useState({ first: "", last: "", company: "", title: "", email: "", phone: "", notes: "", linkedin: "" });
  const [newMeeting, setNewMeeting] = useState({ contact: "", company: "", date: "", time: "", location: "", type: "1:1", status: "pending" });
  const [newMisc, setNewMisc] = useState("");
  const [scanMode, setScanMode] = useState(false);
  const [scannedContact, setScannedContact] = useState(null);
  const [calMonth, setCalMonth] = useState(5); // June = month 5 (0-indexed)
  const [calYear, setCalYear] = useState(2026);
  const [selectedAgendaDay, setSelectedAgendaDay] = useState(null); // { day, conf }
  const [agendaDate, setAgendaDate] = useState("Jun 16, 2026");
  const DEFAULT_AGENDA = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 8;
    const label = hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`;
    return { time: label, item: "" };
  });
  const [agendaItems, setAgendaItems] = useState(DEFAULT_AGENDA);

  useEffect(() => {
    if (user) {
      (async () => {
        const c = await load(`contacts_${user}`);
        const m = await load(`meetings_${user}`);
        const mi = await load(`misc_${user}`);
        setContacts(c || SAMS[user].contacts);
        setMeetings(m || SAMS[user].meetings);
        setConfMisc(mi || {});
      })();
    }
  }, [user]);

  const saveContacts = (c) => { setContacts(c); save(`contacts_${user}`, c); };
  const saveMeetings = (m) => { setMeetings(m); save(`meetings_${user}`, m); };
  const saveMisc = (m) => { setConfMisc(m); save(`misc_${user}`, m); };

  const sam = user ? SAMS[user] : null;

  // Calendar helpers
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fullMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const confDays = CONFERENCES.flatMap(c => c.month === calMonth && c.year === calYear ? c.days : []);
  const confDayMap = {};
  CONFERENCES.forEach(c => { if (c.month === calMonth && c.year === calYear) { const abbrev = c.name.split(" ")[0].substring(0,6); c.days.forEach(d => { confDayMap[d] = abbrev; }); } });
  const confFirstDays = {};
  CONFERENCES.forEach(c => { if (c.month === calMonth && c.year === calYear && c.days.length > 0) confFirstDays[c.days[0]] = c.name; });
  const meetingDays = meetings.map(m => {
    const d = new Date(m.date);
    if (d.getMonth() === calMonth && d.getFullYear() === calYear) return d.getDate();
    return null;
  }).filter(Boolean);

  // Login screen
  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0714", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #6C5CE7, #A29BFE)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: 24 }}>⚡</div>
          <div style={{ color: "#fff", fontSize: 26, fontWeight: "bold", letterSpacing: "0.04em" }}>Protege Field</div>
          <div style={{ color: "#8B7FD4", fontSize: 13, marginTop: 4, fontFamily: "Arial, sans-serif", fontStyle: "italic" }}>Conference Intelligence for SAMs</div>
        </div>
        <div style={{ width: "100%", maxWidth: 340 }}>
          <div style={{ color: "#8B7FD4", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Select your account</div>
          {Object.entries(SAMS).map(([key, s]) => (
            <button key={key} onClick={() => setUser(key)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.25)", borderRadius: 14, padding: "14px 18px", marginBottom: 10, cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(108,92,231,0.18)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(108,92,231,0.08)"}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 16, fontFamily: "Arial, sans-serif" }}>{s.avatar}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>{s.name}</div>
                <div style={{ color: "#8B7FD4", fontSize: 12, marginTop: 2 }}>{s.accounts.join(" · ")}</div>
              </div>
              <div style={{ marginLeft: "auto", color: "#6C5CE7", fontSize: 18 }}>›</div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 32, color: "#4A3F80", fontSize: 11, textAlign: "center" }}>Protege Field v1.0 · Hackathon Demo</div>
      </div>
    );
  }

  const tabs = [
    { id: "home", icon: "⌂", label: "Home" },
    { id: "clients", icon: "◎", label: "Clients" },
    { id: "meetings", icon: "◈", label: "Meetings" },
    { id: "conference", icon: "✦", label: "Conf. Info" },
    { id: "scanner", icon: "⬡", label: "Scanner" },
  ];

  const renderHome = () => (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${PROTEGE_PURPLE}, #1A1040)`, padding: "20px 20px 16px", borderBottom: "1px solid rgba(108,92,231,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div>
            <div style={{ color: "#A29BFE", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Good morning</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>{sam.name}</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {sam.accounts.map(a => <span key={a} style={{ background: "rgba(108,92,231,0.3)", color: "#A29BFE", fontSize: 10, padding: "3px 8px", borderRadius: 20, border: "1px solid rgba(108,92,231,0.3)" }}>{a}</span>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "8px 14px", flex: 1, textAlign: "center" }}>
            <div style={{ color: "#A29BFE", fontSize: 20, fontWeight: "bold" }}>{meetings.filter(m => m.status === "confirmed").length}</div>
            <div style={{ color: "#6C5CE7", fontSize: 10 }}>Confirmed</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "8px 14px", flex: 1, textAlign: "center" }}>
            <div style={{ color: "#EAB308", fontSize: 20, fontWeight: "bold" }}>{meetings.filter(m => m.status === "pending").length}</div>
            <div style={{ color: "#6C5CE7", fontSize: 10 }}>Pending</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "8px 14px", flex: 1, textAlign: "center" }}>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{contacts.length}</div>
            <div style={{ color: "#6C5CE7", fontSize: 10 }}>Contacts</div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div style={{ background: "#0F0A1E", padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => { let m = calMonth - 1; let y = calYear; if (m < 0) { m = 11; y--; } setCalMonth(m); setCalYear(y); }} style={{ background: "none", border: "none", color: "#6C5CE7", fontSize: 18, cursor: "pointer" }}>‹</button>
          <div style={{ color: "#fff", fontWeight: "bold", fontFamily: "Arial, sans-serif", fontSize: 15 }}>{fullMonths[calMonth]} {calYear}</div>
          <button onClick={() => { let m = calMonth + 1; let y = calYear; if (m > 11) { m = 0; y++; } setCalMonth(m); setCalYear(y); }} style={{ background: "none", border: "none", color: "#6C5CE7", fontSize: 18, cursor: "pointer" }}>›</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
          {["S","M","T","W","T","F","S"].map((d,i) => <div key={i} style={{ color: "#4A3F80", fontSize: 10, textAlign: "center", padding: "4px 0" }}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const day = i + 1;
            const isConf = confDays.includes(day);
            const hasMeeting = meetingDays.includes(day);
            const isToday = day === 19 && calMonth === 3 && calYear === 2026;
            return (
              <div key={day}
                onClick={() => {
                  if (isConf) {
                    const conf = CONFERENCES.find(c => c.month === calMonth && c.year === calYear && c.days.includes(day));
                    if (conf) setSelectedAgendaDay({ day, conf });
                  }
                }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 8, background: isConf ? PROTEGE_LIGHT_PURPLE : isToday ? "rgba(108,92,231,0.3)" : "transparent", position: "relative", padding: "2px 1px", minHeight: 36, cursor: isConf ? "pointer" : "default" }}>
                <span style={{ color: isConf ? PROTEGE_PURPLE : isToday ? "#A29BFE" : "#ccc", fontSize: 12, fontWeight: isConf || isToday ? "bold" : "normal", lineHeight: 1.2 }}>{day}</span>
                {isConf && confDayMap[day] && <span style={{ color: PROTEGE_PURPLE, fontSize: 7, fontWeight: "bold", letterSpacing: "0.02em", lineHeight: 1, textAlign: "center", maxWidth: "100%", overflow: "hidden" }}>{confDayMap[day]}</span>}
                {hasMeeting && <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 3, height: 3, borderRadius: "50%", background: "#6C5CE7" }} />}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: PROTEGE_LIGHT_PURPLE }} /><span style={{ color: "#8B7FD4", fontSize: 10 }}>Conference · tap to view schedule</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 4, height: 4, borderRadius: "50%", background: "#6C5CE7" }} /><span style={{ color: "#8B7FD4", fontSize: 10 }}>Meeting</span></div>
        </div>
      </div>

      {/* Conference Day Agenda Modal */}
      {selectedAgendaDay && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "flex-end" }} onClick={() => setSelectedAgendaDay(null)}>
          <div style={{ background: "#0F0A1E", borderRadius: "20px 20px 0 0", padding: "0 0 32px", width: "100%", border: "1px solid rgba(108,92,231,0.3)", maxHeight: "80vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ background: `linear-gradient(135deg, ${PROTEGE_PURPLE}, #1A1040)`, borderRadius: "20px 20px 0 0", padding: "20px 20px 16px", position: "sticky", top: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: "#A29BFE", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Daily Agenda</div>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: 17, marginTop: 2 }}>{selectedAgendaDay.conf.name}</div>
                  <div style={{ color: "#8B7FD4", fontSize: 12, marginTop: 3 }}>
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][selectedAgendaDay.conf.month]} {selectedAgendaDay.day}, {selectedAgendaDay.conf.year} · {selectedAgendaDay.conf.location}
                  </div>
                </div>
                <button onClick={() => setSelectedAgendaDay(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <div style={{ color: "#6C5CE7", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Conference Schedule</div>
              {selectedAgendaDay.conf.schedule.map((s, si) => (
                <div key={si} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ color: "#6C5CE7", fontSize: 11, width: 62, flexShrink: 0, paddingTop: 2 }}>{s.time}</div>
                  <div style={{ flex: 1, background: "rgba(108,92,231,0.08)", borderRadius: 8, padding: "7px 10px", borderLeft: "2px solid rgba(108,92,231,0.4)" }}>
                    <div style={{ color: "#ccc", fontSize: 13, lineHeight: 1.4 }}>{s.item}</div>
                  </div>
                </div>
              ))}
              {selectedAgendaDay.conf.protege.length > 0 && (
                <div>
                  <div style={{ color: "#A29BFE", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 14, marginBottom: 10 }}>⚡ Protege Activations</div>
                  {selectedAgendaDay.conf.protege.map((p, pi) => (
                    <div key={pi} style={{ background: "rgba(108,92,231,0.12)", border: "1px solid rgba(108,92,231,0.25)", borderRadius: 8, padding: "8px 12px", marginBottom: 6, borderLeft: "3px solid #6C5CE7" }}>
                      <div style={{ color: "#A29BFE", fontSize: 13 }}>{p}</div>
                    </div>
                  ))}
                </div>
              )}
              {(() => {
                const dayMeetings = meetings.filter(m => {
                  const d = new Date(m.date);
                  return d.getDate() === selectedAgendaDay.day && d.getMonth() === selectedAgendaDay.conf.month && d.getFullYear() === selectedAgendaDay.conf.year;
                });
                if (!dayMeetings.length) return null;
                return (
                  <div>
                    <div style={{ color: "#8B7FD4", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 14, marginBottom: 10 }}>Your Meetings This Day</div>
                    {dayMeetings.map(m => {
                      const isEditingThis = editingMeetingId === m.id;
                      const eData = isEditingThis ? editingMeetingData : m;
                      const inputS = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(108,92,231,0.3)", borderRadius: 6, padding: "5px 8px", color: "#fff", fontSize: 12, outline: "none", fontFamily: "Arial, sans-serif", width: "100%", boxSizing: "border-box" };
                      return (
                        <div key={m.id} style={{ background: "#0A0714", border: `1px solid ${isEditingThis ? "#6C5CE7" : "rgba(34,197,94,0.25)"}`, borderRadius: 10, padding: "10px 12px", marginBottom: 8, borderLeft: "3px solid #22C55E" }}>
                          {isEditingThis ? (
                            <div>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
                                <div><div style={{ color: "#6C5CE7", fontSize: 10, textTransform: "uppercase", marginBottom: 3 }}>Contact</div><input value={eData.contact} onChange={e => setEditingMeetingData(p => ({ ...p, contact: e.target.value }))} style={inputS} /></div>
                                <div><div style={{ color: "#6C5CE7", fontSize: 10, textTransform: "uppercase", marginBottom: 3 }}>Time</div><input value={eData.time} onChange={e => setEditingMeetingData(p => ({ ...p, time: e.target.value }))} style={inputS} /></div>
                              </div>
                              <div style={{ marginBottom: 6 }}><div style={{ color: "#6C5CE7", fontSize: 10, textTransform: "uppercase", marginBottom: 3 }}>Location</div><input value={eData.location} onChange={e => setEditingMeetingData(p => ({ ...p, location: e.target.value }))} style={inputS} /></div>
                              <div style={{ marginBottom: 10 }}>
                                <div style={{ color: "#6C5CE7", fontSize: 10, textTransform: "uppercase", marginBottom: 3 }}>Status</div>
                                <select value={eData.status} onChange={e => setEditingMeetingData(p => ({ ...p, status: e.target.value }))} style={{ ...inputS }}>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="pending">Pending</option>
                                  <option value="unconfirmed">Unconfirmed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button onClick={() => { setEditingMeetingId(null); setEditingMeetingData({}); }} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", borderRadius: 7, padding: "7px 0", cursor: "pointer", fontSize: 12 }}>Cancel</button>
                                <button onClick={() => { saveMeetings(meetings.map(x => x.id === m.id ? { ...x, ...editingMeetingData } : x)); setEditingMeetingId(null); setEditingMeetingData({}); }} style={{ flex: 2, background: "#6C5CE7", border: "none", color: "#fff", borderRadius: 7, padding: "7px 0", cursor: "pointer", fontWeight: "bold", fontSize: 12 }}>Save</button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
                                  <div style={{ color: "#22C55E", fontWeight: "bold", fontSize: 14, textDecoration: eData.status === "cancelled" ? "line-through" : "none" }}>{m.contact}</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{ color: "#6C5CE7", fontSize: 12 }}>{m.time}</span>
                                  <button onClick={() => { setEditingMeetingId(m.id); setEditingMeetingData({ ...m }); }} style={{ background: "rgba(108,92,231,0.2)", border: "1px solid rgba(108,92,231,0.4)", color: "#A29BFE", borderRadius: 6, padding: "2px 8px", cursor: "pointer", fontSize: 11 }}>Edit</button>
                                </div>
                              </div>
                              <div style={{ color: "#8B7FD4", fontSize: 12 }}>{m.company} · {m.type}</div>
                              <div style={{ color: "#4A3F80", fontSize: 12, marginTop: 2 }}>📍 {m.location}</div>
                              {eData.status === "cancelled" && <div style={{ color: "#EF4444", fontSize: 11, marginTop: 4, fontWeight: "bold" }}>✕ Cancelled</div>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Agenda */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ color: "#6C5CE7", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Daily Agenda</div>
          <input
            value={agendaDate}
            onChange={e => setAgendaDate(e.target.value)}
            style={{ background: "rgba(108,92,231,0.1)", border: "1px solid rgba(108,92,231,0.25)", borderRadius: 8, padding: "4px 10px", color: "#A29BFE", fontSize: 12, outline: "none", fontFamily: "Arial, sans-serif", width: 120, textAlign: "right" }}
          />
        </div>
        {agendaItems.map((row, i) => {
          const mts = meetings.filter(m => m.date === agendaDate && m.time === row.time);
          return (
            <div key={i} style={{ display: "flex", gap: 8, minHeight: 36, borderLeft: "1px solid rgba(108,92,231,0.15)", paddingLeft: 10, marginBottom: 2, alignItems: "flex-start" }}>
              <input
                value={row.time}
                onChange={e => {
                  const updated = agendaItems.map((r, ri) => ri === i ? { ...r, time: e.target.value } : r);
                  setAgendaItems(updated);
                }}
                style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(108,92,231,0.2)", color: "#6C5CE7", fontSize: 10, width: 58, outline: "none", fontFamily: "Arial, sans-serif", paddingBottom: 1, flexShrink: 0, marginTop: 3 }}
              />
              <div style={{ flex: 1, paddingTop: 2, paddingBottom: 4 }}>
                <input
                  value={row.item}
                  onChange={e => {
                    const updated = agendaItems.map((r, ri) => ri === i ? { ...r, item: e.target.value } : r);
                    setAgendaItems(updated);
                  }}
                  placeholder="Add agenda item..."
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: row.item ? "1px solid rgba(108,92,231,0.15)" : "1px dashed rgba(108,92,231,0.1)", color: row.item ? "#ccc" : "#4A3F80", fontSize: 12, outline: "none", fontFamily: "Arial, sans-serif", paddingBottom: 2, marginBottom: mts.length ? 4 : 0 }}
                />
                {mts.map((m, mi) => (
                  <div key={mi} style={{ background: STATUS_CONFIG[m.status].bg, border: `1px solid ${STATUS_CONFIG[m.status].dot}30`, borderRadius: 6, padding: "4px 8px", marginBottom: 2 }}>
                    <div style={{ color: STATUS_CONFIG[m.status].text, fontSize: 12, fontWeight: "bold" }}>{m.contact}</div>
                    <div style={{ color: STATUS_CONFIG[m.status].text, fontSize: 10, opacity: 0.8 }}>{m.company} · {m.type} · {m.location}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderClients = () => (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(135deg, ${PROTEGE_PURPLE}, #1A1040)`, padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>Clients</div>
          <button onClick={() => setShowAddContact(true)} style={{ background: "#6C5CE7", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>+</button>
        </div>
        <div style={{ color: "#8B7FD4", fontSize: 12, marginTop: 4 }}>{contacts.length} contacts loaded</div>
      </div>

      {selectedContact ? (
        <div style={{ padding: 20 }}>
          <button onClick={() => setSelectedContact(null)} style={{ background: "none", border: "none", color: "#6C5CE7", cursor: "pointer", fontSize: 14, marginBottom: 16, padding: 0 }}>‹ Back</button>
          <div style={{ background: "#0F0A1E", borderRadius: 16, padding: 20, border: "1px solid rgba(108,92,231,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: sam.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 18, fontFamily: "Arial, sans-serif" }}>{selectedContact.first[0]}</div>
              <div>
                <div style={{ color: "#fff", fontWeight: "bold", fontSize: 17 }}>{selectedContact.first} {selectedContact.last}</div>
                <div style={{ color: "#8B7FD4", fontSize: 13 }}>{selectedContact.title}</div>
                <div style={{ color: "#6C5CE7", fontSize: 12 }}>{selectedContact.company}</div>
              </div>
              <span style={{ marginLeft: "auto", background: TAG_COLORS[selectedContact.tag]?.bg, color: TAG_COLORS[selectedContact.tag]?.text, fontSize: 11, padding: "3px 10px", borderRadius: 20 }}>{selectedContact.tag}</span>
            </div>
            {[
              ["✉", "email", selectedContact.email, "#ccc"],
              ["✆", "phone", selectedContact.phone, "#ccc"],
              ["in", "linkedin", selectedContact.linkedin, "#A29BFE"],
            ].map(([icon, field, val]) => (
              <div key={field} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
                <span style={{ color: "#6C5CE7", width: 20, flexShrink: 0 }}>{icon}</span>
                <input
                  value={val || ""}
                  placeholder={field === "email" ? "Add email..." : field === "phone" ? "Add phone..." : "Add LinkedIn..."}
                  onChange={e => {
                    const updated = contacts.map(c => c.id === selectedContact.id ? { ...c, [field]: e.target.value } : c);
                    saveContacts(updated);
                    setSelectedContact(prev => ({ ...prev, [field]: e.target.value }));
                  }}
                  style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(108,92,231,0.2)", borderRadius: 8, padding: "6px 10px", color: field === "linkedin" ? "#A29BFE" : "#ccc", fontSize: 13, outline: "none", fontFamily: "Arial, sans-serif" }}
                />
              </div>
            ))}
            {selectedContact.lastContact && <div style={{ background: "rgba(108,92,231,0.1)", borderRadius: 8, padding: 10, marginTop: 8 }}>
              <div style={{ color: "#8B7FD4", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Last Contact</div>
              <div style={{ color: "#ccc", fontSize: 13, marginTop: 2 }}>{selectedContact.lastContact}</div>
            </div>}
            <div style={{ background: "rgba(108,92,231,0.1)", borderRadius: 8, padding: 10, marginTop: 8 }}>
              <div style={{ color: "#8B7FD4", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Notes</div>
              <textarea
                value={selectedContact.notes || ""}
                onChange={e => {
                  const updated = contacts.map(c => c.id === selectedContact.id ? { ...c, notes: e.target.value } : c);
                  saveContacts(updated);
                  setSelectedContact(prev => ({ ...prev, notes: e.target.value }));
                }}
                placeholder="Add notes..."
                rows={4}
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(108,92,231,0.25)", borderRadius: 8, padding: "8px 10px", color: "#ccc", fontSize: 13, lineHeight: 1.5, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "Arial, sans-serif" }}
              />
            </div>
            <button style={{ width: "100%", background: "#6C5CE7", border: "none", color: "#fff", borderRadius: 10, padding: "12px 0", marginTop: 14, cursor: "pointer", fontWeight: "bold", fontSize: 14 }}>Send Outreach Email →</button>
            <button onClick={() => { if (window.confirm(`Delete ${selectedContact.first} ${selectedContact.last}?`)) { saveContacts(contacts.filter(c => c.id !== selectedContact.id)); setSelectedContact(null); } }} style={{ width: "100%", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.4)", color: "#EF4444", borderRadius: 10, padding: "11px 0", marginTop: 8, cursor: "pointer", fontWeight: "bold", fontSize: 14 }}>Delete Contact</button>
          </div>
        </div>
      ) : (
        <div style={{ padding: "16px 20px" }}>
          {contacts.map(c => (
            <button key={c.id} onClick={() => setSelectedContact(c)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, background: "#0F0A1E", border: "1px solid rgba(108,92,231,0.15)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, cursor: "pointer", textAlign: "left" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: sam.color + "33", border: `1px solid ${sam.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: sam.color, fontWeight: "bold", fontSize: 14, fontFamily: "Arial, sans-serif", flexShrink: 0 }}>{c.first[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{c.first} {c.last}</div>
                <div style={{ color: "#8B7FD4", fontSize: 12 }}>{c.title} · {c.company}</div>
              </div>
              <span style={{ background: TAG_COLORS[c.tag]?.bg, color: TAG_COLORS[c.tag]?.text, fontSize: 10, padding: "2px 8px", borderRadius: 20, flexShrink: 0 }}>{c.tag}</span>
            </button>
          ))}
        </div>
      )}

      {showAddContact && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#0F0A1E", borderRadius: "20px 20px 0 0", padding: 24, width: "100%", border: "1px solid rgba(108,92,231,0.3)" }}>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 16, fontFamily: "Arial, sans-serif" }}>Add Contact</div>
            {[["First Name", "first"], ["Last Name", "last"], ["Company", "company"], ["Title", "title"], ["Email", "email"], ["Phone", "phone"], ["LinkedIn", "linkedin"], ["Notes", "notes"]].map(([label, field]) => (
              <div key={field} style={{ marginBottom: 10 }}>
                <div style={{ color: "#8B7FD4", fontSize: 11, marginBottom: 4 }}>{label}</div>
                <input value={newContact[field]} onChange={e => setNewContact(p => ({ ...p, [field]: e.target.value }))} style={{ width: "100%", background: "rgba(108,92,231,0.1)", border: "1px solid rgba(108,92,231,0.25)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={() => setShowAddContact(false)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", borderRadius: 10, padding: "11px 0", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { const c = { ...newContact, id: Date.now(), tag: "Awareness", lastContact: "" }; saveContacts([...contacts, c]); setShowAddContact(false); setNewContact({ first: "", last: "", company: "", title: "", email: "", phone: "", notes: "", linkedin: "" }); }} style={{ flex: 1, background: "#6C5CE7", border: "none", color: "#fff", borderRadius: 10, padding: "11px 0", cursor: "pointer", fontWeight: "bold" }}>Add Contact</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMeetings = () => (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(135deg, ${PROTEGE_PURPLE}, #1A1040)`, padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>Meetings</div>
          <button onClick={() => setShowAddMeeting(true)} style={{ background: "#6C5CE7", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>+</button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {[...Object.entries(STATUS_CONFIG), ["cancelled", { label: "Cancelled", bg: "#1E293B", text: "#94A3B8", dot: "#64748B" }]].map(([k, v]) => (
            <div key={k} style={{ background: v.bg + "33", border: `1px solid ${v.dot}40`, borderRadius: 8, padding: "4px 10px", display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: v.dot }} />
              <span style={{ color: v.text, fontSize: 11 }}>{meetings.filter(m => m.status === k).length} {v.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 20px" }}>
        {["confirmed", "pending", "unconfirmed", "cancelled"].map(status => {
          const cfg = status === "cancelled"
            ? { label: "Cancelled", bg: "#1E293B", text: "#94A3B8", dot: "#64748B" }
            : STATUS_CONFIG[status];
          const group = meetings.filter(m => m.status === status);
          if (!group.length) return null;
          return (
            <div key={status} style={{ marginBottom: 20 }}>
              <div style={{ color: cfg.text, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot }} />{cfg.label}
              </div>
              {group.map(m => {
                const isEditing = editingMeetingId === m.id;
                const eData = isEditing ? editingMeetingData : m;
                const inputStyle = { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(108,92,231,0.3)", borderRadius: 7, padding: "5px 8px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "Arial, sans-serif", boxSizing: "border-box" };
                const labelStyle = { color: "#6C5CE7", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 };
                return (
                  <div key={m.id} style={{ background: "#0F0A1E", border: `1px solid ${isEditing ? "#6C5CE7" : cfg.dot + "30"}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8, borderLeft: `3px solid ${isEditing ? "#6C5CE7" : cfg.dot}` }}>
                    {isEditing ? (
                      <div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                          <div><div style={labelStyle}>Contact</div><input value={eData.contact} onChange={e => setEditingMeetingData(p => ({ ...p, contact: e.target.value }))} style={inputStyle} /></div>
                          <div><div style={labelStyle}>Company</div><input value={eData.company} onChange={e => setEditingMeetingData(p => ({ ...p, company: e.target.value }))} style={inputStyle} /></div>
                          <div><div style={labelStyle}>Date</div><input value={eData.date} onChange={e => setEditingMeetingData(p => ({ ...p, date: e.target.value }))} style={inputStyle} /></div>
                          <div><div style={labelStyle}>Time</div><input value={eData.time} onChange={e => setEditingMeetingData(p => ({ ...p, time: e.target.value }))} style={inputStyle} /></div>
                        </div>
                        <div style={{ marginBottom: 8 }}><div style={labelStyle}>Location</div><input value={eData.location} onChange={e => setEditingMeetingData(p => ({ ...p, location: e.target.value }))} style={inputStyle} /></div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                          <div>
                            <div style={labelStyle}>Type</div>
                            <select value={eData.type} onChange={e => setEditingMeetingData(p => ({ ...p, type: e.target.value }))} style={{ ...inputStyle }}>
                              {["Breakfast","Dinner","1:1","Call","Demo","Follow-up"].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <div>
                            <div style={labelStyle}>Status</div>
                            <select value={eData.status} onChange={e => setEditingMeetingData(p => ({ ...p, status: e.target.value }))} style={{ ...inputStyle }}>
                              <option value="confirmed">Confirmed</option>
                              <option value="pending">Pending</option>
                              <option value="unconfirmed">Unconfirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => { setEditingMeetingId(null); setEditingMeetingData({}); }} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", borderRadius: 8, padding: "8px 0", cursor: "pointer", fontSize: 13 }}>Cancel</button>
                          <button onClick={() => { saveMeetings(meetings.map(x => x.id === m.id ? { ...x, ...editingMeetingData } : x)); setEditingMeetingId(null); setEditingMeetingData({}); }} style={{ flex: 2, background: "#6C5CE7", border: "none", color: "#fff", borderRadius: 8, padding: "8px 0", cursor: "pointer", fontWeight: "bold", fontSize: 13 }}>Save Changes</button>
                          <button onClick={() => { if (window.confirm("Delete this meeting?")) { saveMeetings(meetings.filter(x => x.id !== m.id)); setEditingMeetingId(null); } }} style={{ flex: 1, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#EF4444", borderRadius: 8, padding: "8px 0", cursor: "pointer", fontSize: 13 }}>Delete</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                          <div>
                            <div style={{ color: status === "cancelled" ? "#94A3B8" : "#fff", fontWeight: "bold", fontSize: 14, textDecoration: status === "cancelled" ? "line-through" : "none" }}>{m.contact}</div>
                            <div style={{ color: "#8B7FD4", fontSize: 12, marginTop: 1 }}>{m.company}</div>
                          </div>
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <span style={{ background: cfg.bg, color: cfg.text, fontSize: 10, padding: "3px 8px", borderRadius: 20 }}>{m.type}</span>
                            <button onClick={() => { setEditingMeetingId(m.id); setEditingMeetingData({ ...m }); }} style={{ background: "rgba(108,92,231,0.15)", border: "1px solid rgba(108,92,231,0.3)", color: "#A29BFE", borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11 }}>Edit</button>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ color: "#6C5CE7", fontSize: 12 }}>📅 {m.date}</span>
                          <span style={{ color: "#6C5CE7", fontSize: 12 }}>⏰ {m.time}</span>
                        </div>
                        <div style={{ color: "#4A3F80", fontSize: 12, marginTop: 4 }}>📍 {m.location}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {showAddMeeting && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#0F0A1E", borderRadius: "20px 20px 0 0", padding: 24, width: "100%", border: "1px solid rgba(108,92,231,0.3)" }}>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 16, fontFamily: "Arial, sans-serif" }}>Add Meeting</div>
            {[["Contact Name", "contact"], ["Company", "company"], ["Date (e.g. Jun 16, 2026)", "date"], ["Time (e.g. 7:30 AM)", "time"], ["Location", "location"]].map(([label, field]) => (
              <div key={field} style={{ marginBottom: 10 }}>
                <div style={{ color: "#8B7FD4", fontSize: 11, marginBottom: 4 }}>{label}</div>
                <input value={newMeeting[field]} onChange={e => setNewMeeting(p => ({ ...p, [field]: e.target.value }))} style={{ width: "100%", background: "rgba(108,92,231,0.1)", border: "1px solid rgba(108,92,231,0.25)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: "#8B7FD4", fontSize: 11, marginBottom: 4 }}>Status</div>
              <select value={newMeeting.status} onChange={e => setNewMeeting(p => ({ ...p, status: e.target.value }))} style={{ width: "100%", background: "rgba(108,92,231,0.1)", border: "1px solid rgba(108,92,231,0.25)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 14 }}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="unconfirmed">Unconfirmed</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={() => setShowAddMeeting(false)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", borderRadius: 10, padding: "11px 0", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { const m = { ...newMeeting, id: Date.now() }; saveMeetings([...meetings, m]); setShowAddMeeting(false); setNewMeeting({ contact: "", company: "", date: "", time: "", location: "", type: "1:1", status: "pending" }); }} style={{ flex: 1, background: "#6C5CE7", border: "none", color: "#fff", borderRadius: 10, padding: "11px 0", cursor: "pointer", fontWeight: "bold" }}>Add Meeting</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderConference = () => (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(135deg, ${PROTEGE_PURPLE}, #1A1040)`, padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>Conference Info</div>
          <button onClick={() => setShowAddMisc(true)} style={{ background: "#6C5CE7", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>+</button>
        </div>
        <div style={{ color: "#8B7FD4", fontSize: 12, marginTop: 4 }}>Know Before You Go</div>
      </div>
      <div style={{ padding: "16px 20px" }}>
        {CONFERENCES.map((conf, ci) => (
          <div key={ci} style={{ background: "#0F0A1E", border: "1px solid rgba(108,92,231,0.2)", borderRadius: 16, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ background: "rgba(108,92,231,0.15)", padding: "14px 16px", borderBottom: "1px solid rgba(108,92,231,0.15)" }}>
              <div style={{ color: "#A29BFE", fontWeight: "bold", fontSize: 15, fontFamily: "Arial, sans-serif" }}>{conf.name}</div>
              <div style={{ color: "#6C5CE7", fontSize: 12, marginTop: 4 }}>📅 {conf.dates}</div>
              <a href={conf.mapLink} target="_blank" rel="noreferrer" style={{ color: "#8B7FD4", fontSize: 12, display: "block", marginTop: 2, textDecoration: "none" }}>📍 {conf.location} (open map →)</a>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ color: "#6C5CE7", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Rough Schedule</div>
              {conf.schedule.map((s, si) => (
                <div key={si} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                  <div style={{ color: "#4A3F80", fontSize: 11, width: 60, flexShrink: 0 }}>{s.time}</div>
                  <div style={{ color: "#ccc", fontSize: 12, lineHeight: 1.4 }}>{s.item}</div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(108,92,231,0.15)", paddingTop: 12, marginTop: 10 }}>
                <div style={{ color: "#A29BFE", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>⚡ Protege Notes</div>
                {conf.protege.map((p, pi) => (
                  <div key={pi} style={{ color: "#ccc", fontSize: 12, marginBottom: 4, paddingLeft: 10, borderLeft: "2px solid #6C5CE7" }}>{p}</div>
                ))}
              </div>
              {(confMisc[conf.name] || []).length > 0 && (
                <div style={{ borderTop: "1px solid rgba(108,92,231,0.15)", paddingTop: 12, marginTop: 10 }}>
                  <div style={{ color: "#8B7FD4", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Your Notes</div>
                  {(confMisc[conf.name] || []).map((note, ni) => (
                    <div key={ni} style={{ color: "#ccc", fontSize: 12, marginBottom: 4, background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "6px 10px" }}>{note}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddMisc && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#0F0A1E", borderRadius: "20px 20px 0 0", padding: 24, width: "100%", border: "1px solid rgba(108,92,231,0.3)" }}>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 16, fontFamily: "Arial, sans-serif" }}>Add Conference Note</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: "#8B7FD4", fontSize: 11, marginBottom: 4 }}>Conference</div>
              <select style={{ width: "100%", background: "rgba(108,92,231,0.1)", border: "1px solid rgba(108,92,231,0.25)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 14 }} id="miscConf">
                {CONFERENCES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: "#8B7FD4", fontSize: 11, marginBottom: 4 }}>Note</div>
              <textarea value={newMisc} onChange={e => setNewMisc(e.target.value)} rows={3} style={{ width: "100%", background: "rgba(108,92,231,0.1)", border: "1px solid rgba(108,92,231,0.25)", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 14, boxSizing: "border-box", resize: "none" }} />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={() => setShowAddMisc(false)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", borderRadius: 10, padding: "11px 0", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => {
                const sel = document.getElementById("miscConf")?.value || CONFERENCES[0].name;
                const updated = { ...confMisc, [sel]: [...(confMisc[sel] || []), newMisc] };
                saveMisc(updated); setShowAddMisc(false); setNewMisc("");
              }} style={{ flex: 1, background: "#6C5CE7", border: "none", color: "#fff", borderRadius: 10, padding: "11px 0", cursor: "pointer", fontWeight: "bold" }}>Add Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const SAMPLE_BADGES = [
    { first: "Naveen", last: "Rao", company: "Databricks", title: "VP of AI", linkedin: "linkedin.com/in/naveenrao", email: "naveen@databricks.com" },
    { first: "CJ", last: "Desai", company: "ServiceNow", title: "President & COO", linkedin: "linkedin.com/in/cjdesai", email: "cj@servicenow.com" },
    { first: "Martin", last: "Casado", company: "a16z", title: "General Partner", linkedin: "linkedin.com/in/martin-casado", email: "martin@a16z.com" },
  ];

  const renderScanner = () => (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(135deg, ${PROTEGE_PURPLE}, #1A1040)`, padding: "20px 20px 16px" }}>
        <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>Badge Scanner</div>
        <div style={{ color: "#8B7FD4", fontSize: 12, marginTop: 4 }}>Scan a badge to add instantly to Clients</div>
      </div>
      <div style={{ padding: "20px 20px" }}>
        {!scanMode && !scannedContact ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ background: "#0F0A1E", border: "2px dashed rgba(108,92,231,0.4)", borderRadius: 20, padding: "40px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⬡</div>
              <div style={{ color: "#A29BFE", fontWeight: "bold", fontSize: 16, fontFamily: "Arial, sans-serif" }}>Tap to Scan Badge</div>
              <div style={{ color: "#4A3F80", fontSize: 13, marginTop: 8 }}>Point camera at conference badge to extract contact info via LinkedIn</div>
              <button onClick={() => setScanMode(true)} style={{ background: "#6C5CE7", border: "none", color: "#fff", borderRadius: 12, padding: "13px 32px", marginTop: 20, cursor: "pointer", fontWeight: "bold", fontSize: 15 }}>Open Camera</button>
            </div>
            <div style={{ color: "#4A3F80", fontSize: 12, marginBottom: 12 }}>Or simulate a badge scan:</div>
            {SAMPLE_BADGES.map((b, i) => (
              <button key={i} onClick={() => { setScanMode(false); setScannedContact({ ...b, id: Date.now(), tag: "Awareness", notes: "", lastContact: "", phone: "" }); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, background: "#0F0A1E", border: "1px solid rgba(108,92,231,0.2)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(108,92,231,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#A29BFE", fontWeight: "bold", fontSize: 14 }}>{b.first[0]}</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{b.first} {b.last}</div>
                  <div style={{ color: "#8B7FD4", fontSize: 12 }}>{b.title} · {b.company}</div>
                </div>
                <span style={{ marginLeft: "auto", color: "#6C5CE7", fontSize: 18 }}>›</span>
              </button>
            ))}
          </div>
        ) : scanMode ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ background: "#0F0A1E", borderRadius: 20, padding: 20, marginBottom: 16 }}>
              <div style={{ width: "100%", aspectRatio: "4/3", background: "rgba(0,0,0,0.5)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #6C5CE7", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(108,92,231,0.1) 50%, transparent 60%)", animation: "scan 2s linear infinite" }} />
                <div style={{ color: "#6C5CE7", fontSize: 13 }}>Camera active · Align badge in frame</div>
              </div>
              <button onClick={() => { setScanMode(false); setScannedContact({ ...SAMPLE_BADGES[0], id: Date.now(), tag: "Awareness", notes: "", lastContact: "", phone: "" }); }} style={{ background: "#6C5CE7", border: "none", color: "#fff", borderRadius: 12, padding: "12px 28px", marginTop: 16, cursor: "pointer", fontWeight: "bold" }}>Simulate Scan</button>
            </div>
            <button onClick={() => setScanMode(false)} style={{ background: "none", border: "none", color: "#8B7FD4", cursor: "pointer", fontSize: 13 }}>Cancel</button>
          </div>
        ) : scannedContact ? (
          <div>
            <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#22C55E", fontSize: 16 }}>✓</span>
              <span style={{ color: "#22C55E", fontSize: 13 }}>Badge scanned successfully</span>
            </div>
            <div style={{ background: "#0F0A1E", border: "1px solid rgba(108,92,231,0.2)", borderRadius: 16, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(108,92,231,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#A29BFE", fontWeight: "bold", fontSize: 18, fontFamily: "Arial, sans-serif" }}>{scannedContact.first[0]}</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: 17 }}>{scannedContact.first} {scannedContact.last}</div>
                  <div style={{ color: "#8B7FD4", fontSize: 13 }}>{scannedContact.title} · {scannedContact.company}</div>
                </div>
              </div>
              {[["✉", scannedContact.email], ["in", scannedContact.linkedin]].map(([icon, val]) => val && (
                <div key={icon} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: "#6C5CE7", width: 20, fontSize: 13 }}>{icon}</span>
                  <span style={{ color: "#ccc", fontSize: 13 }}>{val}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button onClick={() => setScannedContact(null)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", borderRadius: 10, padding: "11px 0", cursor: "pointer" }}>Discard</button>
                <button onClick={() => { saveContacts([...contacts, scannedContact]); setScannedContact(null); setTab("clients"); }} style={{ flex: 1, background: "#22C55E", border: "none", color: "#fff", borderRadius: 10, padding: "11px 0", cursor: "pointer", fontWeight: "bold" }}>Add Connection +</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#080612", fontFamily: "Arial, sans-serif", position: "relative" }}>
      <style>{`
        * { box-sizing: border-box; }
        input, select, textarea { outline: none; }
        button { font-family: Arial, sans-serif; }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        ::-webkit-scrollbar { width: 0; }
      `}</style>

      <div style={{ overflowY: "auto", height: "calc(100vh - 64px)" }}>
        {tab === "home" && renderHome()}
        {tab === "clients" && renderClients()}
        {tab === "meetings" && renderMeetings()}
        {tab === "conference" && renderConference()}
        {tab === "scanner" && renderScanner()}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(10,6,20,0.96)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(108,92,231,0.2)", display: "flex", zIndex: 50 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 4px 8px", background: "none", border: "none", cursor: "pointer", position: "relative" }}>
            {tab === t.id && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 32, height: 2, background: "#6C5CE7", borderRadius: 2 }} />}
            <span style={{ fontSize: 18, opacity: tab === t.id ? 1 : 0.4, color: tab === t.id ? "#A29BFE" : "#fff" }}>{t.icon}</span>
            <span style={{ fontSize: 9, color: tab === t.id ? "#A29BFE" : "#4A3F80", fontFamily: "Arial, sans-serif", letterSpacing: "0.04em" }}>{t.label}</span>
          </button>
        ))}
      </div>

      <div style={{ position: "fixed", top: 12, right: 12, zIndex: 200 }}>
        <button onClick={() => { setUser(null); setTab("home"); }} style={{ background: "rgba(108,92,231,0.15)", border: "1px solid rgba(108,92,231,0.3)", color: "#8B7FD4", borderRadius: 20, padding: "5px 12px", fontSize: 11, cursor: "pointer" }}>⟵ Switch</button>
      </div>
    </div>
  );
}
