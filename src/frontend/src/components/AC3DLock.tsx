export function AC3DLock() {
  return (
    <div className="ac3d-lock-outer" aria-hidden="true">
      <div className="ac3d-lock-unit">
        {/* Shadow floor beneath the unit */}
        <div className="ac3d-floor-shadow" />

        {/* Glow aura ring */}
        <div className="ac3d-glow-ring" />

        {/* Main AC SVG body */}
        <svg
          viewBox="0 0 320 120"
          xmlns="http://www.w3.org/2000/svg"
          className="ac3d-svg"
          role="img"
          aria-label="Wave AC wall unit"
        >
          {/* Outer body — white/light blue panel */}
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8f4ff" />
              <stop offset="60%" stopColor="#d0e9ff" />
              <stop offset="100%" stopColor="#b8d8f8" />
            </linearGradient>
            <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c8dffa" />
              <stop offset="100%" stopColor="#a8cff5" />
            </linearGradient>
            <linearGradient id="displayGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0a1a3a" />
              <stop offset="100%" stopColor="#0d2050" />
            </linearGradient>
            <filter id="unitGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Main body rectangle */}
          <rect
            x="10"
            y="14"
            width="300"
            height="92"
            rx="12"
            ry="12"
            fill="url(#bodyGrad)"
            stroke="#a0c8f0"
            strokeWidth="1.5"
          />

          {/* Top ridge / cap */}
          <rect
            x="10"
            y="14"
            width="300"
            height="20"
            rx="12"
            ry="12"
            fill="url(#topGrad)"
            stroke="#a0c8f0"
            strokeWidth="1"
          />
          <rect x="10" y="26" width="300" height="8" fill="url(#topGrad)" />

          {/* Display panel left side */}
          <rect
            x="22"
            y="26"
            width="72"
            height="36"
            rx="6"
            ry="6"
            fill="url(#displayGrad)"
          />

          {/* Temperature digits */}
          <text
            x="58"
            y="52"
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="18"
            fontWeight="bold"
            fontFamily="monospace"
          >
            24°
          </text>

          {/* Small mode indicator dots */}
          <circle cx="28" cy="31" r="3" fill="#22d3ee" opacity="0.9" />
          <circle cx="36" cy="31" r="3" fill="#60a5fa" opacity="0.6" />
          <circle cx="44" cy="31" r="3" fill="#3b82f6" opacity="0.4" />

          {/* Wave AC text on body */}
          <text
            x="160"
            y="43"
            textAnchor="middle"
            fill="#1e40af"
            fontSize="9"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="sans-serif"
          >
            WAVE AC SERVICES
          </text>
          <line
            x1="115"
            y1="46"
            x2="205"
            y2="46"
            stroke="#93c5fd"
            strokeWidth="0.8"
          />

          {/* Louvre/vent slats — row of 8 */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              key={i}
              x={22 + i * 36}
              y="74"
              width="30"
              height="6"
              rx="3"
              fill="#7ab8e8"
              opacity="0.85"
            />
          ))}

          {/* Bottom intake strip */}
          <rect
            x="22"
            y="88"
            width="276"
            height="10"
            rx="5"
            fill="#93c5fd"
            opacity="0.5"
          />

          {/* Intake slit lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1={32 + i * 44}
              y1="88"
              x2={32 + i * 44}
              y2="98"
              stroke="#7ab8e8"
              strokeWidth="1"
              opacity="0.6"
            />
          ))}

          {/* Right side: power LED ring */}
          <circle cx="282" cy="37" r="7" fill="#0a1a3a" />
          <circle
            cx="282"
            cy="37"
            r="5"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <circle cx="282" cy="37" r="2.5" fill="#22d3ee" />
        </svg>

        {/* Airflow lines — 4 animated horizontal lines below vents */}
        <div className="ac3d-airflow">
          <div className="ac3d-air-line ac3d-air-1" />
          <div className="ac3d-air-line ac3d-air-2" />
          <div className="ac3d-air-line ac3d-air-3" />
          <div className="ac3d-air-line ac3d-air-4" />
        </div>
      </div>
    </div>
  );
}
