export default function EcoPulseLogo({
  compact = false,
  inverted = false,
  className = "",
}) {
  const textColor = inverted ? "text-white" : "text-slate-950";
  const subColor = inverted ? "text-emerald-100" : "text-slate-500";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 96 96"
        aria-hidden="true"
        className="h-12 w-12 shrink-0 drop-shadow-sm"
      >
        <defs>
          <linearGradient id="eco-leaf" x1="20" x2="78" y1="20" y2="78">
            <stop offset="0" stopColor="#8fe336" />
            <stop offset="0.58" stopColor="#16a34a" />
            <stop offset="1" stopColor="#075985" />
          </linearGradient>
          <linearGradient id="eco-circuit" x1="42" x2="86" y1="44" y2="68">
            <stop offset="0" stopColor="#22c55e" />
            <stop offset="1" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        <path
          d="M20 64C17 42 31 22 60 13c-1 23-10 39-27 49-4 3-9 4-13 2Z"
          fill="url(#eco-leaf)"
        />
        <path
          d="M27 70c10-15 23-28 40-43"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <path
          d="M16 66C21 79 35 88 51 88c16 0 29-8 36-20"
          fill="none"
          stroke="#064e3b"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <path
          d="M17 31C25 17 39 8 56 8c17 0 32 9 40 23"
          fill="none"
          stroke="#65c51f"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <path
          d="M34 59h16l5 12 8-35 8 32 6-13 6 10h13"
          fill="none"
          stroke="#16a34a"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="M66 31c11 6 8 21 8 21 0 5 4 8 9 6 5-1 4-7 4-13 0-5 4-9 9-9h8"
          fill="none"
          stroke="url(#eco-circuit)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <circle cx="66" cy="31" r="5" fill="#fff" stroke="#16a34a" strokeWidth="5" />
        <circle cx="104" cy="36" r="5" fill="#fff" stroke="#16a34a" strokeWidth="5" />
        <circle cx="91" cy="63" r="5" fill="#fff" stroke="#0891b2" strokeWidth="5" />
      </svg>

      {!compact && (
        <div className="leading-none">
          <div className={`text-2xl font-black tracking-normal ${textColor}`}>
            <span className="text-emerald-600">Eco</span>Pulse{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              AI
            </span>
          </div>
          <div className={`mt-1 text-[0.62rem] font-bold uppercase tracking-[0.32em] ${subColor}`}>
            Cleaner cities, healthier future
          </div>
        </div>
      )}
    </div>
  );
}
