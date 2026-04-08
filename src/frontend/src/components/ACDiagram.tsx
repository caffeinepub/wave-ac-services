import { useState } from "react";

type PartKey =
  | "compressor"
  | "condenser"
  | "expansionValve"
  | "evaporator"
  | "blower";

interface Part {
  key: PartKey;
  label: string;
  description: string;
}

const parts: Part[] = [
  {
    key: "compressor",
    label: "Compressor",
    description:
      "Compressor refrigerant gas ko compress karta hai — yeh AC ka dil hai",
  },
  {
    key: "condenser",
    label: "Condenser Coil",
    description:
      "Condenser outdoor mein heat release karta hai — gas liquid banta hai",
  },
  {
    key: "expansionValve",
    label: "Expansion Valve",
    description:
      "Expansion valve pressure reduce karta hai — liquid thanda hota hai",
  },
  {
    key: "evaporator",
    label: "Evaporator Coil",
    description:
      "Evaporator room mein se heat absorb karta hai — hawa thandi hoti hai",
  },
  {
    key: "blower",
    label: "Blower / Fan",
    description: "Blower thandi hawa room mein phailaata hai",
  },
];

export function ACDiagram() {
  const [selected, setSelected] = useState<PartKey | null>(null);

  const toggle = (key: PartKey) =>
    setSelected((prev) => (prev === key ? null : key));
  const dismiss = () => setSelected(null);
  const handleKey = (key: PartKey) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") toggle(key);
  };

  const sel = (key: PartKey) => selected === key;
  const zoneFill = (key: PartKey) =>
    sel(key) ? "rgba(59,130,246,0.13)" : "transparent";
  const zoneClass = (key: PartKey) =>
    `cursor-pointer outline-none${sel(key) ? " ac-part-glow" : ""}`;

  const selectedPart = parts.find((p) => p.key === selected);

  return (
    <div className="relative w-full" data-ocid="ac_diagram.section">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/8 px-4 py-1.5 rounded-full border border-primary/20 mb-3">
          How It Works
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-3d">
          AC Kaise Kaam Karta Hai?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Interactive diagram — kisi bhi part par click karein
        </p>
      </div>

      {/* Backdrop dismiss */}
      {selected && (
        <div
          className="fixed inset-0 z-10"
          onClick={dismiss}
          onKeyUp={(e) => {
            if (e.key === "Escape") dismiss();
          }}
          aria-hidden="true"
        />
      )}

      {/* Diagram */}
      <div className="ac-breath relative max-w-3xl mx-auto">
        <svg
          viewBox="0 0 720 330"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          aria-labelledby="acDiagramTitle"
        >
          <title id="acDiagramTitle">Split AC system interactive diagram</title>
          <defs>
            <linearGradient id="ouGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.92 0.04 245)" />
              <stop offset="100%" stopColor="oklch(0.84 0.06 245)" />
            </linearGradient>
            <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.92 0.04 245)" />
              <stop offset="100%" stopColor="oklch(0.84 0.06 245)" />
            </linearGradient>
            <filter id="pShadow">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodOpacity="0.15"
              />
            </filter>
          </defs>

          {/* ===== OUTDOOR UNIT ===== */}
          <g transform="translate(490, 40)">
            {/* Body */}
            <rect
              x="0"
              y="0"
              width="185"
              height="245"
              rx="10"
              fill="url(#ouGrad)"
              stroke="oklch(0.72 0.08 245)"
              strokeWidth="1.5"
              filter="url(#pShadow)"
            />
            {[
              20, 35, 50, 65, 80, 95, 110, 125, 140, 155, 170, 185, 200, 215,
              230,
            ].map((y) => (
              <line
                key={y}
                x1="10"
                y1={y}
                x2="175"
                y2={y}
                stroke="oklch(0.78 0.06 245)"
                strokeWidth="1"
                opacity="0.45"
              />
            ))}
            {/* Fan */}
            <circle
              cx="92"
              cy="122"
              r="56"
              fill="oklch(0.88 0.05 245)"
              stroke="oklch(0.68 0.08 245)"
              strokeWidth="1.5"
            />
            <circle
              cx="92"
              cy="122"
              r="38"
              fill="none"
              stroke="oklch(0.62 0.10 245)"
              strokeWidth="2"
              strokeDasharray="8 4"
              opacity="0.6"
            />
            {/* Spinning fan blades — outdoor unit (absolute origin: 490+92=582, 40+122=162) */}
            <g
              className="outdoor-fan-spin"
              style={{ transformOrigin: "582px 162px" }}
            >
              <circle
                cx="92"
                cy="122"
                r="18"
                fill="oklch(0.78 0.08 245)"
                stroke="oklch(0.58 0.10 245)"
                strokeWidth="1.5"
              />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1={92 + Math.cos((deg * Math.PI) / 180) * 18}
                  y1={122 + Math.sin((deg * Math.PI) / 180) * 18}
                  x2={92 + Math.cos((deg * Math.PI) / 180) * 36}
                  y2={122 + Math.sin((deg * Math.PI) / 180) * 36}
                  stroke="oklch(0.5 0.12 245)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Condenser coil visual */}
            <rect
              x="20"
              y="28"
              width="145"
              height="55"
              rx="4"
              fill="oklch(0.84 0.06 245)"
              stroke="oklch(0.65 0.10 245)"
              strokeWidth="1"
            />
            {[35, 43, 51, 59, 67, 75].map((y) => (
              <path
                key={y}
                d={`M25,${y} Q60,${y - 5} 92,${y} Q125,${y + 5} 158,${y}`}
                stroke="oklch(0.55 0.12 245)"
                strokeWidth="1.5"
                fill="none"
              />
            ))}
            {/* Compressor visual */}
            <rect
              x="57"
              y="178"
              width="70"
              height="48"
              rx="22"
              fill="oklch(0.78 0.08 245)"
              stroke="oklch(0.55 0.12 245)"
              strokeWidth="2"
            />
            <ellipse
              cx="92"
              cy="202"
              rx="22"
              ry="14"
              fill="oklch(0.68 0.10 245)"
            />

            <text
              x="92"
              y="258"
              textAnchor="middle"
              fontSize="9"
              fill="oklch(0.52 0.08 245)"
              fontWeight="500"
            >
              Outdoor Unit
            </text>

            {/* CONDENSER clickable overlay */}
            <g
              className={zoneClass("condenser")}
              onClick={() => toggle("condenser")}
              onKeyUp={handleKey("condenser")}
              tabIndex={0}
              data-ocid="ac_diagram.condenser"
            >
              <rect
                x="5"
                y="5"
                width="175"
                height="88"
                rx="7"
                fill={zoneFill("condenser")}
                stroke="transparent"
                strokeWidth="8"
              />
              <text
                x="92"
                y="22"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="oklch(0.38 0.12 245)"
              >
                Condenser Coil
              </text>
            </g>

            {/* COMPRESSOR clickable overlay */}
            <g
              className={zoneClass("compressor")}
              onClick={() => toggle("compressor")}
              onKeyUp={handleKey("compressor")}
              tabIndex={0}
              data-ocid="ac_diagram.compressor"
            >
              <rect
                x="5"
                y="158"
                width="175"
                height="78"
                rx="7"
                fill={zoneFill("compressor")}
                stroke="transparent"
                strokeWidth="8"
              />
              <text
                x="92"
                y="173"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="oklch(0.38 0.12 245)"
              >
                Compressor
              </text>
            </g>
          </g>

          {/* ===== INDOOR UNIT ===== */}
          <g transform="translate(45, 105)">
            <rect
              x="0"
              y="0"
              width="205"
              height="118"
              rx="12"
              fill="url(#inGrad)"
              stroke="oklch(0.72 0.08 245)"
              strokeWidth="1.5"
              filter="url(#pShadow)"
            />
            {[14, 24, 34].map((y) => (
              <rect
                key={y}
                x="10"
                y={y}
                width="185"
                height="5"
                rx="2"
                fill="oklch(0.82 0.06 245)"
                stroke="oklch(0.68 0.08 245)"
                strokeWidth="0.5"
              />
            ))}
            <circle
              cx="183"
              cy="58"
              r="5"
              fill="oklch(0.5 0.18 245)"
              opacity="0.8"
            />

            {/* Evaporator coil visual */}
            <rect
              x="10"
              y="63"
              width="115"
              height="42"
              rx="4"
              fill="oklch(0.84 0.06 245)"
              stroke="oklch(0.65 0.10 245)"
              strokeWidth="1"
            />
            {[69, 76, 83, 90, 97].map((y) => (
              <path
                key={y}
                d={`M14,${y} Q35,${y - 4} 62,${y} Q88,${y + 4} 118,${y}`}
                stroke="oklch(0.55 0.12 245)"
                strokeWidth="1.5"
                fill="none"
              />
            ))}
            {/* Blower visual — spinning counter-clockwise (absolute origin: 45+167=212, 105+85=190) */}
            <circle
              cx="167"
              cy="85"
              r="24"
              fill="oklch(0.88 0.05 245)"
              stroke="oklch(0.65 0.10 245)"
              strokeWidth="1.5"
            />
            <g
              className="indoor-fan-spin"
              style={{ transformOrigin: "212px 190px" }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1={167 + Math.cos((deg * Math.PI) / 180) * 10}
                  y1={85 + Math.sin((deg * Math.PI) / 180) * 10}
                  x2={167 + Math.cos((deg * Math.PI) / 180) * 22}
                  y2={85 + Math.sin((deg * Math.PI) / 180) * 22}
                  stroke="oklch(0.48 0.12 245)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ))}
            </g>

            <text
              x="102"
              y="134"
              textAnchor="middle"
              fontSize="9"
              fill="oklch(0.52 0.08 245)"
              fontWeight="500"
            >
              Indoor Unit
            </text>

            {/* EVAPORATOR clickable overlay */}
            <g
              className={zoneClass("evaporator")}
              onClick={() => toggle("evaporator")}
              onKeyUp={handleKey("evaporator")}
              tabIndex={0}
              data-ocid="ac_diagram.evaporator"
            >
              <rect
                x="5"
                y="45"
                width="125"
                height="66"
                rx="7"
                fill={zoneFill("evaporator")}
                stroke="transparent"
                strokeWidth="8"
              />
              <text
                x="67"
                y="58"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="oklch(0.38 0.12 245)"
              >
                Evaporator Coil
              </text>
            </g>

            {/* BLOWER clickable overlay */}
            <g
              className={zoneClass("blower")}
              onClick={() => toggle("blower")}
              onKeyUp={handleKey("blower")}
              tabIndex={0}
              data-ocid="ac_diagram.blower"
            >
              <circle
                cx="167"
                cy="85"
                r="26"
                fill={zoneFill("blower")}
                stroke="transparent"
                strokeWidth="8"
              />
              <text
                x="167"
                y="58"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="oklch(0.38 0.12 245)"
              >
                Blower
              </text>
            </g>
          </g>

          {/* ===== PIPES ===== */}
          {/* Cold pipe background glow */}
          <path
            d="M490,138 C452,138 418,132 370,130 C322,128 295,148 250,148"
            stroke="#BFDBFE"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          {/* Cold pipe animated flow — jaate hue (outdoor → indoor) */}
          <path
            d="M490,138 C452,138 418,132 370,130 C322,128 295,148 250,148"
            stroke="#3B82F6"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            className="cold-pipe"
          />
          {/* Cold pipe direction arrow at midpoint */}
          <polygon
            points="370,124 362,128 362,120"
            fill="#3B82F6"
            opacity="0.85"
          />
          {/* Hot pipe background glow */}
          <path
            d="M250,168 C295,168 322,172 370,172 C418,172 452,168 490,162"
            stroke="#FEE2E2"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          {/* Hot pipe animated flow — aate hue (indoor → outdoor) */}
          <path
            d="M250,168 C295,168 322,172 370,172 C418,172 452,168 490,162"
            stroke="#EF4444"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            className="hot-pipe"
          />
          {/* Hot pipe direction arrow at midpoint */}
          <polygon
            points="370,178 378,174 378,182"
            fill="#EF4444"
            opacity="0.85"
          />

          {/* EXPANSION VALVE */}
          <g
            transform="translate(352, 112)"
            className={zoneClass("expansionValve")}
            onClick={() => toggle("expansionValve")}
            onKeyUp={handleKey("expansionValve")}
            tabIndex={0}
            data-ocid="ac_diagram.expansion_valve"
          >
            <rect
              x="-20"
              y="-18"
              width="40"
              height="36"
              rx="7"
              fill={
                sel("expansionValve")
                  ? "rgba(59,130,246,0.15)"
                  : "oklch(0.96 0.03 245)"
              }
              stroke="oklch(0.60 0.12 245)"
              strokeWidth="1.5"
            />
            <polygon points="0,-9 8,5 -8,5" fill="oklch(0.42 0.12 245)" />
            <line
              x1="0"
              y1="5"
              x2="0"
              y2="12"
              stroke="oklch(0.42 0.12 245)"
              strokeWidth="2"
            />
            <text
              x="0"
              y="27"
              textAnchor="middle"
              fontSize="8"
              fontWeight="600"
              fill="oklch(0.38 0.12 245)"
            >
              Expansion
            </text>
            <text
              x="0"
              y="37"
              textAnchor="middle"
              fontSize="8"
              fontWeight="600"
              fill="oklch(0.38 0.12 245)"
            >
              Valve
            </text>
          </g>

          {/* Pipe labels */}
          <text
            x="370"
            y="118"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#2563EB"
          >
            ❄ Thanda Gas — Jaate Hue →
          </text>
          <text
            x="370"
            y="192"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#DC2626"
          >
            ← Garam Gas — Aate Hue 🔥
          </text>
          <text
            x="370"
            y="204"
            textAnchor="middle"
            fontSize="8"
            fill="oklch(0.52 0.08 245)"
          >
            R-22 / R-32 / R410 Gas
          </text>

          {/* ❄️ Cool air from indoor unit — animated lines going LEFT */}
          <g>
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="40"
                y1={112 + i * 10}
                x2="6"
                y2={112 + i * 10}
                stroke="#60B3FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5 3"
                className={`cool-air-out cool-air-out-${i + 1}`}
              />
            ))}
            <text
              x="22"
              y="106"
              textAnchor="middle"
              fontSize="9"
              fill="#2563EB"
              fontWeight="700"
            >
              ❄️
            </text>
            <text
              x="22"
              y="155"
              textAnchor="middle"
              fontSize="8"
              fill="#2563EB"
              fontWeight="700"
            >
              Thandi
            </text>
            <text
              x="22"
              y="165"
              textAnchor="middle"
              fontSize="8"
              fill="#2563EB"
              fontWeight="700"
            >
              Hawa
            </text>
          </g>
          {/* 🔥 Hot air from outdoor unit — animated lines going RIGHT */}
          <g>
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="675"
                y1={102 + i * 10}
                x2="710"
                y2={102 + i * 10}
                stroke="#FF6B35"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5 3"
                className={`hot-air-out hot-air-out-${i + 1}`}
              />
            ))}
            <text
              x="693"
              y="96"
              textAnchor="middle"
              fontSize="9"
              fill="#DC2626"
              fontWeight="700"
            >
              🔥
            </text>
            <text
              x="693"
              y="145"
              textAnchor="middle"
              fontSize="8"
              fill="#DC2626"
              fontWeight="700"
            >
              Garam
            </text>
            <text
              x="693"
              y="155"
              textAnchor="middle"
              fontSize="8"
              fill="#DC2626"
              fontWeight="700"
            >
              Hawa
            </text>
          </g>
        </svg>

        {/* Tooltip popup */}
        {selectedPart && (
          <output
            className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 bg-card border-2 border-primary/30 rounded-xl shadow-lg px-5 py-3.5 max-w-xs w-[90%] text-center ac-tooltip-in"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={(e) => {
              if (e.key === "Escape") dismiss();
            }}
          >
            <p className="text-xs font-bold text-primary mb-1">
              {selectedPart.label}
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {selectedPart.description}
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close tooltip"
            >
              ✕ Band karein
            </button>
          </output>
        )}
      </div>

      {/* Part legend chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {parts.map((p) => (
          <button
            type="button"
            key={p.key}
            onClick={() => toggle(p.key)}
            data-ocid={`ac_diagram.chip.${p.key}`}
            className={[
              "text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200",
              sel(p.key)
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary",
            ].join(" ")}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Kisi bhi part ka naam click karein — aur jaanein woh kya karta hai
      </p>
    </div>
  );
}
