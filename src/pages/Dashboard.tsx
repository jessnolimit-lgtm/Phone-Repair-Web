import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import DownloadButton from "../components/DownloadButton";

const repairs = [
  { id: "REP-00012", customer: "Maria Santos", device: "iPhone 15 Pro", issue: "Cracked screen", status: "In Repair", date: "Aug 28" },
  { id: "REP-00011", customer: "Jose Reyes", device: "Samsung Galaxy S24", issue: "Battery replacement", status: "Ready for Release", date: "Aug 28" },
  { id: "REP-00010", customer: "Ana Cruz", device: "Google Pixel 8", issue: "Charging port", status: "Diagnosing", date: "Aug 27" },
  { id: "REP-00009", customer: "Pedro Gomez", device: "Xiaomi 14T", issue: "Speaker repair", status: "Approved", date: "Aug 27" },
  { id: "REP-00008", customer: "Liza Flores", device: "iPhone 13", issue: "Water damage", status: "Released", date: "Aug 26" },
];

const statusConfig: Record<string, { color: string; dot: string }> = {
  "In Repair":         { color: "text-purple-700 bg-purple-50",   dot: "bg-purple-400" },
  "Ready for Release": { color: "text-emerald-700 bg-emerald-50", dot: "bg-emerald-400" },
  "Diagnosing":        { color: "text-orange-700 bg-orange-50",   dot: "bg-orange-400" },
  "Approved":          { color: "text-blue-700 bg-blue-50",       dot: "bg-blue-400" },
  "Released":          { color: "text-slate-600 bg-slate-100",    dot: "bg-slate-400" },
  "Waiting for Approval": { color: "text-yellow-700 bg-yellow-50", dot: "bg-yellow-400" },
};

function StatCard({
  icon,
  label,
  value,
  iconBg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-400 font-medium mb-0.5">{label}</div>
        <div className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, storeProfile, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const storeName = storeProfile?.store_name || user?.user_metadata?.store_name || "PhoneFix Repair Shop";
  const ownerName = storeProfile?.owner_name || user?.user_metadata?.owner_name || user?.email?.split("@")[0] || "Owner";
  const userEmail = user?.email || "owner@myshop.com";
  const ownerInitial = ownerName.charAt(0).toUpperCase();

  async function handleSignOut() {
    await signOut();
    navigate("/login");
  }

  const navItems = [
    { icon: "⊞", label: "Dashboard", active: true },
    { icon: "🔧", label: "Repairs", active: false },
    { icon: "👥", label: "Customers", active: false },
    { icon: "💳", label: "Payments", active: false },
    { icon: "📦", label: "Inventory", active: false },
    { icon: "📊", label: "Reports", active: false },
    { icon: "⚙️", label: "Settings", active: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-slate-100">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="PhoneFix Logo"
            className="w-8 h-8 object-contain rounded-full flex-shrink-0"
          />
          <span className="font-extrabold text-slate-900 tracking-wide text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PHONEFIX</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-slate-100">
          <div
            onClick={() => setShowAccountModal(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {ownerInitial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-800 truncate">{ownerName}</div>
              <div className="text-[11px] text-slate-400 truncate">{userEmail}</div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSignOut();
              }}
              className="text-slate-400 hover:text-red-600 transition-colors p-1"
              title="Sign out"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Dashboard</h1>
              <span className="text-xs text-blue-600 font-semibold block">{storeName}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DownloadButton variant="outline" size="sm" label="Install App" />
            <button
              onClick={() => setShowAccountModal(true)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              Account Info
            </button>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Online
            </div>
            <button
              onClick={handleSignOut}
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Sign Out
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Business & Greeting Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-6 text-white mb-6 shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-500/40 rounded-full text-xs font-semibold tracking-wider text-blue-100 uppercase mb-2">
                  Store ID: {user?.id?.substring(0, 8) || "Active"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {storeName}
                </h2>
                <p className="text-sm text-blue-100 mt-1">
                  Welcome back, <span className="font-semibold text-white">{ownerName}</span>! Here is your repair shop overview.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                <DownloadButton variant="cta" size="sm" label="Download Desktop App" />
                <button
                  onClick={() => setShowAccountModal(true)}
                  className="bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>}
              label="Repairs Today"
              value={4}
              iconBg="bg-blue-50"
            />
            <StatCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>}
              label="Diagnosing"
              value={2}
              iconBg="bg-orange-50"
            />
            <StatCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>}
              label="In Repair"
              value={5}
              iconBg="bg-purple-50"
            />
            <StatCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>}
              label="Ready for Release"
              value={3}
              iconBg="bg-emerald-50"
            />
          </div>

          {/* Two-column section */}
          <div className="grid lg:grid-cols-5 gap-5">
            {/* Revenue card */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Today's Revenue</div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ₱2,450.00
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mb-5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
                +18% from yesterday
              </div>
              {/* Mini bar chart */}
              <div>
                <div className="flex items-end gap-1.5 h-16 mb-2">
                  {[30, 55, 40, 70, 85, 60, 100].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-md ${i === 6 ? "bg-blue-500" : "bg-blue-100"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4">3 payments recorded today</p>
            </div>

            {/* Recent repairs */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recent Repairs</div>
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700">View all</button>
              </div>
              <div className="space-y-0">
                {repairs.map((r, i) => {
                  const sc = statusConfig[r.status] || { color: "text-slate-600 bg-slate-100", dot: "bg-slate-400" };
                  return (
                    <div
                      key={r.id}
                      className={`flex items-center gap-3 py-3 ${i < repairs.length - 1 ? "border-b border-slate-50" : ""}`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-sm">
                        📱
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800">{r.id}</div>
                        <div className="text-[11px] text-slate-400 truncate">{r.device}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${sc.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {r.status}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5 text-right">{r.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* New repair CTA */}
          <div className="mt-5 flex gap-3">
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New Repair Job
            </button>
          </div>
        </main>
      </div>

      {/* Account Details Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-base">
                  {ownerInitial}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Account & Store Info
                  </h3>
                  <p className="text-xs text-slate-400">PhoneFix SaaS Profile</p>
                </div>
              </div>
              <button
                onClick={() => setShowAccountModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Business / Store Name</span>
                <span className="font-bold text-slate-800 text-base">{storeName}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Owner Name</span>
                  <span className="font-semibold text-slate-800">{ownerName}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Phone</span>
                  <span className="font-semibold text-slate-800">{storeProfile?.phone || "Not set"}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Account Email</span>
                <span className="font-semibold text-slate-800 break-all">{userEmail}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">User ID (Supabase Auth)</span>
                <code className="text-xs text-slate-600 font-mono break-all">{user?.id || "N/A"}</code>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 text-xs text-red-600 font-semibold hover:bg-red-50 px-3 py-2 rounded-xl transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Sign Out
              </button>
              <button
                onClick={() => setShowAccountModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
