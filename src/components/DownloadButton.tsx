import { useState } from "react";

interface DownloadButtonProps {
  variant?: "primary" | "secondary" | "outline" | "navbar" | "cta";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  showDetails?: boolean;
}

export const INSTALLER_FILENAME = "PhoneFix-App.zip";
export const INSTALLER_URL = `/${INSTALLER_FILENAME}`;

export default function DownloadButton({
  variant = "primary",
  size = "md",
  label = "Download PhoneFix App",
  className = "",
  showDetails = false,
}: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadClick = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    }, 1200);
  };

  // Base styles
  let baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none rounded-xl";

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-sm sm:text-base",
  }[size];

  // Variant styles
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow",
    secondary: "bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-sm",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:bg-slate-100",
    navbar: "border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-blue-700 font-semibold",
    cta: "border border-blue-400 bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs",
  }[variant];

  const currentLabel = downloading
    ? "Starting Download..."
    : downloaded
    ? "Installer Downloaded!"
    : label;

  return (
    <div className="inline-flex flex-col items-center">
      <a
        href={INSTALLER_URL}
        download={INSTALLER_FILENAME}
        onClick={handleDownloadClick}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        title="Download PhoneFix Installer (.exe)"
      >
        {downloading ? (
          <svg className="animate-spin w-4 h-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : downloaded ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        )}
        <span>{currentLabel}</span>
      </a>

      {showDetails && (
        <span className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          Windows Desktop App (.exe) · v1.0
        </span>
      )}
    </div>
  );
}
