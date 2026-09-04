import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { signUp, isConfigured } = useAuth();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    shopName: "",
    ownerName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrorMsg(null);
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!form.shopName.trim() || !form.ownerName.trim()) {
      setErrorMsg("Please fill in your shop name and owner name.");
      return;
    }
    setErrorMsg(null);
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error, data } = await signUp(
        form.email,
        form.password,
        form.shopName,
        form.ownerName,
        form.phone
      );

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      // If user session is active (or auto-logged in), navigate to dashboard
      if (data?.session || data?.user) {
        navigate("/dashboard");
      } else {
        // If email confirmation is required by Supabase project settings
        setErrorMsg(
          "Account created! Please check your email inbox to verify your account before logging in."
        );
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during registration.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="PhoneFix Logo"
              className="w-14 h-14 object-contain rounded-full mb-3 shadow-sm"
            />
            <h1 className="text-xl font-extrabold text-slate-900 tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Create your shop
            </h1>
            <p className="text-xs text-slate-400 mt-1">Single Account for Web & Desktop</p>
          </div>

          {!isConfigured && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
              <span className="font-bold block mb-1">Supabase Setup Needed</span>
              Please configure <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">VITE_SUPABASE_URL</code> and <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">VITE_SUPABASE_ANON_KEY</code> in <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">.env.local</code>.
            </div>
          )}

          {errorMsg && (
            <div className={`mb-4 p-3 rounded-xl text-xs leading-relaxed ${errorMsg.startsWith("Account created!") ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-red-50 border border-red-200 text-red-700"}`}>
              {errorMsg}
            </div>
          )}

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-blue-500" : "bg-slate-200"}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-blue-500" : "bg-slate-200"}`} />
          </div>

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Step 1 — Shop Info</p>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Shop / Business Name</label>
                <input
                  type="text"
                  value={form.shopName}
                  onChange={(e) => update("shopName", e.target.value)}
                  placeholder="e.g. Rapid Phone Repairs"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Owner Full Name</label>
                <input
                  type="text"
                  value={form.ownerName}
                  onChange={(e) => update("ownerName", e.target.value)}
                  placeholder="Juan dela Cruz"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+63 912 345 6789"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2 cursor-pointer"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Step 2 — Account Credentials</p>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="owner@myshop.com"
                    required
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPw ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                    className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPw ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    placeholder="Repeat password"
                    required
                    className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
                      form.confirmPassword && form.confirmPassword !== form.password
                        ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                        : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                    }`}
                  />
                </div>
                {form.confirmPassword && form.confirmPassword !== form.password && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || (!!form.confirmPassword && form.confirmPassword !== form.password)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors text-sm cursor-pointer"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                By registering, you agree to our{" "}
                <a href="#" className="text-blue-600">Terms of Service</a> and{" "}
                <a href="#" className="text-blue-600">Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
