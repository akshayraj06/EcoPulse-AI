import { motion } from "framer-motion";

export default function SmartCityIllustration() {
  return (
    <motion.svg
      viewBox="0 0 720 560"
      role="img"
      aria-label="Smart city cleanup platform illustration"
      className="h-auto w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <defs>
        <linearGradient id="city-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#dcfce7" />
        </linearGradient>
        <linearGradient id="city-green" x1="0" x2="1">
          <stop offset="0" stopColor="#84cc16" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="city-cyan" x1="0" x2="1">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" floodColor="#0f172a" floodOpacity="0.14" stdDeviation="18" />
        </filter>
      </defs>

      <rect x="28" y="28" width="664" height="504" rx="44" fill="url(#city-bg)" />
      <path d="M82 405c115-46 217-48 309-8s170 37 247-14v89H82Z" fill="#bbf7d0" />
      <path d="M90 452c93-27 176-26 249 2s163 27 286-18" fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="round" />

      <g filter="url(#soft-shadow)">
        <rect x="118" y="198" width="78" height="182" rx="18" fill="#0f766e" />
        <rect x="222" y="144" width="92" height="236" rx="20" fill="#0f172a" />
        <rect x="342" y="184" width="82" height="196" rx="18" fill="#115e59" />
        <rect x="452" y="116" width="108" height="264" rx="24" fill="#164e63" />
      </g>

      {[140, 166, 244, 276, 364, 390, 480, 514, 540].map((x, index) => (
        <rect
          key={x}
          x={x}
          y={index % 2 ? 238 : 214}
          width="16"
          height="16"
          rx="4"
          fill={index % 3 === 0 ? "#a7f3d0" : "#e0f2fe"}
        />
      ))}

      <g transform="translate(84 318)">
        <rect x="0" y="48" width="128" height="58" rx="20" fill="#ffffff" />
        <rect x="22" y="18" width="68" height="54" rx="16" fill="url(#city-green)" />
        <circle cx="34" cy="110" r="14" fill="#0f172a" />
        <circle cx="98" cy="110" r="14" fill="#0f172a" />
        <path d="M47 36h44l20 20" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
      </g>

      <g transform="translate(485 286)">
        <circle cx="48" cy="48" r="48" fill="#ffffff" />
        <path d="M48 16a32 32 0 1 1-29 45" fill="none" stroke="url(#city-cyan)" strokeWidth="9" strokeLinecap="round" />
        <path d="M35 55c8-25 20-30 36-34-2 21-11 35-27 42" fill="url(#city-green)" />
        <path d="M46 63c8-13 16-23 26-32" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </g>

      <g fill="none" stroke="url(#city-cyan)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7">
        <path d="M286 94v-28h156v52" />
        <path d="M442 118c62 0 80 24 80 72v41" />
        <path d="M286 94c-72 12-109 51-109 118" />
        <circle cx="286" cy="94" r="12" fill="#fff" />
        <circle cx="442" cy="118" r="12" fill="#fff" />
        <circle cx="522" cy="231" r="12" fill="#fff" />
      </g>

      <g transform="translate(300 330)">
        <rect x="0" y="0" width="146" height="86" rx="22" fill="#ffffff" />
        <path d="M31 46h28l9-19 12 39 10-23h25" fill="none" stroke="#16a34a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
        <text x="32" y="70" fill="#64748b" fontFamily="Inter, Arial" fontSize="13" fontWeight="700">AI verified</text>
      </g>
    </motion.svg>
  );
}
