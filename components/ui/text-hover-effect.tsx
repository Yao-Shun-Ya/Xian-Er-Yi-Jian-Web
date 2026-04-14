"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion"; 

export const TextHoverEffect = ({
  text,
  variant = "all", 
}: {
  text: string;
  variant?: "all" | "outline" | "glow";
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // 调整为 1024 触发换行，给宽屏留更多空间
    handleResize();
    window.addEventListener("resize", handleResize);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const isWithin = 
          e.clientX >= svgRect.left && e.clientX <= svgRect.right && 
          e.clientY >= svgRect.top && e.clientY <= svgRect.bottom;

        setHovered(isWithin);
        if (isWithin) {
          const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
          const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;
          setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const words = text.split(" ");
  // 👇 关键修复：宽屏 viewBox 进一步拉长到 1600，高度保持 100
  const viewBox = isMobile ? "0 0 800 200" : "0 0 1600 100";

  return (
    <svg
      ref={svgRef}
      width="100%" height="100%" viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className="select-none pointer-events-none"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id="revealMask" gradientUnits="userSpaceOnUse" r="20%"
          animate={maskPosition} transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      <g>
        {isMobile ? (
          // 手机端：双行渲染逻辑
          words.map((word, i) => {
            const yPos = `${35 + i * 40}%`;
            return (
              <React.Fragment key={i}>
                {(variant === "all" || variant === "outline") && (
                  <text
                    x="50%" y={yPos} textAnchor="middle" dominantBaseline="middle"
                    strokeWidth="0.5" fontSize="80" // 使用原生 fontSize
                    className="fill-transparent stroke-neutral-200 font-sans font-black dark:stroke-neutral-800"
                    style={{ opacity: hovered ? 0.7 : 0.2 }}
                  >{word}</text>
                )}
                {(variant === "all" || variant === "glow") && (
                  <text
                    x="50%" y={yPos} textAnchor="middle" dominantBaseline="middle"
                    stroke="url(#textGradient)" strokeWidth="0.5" fontSize="80"
                    mask="url(#textMask)"
                    className="fill-transparent font-sans font-black"
                  >{word}</text>
                )}
              </React.Fragment>
            );
          })
        ) : (
          // 宽屏：单行渲染逻辑
          <React.Fragment>
            {(variant === "all" || variant === "outline") && (
              <text
                x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                strokeWidth="0.4" fontSize="70" // 宽屏字号稍小一点以防溢出
                className="fill-transparent stroke-neutral-200 font-sans font-black dark:stroke-neutral-800"
                style={{ opacity: hovered ? 0.7 : 0.2 }}
              >{text}</text>
            )}
            {(variant === "all" || variant === "glow") && (
              <text
                x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                stroke="url(#textGradient)" strokeWidth="0.4" fontSize="70"
                mask="url(#textMask)"
                className="fill-transparent font-sans font-black"
              >{text}</text>
            )}
          </React.Fragment>
        )}
      </g>
    </svg>
  );
};