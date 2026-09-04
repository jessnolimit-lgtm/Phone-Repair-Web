interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const iconSizes = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" };
  const wrenchSizes = { sm: 16, md: 20, lg: 28 };
  const textSizes = { sm: "text-base", md: "text-xl", lg: "text-2xl" };

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${iconSizes[size]} rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0`}>
        <svg
          width={wrenchSizes[size]}
          height={wrenchSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
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
