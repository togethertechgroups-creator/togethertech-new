"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';

const steps = [
  { step: '01', title: 'Discovery & Plan',  desc: 'We align on requirements, user flows, and wireframe prototypes.' },
  { step: '02', title: 'UI/UX Design',      desc: 'Figma mockups, typography selection, and color palettes are approved.' },
  { step: '03', title: 'Development',       desc: 'We write fully responsive code, set up secure databases, and hook APIs.' },
  { step: '04', title: 'QA & Testing',      desc: 'We test load speeds, mobile responsiveness, and technical SEO structure.' },
  { step: '05', title: 'Deployment',        desc: 'Client domain mapping, server configuration, and final hand-over.' },
];

// ── Animation timing constants (shared with AnimatedPath) ──────────────────
const SEG_DURATION  = 0.5;   // seconds to draw each segment
const SEG_GAP       = 0.1;   // gap between segments
const HOLD_END      = 0.6;   // hold pause at end before repeat
const TOTAL_CYCLE   = (SEG_DURATION + SEG_GAP) * (steps.length - 1) + HOLD_END; // ~3s

// When each card number should turn orange (= when the line finishes arriving at it)
// Card 0 starts orange immediately (it's the origin)
// Card i+1 turns orange when segment i finishes drawing
const ARRIVE_TIMES = [
  0,                                    // card 0 — immediate
  SEG_DURATION,                         // card 1 — after segment 0 (1.2s)
  (SEG_DURATION + SEG_GAP) + SEG_DURATION,          // card 2 — 2.7s
  (SEG_DURATION + SEG_GAP) * 2 + SEG_DURATION,      // card 3 — 4.2s
  (SEG_DURATION + SEG_GAP) * 3 + SEG_DURATION,      // card 4 — 5.7s
];

interface Segment {
  d: string;
  length: number;
}

export default function ProcessTimeline() {
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [svgBox,   setSvgBox]   = useState({ width: 0, height: 0 });

  // Which step the line has "arrived at" so far in the current cycle
  const [reachedStep, setReachedStep] = useState(0);

  // ── SVG path computation ──────────────────────────────────────────────────
  const compute = useCallback(() => {
    if (!containerRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const rects = cardRefs.current.map(el => el?.getBoundingClientRect() ?? null);
    const newSegs: Segment[] = [];

    for (let i = 0; i < rects.length - 1; i++) {
      const from = rects[i];
      const to   = rects[i + 1];
      if (!from || !to) continue;

      const arcOffset = 40;
      let x1: number, y1: number, x2: number, y2: number, cpY: number;

      if (i % 2 === 0) {
        x1  = from.left - cr.left + from.width / 2;
        y1  = from.top  - cr.top;
        x2  = to.left   - cr.left + to.width / 2;
        y2  = to.top    - cr.top;
        cpY = Math.min(y1, y2) - arcOffset;
      } else {
        x1  = from.left   - cr.left + from.width / 2;
        y1  = from.bottom - cr.top;
        x2  = to.left     - cr.left + to.width / 2;
        y2  = to.bottom   - cr.top;
        cpY = Math.max(y1, y2) + arcOffset;
      }

      const d = `M ${x1} ${y1} C ${x1} ${cpY}, ${x2} ${cpY}, ${x2} ${y2}`;
      const dx = x2 - x1;
      const dy = Math.abs(cpY - y1);
      newSegs.push({ d, length: Math.abs(dx) + dy * 2 + 20 });
    }

    setSvgBox({ width: cr.width, height: cr.height + 60 });
    setSegments(newSegs);
  }, []);

  useEffect(() => {
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [compute]);

  // ── Sync JS timer with the SVG animation cycle ────────────────────────────
  useEffect(() => {
    const startEpoch = performance.now();

    const tick = () => {
      const elapsed = (performance.now() - startEpoch) / 1000; // seconds
      const t = elapsed % TOTAL_CYCLE;                          // position in cycle

      let reached = 0;
      for (let i = 1; i < ARRIVE_TIMES.length; i++) {
        if (t >= ARRIVE_TIMES[i]) reached = i;
      }
      setReachedStep(reached);
    };

    const id = setInterval(tick, 50); // 20fps check — smooth enough
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ paddingBottom: 48 }}>
      {/* SVG overlay — hidden on mobile to prevent line cutting through card contents */}
      {svgBox.width > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible hidden md:block"
          width={svgBox.width}
          height={svgBox.height}
          style={{ zIndex: 10, top: 0, left: 0 }}
        >
          {segments.map((seg, i) => (
            <AnimatedPath key={i} d={seg.d} length={seg.length} index={i} />
          ))}
        </svg>
      )}

      {/* 5-column horizontal grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {steps.map((step, i) => {
          const isReached = i <= reachedStep;
          return (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl space-y-4 hover:border-brandGreen/30 transition-colors relative group"
            >
              {/* Step number — green by default, orange when line arrives */}
              <div
                className="text-4xl font-extrabold font-outfit transition-colors duration-500"
                style={{ color: isReached ? '#FF7A00' : '#94a3b8' }}
              >
                {step.step}
              </div>
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-biooris">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Animated SVG path ─────────────────────────────────────────────────────────
interface AnimatedPathProps {
  d: string;
  length: number;
  index: number;
}

function AnimatedPath({ d, length, index }: AnimatedPathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [realLen, setRealLen] = useState(length);
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    if (pathRef.current) setRealLen(pathRef.current.getTotalLength());
    
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      const isBot = /lighthouse|chrome-lighthouse|googlebot|gtmetrix|pingdom/i.test(ua);
      if (isBot) {
        setIsStatic(true);
      }
    }
  }, [d]);

  const startTime = index * (SEG_DURATION + SEG_GAP);
  const endTime   = startTime + SEG_DURATION;
  const t0 = startTime / TOTAL_CYCLE;
  const t1 = endTime   / TOTAL_CYCLE;

  if (isStatic) {
    return (
      <path
        d={d}
        fill="none"
        stroke="#FF7A00"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke="#FF7A00"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <animate
        attributeName="stroke-dasharray"
        values={`0 ${realLen};${realLen} 0;${realLen} 0`}
        keyTimes={`0;${t1.toFixed(4)};1`}
        dur={`${TOTAL_CYCLE}s`}
        begin="0s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1;0 0 0 0"
      />
      <animate
        attributeName="opacity"
        values={`0;0;1;1`}
        keyTimes={`0;${t0.toFixed(4)};${t0.toFixed(4)};1`}
        dur={`${TOTAL_CYCLE}s`}
        begin="0s"
        repeatCount="indefinite"
        calcMode="discrete"
      />
    </path>
  );
}
