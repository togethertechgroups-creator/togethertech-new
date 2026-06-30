'use client';

import React, { useRef, useState } from "react";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// RTL detection for Hebrew/Arabic
function isRTL(text: string) {
  return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text);
}

export interface InfoCardProps {
  image: string;
  title: string;
  description: string;
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  borderBgColor?: string;
  borderWidth?: number;
  borderPadding?: number;
  cardBgColor?: string;
  shadowColor?: string;
  patternColor1?: string;
  patternColor2?: string;
  textColor?: string;
  hoverTextColor?: string;
  fontFamily?: string;
  rtlFontFamily?: string;
  effectBgColor?: string;
  contentPadding?: string;
  
  // Custom additions for Together Tech portfolio
  technologies?: string;
  projectLink?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  image,
  title,
  description,
  width = "100%",
  height = 430,
  borderColor = "#70B33F",
  borderBgColor = "#e2e8f0",
  borderWidth = 2,
  borderPadding = 10,
  cardBgColor = "#0B0F19",
  shadowColor = "#0B0F19",
  patternColor1 = "rgba(255,255,255,0.02)",
  patternColor2 = "rgba(255,255,255,0.03)",
  textColor = "#ffffff",
  hoverTextColor = "#ffffff",
  fontFamily = "inherit",
  rtlFontFamily = "inherit",
  effectBgColor = "#70B33F",
  contentPadding = "16px 20px",
  technologies = "",
  projectLink = "",
}) => {
  const [hovered, setHovered] = useState(false);
  const borderRef = useRef<HTMLDivElement>(null);

  // Mouse movement for rotating border
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const border = borderRef.current;
    if (!border) return;
    const rect = border.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    border.style.setProperty("--rotation", `${angle}rad`);
  };

  // RTL logic
  const rtl = isRTL(title) || isRTL(description);
  const effectiveFont = rtl ? rtlFontFamily : fontFamily;
  const titleDirection = isRTL(title) ? "rtl" : "ltr";
  const descDirection = isRTL(description) ? "rtl" : "ltr";

  // Pattern background
  const pattern =
    `linear-gradient(45deg, ${patternColor1} 25%, transparent 25%, transparent 75%, ${patternColor2} 75%),` +
    `linear-gradient(-45deg, ${patternColor2} 25%, transparent 25%, transparent 75%, ${patternColor1} 75%)`;

  // Border gradient
  const borderGradient = `conic-gradient(from var(--rotation,0deg), ${borderColor} 0deg, ${borderColor} 90deg, ${borderBgColor} 90deg, ${borderBgColor} 360deg)`;

  return (
    <div
      ref={borderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (borderRef.current)
          borderRef.current.style.setProperty("--rotation", "0deg");
      }}
      style={{
        width,
        height,
        border: `${borderWidth}px solid transparent`,
        borderRadius: "2rem",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage: `linear-gradient(${cardBgColor}, ${cardBgColor}), ${borderGradient}`,
        padding: borderPadding,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: "box-shadow 0.3s",
        position: "relative",
        fontFamily: effectiveFont,
      } as React.CSSProperties}
      className="shadow-sm hover:shadow-lg hover:shadow-brandGreen/5 transition-all duration-300 group"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "1.85rem",
          background: cardBgColor,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          backgroundImage: pattern,
          backgroundSize: "20.84px 20.84px",
          padding: "0 0 8px 0",
        }}
      >
        <div style={{ width: "100%", height: 160, position: "relative", overflow: "hidden" }}>
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.5s ease"
            }}
            className="group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: contentPadding,
            minHeight: 0,
          }}
        >
          <div className="space-y-3">
            <h1
              style={{
                fontSize: 18,
                fontWeight: "800",
                letterSpacing: "-.02em",
                lineHeight: "normal",
                color: hovered ? hoverTextColor : textColor,
                transition: "color 0.3s ease",
                position: "relative",
                overflow: "hidden",
                direction: titleDirection,
                width: "auto",
                display: "inline-block",
                margin: 0
              }}
            >
              <span
                style={{
                  position: "relative",
                  zIndex: 10,
                  padding: "2px 4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                {title}
              </span>
              <span
                style={{
                  clipPath: hovered
                    ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                    : "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
                  transformOrigin: "center",
                  transition: "all cubic-bezier(.1,.5,.5,1) 0.4s",
                  position: "absolute",
                  left: -4,
                  right: -4,
                  top: -4,
                  bottom: -4,
                  zIndex: 0,
                  backgroundColor: effectBgColor,
                }}
              />
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "#94a3b8", // slate-400
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                direction: descDirection,
                marginBottom: 0,
                lineHeight: "1.5",
              }}
            >
              {description}
            </p>
          </div>

          <div className="space-y-4 pt-3 border-t border-white/[0.08]">
            {technologies && (
              <div className="flex flex-wrap gap-1.5">
                {technologies.split(',').map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-0.5 rounded bg-white/10 text-white font-bold text-[9px] uppercase tracking-wider"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
            
            {projectLink && (
              <div className="flex justify-between items-center">
                <Link
                  href={projectLink}
                  className="inline-flex items-center text-xs font-bold text-brandGreen hover:text-white transition-colors space-x-1.5 uppercase tracking-wider"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
