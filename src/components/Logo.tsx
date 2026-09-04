interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const iconSizes = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" };
  const textSizes = { sm: "text-base", md: "text-xl", lg: "text-2xl" };

  const logoUrl = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoUrl}
        alt="PhoneFix Logo"
        className={`${iconSizes[size]} object-contain flex-shrink-0 rounded-full shadow-xs`}
      />
      {showText && (
        <span
          className={`${textSizes[size]} font-extrabold tracking-wide text-slate-900`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          PHONEFIX
        </span>
      )}
    </div>
  );
}
