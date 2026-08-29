import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import DownloadButton from "../components/DownloadButton";

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all group">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-extrabold text-blue-600 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar transparent />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Offline-ready system
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 leading-[1.1] mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Manage your repair shop{" "}
                <span className="text-blue-600">smarter.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                PhoneFix keeps your phone and electronics repair business organized — from intake to release, payments to reports. No internet required.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/register")}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm cursor-pointer"
                >
                  Get Started Free
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <DownloadButton variant="outline" label="Install Desktop App" />
              </div>
              <p className="text-xs text-slate-400 mt-4">No credit card required · Offline installer available (.exe)</p>
            </div>

            {/* App preview card */}
            <div className="relative">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 relative z-10">
                {/* Dashboard preview header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Good day,</div>
                    <div className="font-bold text-slate-900 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Owner</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Online
                  </div>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { icon: "📱", label: "Today", value: "4", color: "bg-blue-50" },
                    { icon: "🔍", label: "Diagnosing", value: "2", color: "bg-orange-50" },
                    { icon: "🔧", label: "In Repair", value: "5", color: "bg-purple-50" },
                    { icon: "✅", label: "Ready", value: "3", color: "bg-emerald-50" },
                  ].map((s) => (
                    <div key={s.label} className={`${s.color} rounded-xl p-3 text-center`}>
                      <div className="text-lg mb-1">{s.icon}</div>
                      <div className="font-bold text-slate-800 text-lg leading-none">{s.value}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Recent repairs */}
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Recent Repairs</div>
                  <div className="space-y-2.5">
                    {[
                      { id: "REP-00012", device: "iPhone 15 Pro", status: "In Repair", color: "text-purple-600 bg-purple-50" },
                      { id: "REP-00011", device: "Samsung Galaxy S24", status: "Ready", color: "text-emerald-600 bg-emerald-50" },
                      { id: "REP-00010", device: "Google Pixel 8", status: "Diagnosing", color: "text-orange-600 bg-orange-50" },
                    ].map((r) => (
                      <div key={r.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-xs">📱</div>
                          <div>
                            <div className="text-xs font-semibold text-slate-800">{r.id}</div>
                            <div className="text-[11px] text-slate-400">{r.device}</div>
                          </div>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.color}`}>{r.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Decorative blobs */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60 -z-0" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-40 -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 border-y border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <StatCard value="500+" label="Repair shops" />
          <StatCard value="50K+" label="Repairs tracked" />
          <StatCard value="99.9%" label="Uptime" />
          <StatCard value="4.9★" label="Customer rating" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Features</div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Everything your repair shop needs
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              From intake forms to final payment — PhoneFix covers every step of the repair workflow so you can focus on fixing, not paperwork.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M12 18h.01" />
                </svg>
              }
              title="Repair Job Tracking"
              desc="Intake devices, assign technicians, track status from Diagnosing to Ready for Release in real time."
            />
            <FeatureCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              }
              title="Payments & Invoicing"
              desc="Record payments, generate invoices, and track daily revenue with a full payment history."
            />
            <FeatureCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
              title="Customer Management"
              desc="Build a customer database, see repair history per customer, and send status notifications."
            />
            <FeatureCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Dashboard & Reports"
              desc="Visualize daily repairs, revenue trends, and technician performance at a glance."
            />
            <FeatureCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                </svg>
              }
              title="Parts Inventory"
              desc="Track stock levels for screens, batteries, and components. Get low-stock alerts before you run out."
            />
            <FeatureCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16" />
                </svg>
              }
              title="Offline-Ready"
              desc="Works without internet. Sync data when you reconnect — perfect for shops with unreliable connectivity."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">How it works</div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-slate-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Up and running in minutes
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create your account",
                desc: "Register your shop, add your business details, and invite your technicians.",
              },
              {
                step: "02",
                title: "Intake your first repair",
                desc: "Log the device, describe the issue, and assign it to a technician — takes under 60 seconds.",
              },
              {
                step: "03",
                title: "Track, fix, release",
                desc: "Update status as work progresses, collect payment, and release the device to your customer.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-extrabold text-slate-100 mb-4 select-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.step}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-600 rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_#3B82F6_0%,_transparent_60%)] opacity-50" />
            <div className="relative z-10">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Get started today</div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Start your free trial
              </h2>
              <p className="text-blue-100 mb-8 text-base">
                30 days free, no credit card required. Upgrade anytime as your shop grows.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                <button
                  onClick={() => window.location.href = "/register"}
                  className="bg-white text-blue-700 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-sm cursor-pointer"
                >
                  Create Free Account
                </button>
                <DownloadButton variant="cta" size="lg" label="Download PhoneFix App" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-slate-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PHONEFIX</span>
          </div>
          <p className="text-xs text-slate-400">© 2026 PhoneFix. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
